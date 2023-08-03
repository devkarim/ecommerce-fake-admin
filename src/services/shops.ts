import { Property, PropertyType, Shop } from '@prisma/client';

import { BaseResponse, BaseResponseNoData } from '@/types/api';

import client from './client';
import { CreateProductSchema } from '@/schemas/productSchema';

export type ShopResponse = BaseResponse<Shop>;

export type PropertyResponse = BaseResponse<Property>;

/*
  Shop Services
*/

export const createShop = (
  name: string,
  imageUrl: string,
  isFeatured: boolean = false,
  billboardCaption?: string | null,
  billboardImageUrl?: string | null
) => {
  return client.post<ShopResponse>('api/shops', {
    name,
    imageUrl,
    isFeatured,
    billboardCaption,
    billboardImageUrl,
  });
};

export const updateShop = (
  id: number,
  name: string,
  imageUrl: string,
  isFeatured: boolean = false,
  billboardCaption?: string | null,
  billboardImageUrl?: string | null
) => {
  return client.patch<ShopResponse>(`api/shops/${id}`, {
    name,
    imageUrl,
    isFeatured,
    billboardCaption,
    billboardImageUrl,
  });
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

/*
  Product Services
*/

export const createProduct = (shopId: number, data: CreateProductSchema) => {
  return client.post<PropertyResponse>(`api/shops/${shopId}/products`, data);
};

export const editProduct = (
  shopId: number,
  productId: number,
  data: CreateProductSchema
) => {
  return client.patch<PropertyResponse>(
    `api/shops/${shopId}/products/${productId}`,
    data
  );
};

export const deleteProduct = (shopId: number, productId: number) => {
  return client.delete<BaseResponseNoData>(
    `api/shops/${shopId}/products/${productId}`
  );
};
