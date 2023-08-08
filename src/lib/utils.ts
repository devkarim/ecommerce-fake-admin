import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tw-merge';

export const cls = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export const compactFormatter = Intl.NumberFormat('en', {
  notation: 'compact',
});

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const getMonthName = (monthNumber: number, full: boolean = false) => {
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString('en-US', { month: full ? 'long' : 'short' });
};
