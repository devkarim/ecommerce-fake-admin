'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { MdLogout } from 'react-icons/md';

import Modal from '../ui/modal';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  username?: string | null;
  imageUrl?: string | null;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  username,
  imageUrl,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="relative h-16 w-16 rounded-full">
              <Image
                src={imageUrl || '/img/default-avatar.jpg'}
                alt="profile-pic"
                className="object-cover"
                fill
              />
            </div>
          </div>
          <p className="text-xl font-semibold">{username}</p>
        </div>
        <div>
          <button
            className="btn btn-neutral w-full"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <MdLogout className="text-xl" /> Logout
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
