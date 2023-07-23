'use client';

import React from 'react';

import { cls } from '@/lib/utils';

interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder?: string;
  options: string[];
  parentClassName?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, placeholder, options, parentClassName, className, ...selectProps },
    ref
  ) => {
    return (
      <div className={cls('min-w-[16rem]', parentClassName)}>
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
