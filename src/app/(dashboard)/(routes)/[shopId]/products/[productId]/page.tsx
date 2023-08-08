import { redirect } from 'next/navigation';

import { getShopWithProduct } from '@/actions/shops';
import Header from '@/components/ui/header';
import Container from '@/components/ui/container';
import ProductsForm from '../components/products-form';

interface EditProductPageProps {
  params: {
    shopId: string;
    productId: string;
  };
}

const EditProductPage: React.FC<EditProductPageProps> = async ({
  params: { shopId, productId },
}) => {
  const shop = await getShopWithProduct(+shopId, +productId);

  if (!shop) redirect('/');

  if (!shop.products || shop.products.length == 0)
    redirect(`/${shop.id}/products`);

  const product = shop.products.find((p) => p.id == +productId);

  if (!product) redirect(`/${shop.id}/properties`);

  return (
    <>
      <Container className="border-b border-neutral">
        <Header
          title="Update product"
          subtitle="Edit your product specifications"
        />
      </Container>
      <Container>
        <ProductsForm
          mode="Edit"
          shopId={shop.id}
          shopProps={shop.props}
          name={product.name}
          quantity={product.quantity}
          price={+product.price}
          isArchived={product.isArchived}
          isFeatured={product.isFeatured}
          props={product.props.map((p) => {
            return { id: p.propertyId, name: p.property.name, value: p.value };
          })}
          productId={product.id}
          images={product.images.map((img) => img.url)}
          discount={product.discount}
        />
      </Container>
    </>
  );
};

export default EditProductPage;
