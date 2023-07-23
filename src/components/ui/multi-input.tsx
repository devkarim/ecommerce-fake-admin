'use client';

import { FaXmark } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa';

import Input, { InputProps } from './input';
import { useEffect, useState } from 'react';

interface MultiInputProps extends InputProps {
  label?: string;
  onValuesChange?: (values: string[]) => void;
}

const MultiInput: React.FC<MultiInputProps> = ({
  label,
  onValuesChange,
  ...inputProps
}) => {
  const [values, setValues] = useState<string[]>(['']);

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
    if (values.length <= 1) return;
    setValues((prev) => prev.filter((_, index) => index != i));
  };

  useEffect(() => {
    onValuesChange && onValuesChange(values);
  }, [onValuesChange, values]);

  return (
    <div className="max-h-80 pl-1 overflow-y-auto">
      <div>
        {label && (
          <label className="label">
            <span className="text-sm sm:text-base font-semibold">{label}</span>
          </label>
        )}
        {values.map((v, index) => (
          <Input
            key={index}
            className="w-fit mb-8"
            onChange={(e) => updateValue(index, e.target.value)}
            value={v}
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
      <button className="btn btn-neutral" type="button" onClick={addValue}>
        <FaPlus></FaPlus> Add new
      </button>
    </div>
  );
};

export default MultiInput;
