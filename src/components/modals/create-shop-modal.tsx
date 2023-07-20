'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';

import Modal from '@/components/ui/modal';
import useShopModal from '@/hooks/useShopModal';

interface CreateShopModalProps {}

const formSchema = z.object({
  name: z.string().min(3),
});

const CreateShopModal: React.FC<CreateShopModalProps> = ({}) => {
  const shopModal = useShopModal();

  const onCreate = () => {};

  return (
    <Modal
      isOpen={shopModal.isOpen}
      title="Create a new shop"
      subtitle="Seamlessly connect your shop to our thriving marketplace."
      primaryActionLabel="Create"
      secondaryActionLabel="Close"
      onPrimaryAction={onCreate}
      onSecondaryAction={shopModal.onClose}
    ></Modal>
  );
};

export default CreateShopModal;
