import { redirect } from 'next/navigation';

import getShop from '@/actions/getShop';
import Header from '@/components/ui/header';
import Container from '@/components/ui/container';

interface ShopOverviewPageProps {
  params: {
    shopId: string;
  };
}

const ShopOverviewPage: React.FC<ShopOverviewPageProps> = async ({
  params: { shopId },
}) => {
  const shop = await getShop(+shopId);

  if (!shop) redirect('/');

  return (
    <div>
      <Container className="border-b border-neutral">
        <Header
          title="Overview"
          subtitle="A concise summary of sales performance and trends"
        />
      </Container>
    </div>
  );
};

export default ShopOverviewPage;
