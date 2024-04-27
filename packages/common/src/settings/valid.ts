import { z } from "zod";
import { Network } from "../enum";
import { BtcExplorer, EthExplorer, SolExplorer } from "./enums";

export const PutExpPref = z.object({
    solExp: z.nativeEnum(SolExplorer).optional(),
    ethExp: z.nativeEnum(EthExplorer).optional(),
    btcExp: z.nativeEnum(BtcExplorer).optional(),
});