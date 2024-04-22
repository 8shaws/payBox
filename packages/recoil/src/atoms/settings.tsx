import { atom } from "recoil";

export const testmodeAtom = atom<boolean>({
    key: "testmodeAtom",
    default: false
});