'use client';

import { useParams, useRouter } from 'next/navigation';
import { FaEdit, FaEllipsisH, FaTrash } from 'react-icons/fa';

interface PropertyDropdownProps {
  propertyId: number;
}

const PropertyDropdown: React.FC<PropertyDropdownProps> = ({ propertyId }) => {
  const router = useRouter();
  const { shopId } = useParams();

  const onDelete = () => {};

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
          <a
            onClick={() =>
              router.push(`/${shopId}/properties/${propertyId}/update`)
            }
          >
            <FaEdit /> Update
          </a>
        </li>
        <li>
          <a onClick={onDelete}>
            <FaTrash /> Delete
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PropertyDropdown;
