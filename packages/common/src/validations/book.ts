import { z } from "zod";
import { Network } from "../enum";
import { publicKeyType } from "./account";

export const InsertAddressBook = z.object({
    name: z.string(),
    publicKey: publicKeyType,
    chain: z.nativeEnum(Network),
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

export const UpdateBook = z.object({
    name: z.string().optional(),
    publicKey: publicKeyType.optional(),
    chain: z.nativeEnum(Network).optional(),
    tag: z.string().optional(),
    id: z
        .string()
        .regex(
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            "should be a valid UUID.",
        ),
});
