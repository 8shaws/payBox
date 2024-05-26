import z from "zod";
import { BitcoinCluster, EthCluster, SolCluster } from "../enum";

export const TestModeSetSchema = z.object({
  testMode: z.boolean().optional(),
  solNet: z.nativeEnum(SolCluster).optional(),
  ethNet: z.nativeEnum(EthCluster).optional(),
  btcNet: z.nativeEnum(BitcoinCluster).optional(),
});
