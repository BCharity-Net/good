import type { Profile } from '@good/lens';
import type { FC } from 'react';

import {
  GOOD_API_URL,
  STAFF_PICK_FEATURE_ID,
  VERIFIED_FEATURE_ID
} from '@good/data/constants';
import { FeatureFlag } from '@good/data/feature-flags';
import { CREATORTOOLS } from '@good/data/tracking';
import getPreferences from '@good/helpers/api/getPreferences';
import getAuthApiHeaders from '@helpers/getAuthApiHeaders';
import { Leafwatch } from '@helpers/leafwatch';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ToggleWrapper from '@components/Staff/Users/Overview/Tool/ToggleWrapper';
import { Toggle } from '@good/ui';

interface CreatorToolProps {
  profile: Profile;
}

const CreatorTool: FC<CreatorToolProps> = ({ profile }) => {
  const [updating, setUpdating] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);

  const allowedFeatures = [
    { id: VERIFIED_FEATURE_ID, key: FeatureFlag.Verified },
    { id: STAFF_PICK_FEATURE_ID, key: FeatureFlag.StaffPick }
  ];

  const { data: preferences, isLoading } = useQuery({
    queryFn: () => getPreferences(profile.id, getAuthApiHeaders()),
    queryKey: ['getPreferences', profile.id]
  });

  useEffect(() => {
    if (preferences) {
      setFeatures(preferences.features || []);
    }
  }, [preferences]);

  const updateFeatureFlag = async (feature: { id: string; key: string }) => {
    const { id, key } = feature;
    const enabled = !features.includes(key);

    setUpdating(true);
    try {
      await toast.promise(
        axios.post(
          `${GOOD_API_URL}/internal/features/assign`,
          { enabled, id, profile_id: profile.id },
          { headers: getAuthApiHeaders() }
        ),
        {
          error: 'Failed to update flag',
          loading: 'Updating the flag...',
          success: 'Flag updated'
        }
      );

      Leafwatch.track(CREATORTOOLS.ASSIGN_FEATURE_FLAG, {
        feature: key,
        profile_id: profile.id
      });

      setFeatures((prev) =>
        enabled ? [...prev, key] : prev.filter((f) => f !== key)
      );
    } catch {
      // Error handling is managed by toast.promise
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-2.5">
      <div className="font-bold">Creator Tool</div>
      <div className="space-y-2 pt-2 font-bold">
        {allowedFeatures.map((feature) => (
          <ToggleWrapper key={feature.id} title={feature.key}>
            <Toggle
              disabled={updating || isLoading}
              on={features.includes(feature.key)}
              setOn={() => updateFeatureFlag(feature)}
            />
          </ToggleWrapper>
        ))}
      </div>
    </div>
  );
};

export default CreatorTool;
