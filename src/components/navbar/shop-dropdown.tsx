'use client';

import Link from 'next/link';
import { MdStore } from 'react-icons/md';
import { FaArrowDown, FaPlusCircle } from 'react-icons/fa';

import { Shop } from '@prisma/client';
import { cls } from '@/lib/utils';
import useShopModal from '@/hooks/useShopModal';
import { useParams } from 'next/navigation';

interface ShopDropdownProps {
  shops: Shop[];
  variant?: 'sm' | 'lg';
  className?: string;
}

const ShopDropdown: React.FC<ShopDropdownProps> = ({
  shops,
  variant = 'sm',
  className,
}) => {
  const shopModal = useShopModal();
  const { shopId } = useParams();
  const shop = shopId && shops.find((s) => s.id == +shopId);

  return (
    <div className={cls('dropdown cursor-pointer', className)}>
      <div
        tabIndex={0}
        className={cls(
          'flex items-center border-neutral space-x-8 border-2 rounded-lg p-2 text-sm',
          { 'text-lg p-4': variant == 'lg' }
        )}
      >
        <div className="flex whitespace-nowrap items-center space-x-2 min-w-[150px]">
          <MdStore
            className={cls('text-xl opacity-100', {
              'text-2xl': variant == 'lg',
            })}
          />
          <p className={cls('font-medium opacity-100')}>
            {shop ? shop.name : 'Choose your shop'}
          </p>
        </div>
        <FaArrowDown className={cls('opacity-100')} />
      </div>
      <ul
        tabIndex={0}
        className={cls(
          'dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-lg space-y-2 w-full',
          { 'text-base': variant == 'lg' }
        )}
      >
        {shops.map((s) => (
          <li key={s.id}>
            <Link href={`/${s.id}`}>{s.name}</Link>
          </li>
        ))}
        <li
          className={cls({
            'pt-2 border-t': shops.length !== 0,
          })}
        >
          <a onClick={shopModal.onOpen}>
            <FaPlusCircle /> Create a new shop
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ShopDropdown;
