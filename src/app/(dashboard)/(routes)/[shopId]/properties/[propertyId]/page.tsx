import { redirect } from 'next/navigation';

import { getShopWithProps } from '@/actions/shops';
import Header from '@/components/ui/header';
import Container from '@/components/ui/container';
import PropertiesForm from '../components/properties-form';

interface EditPropertyPageProps {
  params: {
    shopId: string;
    propertyId: string;
  };
}

const EditPropertyPage: React.FC<EditPropertyPageProps> = async ({
  params: { shopId, propertyId },
}) => {
  const shop = await getShopWithProps(+shopId);

  if (!shop) redirect('/');

  if (!propertyId || isNaN(+propertyId)) redirect(`/${shop.id}/properties`);

  const property = shop.props.find((p) => p.id == +propertyId);

  if (!property) redirect(`/${shop.id}/properties`);

  return (
    <>
      <Container className="border-b border-neutral">
        <Header
          title="Update property"
          subtitle="Edit your property specifications"
        />
      </Container>
      <Container>
        <PropertiesForm
          mode="Edit"
          propertyId={property.id}
          shopId={shop.id}
          name={property.name}
          type={property.type}
          defaultValues={property.values}
        />
      </Container>
    </>
  );
};

export default EditPropertyPage;
