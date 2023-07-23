'use client';

import { Property } from '@prisma/client';
import PropertyDropdown from './property-dropdown';

interface PropertiesListProps {
  props: Property[];
}

const PropertiesList: React.FC<PropertiesListProps> = ({ props }) => {
  const onQueryChange = (query: string) => {};

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
                  <PropertyDropdown />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center opacity-60 py-12">
          No properties found. <br />
          Create one by using the "Add new" button above.
        </p>
      )}
    </div>
  );
};

export default PropertiesList;
