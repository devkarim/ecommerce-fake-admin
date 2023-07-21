import { redirect } from 'next/navigation';

import getShop from '@/actions/getShop';
import Header from '@/components/ui/header';
import Container from '@/components/ui/container';

interface ShopPropertiesPageProps {
  params: {
    shopId: string;
  };
}

const ShopPropertiesPage: React.FC<ShopPropertiesPageProps> = async ({
  params: { shopId },
}) => {
  const shop = await getShop(+shopId);

  if (!shop) redirect('/');

  return (
    <div>
      <Container className="border-b border-neutral">
        <Header
          title="Properties"
          subtitle="Manage and add your shop properties"
        />
      </Container>
    </div>
  );
};

export default ShopPropertiesPage;
