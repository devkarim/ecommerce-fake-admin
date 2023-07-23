'use client';

import { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { cls } from '@/lib/utils';
import { updateShopSchema, UpdateShopSchema } from '@/schemas/shopSchema';
import { updateShop } from '@/services/shops';

interface SettingsFormProps {
  id: number;
  name: string;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ id, name }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateShopSchema>({
    resolver: zodResolver(updateShopSchema),
    defaultValues: {
      name,
    },
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async (values: UpdateShopSchema) => {
    setLoading(true);
    const { name } = values;
    try {
      await updateShop(id, name);
      router.refresh();
      toast.success('Shop updated successfully!');
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data.message) {
        toast.error(err.response?.data.message);
      } else {
        toast.error('Unable to update shop');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="pt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control max-w-md">
        <label className="label">
          <span className="text-sm sm:text-base font-semibold">Name</span>
        </label>
        <div className="flex space-x-4">
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
          <button
            disabled={loading}
            className="btn btn-neutral w-24 sm:w-32 text-sm sm:text-base"
          >
            Rename
          </button>
        </div>
        {errors.name && (
          <label className="label">
            <span className="label-text-alt text-error font-medium">
              {errors.name.message}
            </span>
          </label>
        )}
      </div>
    </form>
  );
};

export default SettingsForm;
