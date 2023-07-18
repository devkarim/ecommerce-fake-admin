interface ShopPageProps {
  params: {
    shopId: string;
  };
}

const ShopPage: React.FC<ShopPageProps> = ({ params: { shopId } }) => {
  return <div>Shop Page {shopId}</div>;
};

export default ShopPage;
