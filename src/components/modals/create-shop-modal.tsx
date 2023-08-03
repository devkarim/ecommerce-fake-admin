'use client';

import { useState } from 'react';
import { AxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { cls } from '@/lib/utils';
import Checkbox from '../ui/checkbox';
import Modal from '@/components/ui/modal';
import ImageUpload from '../ui/image-upload';
import { createShop } from '@/services/shops';
import useShopModal from '@/hooks/useShopModal';
import { createShopSchema, CreateShopSchema } from '@/schemas/shopSchema';
import Input from '../ui/input';

interface CreateShopModalProps {}

const CreateShopModal: React.FC<CreateShopModalProps> = ({}) => {
  const router = useRouter();
  const shopModal = useShopModal();

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateShopSchema>({
    resolver: zodResolver(createShopSchema),
    defaultValues: {
      name: '',
      isFeatured: false,
    },
  });

  const onCreate = async (values: CreateShopSchema) => {
    setLoading(true);
    const { name, isFeatured, imageUrl } = values;
    try {
      const { data: shop } = await createShop(name, imageUrl, isFeatured);
      if (shop.success) {
        router.refresh();
        router.push(`/${shop.data.id}`);
      } else {
        toast.error(shop.message);
      }
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
      onOuterClick={shopModal.onClose}
      title="Create a new shop"
      subtitle="Seamlessly connect your shop to our thriving marketplace."
      primaryActionLabel="Create"
      onPrimaryAction={handleSubmit(onCreate)}
      secondaryActionLabel="Close"
      onSecondaryAction={onClose}
      disabled={loading}
    >
      <form className="pt-4 space-y-8">
        {/* Image */}
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
        {/* Name */}
        <div className="form-control w-full">
          <Input
            id="name"
            type="text"
            label="Shop name"
            parentClassName="max-w-none"
            placeholder="Your shop name here"
            error={errors.name?.message}
            disabled={loading}
            {...register('name')}
          />
        </div>
        {/* Featured */}
        <Checkbox
          label="Featured"
          parentClassName="max-w-none w-full"
          description="This shop will be shown to users on home page."
          disabled={loading}
          {...register('isFeatured')}
        />
      </form>
    </Modal>
  );
};

export default CreateShopModal;
