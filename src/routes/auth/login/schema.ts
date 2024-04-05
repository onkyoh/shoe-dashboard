import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(30)
});

export type LoginSchema = typeof loginSchema;
