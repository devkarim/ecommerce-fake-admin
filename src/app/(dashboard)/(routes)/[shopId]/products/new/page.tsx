import { redirect } from 'next/navigation';

import { getShopWithProps } from '@/actions/shops';
import Header from '@/components/ui/header';
import Container from '@/components/ui/container';

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
      <Container></Container>
    </>
  );
};

export default AddNewProductPage;
