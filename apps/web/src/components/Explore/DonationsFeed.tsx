import type {
  AnyPublication,
  ExplorePublicationRequest,
  PublicationMetadataMainFocusType
} from '@good/lens';
import type { FC } from 'react';
import type { StateSnapshot, VirtuosoHandle } from 'react-virtuoso';

import SingleDonationPublication from '@components/Publication/SingleDonationPublication';
import PublicationsShimmer from '@components/Shared/Shimmer/PublicationsShimmer';
import {
  CustomFiltersType,
  ExplorePublicationsOrderByType,
  LimitType,
  useExplorePublicationsQuery
} from '@good/lens';
import { Card, EmptyState, ErrorMessage } from '@good/ui';
import { RectangleStackIcon } from '@heroicons/react/24/outline'; // No need to import icons here
import { useRef } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useImpressionsStore } from 'src/store/non-persisted/useImpressionsStore';
import { useTipsStore } from 'src/store/non-persisted/useTipsStore';

let virtuosoState: any = { ranges: [], screenTop: 0 };

interface FeedProps {
  feedType?: ExplorePublicationsOrderByType;
  focus?: PublicationMetadataMainFocusType;
}

const DonationsFeed: FC<FeedProps> = ({
  feedType = ExplorePublicationsOrderByType.LensCurated,
  focus
}) => {
  const { fetchAndStoreViews } = useImpressionsStore();
  const { fetchAndStoreTips } = useTipsStore();
  const virtuoso = useRef<VirtuosoHandle>(null);

  // Variables
  const request: ExplorePublicationRequest = {
    limit: LimitType.TwentyFive,
    orderBy: feedType,
    where: {
      customFilters: [CustomFiltersType.Gardeners],
      metadata: { ...(focus && { mainContentFocus: [focus] }) }
    }
  };

  const { data, error, fetchMore, loading } = useExplorePublicationsQuery({
    onCompleted: async ({ explorePublications }) => {
      const ids = explorePublications?.items?.map((p) => p.id) || [];
      await fetchAndStoreViews(ids);
      await fetchAndStoreTips(ids);
    },
    variables: { request }
  });

  const publications = data?.explorePublications?.items;
  const pageInfo = data?.explorePublications?.pageInfo;
  const hasMore = pageInfo?.next;

  const onScrolling = (scrolling: boolean) => {
    if (!scrolling) {
      virtuoso?.current?.getState((state: StateSnapshot) => {
        virtuosoState = { ...state };
      });
    }
  };

  const onEndReached = async () => {
    if (!hasMore) {
      return;
    }

    const { data } = await fetchMore({
      variables: { request: { ...request, cursor: pageInfo?.next } }
    });
    const ids = data?.explorePublications?.items?.map((p) => p.id) || [];
    await fetchAndStoreViews(ids);
    await fetchAndStoreTips(ids);
  };

  if (loading) {
    return <PublicationsShimmer />;
  }

  if (publications?.length === 0) {
    return (
      <EmptyState
        icon={<RectangleStackIcon className="size-8" />}
        message="No posts yet!"
      />
    );
  }

  if (error) {
    return <ErrorMessage error={error} title="Failed to load explore feed" />;
  }

  return (
    <Card>
      <Virtuoso
        className="virtual-divider-list-window"
        computeItemKey={(index, publication) => `${publication.id}-${index}`}
        data={publications}
        endReached={onEndReached}
        isScrolling={onScrolling}
        itemContent={(index, publication) => {
          return (
            <SingleDonationPublication
              isFirst={index === 0}
              isLast={index === (publications?.length || 0) - 1}
              publication={publication as AnyPublication}
            />
          );
        }}
        ref={virtuoso}
        restoreStateFrom={
          virtuosoState.ranges.length === 0
            ? virtuosoState?.current?.getState((state: StateSnapshot) => state)
            : virtuosoState
        }
        useWindowScroll
      />
    </Card>
  );
};

export default DonationsFeed;
