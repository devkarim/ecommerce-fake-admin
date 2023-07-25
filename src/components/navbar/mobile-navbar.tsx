'use client';

import { useEffect, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import NavLinks from './nav-links';

interface MobileMenuProps {}

const MobileMenu: React.FC<MobileMenuProps> = ({}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('!overflow-y-hidden', 'md:!overflow-y-auto');
    } else {
      document.body.classList.remove(
        '!overflow-y-hidden',
        'md:!overflow-y-auto'
      );
    }
  }, [isMenuOpen]);

  return (
    <>
      <MdMenu
        className="text-2xl cursor-pointer sm:hidden"
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      />
      {isMenuOpen && (
        <div className="fixed flex h-full w-full bg-base-100 z-[50] left-0 top-16 border-t border-neutral p-6 lg:hidden">
          <NavLinks
            className="flex flex-col space-y-4"
            onClick={() => setTimeout(() => setMenuOpen(false), 500)}
          />
        </div>
      )}
    </>
  );
};

export default MobileMenu;
