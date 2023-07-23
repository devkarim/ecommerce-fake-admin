'use client';

import { FaEdit, FaEllipsisH, FaTrash } from 'react-icons/fa';

import { cls } from '@/lib/utils';

interface ActionsDropdownProps {
  onDelete: () => void;
  onUpdate: () => void;
  disabled?: boolean;
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({
  onDelete,
  onUpdate,
  disabled,
}) => {
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
            onClick={onUpdate}
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

export default ActionsDropdown;
