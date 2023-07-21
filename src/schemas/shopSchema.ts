import { z } from 'zod';

export const createShopSchema = z.object({
  name: z.string().min(3, 'Shop name must be at least 3 characters long.'),
});

export type CreateShopSchema = z.infer<typeof createShopSchema>;

export const updateShopSchema = createShopSchema.extend({});

export type UpdateShopSchema = z.infer<typeof updateShopSchema>;
