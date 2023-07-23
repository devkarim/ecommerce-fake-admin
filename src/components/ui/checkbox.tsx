import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className, ...props }, ref) => {
    return (
      <div className="border border-neutral rounded-lg p-8 max-w-xs space-y-2">
        <label className="label justify-start cursor-pointer space-x-4">
          <input ref={ref} type="checkbox" className="checkbox" {...props} />
          <span className="text-sm sm:text-base font-semibold">{label}</span>
        </label>
        <p className="text-sm opacity-60">{description}</p>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
