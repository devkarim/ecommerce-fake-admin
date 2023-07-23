import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters long.'),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
