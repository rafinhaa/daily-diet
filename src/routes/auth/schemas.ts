import { z } from "zod";

export const handleSignInBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
