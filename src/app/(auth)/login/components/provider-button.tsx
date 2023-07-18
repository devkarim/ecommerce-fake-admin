'use client';

interface ProviderButtonProps {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const ProviderButton: React.FC<ProviderButtonProps> = ({
  name,
  icon,
  onClick,
}) => {
  return (
    <button
      className="btn btn-outline w-full text-base lg:text-lg font-normal"
      onClick={onClick}
    >
      {icon} Continue with {name}
    </button>
  );
};

export default ProviderButton;
