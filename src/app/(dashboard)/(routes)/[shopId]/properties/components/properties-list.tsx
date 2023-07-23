'use client';

import { useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { Property } from '@prisma/client';

import PropertyDropdown from './property-dropdown';
import { deleteProperty } from '@/services/shops';
import toast from 'react-hot-toast';

interface PropertiesListProps {
  props: Property[];
}

const PropertiesList: React.FC<PropertiesListProps> = ({ props }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onQueryChange = (query: string) => {};

  const onDelete = async (propertyId: number, shopId: number) => {
    setLoading(true);
    try {
      await deleteProperty(propertyId, shopId);
      toast.success('Property deleted successfully!');
      router.refresh();
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data.message) {
        toast.error(err.response?.data.message);
      } else {
        toast.error(`Unable to delete property.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <input
        id="query"
        type="text"
        placeholder="Search"
        className="input input-bordered w-full max-w-sm"
        onChange={(e) => onQueryChange(e.target.value)}
      />
      {props.length != 0 ? (
        <table className="overflow-x-auto table">
          {/* head */}
          <thead>
            <tr className="border-[1px] border-neutral">
              <th>Name</th>
              <th>Type</th>
              <th>Values</th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {props.map((p) => (
              <tr key={p.id} className="border-[1px] border-neutral">
                <td>{p.name}</td>
                <td>{p.type}</td>
                <td>{p.values.join(' | ')}</td>
                <th>
                  <PropertyDropdown
                    shopId={p.shopId}
                    propertyId={p.id}
                    onDelete={() => onDelete(p.id, p.shopId)}
                    disabled={loading}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center opacity-60 py-12">
          No properties found. <br />
          Create one by using the {'"Add new"'} button above.
        </p>
      )}
    </div>
  );
};

export default PropertiesList;
