import { Property, PropertyType, Shop } from '@prisma/client';

import { BaseResponse, BaseResponseNoData } from '@/types/api';

import client from './client';

export type ShopResponse = BaseResponse<Shop>;

export type PropertyResponse = BaseResponse<Property>;

/*
  Shop Services
*/

export const createShop = (name: string) => {
  return client.post<ShopResponse>('api/shops', { name });
};

export const updateShop = (id: number, name: string) => {
  return client.patch<ShopResponse>(`api/shops/${id}`, { name });
};

export const deleteShop = (id: number) => {
  return client.delete<BaseResponseNoData>(`api/shops/${id}`);
};

/*
  Property Services
*/

export const createProperty = (
  shopId: number,
  name: string,
  type: PropertyType,
  values?: string[]
) => {
  return client.post<PropertyResponse>(`api/shops/${shopId}/properties`, {
    name,
    type,
    values,
  });
};

export const editProperty = (
  propertyId: number,
  shopId: number,
  name: string,
  type: PropertyType,
  values?: string[]
) => {
  return client.patch<PropertyResponse>(
    `api/shops/${shopId}/properties/${propertyId}`,
    {
      name,
      type,
      values,
    }
  );
};

export const deleteProperty = (shopId: number, propertyId: number) => {
  return client.delete<BaseResponseNoData>(
    `api/shops/${shopId}/properties/${propertyId}`
  );
};
