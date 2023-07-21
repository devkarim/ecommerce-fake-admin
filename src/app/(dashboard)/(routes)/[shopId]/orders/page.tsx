import { redirect } from 'next/navigation';

import getShop from '@/actions/getShop';
import Header from '@/components/ui/header';
import Container from '@/components/ui/container';

interface ShopOrdersPageProps {
  params: {
    shopId: string;
  };
}

const ShopOrdersPage: React.FC<ShopOrdersPageProps> = async ({
  params: { shopId },
}) => {
  const shop = await getShop(+shopId);

  if (!shop) redirect('/');

  return (
    <div>
      <Container className="border-b border-neutral">
        <Header
          title="Orders"
          subtitle="Real-time order insights, analytics, and summaries"
        />
      </Container>
    </div>
  );
};

export default ShopOrdersPage;
