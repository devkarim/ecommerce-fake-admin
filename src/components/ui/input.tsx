'use client';

import React from 'react';

import { cls } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  right?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, right, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="label">
            <span className="text-sm sm:text-base font-semibold">{label}</span>
          </label>
        )}
        <div className="relative w-fit">
          <input
            className={cls(
              'input input-bordered w-full',
              {
                'input-error': !!error,
              },
              className
            )}
            ref={ref}
            {...props}
          />
          <span className="absolute right-4 top-3">{right}</span>
        </div>
        {error && (
          <label className="label">
            <span className="label-text-alt text-error font-medium">
              {error}
            </span>
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
