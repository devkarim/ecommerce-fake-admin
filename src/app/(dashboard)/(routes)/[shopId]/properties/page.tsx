import { redirect } from 'next/navigation';

import { getShopWithProps } from '@/actions/shops';
import Header from '@/components/ui/header';
import Container from '@/components/ui/container';

import PropertiesList from './components/properties-list';
import AddProperty from './components/add-property';

interface ShopPropertiesPageProps {
  params: {
    shopId: string;
  };
}

export const revalidate = 0;

const ShopPropertiesPage: React.FC<ShopPropertiesPageProps> = async ({
  params: { shopId },
}) => {
  const shop = await getShopWithProps(+shopId);

  if (!shop) redirect('/');

  return (
    <>
      <Container className="border-b border-neutral">
        <Header
          title="Properties"
          subtitle="Manage and add your shop properties"
          right={<AddProperty />}
        />
      </Container>
      <Container>
        <PropertiesList props={shop.props} />
      </Container>
    </>
  );
};

export default ShopPropertiesPage;
