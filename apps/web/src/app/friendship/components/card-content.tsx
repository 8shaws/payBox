"use client";
import { Friend, FriendshipType } from "@paybox/common";
import { clientJwtAtom, pendingFriendshipAtom } from "@paybox/recoil";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/src/components/ui/drawer";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Content } from "./drawer-content";
import { AcceptButton } from "./accept-request";

export function FriendsCard({
  friendships,
  children,
}: {
  friendships: FriendshipType[];
  children: React.ReactNode;
}) {
  const [pendingFriendships, setPendingFriendship] = useRecoilState(
    pendingFriendshipAtom,
  );
  useEffect(() => {
    setPendingFriendship(friendships);
  }, [friendships]);

  return <>{children}</>;
}
