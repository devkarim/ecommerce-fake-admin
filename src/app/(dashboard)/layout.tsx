import { redirect } from 'next/navigation';

import getSession from '@/actions/getSession';
import CreateShopModal from '@/components/modals/create-shop-modal';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || !session.user || !session.user.isAuthenticated) {
    redirect('/login');
  }

  return (
    <>
      <CreateShopModal />
      {children}
    </>
  );
}
