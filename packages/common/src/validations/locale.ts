import z from "zod";
import { Locales } from "../enum";

export const ChangeLocaleSchema = z.object({
    locale: z.nativeEnum(Locales).default(Locales.en)
});