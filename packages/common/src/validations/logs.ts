import { z } from "zod";
import { WsMessageType } from "../enum";
import { BitcoinCluster, EthCluster, SolCluster } from "../enum";

export const TxnLogMsgValid = z.object({
  type: z.nativeEnum(WsMessageType),
  accountId: z
    .string()
    .regex(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      "should be a valid UUID.",
    ),
  clusters: z.object({
    sol: z.nativeEnum(SolCluster),
    eth: z.nativeEnum(EthCluster),
    btc: z.nativeEnum(BitcoinCluster).optional(),
  }),
});
