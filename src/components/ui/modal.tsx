'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { cls } from '@/lib/utils';

interface ModalProps {
  title: string;
  subtitle?: string;
  isOpen?: boolean;
  onClose: () => void;
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
  onClose,
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
    <Transition show={isOpen} appear as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        open={isOpen}
        onClose={onClose}
      >
        <div
          className="fixed inset-0 bg-base-100/60 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div
          className={cls('fixed inset-0 overflow-y-auto', parentClassName)}
          onClick={(e) => {
            if (disabled) return;
            if (e.target == e.currentTarget) {
              onOuterClick && onOuterClick();
            }
          }}
        >
          <div className="left-0 flex w-full min-h-full justify-center items-center p-4 overflow-y-auto">
            <Dialog.Panel
              className={cls(
                'card w-full max-w-xl bg-base-200 shadow-xl p-2',
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
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
