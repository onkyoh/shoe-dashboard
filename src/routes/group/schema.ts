import { z } from 'zod';

export const groupSchema = z.object({
	name: z.string().min(3).max(30)
});

export type GroupSchema = typeof groupSchema;
