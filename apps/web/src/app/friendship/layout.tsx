import { Metadata } from "next";

import { cookies } from "next/headers";
import { AccountsLayout } from "@/src/app/account/components/accountLayout";
import {
  AccountType,
  BACKEND_URL,
  Client,
  ClientWithJwt,
  FriendshipStatusEnum,
  responseStatus,
} from "@paybox/common";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/util";
import { redirect } from "next/navigation";
import { getFriendships } from "@/src/lib/helper";
import { FriendshipLayout } from "./components/friendship-layout";

export const metadata: Metadata = {
  title: "Friendships | PayBox",
  description: "Account | PayBox",
};

interface FriendshipParentProps {
  children: React.ReactNode;
}

export default async function FriendshipParent({
  children,
}: FriendshipParentProps) {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const session = await getServerSession(authOptions);

  //@ts-ignore
  const jwt = session?.user.jwt as string;
  if (!jwt) {
    redirect("/signin");
  }

  const friendships = await getFriendships(jwt, FriendshipStatusEnum.Accepted);
  return (
    <>
      {friendships && (
        <FriendshipLayout
          defaultLayout={defaultLayout}
          navCollapsedSize={4}
          friendships={friendships}
          children={children}
          jwt={jwt}
          client={session?.user as ClientWithJwt}
        />
      )}
    </>
  );
}
