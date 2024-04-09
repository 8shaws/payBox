import { selector } from "recoil";
import { friendsPubKeysAtom } from "../atoms";

export const friendPubKeySelector = selector({
    key: "friendPubKeySelector",
    //@ts-ignore
    get: friendId => ({ get }) => {
        const pubKeys = get(friendsPubKeysAtom);
        //@ts-ignore
        return pubKeys.find(({ id }) => id === friendId)?.pubKey || "";
    },
});