'use client';

import { useEffect, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import NavLinks from './nav-links';
import Profile from '../ui/profile';

interface MobileMenuProps {
  username?: string | null;
  imageUrl?: string | null;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ username, imageUrl }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('!overflow-y-hidden', 'lg:!overflow-y-auto');
    } else {
      document.body.classList.remove(
        '!overflow-y-hidden',
        'lg:!overflow-y-auto'
      );
    }
  }, [isMenuOpen]);

  return (
    <>
      <MdMenu
        className="text-2xl cursor-pointer lg:hidden"
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      />
      {isMenuOpen && (
        <div className="fixed flex flex-col h-full w-full bg-base-100 z-20 left-0 top-16 border-t border-neutral p-6 lg:hidden space-y-4">
          <NavLinks
            className="flex flex-col space-y-4"
            onClick={() => setTimeout(() => setMenuOpen(false), 500)}
          />
          <Profile username={username} imageUrl={imageUrl} />
        </div>
      )}
    </>
  );
};

export default MobileMenu;
