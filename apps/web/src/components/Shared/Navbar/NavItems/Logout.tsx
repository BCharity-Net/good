import type { FC } from 'react';

import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { AUTH } from '@hey/data/tracking';
import { useRevokeAuthenticationMutation } from '@hey/lens';
import cn from '@hey/ui/cn';
import { useState } from 'react';
import errorToast from 'src/helpers/errorToast';
import getCurrentSession from 'src/helpers/getCurrentSession';
import { Leafwatch } from 'src/helpers/leafwatch';
import { usePreferencesStore } from 'src/store/non-persisted/usePreferencesStore';
import { signOut } from 'src/store/persisted/useAuthStore';
import { useDisconnect } from 'wagmi';

interface LogoutProps {
  className?: string;
  onClick?: () => void;
}

const Logout: FC<LogoutProps> = ({ className = '', onClick }) => {
  const { resetPreferences } = usePreferencesStore();
  const [revoking, setRevoking] = useState(false);

  const { disconnect } = useDisconnect();
  const { authorizationId } = getCurrentSession();

  const onError = (error: any) => {
    setRevoking(false);
    errorToast(error);
  };

  const [revokeAuthentication] = useRevokeAuthenticationMutation({ onError });

  const logout = async () => {
    try {
      setRevoking(true);
      if (authorizationId) {
        await revokeAuthentication({
          variables: { request: { authorizationId } }
        });
      }
      Leafwatch.track(AUTH.LOGOUT);
      resetPreferences();
      signOut();
      disconnect?.();
      location.reload();
    } catch (error) {
      onError(error);
    } finally {
      setRevoking(false);
    }
  };

  return (
    <button
      className={cn(
        'flex w-full items-center space-x-1.5 px-2 py-1.5 text-left text-sm text-gray-700 dark:text-gray-200',
        className
      )}
      disabled={revoking}
      onClick={async () => {
        await logout();
        onClick?.();
      }}
      type="button"
    >
      <ArrowRightStartOnRectangleIcon className="size-4" />
      <div>Logout</div>
    </button>
  );
};

export default Logout;
