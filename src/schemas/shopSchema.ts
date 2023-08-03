import { z } from 'zod';

export const createShopSchema = z.object({
  name: z.string().min(3, 'Shop name must be at least 3 characters long.'),
  isFeatured: z.boolean().default(false),
  imageUrl: z
    .string({ required_error: 'Shop image is required.' })
    .url('Shop image must be a valid URL.'),
  billboardImageUrl: z
    .string()
    .url('Billboard image must be a valid URL.')
    .nullable()
    .optional(),
  billboardCaption: z.string().nullable().optional(),
});

export type CreateShopSchema = z.infer<typeof createShopSchema>;

export const updateShopSchema = createShopSchema.extend({});

export type UpdateShopSchema = z.infer<typeof updateShopSchema>;
