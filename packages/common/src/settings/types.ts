import { BtcExplorer, EthExplorer, SolExplorer } from "./enums";

export interface ExplorerPref {
    solExp: SolExplorer;
    ethExp: EthExplorer;
    btcExp: BtcExplorer;
}