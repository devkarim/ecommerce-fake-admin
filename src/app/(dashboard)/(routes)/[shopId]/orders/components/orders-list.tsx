'use client';

import qs from 'query-string';
import { FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { useRouter, useSearchParams } from 'next/navigation';

import { Order } from '@prisma/client';

interface OrdersListProps {
  orders: Order[];
  numOfOrders?: number;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, numOfOrders }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = +(searchParams.get('page') ?? 1);
  const numOfPages = Math.ceil((numOfOrders ?? 0) / 10);

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

  return (
    <div className="space-y-12">
      <input
        id="query"
        type="text"
        defaultValue={searchParams.get('q') ?? ''}
        placeholder="Search"
        className="input input-bordered w-full max-w-sm"
        onBlur={(e) => setQuery(e.target.value)}
      />
      {orders.length != 0 ? (
        <table className="overflow-x-auto table">
          {/* head */}
          <thead>
            <tr className="border-[1px] border-neutral">
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Invoice ID</th>
              <th>isPaid</th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-[1px] border-neutral">
                <td>{o.firstName}</td>
                <td>{o.lastName}</td>
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

export default OrdersList;
