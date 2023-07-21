'use client';

import { useState } from 'react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import Container from '@/components/ui/container';
import { deleteShop } from '@/services/shops';

interface DangerZoneProps {
  id: number;
}

const DangerZone: React.FC<DangerZoneProps> = ({ id }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    try {
      await deleteShop(id);
      router.refresh();
      toast.success('Shop deleted.');
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data.message) {
        toast.error(err.response?.data.message);
      } else {
        toast.error('Unable to create a new shop');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="border-b border-neutral space-y-6">
      <h3 className="text-2xl lg:text-3xl text-error font-medium">
        Danger Zone
      </h3>
      <div className="space-y-1">
        <p className="lg:text-xl font-semibold">Delete this shop</p>
        <p className="text-sm lg:text-base opacity-60">
          By deleting this shop, you will lose everything including shop’s
          products, properties, and orders.
        </p>
      </div>
      <button className="btn btn-outline btn-lg btn-error" onClick={onDelete}>
        Delete this shop
      </button>
    </Container>
  );
};

export default DangerZone;
