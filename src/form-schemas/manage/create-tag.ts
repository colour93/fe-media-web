import { z } from 'zod';

export const createTagSchema = z.object({
  name: z.string().min(1),
  cate: z.number(),
  videos: z.array(z.string()).optional(),
  displayName: z.string().optional(),
  description: z.string().optional(),
  cover: z.string().optional(),
});

export type ICreateTag = z.infer<typeof createTagSchema>;
