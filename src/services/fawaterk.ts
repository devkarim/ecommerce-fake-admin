import axios, { AxiosResponse } from 'axios';

import {
  Customer,
  CartItem,
  Currency,
  Frequency,
  RedirectionUrls,
} from '@/types/fawaterk';

export interface SendPaymentRequest {
  customer: Customer;
  cartItems: CartItem[];
  shipping?: number;
  cartTotal: number;
  currency: Currency;
  frequency?: Frequency;
  payLoad?: any;
  due_date?: Date;
  sendEmail?: boolean;
  sendSMS?: boolean;
  redirectionUrls?: RedirectionUrls;
}

export interface SendPaymentResponse {
  success: boolean;
  data: {
    url: string;
    invoiceKey: string;
    invoiceId: number;
  };
}

const client = axios.create({
  baseURL: 'https://staging.fawaterk.com/api/v2',
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${process.env.FAWATERK_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

const checkout = (customer: Customer, cartItems: CartItem[], total: number) => {
  return client.post<
    SendPaymentResponse,
    AxiosResponse<SendPaymentResponse, SendPaymentRequest>,
    SendPaymentRequest
  >('/createInvoiceLink', {
    customer,
    cartItems,
    cartTotal: total,
    currency: 'USD',
  });
};

export default checkout;
