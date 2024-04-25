import { AddressBook, BitcoinCluster, EthCluster, SolCluster } from "@paybox/common";
import { atom, atomFamily } from "recoil";

export const testmodeAtom = atom<boolean>({
    key: "testmodeAtom",
    default: false
});

export const ethNetAtom = atom<EthCluster>({
    key: "ethNetAtom",
    default: EthCluster.Sepolia
});

export const btcNetAtom = atom<BitcoinCluster>({
    key: "btcNetAtom",
    default: BitcoinCluster.Testnet
});

export const solNetAtom = atom<SolCluster>({
    key: "solNetAtom",
    default: SolCluster.Devnet
});


export const booksAtom = atom<AddressBook[]>({
    key: "booksAtom",
    default: []
});