'use client';

import { useState } from 'react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import Modal from '@/components/ui/modal';
import useShopModal from '@/hooks/useShopModal';
import { cls } from '@/lib/utils';
import { createShopSchema, CreateShopSchema } from '@/schemas/shopSchema';
import { createShop } from '@/services/shops';

interface CreateShopModalProps {}

const CreateShopModal: React.FC<CreateShopModalProps> = ({}) => {
  const router = useRouter();
  const shopModal = useShopModal();

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateShopSchema>({
    resolver: zodResolver(createShopSchema),
    defaultValues: {
      name: '',
    },
    reValidateMode: 'onSubmit',
  });

  const onCreate = async (values: CreateShopSchema) => {
    setLoading(true);
    const { name } = values;
    try {
      const {
        data: { shop },
      } = await createShop(name);
      router.push(`/${shop.id}`);
      onClose();
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

  const onClose = () => {
    reset();
    shopModal.onClose();
  };

  return (
    <Modal
      isOpen={shopModal.isOpen}
      title="Create a new shop"
      subtitle="Seamlessly connect your shop to our thriving marketplace."
      primaryActionLabel="Create"
      onPrimaryAction={handleSubmit(onCreate)}
      secondaryActionLabel="Close"
      onSecondaryAction={onClose}
      disabled={loading}
    >
      <form className="pt-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your shop name here"
            className={cls('input input-bordered w-full', {
              'input-error': !!errors.name,
            })}
            disabled={loading}
            {...register('name')}
          />
          {errors.name && (
            <label className="label">
              <span className="label-text-alt text-error font-medium">
                {errors.name.message}
              </span>
            </label>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default CreateShopModal;
