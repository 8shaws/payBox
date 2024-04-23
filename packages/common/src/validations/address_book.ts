import { z } from "zod";

export const InsertAddressBook = z.object({
    name: z.string(),
    publicKey: z.string(),
    chain: z.string(),
    tag: z.string().optional(),
});