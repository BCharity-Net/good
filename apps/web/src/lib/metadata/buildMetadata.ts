import type { Profile } from '@good/lens';
import type { MarketplaceMetadataAttribute } from '@lens-protocol/metadata';

import getProfile from '@good/helpers/getProfile';

import type { CommunityMetadataRecord } from './CommunityMetadata';

import { PostTags } from './PostTags';

const buildBaseMetadata = <T extends Record<string, string> = {}>(
  profile: Profile,
  baseTitle: string,
  tags: string[],
  data: T
) => {
  const attributeInput = Object.entries(data).map(([k, v]) => ({
    key: k,
    type: "String",
    value: v
  }));

  let content = '';
  let title = baseTitle;

  for (const t of tags) {
    content = content + `#${t} `;
    baseTitle = baseTitle + ` ${t}`;
  }

  const marketplaceAttributes: MarketplaceMetadataAttribute[] = [];
  const marketplace = {
    attributes: marketplaceAttributes,
    description: content,
    external_url: `https://bcharity.net${getProfile(profile).link}`,
    name: title
  };
  const baseMetadata = {
    attributes: attributeInput,
    content,
    marketplace,
    tags,
    title
  };

  // console.log('built metadata', baseMetadata)

  return baseMetadata;
};

const buildCreateCommunityMetadata = (
  profile: Profile,
  data: CommunityMetadataRecord
) => {
  const title = `Community by @${profile.handle?.fullHandle}`;
  const tags = [PostTags.Communities.Create];
  const baseMetadata = buildBaseMetadata<CommunityMetadataRecord>(
    profile,
    title,
    tags,
    data
  );
  baseMetadata.marketplace.name = data.name;
  baseMetadata.marketplace.description = `Community by @${profile.handle?.fullHandle}`;
  baseMetadata.marketplace.attributes = [
    {
      trait_type: 'TYPE',
      value: 'BCHARITY_COMMUNITY'
    },
    {
      trait_type: 'community_id',
      value: data.id
    }
  ];

  console.log(baseMetadata)
  return baseMetadata
};

export { buildCreateCommunityMetadata as buildCommunityMetadata };
