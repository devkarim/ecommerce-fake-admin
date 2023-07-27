'use client';

import { useState } from 'react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

import { Product } from '@prisma/client';

import ActionsDropdown from '@/components/ui/update-dropdown';
import { deleteProduct } from '@/services/shops';

interface ProductsListProps {
  products: Product[];
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const router = useRouter();

  const onDelete = async (shopId: number, productId: number) => {
    setLoading(true);
    try {
      await deleteProduct(shopId, productId);
      toast.success('Product deleted successfully!');
      router.refresh();
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data.message) {
        toast.error(err.response?.data.message);
      } else {
        toast.error(`Unable to delete product.`);
      }
    } finally {
      setLoading(false);
    }
  };

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
                    onDelete={() => onDelete(p.shopId, p.id)}
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
