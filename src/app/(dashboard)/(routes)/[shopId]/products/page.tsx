import { redirect } from 'next/navigation';

import { getShopWithProducts } from '@/actions/shops';
import Header from '@/components/ui/header';
import Container from '@/components/ui/container';
import AddNew from '@/components/ui/add-new';

import ProductsList from './components/products-list';

interface ShopProductsPageProps {
  params: {
    shopId: string;
  };
}

const ShopProductsPage: React.FC<ShopProductsPageProps> = async ({
  params: { shopId },
}) => {
  const shop = await getShopWithProducts(+shopId);

  if (!shop) redirect('/');

  return (
    <div>
      <Container className="border-b border-neutral">
        <Header
          title="Products"
          subtitle="Manage and add your shop products to boost sales and success"
          right={<AddNew href={`/${shop.id}/products/new`} />}
        />
      </Container>
      <Container>
        <ProductsList products={shop.products} />
      </Container>
    </div>
  );
};

export default ShopProductsPage;
