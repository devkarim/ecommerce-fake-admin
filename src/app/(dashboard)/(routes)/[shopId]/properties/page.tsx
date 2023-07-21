import Container from '@/components/ui/container';

interface ShopPropertiesProps {
  params: {
    shopId: string;
  };
}

const ShopProperties: React.FC<ShopPropertiesProps> = ({
  params: { shopId },
}) => {
  return (
    <div>
      <Container></Container>
    </div>
  );
};

export default ShopProperties;
