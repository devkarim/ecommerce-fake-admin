'use client';

import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import NavLinks from './nav-links';

interface MobileMenuProps {}

const MobileMenu: React.FC<MobileMenuProps> = ({}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <MdMenu
        className="text-2xl cursor-pointer sm:hidden"
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      />
      {isMenuOpen && (
        <div className="fixed flex h-full w-full bg-base-100 z-[50] left-0 top-16 border-t border-neutral p-6 lg:hidden">
          <NavLinks className="flex flex-col space-y-4" />
        </div>
      )}
    </div>
  );
  // return (
  //   <div className="dropdown dropdown-end">
  //     <label tabIndex={0} className="btn btn-ghost btn-circle">
  //       <MdMenu className="text-2xl cursor-pointer" />
  //     </label>
  //     <ul
  //       tabIndex={0}
  //       className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box"
  //     >
  //       <li>
  //         <a>Homepage</a>
  //       </li>
  //       <li>
  //         <a>Portfolio</a>
  //       </li>
  //       <li>
  //         <a>About</a>
  //       </li>
  //     </ul>
  //   </div>
  // );
};

export default MobileMenu;
