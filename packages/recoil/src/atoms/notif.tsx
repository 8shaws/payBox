import { NotifType } from "@paybox/common";
import { atom } from "recoil";

export const notifsAtom = atom<NotifType[]>({
    default: [],
    key: "notifs",
});