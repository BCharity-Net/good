import collectModuleParams from '@good/helpers/collectModuleParams';
import {
  CollectOpenActionModuleType,
  type OnchainPostRequest
} from '@good/lens';
import uploadToArweave from '@helpers/uploadToArweave';
import { buildCommunityMetadata, PostTags } from 'src/lib/metadata';
import { CommunityMetadataVersion } from 'src/lib/metadata/types';
import { useNonceStore } from 'src/store/non-persisted/useNonceStore';
import { useProfileStore } from 'src/store/persisted/useProfileStore';
import { v4 } from 'uuid';

import useCreatePublication from './useCreatePublication';
import usePublicationMetadata from './usePublicationMetadata';

interface CreateCommunityInput {
  onCompleted: (status?: any) => void;
  onError: (error: Error) => void;
}

const useCreateCommunity = (props: CreateCommunityInput) => {
  const { currentProfile } = useProfileStore();
  const { lensHubOnchainSigNonce } = useNonceStore();
  const { createOnchainPostTypedData } = useCreatePublication(props);
  const getMetadata = usePublicationMetadata();

  const create = async ({ name }: { name: string }) => {
    if (currentProfile == null) {
      props.onError(new Error('not authenticated'));
      return;
    }

    const communityData = {
      id: v4(),
      name,
      tag: PostTags.Communities.Create,
      version: CommunityMetadataVersion['1.0.0'],
      originalPostId: '' // since this is the first post in the "chain"
    };
    const baseMetadata = buildCommunityMetadata(currentProfile, communityData);
    const metadata = getMetadata({ baseMetadata });
    const arweaveId = await uploadToArweave(metadata);

    const openActionModules = [
      {
        collectOpenAction: collectModuleParams({
          amount: null,
          collectLimit: null,
          endsAt: null,
          followerOnly: false,
          recipients: [],
          referralFee: 0,
          type: CollectOpenActionModuleType.SimpleCollectOpenActionModule
        })
      }
    ];

    const onChainRequest: OnchainPostRequest = {
      contentURI: `ar://${arweaveId}`,
      openActionModules
    };

    const params = {
      variables: {
        options: { overrideSigNonce: lensHubOnchainSigNonce },
        request: onChainRequest
      }
    };

    createOnchainPostTypedData(params);
  };

  return { upload: create };
};

export default useCreateCommunity;
