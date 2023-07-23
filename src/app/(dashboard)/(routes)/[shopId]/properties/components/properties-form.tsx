'use client';

import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { PropertyType } from '@prisma/client';

import {
  createPropertySchema,
  CreatePropertySchema,
} from '@/schemas/propertySchema';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import MultiInput from '@/components/ui/multi-input';
import { createProperty, editProperty } from '@/services/shops';

interface PropertiesFormProps {
  shopId: number;
  propertyId?: number;
  name?: string;
  type?: PropertyType;
  mode?: 'Create' | 'Edit';
  defaultValues?: string[];
}

const PropertiesForm: React.FC<PropertiesFormProps> = ({
  shopId,
  propertyId,
  name = '',
  type = PropertyType.FixedValues,
  mode = 'Create',
  defaultValues = [''],
}) => {
  const [currentType, setCurrentType] = useState<PropertyType>(type);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [values, setValues] = useState<string[]>(['']);

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreatePropertySchema>({
    resolver: zodResolver(createPropertySchema),
    defaultValues: {
      name,
      type,
    },
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async (formData: CreatePropertySchema) => {
    const { name, type } = formData;
    // Check if property type is fixed values and if so, check if any property was added
    if (
      currentType == PropertyType.FixedValues &&
      (values.length == 0 || values[0].length < 1)
    ) {
      toast.error('At least one property must be added.');
      return;
    }
    setLoading(true);
    try {
      if (mode == 'Create') {
        await createProperty(shopId, name, type, values);
        toast.success('Property added successfully!');
      } else {
        if (!propertyId) return toast.error('No property ID found.');
        await editProperty(propertyId, shopId, name, type, values);
        toast.success('Property updated successfully!');
      }
      router.refresh();
      router.push(`/${shopId}/properties`);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data.message) {
        toast.error(err.response?.data.message);
      } else {
        toast.error(`Unable to ${mode.toLowerCase()} property.`);
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
            placeholder="Your property name here"
            disabled={loading}
            error={errors.name?.message}
            {...register('name')}
          />
          <Select
            id="type"
            label="Property type"
            options={Object.values(PropertyType)}
            disabled={loading}
            {...register('type', {
              onChange: (e) => setCurrentType(e.target.value),
            })}
          />
        </div>
        {currentType == PropertyType.FixedValues && (
          <MultiInput
            id="values"
            type="text"
            label="Values"
            defaultValues={defaultValues}
            placeholder="Add value"
            disabled={loading}
            onValuesChange={(values) => setValues(values.filter(Boolean))} // Remove empty strings
          />
        )}
      </div>
      <button className="btn btn-primary sm:h-14 text-lg" disabled={loading}>
        {mode} property
      </button>
    </form>
  );
};

export default PropertiesForm;
