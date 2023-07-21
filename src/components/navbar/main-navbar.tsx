import getCurrentUser from '@/actions/getCurrentUser';

import ShopDropdown from './shop-dropdown';
import NavLinks from './nav-links';
import MobileNavbar from './mobile-navbar';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = async ({}) => {
  const user = await getCurrentUser();

  return (
    <div className="border-b border-neutral">
      <div className="flex h-16 items-center px-4 justify-between sm:justify-start sm:space-x-4">
        <ShopDropdown shops={user?.shops || []} />
        <NavLinks className="hidden sm:block space-x-2" />
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;
