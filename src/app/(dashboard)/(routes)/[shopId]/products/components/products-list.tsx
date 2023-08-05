'use client';

import qs from 'query-string';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { useRouter, useSearchParams } from 'next/navigation';

import { Product } from '@prisma/client';

import ActionsDropdown from '@/components/ui/update-dropdown';
import { deleteProduct } from '@/services/shops';

interface ProductsListProps {
  products: Product[];
  numOfProducts?: number;
}

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  numOfProducts,
}) => {
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = +(searchParams.get('page') ?? 1);
  const numOfPages = Math.ceil((numOfProducts ?? 0) / 5);

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

  const setQuery = (q: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      q,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true }
    );

    router.push(url);
    router.refresh();
  };

  const goPage = (page: number) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      page,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <div className="space-y-12">
      <input
        id="query"
        type="text"
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
      <div className="join flex justify-center">
        <button
          className="join-item btn"
          disabled={page <= 1}
          onClick={() => goPage(page - 1)}
        >
          «
        </button>
        <button className="join-item btn">Page {page}</button>
        <button
          className="join-item btn"
          disabled={page >= numOfPages}
          onClick={() => goPage(page + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default ProductsList;
