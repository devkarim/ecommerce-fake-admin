'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Modal from '@/components/ui/modal';
import useShopModal from '@/hooks/useShopModal';
import { cls } from '@/lib/utils';
import { useEffect } from 'react';

interface CreateShopModalProps {}

const createShopFormSchema = z.object({
  name: z.string().min(3, 'Shop name must be at least 3 characters long.'),
});

type CreateShopFormSchema = z.infer<typeof createShopFormSchema>;

const CreateShopModal: React.FC<CreateShopModalProps> = ({}) => {
  const shopModal = useShopModal();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateShopFormSchema>({
    resolver: zodResolver(createShopFormSchema),
    defaultValues: {
      name: '',
    },
    reValidateMode: 'onSubmit',
  });

  const onCreate = async (values: CreateShopFormSchema) => {
    console.log(values);
  };

  const onClose = () => {
    reset();
    shopModal.onClose();
  };

  return (
    <Modal
      isOpen={shopModal.isOpen}
      title="Create a new shop"
      subtitle="Seamlessly connect your shop to our thriving marketplace."
      primaryActionLabel="Create"
      onPrimaryAction={handleSubmit(onCreate)}
      secondaryActionLabel="Close"
      onSecondaryAction={onClose}
    >
      <form className="pt-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your shop name here"
            className={cls('input input-bordered w-full', {
              'input-error': !!errors.name,
            })}
            {...register('name')}
          />
          {errors.name && (
            <label className="label">
              <span className="label-text-alt text-error font-medium">
                {errors.name.message}
              </span>
            </label>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default CreateShopModal;
