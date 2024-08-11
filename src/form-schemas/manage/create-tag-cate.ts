import { z } from 'zod';

export const createTagCateSchema = z.object({
  name: z.string().min(1),
  displayName: z.string().optional(),
  color: z.string().optional(),
});

export type ICreateTagCate = z.infer<typeof createTagCateSchema>;
