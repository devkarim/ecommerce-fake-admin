'use client';

import Image from 'next/image';
import { useState } from 'react';
import ProfileModal from '../modals/profile-modal';

interface ProfileProps {
  username?: string | null;
  imageUrl?: string | null;
  className?: string;
}

const Profile: React.FC<ProfileProps> = ({ username, imageUrl, className }) => {
  const [isOpen, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  return (
    <>
      <ProfileModal
        isOpen={isOpen}
        onClose={onClose}
        imageUrl={imageUrl}
        username={username}
      />
      <div className={className}>
        <div className="flex items-center">
          <div className="avatar cursor-pointer" onClick={() => setOpen(true)}>
            <div className="relative h-10 w-10 rounded-full">
              <Image
                src={imageUrl || '/img/default-avatar.jpg'}
                alt="profile-pic"
                className="object-cover"
                fill
              />
            </div>
          </div>
          {username && (
            <p
              className="ml-2 lg:hidden cursor-pointer w-full"
              onClick={() => setOpen(true)}
            >
              {username}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
