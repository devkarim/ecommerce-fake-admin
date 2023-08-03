import { redirect } from 'next/navigation';

import getShop from '@/actions/shops';
import Container from '@/components/ui/container';
import Header from '@/components/ui/header';

import SettingsForm from './components/settings-form';
import DangerZone from './components/danger-zone';

interface ShopPropertiesProps {
  params: {
    shopId: string;
  };
}

const ShopProperties: React.FC<ShopPropertiesProps> = async ({
  params: { shopId },
}) => {
  const shop = await getShop(+shopId);

  if (!shop) redirect('/');

  return (
    <div>
      <Container className="border-b border-neutral">
        <Header title="Settings" subtitle="Manage your shop settings" />
      </Container>
      <Container className="border-b border-neutral">
        <SettingsForm
          id={shop.id}
          name={shop.name}
          imageUrl={shop.imageUrl}
          isFeatured={shop.isFeatured}
          billboardCaption={shop.billboard?.caption}
          billboardImageUrl={shop.billboard?.imageUrl}
        />
      </Container>
      <DangerZone id={shop.id} />
    </div>
  );
};

export default ShopProperties;
