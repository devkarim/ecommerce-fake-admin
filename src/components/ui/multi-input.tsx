'use client';

import { FaXmark } from 'react-icons/fa6';
import { FaPlus, FaTrash } from 'react-icons/fa';

import Input, { InputProps } from './input';
import { useEffect, useState } from 'react';

interface MultiInputProps extends InputProps {
  label?: string;
  onValuesChange?: (values: string[]) => void;
  defaultValues?: string[];
}

const MultiInput: React.FC<MultiInputProps> = ({
  label,
  className,
  disabled,
  onValuesChange,
  defaultValues = [''],
  ...inputProps
}) => {
  const [values, setValues] = useState<string[]>(defaultValues);

  const addValue = () => {
    setValues([...values, '']);
  };

  const updateValue = (i: number, value: string) => {
    setValues((prev) => {
      let newValues = [...prev];
      newValues[i] = value;
      return newValues;
    });
  };

  const removeValue = (i: number) => {
    if (values.length <= 1) return setValues(['']);
    setValues((prev) => prev.filter((_, index) => index != i));
  };

  const clearValues = () => {
    setValues(['']);
  };

  useEffect(() => {
    onValuesChange && onValuesChange(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <div>
      <div className="max-h-80 overflow-y-auto">
        {label && (
          <label className="label">
            <span className="text-sm sm:text-base font-semibold">{label}</span>
          </label>
        )}
        <div className="flex flex-wrap gap-8 sm:gap-12">
          {values.map((v, index) => (
            <Input
              key={index}
              onChange={(e) => updateValue(index, e.target.value)}
              value={v}
              disabled={disabled}
              className="focus:-outline-offset-4"
              right={
                <FaXmark
                  className="cursor-pointer text-2xl"
                  onClick={() => removeValue(index)}
                />
              }
              {...inputProps}
            />
          ))}
        </div>
      </div>
      <div className="space-x-4">
        <button
          className="mt-6 btn btn-neutral"
          type="button"
          disabled={disabled}
          onClick={addValue}
        >
          <FaPlus /> Add new
        </button>
        <button
          className="mt-6 btn btn-error"
          type="button"
          disabled={disabled}
          onClick={clearValues}
        >
          <FaTrash /> Clear
        </button>
      </div>
    </div>
  );
};

export default MultiInput;
