import { redirect } from 'next/navigation';

import getShop from '@/actions/getShop';
import Header from '@/components/ui/header';
import Container from '@/components/ui/container';

interface ShopProductsPageProps {
  params: {
    shopId: string;
  };
}

const ShopProductsPage: React.FC<ShopProductsPageProps> = async ({
  params: { shopId },
}) => {
  const shop = await getShop(+shopId);

  if (!shop) redirect('/');

  return (
    <div>
      <Container className="border-b border-neutral">
        <Header
          title="Products"
          subtitle="Manage and add your shop products to boost sales and success"
        />
      </Container>
    </div>
  );
};

export default ShopProductsPage;
