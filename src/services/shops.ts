import { Shop } from '@prisma/client';

import client from './client';

interface ShopResponse {
  success: boolean;
  shop: Shop;
}

export const createShop = (name: string) => {
  return client.post<ShopResponse>('api/shops', { name });
};
