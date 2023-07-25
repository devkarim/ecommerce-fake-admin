'use client';

import { cls } from '@/lib/utils';

interface ModalProps {
  title: string;
  subtitle?: string;
  isOpen?: boolean;
  children?: React.ReactNode;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  disabled?: boolean;
  onOuterClick?: () => void;
  parentClassName?: string;
  className?: string;
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
  disabled = false,
  onOuterClick,
  parentClassName,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={cls(
        'fixed top-0 left-0 flex w-full h-full justify-center items-center bg-base-100/60 p-4 backdrop-blur-sm z-[50]',
        parentClassName
      )}
      onClick={(e) => {
        if (disabled) return;
        if (e.target == e.currentTarget) {
          onOuterClick && onOuterClick();
        }
      }}
    >
      <div
        className={cls(
          'card w-full max-w-xl bg-base-200 shadow-xl p-2 disable-scroll',
          className
        )}
      >
        <div className="card-body space-y-8">
          <div className="space-y-1">
            <h2 className="card-title text-xl lg:text-2xl">{title}</h2>
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
                disabled={disabled}
              >
                {secondaryActionLabel}
              </button>
            )}
            {primaryActionLabel && (
              <button
                className="btn btn-primary sm:px-12 text-base font-normal"
                type="submit"
                onClick={onPrimaryAction}
                disabled={disabled}
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
