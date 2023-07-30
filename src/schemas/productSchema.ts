import { z } from 'zod';

import { PropertyType } from '@prisma/client';

export const addProductPropertySchema = z.object({
  id: z.number({ required_error: 'Property id is required.' }),
  name: z.string({ required_error: 'Property name is required.' }),
  value: z
    .string()
    .min(1, 'Property value must be at least 1 characters long.')
    .or(z.number()),
});

export type AddProductPropertySchema = z.infer<typeof addProductPropertySchema>;

export const createProductSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters long.'),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price is required.',
    })
    .min(5, 'Price must be at least $5.'),
  quantity: z
    .number({
      required_error: 'Quantity is required',
      invalid_type_error: 'Quantity is required.',
    })
    .min(1, 'Quantity must be at least 1.'),
  isArchived: z.boolean().optional().default(false),
  isFeatured: z.boolean().optional().default(false),
  images: z
    .string()
    .url()
    .array()
    .nonempty('At least one image must be uploaded.'),
  props: addProductPropertySchema.array().optional(),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export const addProductPropertyServerSchema = addProductPropertySchema
  .extend({
    type: z.nativeEnum(PropertyType),
    allowedValues: z.string().array().optional(),
  })
  .refine(
    (data) => {
      if (data.type == PropertyType.FixedValues && !data.allowedValues) {
        return false;
      }
      if (
        data.type == PropertyType.Decimal ||
        data.type == PropertyType.Number
      ) {
        return !isNaN(+data.value);
      }
      if (data.type == PropertyType.FixedValues) {
        return data.allowedValues?.includes(data.value.toString());
      }
      return true;
    },
    {
      message: 'Property value does not match property type. ',
      path: ['value'],
    }
  );

export type AddProductPropertyServerSchema = z.infer<
  typeof addProductPropertyServerSchema
>;

export const addProductPropertyServerListSchema = z.array(
  addProductPropertyServerSchema
);

export type AddProductPropertyServerListSchema = z.infer<
  typeof addProductPropertyServerListSchema
>;
