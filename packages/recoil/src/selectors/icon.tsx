import { Network } from "@paybox/common";
import { selector, selectorFamily } from "recoil";
import { BitcoinIcon } from "../icon/bitcoin";
import EthIcon from "../icon/Eth";
import SolanaIcon from "../icon/SolanaIcon";
import { UsdcIcon } from "../icon/usdc";
import React from "react";

export const getNetIcon = selectorFamily({
  key: "getNetIcon",
  get:
    (net: Network) =>
    ({ get }) => {
      switch (net) {
        case Network.Bitcoin:
          return {
            icon: BitcoinIcon,
          };
        case Network.Eth:
          return {
            icon: EthIcon,
          };
        case Network.Sol:
          return {
            icon: SolanaIcon,
          };
        default:
          return {
            icon: UsdcIcon,
          };
      }
    },
});
