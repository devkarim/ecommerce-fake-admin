import getShop from '@/actions/getShop';

interface ShopProductsPageProps {
  params: {
    shopId: string;
  };
}

const ShopProductsPage: React.FC<ShopProductsPageProps> = async ({
  params: { shopId },
}) => {
  const shop = await getShop(+shopId);

  return <div>Products Page {shopId}</div>;
};

export default ShopProductsPage;
