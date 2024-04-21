import { Locales } from "@paybox/common";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { langs } from "./contants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLocaleName = (locale: Locales): string => {
  return langs.find(({value}) => value == locale)?.name || "";
}