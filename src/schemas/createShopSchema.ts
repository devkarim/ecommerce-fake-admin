import { z } from 'zod';

const createShopSchema = z.object({
  name: z.string().min(3, 'Shop name must be at least 3 characters long.'),
});

export type CreateShopFormSchema = z.infer<typeof createShopSchema>;

export default createShopSchema;
