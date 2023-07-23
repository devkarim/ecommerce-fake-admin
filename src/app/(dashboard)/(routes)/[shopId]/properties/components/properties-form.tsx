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

  const onSubmit = (values: CreatePropertySchema) => {
    console.log(values);
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
          />
        )}
      </div>
      <button className="btn btn-neutral">{action}</button>
    </form>
  );
};

export default PropertiesForm;
