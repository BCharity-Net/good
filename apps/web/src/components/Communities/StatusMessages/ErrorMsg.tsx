import type { FC, ReactNode, SyntheticEvent} from 'react';
import cn from '@good/ui/cn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


import {
 ExclamationTriangleIcon as ExclamationTriangleIconOutline,
 CheckCircleIcon as CheckCircleIconOutline
} from '@heroicons/react/24/outline';
import {
  ExclamationTriangleIcon as ExclamationTriangleIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
  XMarkIcon as XMarkIcon
} from '@heroicons/react/24/solid';

import { Modal, Button, Card } from '@good/ui';
import { useProfileStore } from 'src/store/persisted/useProfileStore';
import { useProfileStatus } from 'src/store/non-persisted/useProfileStatus';
import { Errors } from '@good/data/errors';
import toast, { ErrorIcon } from 'react-hot-toast';

const ErrorMsg: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { currentProfile } = useProfileStore();
  const { isSuspended } = useProfileStatus();

  const handleOpen = () => {
    setShowModal(true);

  }
  const handleClose = () => {
    setShowModal(false);

  }



  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    handleClose();
  };

  const modalContent = (
  <Card className="!rounded-b-xl !rounded-t-none border-none">
  <div className="ml-5 mr-5">
  <div className="flex flex-col pt-5 items-center justify-center">
    <div className="flex flex-col items-center justify-center content-center w-full">
      <div className="relative flex items-center justify-center w-full ">
        <ExclamationTriangleIconSolid className="w-28 h-28" />
      </div>
      <div className="flex flex-col items-center text-center text-md mt-5 mb-5">
        <p>An unexpected error occurred, please try again</p>
      </div>
    </div>
  </div>
    <div className="divider mx-5" />
    <div className="block items-center px-5 py-3 sm:flex">
      <div className="flex items-center space-x-4"></div>
      <div className="ml-auto mt-2 sm:mt-0">
        <Button variant="primary" outline={true} onClick={handleClose}>
          Close
        </Button>
      </div>
    </div>
  </div>
  </Card>
  );

  return (
    <>
      <Modal show={true} onClose={handleClose} title="Error creating community">
          {modalContent}
        </Modal>
    </>
  );
};

export default ErrorMsg;



