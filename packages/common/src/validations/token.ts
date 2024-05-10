import { z } from "zod";
import { Network } from "../enum";
import { publicKeyType } from "./account";

export const TokenCreateSchema = z.object({
  name: z.string().min(5).max(10),
  authority: publicKeyType,
  description: z.string().min(8).max(20),
  network: z.nativeEnum(Network),
});
