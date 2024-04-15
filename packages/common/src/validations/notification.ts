import { z } from "zod";
import { TopicTypes } from "../enum";

export const SubscibeValid = z.object({
    endpoint: z.string(),
    expirationTime: z.string().nullable(),
    p256dh: z.string(),
    auth: z.string(),
});

export const GetNotifValid = z.object({
    limit: z.string().transform((val) => parseInt(val)),
    offset: z.string().transform((val) => parseInt(val)),
    topic: z.nativeEnum(TopicTypes),
    viewed: z.string().refine((val) => val === "true" || val === "false", {
        message: "should be a boolean.",
    }).transform((val) => val === "true"),
})

export const NotifSchema = z.object({
    id: z.string(),
    clientId: z.string(),
    body: z.string(),
    tag: z.string(),
    image: z.string().nullable(),
    timestamp: z.string(),
    title: z.string(),
    viewed: z.boolean(),
    updatedAt: z.string().optional(),
});

export const NotifUpdateValid = z.object({
    ids: z
        .array(
            z.string()
                .regex(
                    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
                    "should be a valid UUID.",
                ),
        )
});