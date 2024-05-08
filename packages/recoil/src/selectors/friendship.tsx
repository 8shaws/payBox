import { DefaultValue, selector, selectorFamily } from "recoil";
import {
  acceptedFriendshipAtom,
  friendsAtom,
  friendsPubKeysAtom,
} from "../atoms";

export const friendPubKeySelector = selectorFamily({
  key: "friendPubKeySelector",
  //@ts-ignore
  get:
    (friendId) =>
    ({ get }) => {
      const pubKeys = get(friendsPubKeysAtom);
      //@ts-ignore
      return pubKeys.find(({ id }) => id === friendId);
    },
});
