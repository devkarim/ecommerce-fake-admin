interface ShopOverviewPageProps {
  params: {
    shopId: string;
  };
}

const ShopOverviewPage: React.FC<ShopOverviewPageProps> = ({
  params: { shopId },
}) => {
  return <div>Overview Page {shopId}</div>;
};

export default ShopOverviewPage;
