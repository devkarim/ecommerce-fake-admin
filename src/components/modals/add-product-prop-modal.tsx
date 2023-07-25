import Modal from '../ui/modal';

interface AddProductPropertyModalProps {
  isOpen?: boolean;
  onOuterClick?: () => void;
}

const AddProductPropertyModal: React.FC<AddProductPropertyModalProps> = ({
  isOpen,
  onOuterClick,
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      title="Add Property"
      subtitle="Add property to your product"
      isOpen={isOpen}
      onOuterClick={onOuterClick}
    ></Modal>
  );
};

export default AddProductPropertyModal;
