'use client';

import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  createProductSchema,
  CreateProductSchema,
} from '@/schemas/productSchema';
import Input from '@/components/ui/input';
import Checkbox from '@/components/ui/checkbox';
import ImageUpload from '@/components/ui/image-upload';
import { FaPlus } from 'react-icons/fa';

interface ProductsFormProps {
  shopId: number;
  productId?: number;
  name?: string;
  mode?: 'Create' | 'Edit';
  isArchived?: boolean;
  isFeatured?: boolean;
  price?: number;
  quantity?: number;
  images?: string[];
}

const ProductsForm: React.FC<ProductsFormProps> = ({
  shopId,
  productId,
  name = '',
  isArchived = false,
  isFeatured = false,
  price = 0,
  quantity = 0,
  images = [],
  mode = 'Create',
}) => {
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name,
      isArchived,
      isFeatured,
      price,
      quantity,
      images,
    },
  });

  const onSubmit = async (formData: CreateProductSchema) => {
    setLoading(true);
    console.log(formData);
    try {
      if (mode == 'Create') {
        toast.success('Product added successfully!');
      } else {
        if (!productId) return toast.error('No product ID found.');
        toast.success('Product updated successfully!');
      }
      // router.refresh();
      // router.push(`/${shopId}/products`);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data.message) {
        toast.error(err.response?.data.message);
      } else {
        toast.error(`Unable to ${mode.toLowerCase()} product.`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      <div className="space-y-12">
        {/* Images */}
        <div>
          <Controller
            name="images"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <>
                <ImageUpload
                  images={field.value}
                  disabled={loading}
                  onUpload={(url) => {
                    console.log(url);
                    field.onChange([...field.value, url]);
                  }}
                  onRemove={(url) =>
                    field.onChange(
                      field.value.filter((current) => current !== url)
                    )
                  }
                />
                <p className="mt-2 text-error">{error?.message}</p>
              </>
            )}
          />
        </div>
        {/* Inputs */}
        <div className="flex flex-wrap items-center gap-8 sm:gap-12">
          <Input
            id="name"
            type="text"
            label="Name"
            placeholder="Your product name here"
            disabled={loading}
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            id="price"
            type="number"
            step="0.001"
            label="Price"
            placeholder="Your product price here"
            disabled={loading}
            error={errors.price?.message}
            {...register('price', { valueAsNumber: true })}
          />
          <Input
            id="quantity"
            type="number"
            label="Quantity"
            placeholder="Your product quantity here"
            disabled={loading}
            error={errors.quantity?.message}
            {...register('quantity', { valueAsNumber: true })}
          />
        </div>
        {/* Archived & Featured */}
        <div className="flex flex-col sm:flex-row gap-8">
          <Checkbox
            label="Featured"
            description="This product will be shown to users on home page."
            {...register('isArchived')}
          />
          <Checkbox
            label="Archived"
            description="This product will be hidden on the website."
            {...register('isFeatured')}
          />
        </div>
        {/* Props */}
        <div>
          <button
            className="btn btn-neutral"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <FaPlus />
            Add property
          </button>
        </div>
      </div>
      <button className="btn btn-primary sm:h-14 text-lg" disabled={loading}>
        {mode} product
      </button>
    </form>
  );
};

export default ProductsForm;
