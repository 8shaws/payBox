import z from "zod";
import { IndexType } from "./enum";

export const PayloadParser = z.object({
    type: z.nativeEnum(IndexType),
    payload: z.any(),
});