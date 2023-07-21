import { redirect } from 'next/navigation';

import prisma from '@/lib/prisma';
import getSession from '@/actions/getSession';
import Navbar from '@/components/navbar/main-navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { shopId: string };
}

export default async function DashboardLayout({
  children,
  params: { shopId },
}: DashboardLayoutProps) {
  const session = await getSession();

  if (!session || !session.user || !session.user.isAuthenticated) {
    redirect('/login');
  }

  if (isNaN(+shopId)) {
    redirect(`/`);
  }

  const shop = await prisma.shop.findFirst({
    where: {
      id: +shopId,
      userId: session.user.id,
    },
  });

  if (!shop) {
    redirect(`/`);
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
