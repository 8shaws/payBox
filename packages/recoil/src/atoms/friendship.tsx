import { Friend } from "@paybox/common";
import { atom } from "recoil";

export const pendingFriendshipAtom = atom<Friend[]>({
    key: "pendingFriendship",
    default: [],
});

export const friendsPubKeysAtom = atom({
    key: "friendPubKeys",
    default: [],
});