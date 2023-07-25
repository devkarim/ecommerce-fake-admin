'use client';

import React from 'react';

import { cls } from '@/lib/utils';

interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder?: string;
  options: string[];
  parentClassName?: string;
  full?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      placeholder,
      options,
      parentClassName,
      className,
      full,
      ...selectProps
    },
    ref
  ) => {
    return (
      <div className={cls('w-full max-w-sm', { 'max-w-none': full })}>
        {label && (
          <label className="label">
            <span className="text-sm sm:text-base font-semibold">{label}</span>
          </label>
        )}
        <select
          ref={ref}
          className="select select-bordered w-full"
          {...selectProps}
        >
          {placeholder && (
            <option disabled selected>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
