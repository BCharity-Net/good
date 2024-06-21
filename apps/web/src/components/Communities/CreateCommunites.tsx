import React, { FC, useState, useEffect, SyntheticEvent } from 'react';
import { Modal, Button, Card } from '@good/ui';
import { useProfileStore } from 'src/store/persisted/useProfileStore';
import { useProfileStatus } from 'src/store/non-persisted/useProfileStatus';
import { Errors } from '@good/data/errors';
import toast from 'react-hot-toast';

const CommunityCreation: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { currentProfile } = useProfileStore();
  const { isSuspended } = useProfileStatus();
  const [communityName, setCommunityName] = useState('');
  const [inputValue, setInputValue] = useState<string>('');

  const handleOpen = () => {
    setShowModal(true);
    setInputValue('');
    setCommunityName('');
  }
  const handleClose = () => {
    setShowModal(false);
    setInputValue('');
    setCommunityName('');
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setCommunityName(event.target.value);
  };

  const maxLength = 30;

  const createCommunity = async () => {
    if (!currentProfile) {
      return toast.error(Errors.SignWallet);
    }

    if (isSuspended) {
      return toast.error(Errors.Suspended);
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (inputValue.length < 4) {
      toast.error('Community Name must be at least 4 characters.');
      return;
    }

    console.log('Community Name:', communityName);
    handleClose();
  };

  const modalContent = (
    <Card className="!rounded-b-xl !rounded-t-none border-none">
      <div className="ml-5 mr-5">
        <div className="flex flex-col pt-5 items-center justify-center">
          <div className="p-4 flex flex-col items-center justify-center w-full">
            <div className="relative w-full mb-20">
              <input
                type="text"
                className="border-2 border-black rounded-full px-5 py-3 text-black w-full focus:border-pink-500"
                placeholder="Community Name"
                value={inputValue}
                onChange={handleChange}
                maxLength={maxLength}
                required
              />
              <label className="absolute top-7 left-5 -mt-6 text-xs text-black">
                Community Name
              </label>
              <label className="absolute top-7 right-5 -mt-6 text-xs text-black">
                {inputValue.length}/{maxLength}
              </label>
              <div className="ml-5 mr-5 text-sm">
                Name must be between 4 and {maxLength} characters
              </div>
            </div>
          </div>
        </div>

        <div className="divider mx-5" />
        <div className="block items-center px-5 py-3 sm:flex">
          <div className="flex items-center space-x-4"></div>
          <div className="ml-auto mt-2 sm:mt-0">
            <Button className="mr-4" variant="pink" onClick={handleSubmit}>
              Create
            </Button>
            <Button variant="primary" outline={true} onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <>
      <Button variant="primary" outline={true} onClick={handleOpen}>
        <span>Create Communities Test</span>
      </Button>
      {showModal && (
        <Modal show={true} onClose={handleClose} title="Create Community">
          {modalContent}
        </Modal>
      )}
    </>
  );
};

export default CommunityCreation;
