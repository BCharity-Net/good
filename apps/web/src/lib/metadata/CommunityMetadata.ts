/* eslint no-use-before-define: 0 */
import type { PostFieldsFragment } from '@good/lens';

import type { PublicationMetadataFieldNames } from './PublicationMetadata';

import { CommunityMetadataVersion } from './types';
import {
  UpdateableMetadata,
  UpdateableMetadataBuilder
} from './UpdateableMetadata';

/**
 * The type of opportunity data used in {@link buildMetadata}
 */
export type CommunityMetadataRecord = Record<
  Exclude<keyof CommunityMetadata, PublicationMetadataFieldNames>,
  string
>;

/**
 * A data class that represents some community metadata
 */
export class CommunityMetadata extends UpdateableMetadata {
  static MetdataVersions = Object.values(CommunityMetadataVersion);

  /**
   * The community name
   */
  name: string;

  /**
   * Creates an instance of CommunityMetadata from an CommunityMetadataBuilder.
   */
  constructor(builder: CommunityMetadataBuilder) {
    super(builder);
    this.name = builder.name;
  }
}

/**
 * Builder class for CommunityMetadata
 */
export class CommunityMetadataBuilder extends UpdateableMetadataBuilder<CommunityMetadata> {
  readonly name: string = '';

  constructor(post: PostFieldsFragment) {
    super(new Set(CommunityMetadata.MetdataVersions), post);
    this.name = this.getAttribute('name');
  }

  buildObject(): CommunityMetadata {
    return new CommunityMetadata(this);
  }

  getValidationErrors() {
    return null;
  }
}
