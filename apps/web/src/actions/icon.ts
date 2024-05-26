import { Network } from "@paybox/common";
import { BitcoinIcon } from "../components/icon/bitcoin";
import EthIcon from "../components/icon/Eth";
import SolanaIcon from "../components/icon/SolanaIcon";
import { UsdcIcon } from "../components/icon/usdc";

export const getIcon = (
  net: Network,
): {
  icon: React.ElementType;
} => {
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
};
