import type { PostFieldsFragment } from '@good/lens';

import type { CommunityMetadata, InvalidMetadataException } from '..';

import { CommunityMetadataBuilder } from '..';
import { getMostRecent } from './getMostRecent';
import { logIgnoreWarning } from './logIgnoreWarning';

/**
 * Extracts opportunity metadata from lens posts, showing only the most recent posts
 *
 * @param `data` post data (usually returned by the data part of the hook `usePostData()`)
 *
 * @returns filtered OpportunityMetadata[] with only the most recent posts
 *
 */
export const getCommunityMetadata = (data: PostFieldsFragment[]) => {
  const metadata: CommunityMetadata[] = data
    .filter((p) => p.__typename === 'Post')
    .map((post) => {
      try {
        return new CommunityMetadataBuilder(post).build();
      } catch (error) {
        logIgnoreWarning(post, error as InvalidMetadataException);
        return null;
      }
    })
    .filter((o): o is CommunityMetadata => o !== null);

  return getMostRecent<CommunityMetadata>(metadata);
};
