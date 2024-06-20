import type { PostFieldsFragment } from '@good/lens';

import type { InvalidMetadataException } from '../InvalidMetadataException';

/**
 * Simple utility function to log an warning when metadata is ignored because it is invalid
 */
export const logIgnoreWarning = (
  post: PostFieldsFragment,
  e: InvalidMetadataException
) => {
  console.debug(
    'warning: ignored metadata from post %s due to error %o',
    post.id,
    e.message
  );
};
