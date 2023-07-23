'use client';

import { FaEdit, FaEllipsisH, FaTrash } from 'react-icons/fa';

interface PropertyDropdownProps {}

const PropertyDropdown: React.FC<PropertyDropdownProps> = ({}) => {
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
          <a>
            <FaEdit /> Update
          </a>
        </li>
        <li>
          <a>
            <FaTrash /> Delete
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PropertyDropdown;
