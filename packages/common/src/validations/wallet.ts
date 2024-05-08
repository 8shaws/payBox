import { z } from "zod";

export const SecretValid = z.object({
  walletId: z
    .string()
    .regex(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      "should be a valid UUID.",
    ),
  password: z
    .string()
    .refine(
      (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value,
        ),
      {
        message:
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
      },
    ),
});

export const WalletAccountGet = SecretValid;
