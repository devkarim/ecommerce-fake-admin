'use client';

import { useRouter } from 'next/navigation';
import { FaEdit, FaEllipsisH, FaTrash } from 'react-icons/fa';

import { cls } from '@/lib/utils';

interface PropertyDropdownProps {
  propertyId: number;
  shopId: number;
  onDelete: () => void;
  disabled?: boolean;
}

const PropertyDropdown: React.FC<PropertyDropdownProps> = ({
  shopId,
  propertyId,
  onDelete,
  disabled,
}) => {
  const router = useRouter();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="cursor-pointer">
        <FaEllipsisH />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-40"
      >
        <li>
          <button
            className={cls({ 'btn-disabled': disabled })}
            disabled={disabled}
            onClick={() => router.push(`/${shopId}/properties/${propertyId}`)}
          >
            <FaEdit /> Update
          </button>
        </li>
        <li>
          <button
            disabled={disabled}
            onClick={onDelete}
            className={cls('text-error hover:text-error', {
              'btn-disabled': disabled,
            })}
          >
            <FaTrash /> Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PropertyDropdown;
