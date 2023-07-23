'use client';

import { useState } from 'react';

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
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

interface PropertiesFormProps {
  name?: string;
  type?: PropertyType;
  action?: string;
}

const PropertiesForm: React.FC<PropertiesFormProps> = ({
  name = '',
  type = PropertyType.FixedValues,
  action = 'Create',
}) => {
  const [currentType, setCurrentType] = useState<PropertyType>(type);
  const [loading, setLoading] = useState(false);
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

  const onSubmit = (formData: CreatePropertySchema) => {
    const { name, type } = formData;
    if (currentType == PropertyType.FixedValues && values[0].length < 3) {
      toast.error('At least a property of 3 characters long must be added.');
      return;
    }
    setLoading(true);
    try {
      router.refresh();
      toast.success('Property added successfully!');
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data.message) {
        toast.error(err.response?.data.message);
      } else {
        toast.error('Unable to create property');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      <div className="space-y-8">
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
            placeholder="Add value"
            disabled={loading}
            onValuesChange={(values) => setValues(values)}
          />
        )}
      </div>
      <button className="btn btn-neutral">{action}</button>
    </form>
  );
};

export default PropertiesForm;
