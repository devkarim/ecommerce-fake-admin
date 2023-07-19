import { redirect } from 'next/navigation';

import prisma from '@/lib/prisma';
import getSession from '@/actions/getSession';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || !session.user || !session.user.isAuthenticated) {
    redirect('/login');
  }

  const shop = await prisma.shop.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  if (shop) {
    redirect(`/${shop.id}`);
  }

  return <div>{children}</div>;
}