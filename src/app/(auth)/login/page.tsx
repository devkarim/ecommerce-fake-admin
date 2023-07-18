import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';

import LoginCard from './components/login-card';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session && session?.user?.isAuthenticated) {
    redirect('/');
  }

  return (
    <div className="w-full h-full flex justify-center items-center p-4 lg:p-8">
      <LoginCard />
    </div>
  );
}
