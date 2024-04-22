import z from "zod";

export const TestModeSetSchema = z.object({
    testMode: z.boolean()
});