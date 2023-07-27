'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Product } from '@prisma/client';
import ActionsDropdown from '@/components/ui/update-dropdown';
import { FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

interface ProductsListProps {
  products: Product[];
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const router = useRouter();

  const onDelete = async (productId: number, shopId: number) => {};

  return (
    <div className="space-y-12">
      <input
        id="query"
        type="text"
        value={query}
        placeholder="Search"
        className="input input-bordered w-full max-w-sm"
        onChange={(e) => setQuery(e.target.value)}
      />
      {filteredProducts.length != 0 ? (
        <table className="overflow-x-auto table">
          {/* head */}
          <thead>
            <tr className="border-[1px] border-neutral">
              <th>Name</th>
              <th>Featured</th>
              <th>Archived</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id} className="border-[1px] border-neutral">
                <td>{p.name}</td>
                <td>{p.isFeatured ? <FaCheck /> : <FaXmark />}</td>
                <td>{p.isArchived ? <FaCheck /> : <FaXmark />}</td>
                <td>${+p.price}</td>
                <td>{p.quantity}</td>
                <th>
                  <ActionsDropdown
                    onUpdate={() =>
                      router.push(`/${p.shopId}/products/${p.id}`)
                    }
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
          No products found. <br />
          {products.length == 0 &&
            'Create one by using the "Add new" button above.'}
        </p>
      )}
    </div>
  );
};

export default ProductsList;
