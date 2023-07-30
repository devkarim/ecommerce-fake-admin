'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Property, PropertyType } from '@prisma/client';

import Input from '../ui/input';
import Modal from '../ui/modal';
import {
  addProductPropertySchema,
  AddProductPropertySchema,
} from '@/schemas/productSchema';
import Select from '../ui/select';

interface AddProductPropertyModalProps {
  isOpen?: boolean;
  onAdd: (values: AddProductPropertySchema) => void;
  onClose?: () => void;
  disabled?: boolean;
  props: Property[];
}

const AddProductPropertyModal: React.FC<AddProductPropertyModalProps> = ({
  isOpen,
  onAdd,
  onClose,
  props,
  disabled,
}) => {
  const [currentProp, setCurrentProperty] = useState<Property>(props[0]);

  const {
    handleSubmit,
    register,
    unregister,
    setValue,
    formState: { errors },
  } = useForm<AddProductPropertySchema>({
    resolver: zodResolver(addProductPropertySchema),
    defaultValues: {
      id: currentProp?.id,
      name: currentProp?.name,
      value: '',
    },
  });

  const onPropertyChange = (name: string) => {
    const prop = props.find((p) => p.name == name);
    if (!prop) return;
    setCurrentProperty(prop);
  };

  useEffect(() => {
    unregister('value');
    if (currentProp?.type == PropertyType.FixedValues) {
      setValue('value', currentProp?.values[0]);
    } else if (currentProp?.type == PropertyType.Text) {
      setValue('value', '');
    } else {
      setValue('value', 0);
    }
    setValue('id', currentProp?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProp, isOpen]);

  if (props.length == 0) return null;

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      title="Add Property"
      subtitle="Add property to your product"
      primaryActionLabel="Add"
      onPrimaryAction={handleSubmit(onAdd)}
      secondaryActionLabel="Close"
      onSecondaryAction={onClose}
      disabled={disabled}
      className="max-w-2xl"
    >
      <form className="pt-4 space-y-6">
        <Select
          options={props.map((p) => p.name)}
          label="Property Name"
          full
          {...register('name', {
            onChange: (e) => onPropertyChange(e.target.value),
          })}
        />
        {currentProp.type == PropertyType.FixedValues ? (
          <Select
            options={currentProp.values}
            label="Property Value"
            full
            {...register('value')}
          />
        ) : (
          <Input
            id="value"
            type={currentProp.type == PropertyType.Text ? 'text' : 'number'}
            step={currentProp.type == PropertyType.Decimal ? 0.001 : 1}
            label="Property Value"
            placeholder="Your propery value here"
            disabled={disabled}
            error={errors.value?.message}
            full
            {...register('value', {
              valueAsNumber: currentProp.type != PropertyType.Text,
            })}
          />
        )}
      </form>
    </Modal>
  );
};

export default AddProductPropertyModal;
