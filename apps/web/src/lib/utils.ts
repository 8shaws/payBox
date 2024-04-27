import { BtcExplorer, EthExplorer, Locales, SolChainId, SolExplorer } from "@paybox/common";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { langs } from "./contants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLocaleName = (locale: Locales): string => {
  return langs.find(({value}) => value == locale)?.name || "";
}

export const ethExpObj = Object.keys(EthExplorer).map((key) => {
  return {
    value: EthExplorer[key as keyof typeof EthExplorer],
    label: key,
  }
});

export const solExpObj = Object.keys(SolExplorer).map((key) => {
  return {
    value: SolExplorer[key as keyof typeof SolExplorer],
    label: key,
  }
});

export const btcExpObj = Object.keys(BtcExplorer).map((key) => {
  return {
    value: BtcExplorer[key as keyof typeof BtcExplorer],
    label: key,
  }
});