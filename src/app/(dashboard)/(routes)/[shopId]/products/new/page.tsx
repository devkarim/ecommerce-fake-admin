import { redirect } from 'next/navigation';

import { getShopWithProps } from '@/actions/shops';
import Header from '@/components/ui/header';
import Container from '@/components/ui/container';
import ProductsForm from '../components/products-form';

interface AddNewProductPageProps {
  params: {
    shopId: string;
  };
}

const AddNewProductPage: React.FC<AddNewProductPageProps> = async ({
  params: { shopId },
}) => {
  const shop = await getShopWithProps(+shopId);

  if (!shop) redirect('/');

  return (
    <>
      <Container className="border-b border-neutral">
        <Header
          title="Create product"
          subtitle="Add a new product to your shop"
        />
      </Container>
      <Container>
        <ProductsForm shopId={shop.id} shopProps={shop.props} />
      </Container>
    </>
  );
};

export default AddNewProductPage;
