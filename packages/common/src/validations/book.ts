import { z } from "zod";

export const InsertAddressBook = z.object({
    name: z.string(),
    publicKey: z.string(),
    chain: z.string(),
    tag: z.string().optional(),
});

export const UUIDSchema = z.object({
    id: z
        .string()
        .regex(
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            "should be a valid UUID.",
        ),
});