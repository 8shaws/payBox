import { atom } from "recoil";

export const quoteRate = atom<number>({
  key: "quoteRate",
  default: 0,
});

export const quoteAtom = atom<{
  type: "fiat" | "crypto";
  token: "usd" | "sol" | "eth";
  amount: number;
}>({
  key: "quoteAtom",
  default: {
    type: "fiat",
    token: "usd",
    amount: 0,
  },
});
