import { redirect } from 'next/navigation';

import { getShopWithProps } from '@/actions/shops';
import Header from '@/components/ui/header';
import Container from '@/components/ui/container';
import PropertiesForm from '../components/properties-form';

interface AddNewPropertyPageProps {
  params: {
    shopId: string;
  };
}

const AddNewPropertyPage: React.FC<AddNewPropertyPageProps> = async ({
  params: { shopId },
}) => {
  const shop = await getShopWithProps(+shopId);

  if (!shop) redirect('/');

  return (
    <>
      <Container className="border-b border-neutral">
        <Header
          title="Create property"
          subtitle="Add a new property to your shop"
        />
      </Container>
      <Container>
        <PropertiesForm />
      </Container>
    </>
  );
};

export default AddNewPropertyPage;
