import getCurrentUser from '@/actions/getCurrentUser';

import ShopDropdown from './shop-dropdown';
import NavLinks from './nav-links';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = async ({}) => {
  const user = await getCurrentUser();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 space-x-4">
        <ShopDropdown shops={user?.shops || []} />
        <NavLinks />
      </div>
    </div>
  );
};

export default Navbar;
