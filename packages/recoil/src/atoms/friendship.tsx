import { Friend, FriendPubKeys, FriendshipType } from "@paybox/common";
import { atom } from "recoil";

export const pendingFriendshipAtom = atom<FriendshipType[]>({
  key: "pendingFriendship",
  default: [],
});

export const friendRequestsAtom = atom<Friend[]>({
  key: "friendRequests",
  default: [],
});

export const friendsPubKeysAtom = atom<FriendPubKeys[]>({
  key: "friendPubKeys",
  default: [],
});

export const acceptedFriendshipAtom = atom<FriendshipType[]>({
  key: "acceptedFriendship",
  default: [],
});

export const friendsAtom = atom<Friend[]>({
  key: "friendsAtom",
  default: [],
});
