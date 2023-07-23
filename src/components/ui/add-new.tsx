'use client';

import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';

interface AddNewProps {
  href: string;
}

const AddNew: React.FC<AddNewProps> = ({ href }) => {
  const router = useRouter();

  return (
    <button
      className="btn btn-neutral sm:h-14 sm:w-40 sm:text-lg"
      onClick={() => router.push(href)}
    >
      <FaPlus />
      Add new
    </button>
  );
};

export default AddNew;
