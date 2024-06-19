/* eslint no-use-before-define: 0 */
import type { PostFieldsFragment } from '@good/lens';

import {
  PublicationMetadata,
  PublicationMetadataBuilder
} from './PublicationMetadata';

/**
 * A base class for metadata with an id that can be updated by making publications
 * with an attribute that includes this id. See {getMostRecent}
 */
export class UpdateableMetadata extends PublicationMetadata {
  /**
   * A uuid associated with this metadata
   */
  id: string;

  constructor(builder: UpdateableMetadataBuilder<UpdateableMetadata>) {
    super(builder);
    this.id = builder.id;
  }
}

/**
 * An abstract base class to build {@link UpdateableMetadata}. Builds
 * the id property
 */
export abstract class UpdateableMetadataBuilder<
  T extends UpdateableMetadata
> extends PublicationMetadataBuilder<T> {
  id: string;

  /**
   * Sets the id field to be used by any classes than inherit from this
   * class.
   * */
  constructor(versions: Set<string>, post: PostFieldsFragment) {
    super(versions, post);
    this.id = this.getAttribute('id');
  }
}
