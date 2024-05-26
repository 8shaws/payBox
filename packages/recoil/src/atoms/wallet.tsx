"use client";
import { WalletType } from "@paybox/common";
import { atom } from "recoil";

export const walletAtom = atom<WalletType | null>({
  default: null,
  key: "walletAtom",
});

export const walletsAtom = atom<WalletType[]>({
  default: [],
  key: "walletsAtom",
});
