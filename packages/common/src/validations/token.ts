import { z } from "zod";
import { Network } from "../enum";
import { publicKeyType } from "./account";

export const TokenCreateSchema = z.object({
  name: z.string().min(5).max(10),
  authority: publicKeyType,
  description: z.string().min(8).max(20),
  network: z.nativeEnum(Network),
});

export const MintTokenSchema = z.object({
  mint: z.string(),
  ata: publicKeyType,
  tokens: z.number(),
  authority: publicKeyType,
  network: z.nativeEnum(Network),
  username: z
    .string()
    .regex(
      /^[a-z0-9_]{3,15}$/,
      "should be between 3-15 characters and can only contain numbers, letters, and underscores.",
    ),
});

export const GetTokenSchema = z.object({
  tokenId: z
    .string()
    .regex(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      "should be a valid UUID.",
    ),
});

export const GenAtaSchema = z.object({
  token: z.string(),
  authority: publicKeyType,
  network: z.nativeEnum(Network),
});
