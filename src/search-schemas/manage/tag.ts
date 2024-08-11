import { z } from 'zod';

export const tagManageSearchSchema = z.object({
  tagCateCid: z.number({ invalid_type_error: 'CID 应为数字类型' }).optional(),
});
