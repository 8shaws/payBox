import { TokenType } from "@paybox/common";
import { atom } from "recoil";

export const tokensAtom = atom<TokenType[]>({
  key: "tokensAtom",
  default: [],
});
