import getCurrentUser from '@/actions/getCurrentUser';

import ShopDropdown from './shop-dropdown';
import NavLinks from './nav-links';
import MobileNavbar from './mobile-navbar';
import Container from '../ui/container';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = async ({}) => {
  const user = await getCurrentUser();

  return (
    <div className="border-b border-neutral h-16">
      <Container className="z-10 flex bg-base-100 h-16 items-center w-full fixed sm:static justify-between sm:justify-start sm:space-x-4">
        <ShopDropdown shops={user?.shops || []} />
        <NavLinks className="hidden sm:block space-x-4" />
        <MobileNavbar />
      </Container>
    </div>
  );
};

export default Navbar;
