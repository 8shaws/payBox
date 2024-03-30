import { Metadata } from "next";

import { cookies } from "next/headers";
import { AccountType, BACKEND_URL, responseStatus } from "@paybox/common";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/util";
import { redirect } from "next/navigation";
import { AccountLayout } from "./account-layout";

export const metadata: Metadata = {
  title: "Account | PayBox",
  description: "Account | PayBox",
};


interface AccountLayoutProps {
  children: React.ReactNode;
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const getAccount = async (jwt: string, id: string): Promise<AccountType | null> => {
  try {
    const { status, account }: { status: responseStatus, account: AccountType } = await fetch(`${BACKEND_URL}/account?accountId=${id}`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      cache: "no-cache"
    }).then(res => res.json());
    if (status == responseStatus.Error) {
      return null
    }
    return account
  } catch (error) {
    console.log(error);
    return null
  }
}

export default async function AccountMainLayout({
  children,
  params,
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
        {account && 
            <AccountLayout
                account={account}
                children={children}
                id={id}
            />
        }
    </>
  );
}
