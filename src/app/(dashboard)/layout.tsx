import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import prismadb from '@/lib/prisma';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.isAuthenticated) {
    redirect('/login');
  }

  const shop = await prismadb.shop.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  if (shop) {
    redirect(`/${shop.id}`);
  }

  return <>{children}</>;
}
