'use client';

import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { OrderWithCount } from '@/types/db';

interface OrdersListProps {
  orders: OrderWithCount[];
  numOfOrders?: number;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, numOfOrders }) => {
  const [query, setQuery] = useState('');
  const [filteredOrders, setFilteredOrders] =
    useState<OrderWithCount[]>(orders);
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const page = +(params.get('page') ?? 1);
  const numOfPages = Math.ceil((numOfOrders ?? 0) / 5);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

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
      {filteredOrders.length != 0 ? (
        <table className="overflow-x-auto table">
          {/* head */}
          <thead>
            <tr className="border-[1px] border-neutral">
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Invoice ID</th>
              <th>isPaid</th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id} className="border-[1px] border-neutral">
                <td>
                  {o.firstName} {o.lastName}
                </td>
                <td>{o.email}</td>
                <td>{o.phone}</td>
                <td>{o.invoiceId}</td>
                <td>{o.isPaid ? <FaCheck /> : <FaXmark />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center opacity-60 py-12">
          No orders found. <br />
          {orders.length == 0 &&
            'Create one by using the "Add new" button above.'}
        </p>
      )}
      <div className="join flex justify-center">
        <button
          className="join-item btn"
          disabled={page <= 1}
          onClick={() => {
            router.push(pathname + `?page=${page - 1}`);
            router.refresh();
          }}
        >
          «
        </button>
        <button className="join-item btn">Page {page}</button>
        <button
          className="join-item btn"
          disabled={page >= numOfPages}
          onClick={() => {
            router.push(pathname + `?page=${page + 1}`);
            router.refresh();
          }}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default OrdersList;
