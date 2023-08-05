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
  searchParams: {
    q: string;
    page: string;
  };
}

export const revalidate = 0;

const ShopProductsPage: React.FC<ShopProductsPageProps> = async ({
  params: { shopId },
  searchParams: { page, q },
}) => {
  const shop = await getShopWithProducts(+shopId, q, +page);

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
        <ProductsList
          products={shop.products}
          numOfProducts={shop._count.products}
        />
      </Container>
    </div>
  );
};

export default ShopProductsPage;
