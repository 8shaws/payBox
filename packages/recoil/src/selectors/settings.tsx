import { Network } from "@paybox/common";
import { selector, selectorFamily } from "recoil";
import { btcNetAtom, ethNetAtom, solNetAtom } from "../atoms";

export const chainNetState = selectorFamily({
  key: "chainNetState",
  get:
    (chain: Network) =>
    ({ get }) => {
      switch (chain) {
        case Network.Sol:
          return get(solNetAtom);

        case Network.Bitcoin:
          return get(btcNetAtom);

        case Network.Eth:
          return get(ethNetAtom);
      }
    },
});
