'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { cls } from '@/lib/utils';

interface NavLinksProps {}

const NavLinks: React.FC<NavLinksProps> = ({}) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.shopId}`,
      label: 'Overview',
      active: pathname === `/${params.shopId}`,
    },
    {
      href: `/${params.shopId}/products`,
      label: 'Products',
      active: pathname === `/${params.shopId}/products`,
    },
    {
      href: `/${params.shopId}/orders`,
      label: 'Orders',
      active: pathname === `/${params.shopId}/orders`,
    },
    {
      href: `/${params.shopId}/properties`,
      label: 'Properties',
      active: pathname === `/${params.shopId}/properties`,
    },
    {
      href: `/${params.shopId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.shopId}/settings`,
    },
  ];

  return (
    <div className="space-x-4">
      {routes.map((r) => (
        <Link
          key={r.href}
          href={r.href}
          className={cls('opacity-60', {
            'opacity-100': r.active,
          })}
        >
          {r.label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;