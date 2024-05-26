import { z } from "zod";

export const TokenSchema = z
  .object({
    token: z.string(),
  })
  .passthrough();

export const EmailSchema = z
  .object({
    email: z.string().email(),
  })
  .passthrough();
