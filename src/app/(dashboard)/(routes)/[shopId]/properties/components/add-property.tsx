'use client';

import { useParams, useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';

interface AddPropertyProps {}

const AddProperty: React.FC<AddPropertyProps> = ({}) => {
  const { shopId } = useParams();
  const router = useRouter();

  return (
    <button
      className="btn btn-neutral sm:h-14 sm:w-40 sm:text-lg"
      onClick={() => router.push(`/${shopId}/properties/new`)}
    >
      <FaPlus />
      Add new
    </button>
  );
};

export default AddProperty;
