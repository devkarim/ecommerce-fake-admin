import { redirect } from 'next/navigation';

import getShop from '@/actions/shops';
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
  const shop = await getShop(+shopId);

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
        <PropertiesForm shopId={shop.id} />
      </Container>
    </>
  );
};

export default AddNewPropertyPage;
