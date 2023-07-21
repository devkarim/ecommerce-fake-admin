import { Shop } from '@prisma/client';

import client from './client';

interface ShopResponse {
  success: boolean;
  shop: Shop;
}

export const createShop = (name: string) => {
  return client.post<ShopResponse>('api/shops', { name });
};

export const updateShop = (id: number, name: string) => {
  return client.patch<ShopResponse>(`api/shops/${id}`, { name });
};

export const deleteShop = (id: number) => {
  return client.delete<{ success: boolean }>(`api/shops/${id}`);
};
