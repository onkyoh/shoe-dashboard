import { z } from "zod";
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(30)
});
export {
  loginSchema as l
};
