import { Metadata } from "next";

import { cookies } from "next/headers";
import { AccountType, BACKEND_URL, responseStatus } from "@paybox/common";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/util";
import { redirect } from "next/navigation";
import { AccountLayout } from "./account-layout";
import React from "react";
import { getAccount } from "@/lib/helper";

export const metadata: Metadata = {
  title: "Account | PayBox",
  description: "Account | PayBox",
};


interface AccountLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}



export default async function AccountMainLayout({
  children,
  params
}: AccountLayoutProps) {
  const {id} = params;
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user?.email) {
    redirect("/signup");
  }

  //@ts-ignore
  const account = await getAccount(session.user.jwt, id);
  return (
    <>
    <div className=" dark:bg-primary-foreground">
        {account && 
            <AccountLayout
                account={account}
                children={children}
                id={id}
            />
        }

    </div>
    </>
  );
}
