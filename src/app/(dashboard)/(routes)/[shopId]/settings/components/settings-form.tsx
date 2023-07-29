'use client';

import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { cls } from '@/lib/utils';
import { updateShopSchema, UpdateShopSchema } from '@/schemas/shopSchema';
import { updateShop } from '@/services/shops';
import Checkbox from '@/components/ui/checkbox';

interface SettingsFormProps {
  id: number;
  name: string;
  isFeatured: boolean;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  id,
  name,
  isFeatured = false,
}) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateShopSchema>({
    resolver: zodResolver(updateShopSchema),
    defaultValues: {
      name,
      isFeatured,
    },
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async (values: UpdateShopSchema) => {
    setLoading(true);
    const { name, isFeatured } = values;
    console.log(isFeatured);
    try {
      await updateShop(id, name, isFeatured);
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

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return (
    <form className="pt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control max-w-md">
        <div className="flex flex-col space-y-8">
          <div>
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
            </div>
          </div>
          {errors.name && (
            <label className="label">
              <span className="label-text-alt text-error font-medium">
                {errors.name.message}
              </span>
            </label>
          )}
          <Checkbox
            label="Featured?"
            parentClassName="max-w-none sm:max-w-xs"
            description="This shop will be shown to users on home page."
            disabled={loading}
            {...register('isFeatured')}
          />
          <button
            disabled={loading}
            className="btn btn-neutral sm:max-w-xs text-sm sm:text-base"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default SettingsForm;
