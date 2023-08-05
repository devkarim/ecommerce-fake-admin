import Header from '@/components/ui/header';
import Container from '@/components/ui/container';
import { getOrdersByShopId } from '@/actions/orders';

import OrdersList from './components/orders-list';

interface ShopOrdersPageProps {
  params: {
    shopId: string;
  };
}

const ShopOrdersPage: React.FC<ShopOrdersPageProps> = async ({
  params: { shopId },
}) => {
  const { orders, count } = await getOrdersByShopId(+shopId);

  return (
    <div>
      <Container className="border-b border-neutral">
        <Header
          title="Orders"
          subtitle="Real-time order insights, analytics, and summaries"
        />
      </Container>
      <Container>
        <OrdersList orders={orders} numOfOrders={count} />
      </Container>
    </div>
  );
};

export default ShopOrdersPage;
