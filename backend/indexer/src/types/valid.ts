import z from "zod";
import { IndexType } from "./enum";
import { Network } from "@paybox/common";

export const PayloadParser = z.object({
  type: z.nativeEnum(IndexType),
  chain: z.nativeEnum(Network),
  payload: z.any(),
});
