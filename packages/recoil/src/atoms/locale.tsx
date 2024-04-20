import { Locales } from "@paybox/common";
import { atom } from "recoil";

export const localeAtom = atom<Locales>({
    default: Locales.en,
    key: "localeAtom",
})