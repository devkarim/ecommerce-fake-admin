import Link from 'next/link';
import { MdStore } from 'react-icons/md';
import { FaArrowDown, FaPlusCircle } from 'react-icons/fa';

import { Shop } from '@prisma/client';
import { cls } from '@/lib/utils';

interface ShopDropdownProps {
  shops: Shop[];
}

const ShopDropdown: React.FC<ShopDropdownProps> = ({ shops }) => {
  return (
    <div className="dropdown cursor-pointer">
      <div
        tabIndex={0}
        className="flex items-center border-2 space-x-8 rounded-lg p-2 text-sm"
      >
        <div className="flex items-center space-x-2 text-sm">
          <MdStore className={cls('text-xl opacity-100')} />
          <p className={cls('font-medium opacity-100')}>Choose your shop</p>
        </div>
        <FaArrowDown className={cls('opacity-100')} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-lg w-52"
      >
        {shops.map((s) => (
          <li key={s.id}>
            <a>{s.name}</a>
          </li>
        ))}
        <li className={cls({ 'border-t': shops.length !== 0 })}>
          <Link href="/">
            <FaPlusCircle /> Create a new shop
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ShopDropdown;
