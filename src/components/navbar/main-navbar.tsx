import getCurrentUser from '@/actions/getCurrentUser';

import ShopDropdown from './shop-dropdown';
import NavLinks from './nav-links';
import MobileNavbar from './mobile-navbar';
import Container from '../ui/container';
import Profile from '../ui/profile';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = async ({}) => {
  const user = await getCurrentUser();

  return (
    <div className="border-b border-neutral h-16">
      <Container className="z-10 flex bg-base-100 h-16 items-center w-full fixed lg:static justify-between">
        <div className="flex items-center gap-4">
          <ShopDropdown shops={user?.shops || []} />
          <NavLinks className="hidden lg:block space-x-4" />
        </div>
        <MobileNavbar username={user?.name} imageUrl={user?.imageUrl} />
        <Profile
          className="hidden lg:block"
          username={user?.name}
          imageUrl={user?.imageUrl}
        />
      </Container>
    </div>
  );
};

export default Navbar;
