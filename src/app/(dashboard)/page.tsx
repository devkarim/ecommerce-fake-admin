import ShopDropdown from '@/components/navbar/shop-dropdown';
import getCurrentUser from '@/actions/getCurrentUser';

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="flex h-full justify-center items-center">
      <div className="text-center space-y-6 sm:space-y-12">
        <h1 className="text-2xl sm:text-4xl font-medium">
          Welcome {user?.name}
        </h1>
        <ShopDropdown
          shops={user?.shops || []}
          variant="lg"
          className="hidden sm:inline-block"
        />
        <ShopDropdown
          shops={user?.shops || []}
          variant="sm"
          className="inline-block sm:hidden"
        />
      </div>
    </div>
  );
}
