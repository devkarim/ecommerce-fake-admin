'use client';

import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  createProductSchema,
  CreateProductSchema,
} from '@/schemas/productSchema';
import Input from '@/components/ui/input';
import Checkbox from '@/components/ui/checkbox';

interface ProductsFormProps {
  shopId: number;
  productId?: number;
  name?: string;
  mode?: 'Create' | 'Edit';
}

const ProductsForm: React.FC<ProductsFormProps> = ({
  shopId,
  productId,
  name = '',
  mode = 'Create',
}) => {
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name,
      isArchived: false,
      isFeatured: false,
      price: 0,
      quantity: 0,
    },
    reValidateMode: 'onSubmit',
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
      </div>
      <button className="btn btn-primary sm:h-14 text-lg" disabled={loading}>
        {mode} product
      </button>
    </form>
  );
};

export default ProductsForm;
