import { FaArrowDown } from 'react-icons/fa';
import { MdStore } from 'react-icons/md';

import { Shop } from '@prisma/client';
import { cls } from '@/lib/utils';

interface ShopDropdownProps {
  shops: Shop[];
}

const ShopDropdown: React.FC<ShopDropdownProps> = ({ shops }) => {
  const disabled = shops.length == 0;

  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        className="flex items-center border-2 space-x-8 rounded-lg p-2 text-sm"
      >
        <div className="flex items-center space-x-2 text-sm">
          <MdStore
            className={cls('text-xl opacity-100', {
              'opacity-60': disabled,
            })}
          />
          <p
            className={cls('font-medium opacity-100', {
              'opacity-60': disabled,
            })}
          >
            Choose your shop
          </p>
        </div>
        <FaArrowDown
          className={cls('opacity-100', {
            'opacity-60': disabled,
          })}
        />
      </div>
      {shops.length != 0 && (
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {shops.map((s) => (
            <li key={s.id}>
              <a>{s.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShopDropdown;
