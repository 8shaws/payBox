import { z } from "zod";

export const SubscibeValid = z.object({
    endpoint: z.string(),
    expirationTime: z.string().nullable(),
    p256dh: z.string(),
    auth: z.string(),
});

export const GetNotifValid = z.object({
    limit: z.string().transform((val) => parseInt(val)),
    offset: z.string().transform((val) => parseInt(val)),
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
})