import type { AnyPublication, FeedItem } from '@good/lens';
import type { FC, ReactNode } from 'react';

import ActionType from '@components/Home/Timeline/EventType';
import PublicationWrapper from '@components/Shared/PublicationWrapper';
import cn from '@good/ui/cn';
import { memo } from 'react';
import usePushToImpressions from 'src/hooks/usePushToImpressions';

import PublicationActions from './Actions'; // Use existing actions
import HiddenPublication from './HiddenPublication';
import PublicationAvatar from './PublicationAvatar';
import PublicationBody from './PublicationBody';
import PublicationHeader from './PublicationHeader';
import PublicationType from './Type';
import { CurrencyDollarIcon, GiftIcon } from '@heroicons/react/24/outline'; // Import only donation-specific icons

interface SingleDonationPublicationProps {
  feedItem?: FeedItem;
  header?: ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  publication: AnyPublication;
  showActions?: boolean;
  showMore?: boolean;
  showThread?: boolean;
  showType?: boolean;
}

const SingleDonationPublication: FC<SingleDonationPublicationProps> = ({
  feedItem,
  header,
  isFirst = false,
  isLast = false,
  publication,
  showActions = true,
  showMore = true,
  showThread = true,
  showType = true
}) => {
  const rootPublication = feedItem ? feedItem?.root : publication;
  usePushToImpressions(rootPublication.id);

  return (
    <PublicationWrapper
      className={cn(
        isFirst && 'rounded-t-xl',
        isLast && 'rounded-b-xl',
        'cursor-pointer px-5 pb-3 pt-4 hover:bg-gray-100 dark:hover:bg-gray-900'
      )}
      publication={rootPublication}
    >
      {header}
      {feedItem ? (
        <ActionType feedItem={feedItem} />
      ) : (
        <PublicationType
          publication={publication}
          showThread={showThread}
          showType={showType}
        />
      )}
      <div className="flex items-start space-x-3">
        <PublicationAvatar feedItem={feedItem} publication={rootPublication} />
        <div className="w-[calc(100%-55px)]">
          <PublicationHeader
            feedItem={feedItem}
            publication={rootPublication}
          />
          {publication.isHidden ? (
            <HiddenPublication type={publication.__typename} />
          ) : (
            <>
              <PublicationBody
                publication={rootPublication}
                showMore={showMore}
              />
              {showActions ? (
                <div className="flex justify-between items-center space-x-3 mt-2">
                  <PublicationActions publication={rootPublication} />
                  <div className="flex space-x-3">
                    <button className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                      <CurrencyDollarIcon className="w-5 h-5" />
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                      <GiftIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </PublicationWrapper>
  );
};

export default memo(SingleDonationPublication);
