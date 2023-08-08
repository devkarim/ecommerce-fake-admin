import { redirect } from 'next/navigation';

import getShop from '@/actions/shops';
import Header from '@/components/ui/header';
import Container from '@/components/ui/container';
import { getOrdersSummary } from '@/actions/orders';

import OverviewSummary from './components/overview-summary';
import RevenueBarChart from './components/revenue-bar-chart';

interface ShopOverviewPageProps {
  params: {
    shopId: string;
  };
}

const ShopOverviewPage: React.FC<ShopOverviewPageProps> = async ({
  params: { shopId },
}) => {
  const shop = await getShop(+shopId);
  const { sales, totalRevenue, productsInStock, graphData } =
    await getOrdersSummary(+shopId);

  if (!shop) redirect('/');

  return (
    <>
      <Container className="border-b border-neutral">
        <Header
          title="Overview"
          subtitle="A concise summary of sales performance and trends"
        />
      </Container>
      <Container className="space-y-12">
        <OverviewSummary
          sales={sales}
          totalRevenue={totalRevenue}
          productsInStock={productsInStock || 0}
        />
        <RevenueBarChart data={graphData} />
      </Container>
    </>
  );
};

export default ShopOverviewPage;
