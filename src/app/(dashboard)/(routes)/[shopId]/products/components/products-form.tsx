'use client';

import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { FaXmark } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Property } from '@prisma/client';

import {
  AddProductPropertySchema,
  createProductSchema,
  CreateProductSchema,
} from '@/schemas/productSchema';
import Input from '@/components/ui/input';
import Checkbox from '@/components/ui/checkbox';
import ImageUpload from '@/components/ui/image-upload';
import AddProductPropertyModal from '@/components/modals/add-product-prop-modal';
import { createProduct, editProduct } from '@/services/shops';

type PropValues = { id: number; name: string; value: string | number }[];

interface ProductsFormProps {
  shopId: number;
  productId?: number;
  name?: string;
  mode?: 'Create' | 'Edit';
  isArchived?: boolean;
  isFeatured?: boolean;
  price?: number;
  quantity?: number;
  discount?: number;
  images?: string[];
  props?: PropValues;
  shopProps: Property[];
}

const ProductsForm: React.FC<ProductsFormProps> = ({
  shopId,
  productId,
  name = '',
  isArchived = false,
  isFeatured = false,
  price = 0,
  quantity = 0,
  discount = 0,
  images = [],
  mode = 'Create',
  props,
  shopProps,
}) => {
  const [currentProps, setCurrentProps] = useState<PropValues>(props || []);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  const {
    handleSubmit,
    register,
    control,
    setValue,
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
      props,
      discount,
    },
  });

  const onAddProperty = ({ id, name, value }: AddProductPropertySchema) => {
    const newProps = [...currentProps, { id, name, value }];
    setCurrentProps(newProps);
    setValue('props', newProps);
    setModalOpen(false);
  };

  const onSubmit = async (formData: CreateProductSchema) => {
    setLoading(true);
    try {
      if (mode == 'Create') {
        await createProduct(shopId, formData);
        toast.success('Product added successfully!');
      } else {
        if (!productId) return toast.error('No product ID found.');
        await editProduct(shopId, productId, formData);
        toast.success('Product updated successfully!');
      }
      router.refresh();
      router.push(`/${shopId}/products`);
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

  const onRemoveProperty = (i: number) => {
    setCurrentProps((prev) => prev.filter((_, index) => index != i));
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AddProductPropertyModal
        isOpen={isModalOpen}
        onAdd={onAddProperty}
        onClose={() => setModalOpen(false)}
        props={shopProps}
      />
      <div className="space-y-12">
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
            <Input
              id="discount"
              type="number"
              label="Discount"
              placeholder="Your product discount here"
              disabled={loading}
              error={errors.discount?.message}
              {...register('discount', { valueAsNumber: true })}
            />
          </div>
          {/* Archived & Featured */}
          <div className="flex flex-col sm:flex-row gap-8">
            <Checkbox
              label="Featured"
              disabled={loading}
              description="This product will be shown to users on home page."
              {...register('isFeatured')}
            />
            <Checkbox
              label="Archived"
              description="This product will be hidden on the website."
              disabled={loading}
              {...register('isArchived')}
            />
          </div>
          {/* Props */}
          <div className="space-y-4">
            {currentProps.length != 0 && (
              <div className="flex flex-wrap gap-4">
                {currentProps.map((p, index) => (
                  <div
                    key={p.id}
                    className="relative flex items-center border border-neutral p-4 space-x-2"
                  >
                    <p className="font-medium text-primary">{p.name}:</p>
                    <p>{p.value}</p>
                    <button
                      className="absolute -top-2 -right-2 cursor-pointer btn btn-circle btn-xs btn-error"
                      disabled={loading}
                      onClick={(e) => {
                        e.preventDefault();
                        onRemoveProperty(index);
                      }}
                    >
                      <FaXmark />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              className="btn btn-neutral"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                if (shopProps.length == 0)
                  return toast.error(
                    'You have no properties added in your shop.'
                  );
                setModalOpen(true);
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
      </div>
    </form>
  );
};

export default ProductsForm;
