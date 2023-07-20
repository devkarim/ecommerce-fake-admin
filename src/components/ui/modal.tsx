'use client';

interface ModalProps {
  title: string;
  subtitle?: string;
  isOpen?: boolean;
  children?: React.ReactNode;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  subtitle,
  isOpen,
  children,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute flex w-full h-full justify-center items-center bg-base-100/60 backdrop-blur-sm z-[50]">
      <div className="card w-full max-w-xl bg-base-100 shadow-xl p-4">
        <div className="card-body space-y-8">
          <div className="space-y-2">
            <h2 className="card-title text-2xl lg:text-3xl">{title}</h2>
            {subtitle && (
              <p className="text-sm text-base-content/50">{subtitle}</p>
            )}
            {children}
          </div>
          <div className="card-actions flex items-center justify-end">
            {secondaryActionLabel && (
              <button
                className="btn btn-outline text-base font-normal"
                onClick={onSecondaryAction}
              >
                {secondaryActionLabel}
              </button>
            )}
            {primaryActionLabel && (
              <button
                className="btn btn-primary px-12 text-base font-normal"
                onClick={onPrimaryAction}
              >
                {primaryActionLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
