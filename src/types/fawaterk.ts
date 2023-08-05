export type Currency = 'USD' | 'EGP' | 'SR' | 'AED' | 'KWD' | 'QAR' | 'BHD';
export type Frequency =
  | 'once'
  | 'weekly'
  | 'biweekly'
  | 'monthly'
  | 'quarterly';

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export interface Customer {
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  address: string;
}

export interface RedirectionUrls {
  successUrl: string;
  failUrl: string;
  pendingUrl: string;
}
