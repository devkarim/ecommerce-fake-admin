import { redirect } from 'next/navigation';

import LoginCard from './components/login-card';
import getSession from '@/actions/getSession';

export default async function Home() {
  const session = await getSession();

  if (session && session?.user?.isAuthenticated) {
    redirect('/');
  }

  return (
    <div className="w-full h-full flex justify-center items-center p-4 lg:p-8">
      <LoginCard />
    </div>
  );
}
