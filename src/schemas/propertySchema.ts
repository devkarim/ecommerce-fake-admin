import { z } from 'zod';

import { PropertyType } from '@prisma/client';

export const createPropertySchema = z.object({
  name: z.string().min(3, 'Property name must be at least 3 characters long.'),
  type: z.nativeEnum(PropertyType),
  values: z.string().array().optional(),
});

export type CreatePropertySchema = z.infer<typeof createPropertySchema>;
