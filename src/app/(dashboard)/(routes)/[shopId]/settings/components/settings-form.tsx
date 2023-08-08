'use client';

import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { cls } from '@/lib/utils';
import { updateShop } from '@/services/shops';
import Checkbox from '@/components/ui/checkbox';
import ImageUpload from '@/components/ui/image-upload';
import { updateShopSchema, UpdateShopSchema } from '@/schemas/shopSchema';
import Input from '@/components/ui/input';
import { FRONTEND_URL } from '@/config/constants';
import { FaCopy } from 'react-icons/fa';

interface SettingsFormProps {
  id: number;
  name: string;
  imageUrl: string;
  isFeatured: boolean;
  billboardImageUrl?: string | null;
  billboardCaption?: string | null;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  id,
  name,
  imageUrl,
  isFeatured = false,
  billboardImageUrl,
  billboardCaption,
}) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<UpdateShopSchema>({
    resolver: zodResolver(updateShopSchema),
    defaultValues: {
      name,
      imageUrl,
      isFeatured,
      billboardImageUrl,
      billboardCaption,
    },
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async (values: UpdateShopSchema) => {
    setLoading(true);
    const { name, imageUrl, isFeatured, billboardCaption, billboardImageUrl } =
      values;
    try {
      await updateShop(
        id,
        name,
        imageUrl,
        isFeatured,
        billboardCaption,
        billboardImageUrl
      );
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
          <h3 className="text-xl lg:text-3xl font-medium">Shop Information</h3>
          <div className="flex flex-wrap lg:flex-nowrap gap-4">
            <Input
              id="shopId"
              type="text"
              label="Shop ID"
              className="w-96 cursor-pointer input-disabled"
              onClick={() => {
                toast.success('Copied to clipboard');
                navigator.clipboard.writeText(id.toString());
              }}
              value={id}
            />
            <Input
              id="url"
              type="text"
              label="Shop URL"
              value={`${FRONTEND_URL}/shop/${id}`}
              className="w-96 cursor-pointer input-disabled"
              onClick={() => {
                toast.success('Copied to clipboard');
                navigator.clipboard.writeText(`${FRONTEND_URL}/shop/${id}`);
              }}
              right={<FaCopy className="cursor-pointer text-lg h-full" />}
            />
          </div>
          <h3 className="text-xl lg:text-3xl font-medium">General</h3>
          <Controller
            name="imageUrl"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <>
                <ImageUpload
                  options={{ maxFiles: 1 }}
                  images={field.value ? [field.value] : []}
                  disabled={loading}
                  onUpload={(url) => {
                    field.onChange(url);
                  }}
                  onRemove={(_) => field.onChange('')}
                />
                <p className="mt-2 text-error">{error?.message}</p>
              </>
            )}
          />
          <Input
            id="name"
            type="text"
            label="Shop name"
            placeholder="Your shop name here"
            disabled={loading}
            error={errors.name?.message}
            {...register('name')}
          />
          <Checkbox
            label="Featured"
            parentClassName="max-w-none sm:max-w-xs"
            description="This shop will be shown to users on home page."
            disabled={loading}
            {...register('isFeatured')}
          />
          <h3 className="text-xl lg:text-3xl font-medium">Billboard</h3>
          <Input
            id="billboardCaption"
            type="text"
            placeholder="Your billboard caption here"
            disabled={loading}
            error={errors.billboardCaption?.message}
            {...register('billboardCaption')}
          />
          <Controller
            name="billboardImageUrl"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <>
                <ImageUpload
                  options={{ maxFiles: 1 }}
                  images={field.value ? [field.value] : []}
                  disabled={loading}
                  onUpload={(url) => {
                    field.onChange(url);
                  }}
                  onRemove={(_) => field.onChange('')}
                />
                <p className="mt-2 text-error">{error?.message}</p>
              </>
            )}
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
