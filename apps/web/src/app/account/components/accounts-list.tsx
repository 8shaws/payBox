"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";

import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Separator } from "@/src/components/ui/separator";
import { accountsAtom } from "@paybox/recoil";
import { useRecoilValue } from "recoil";
import AccountDialog from "./acocunt-dialog";

export function AccountList() {
  const accounts = useRecoilValue(accountsAtom);
  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle className="text-start items-center flex">
          PayBox Web3 Accounts
        </CardTitle>
        <CardDescription>Manange your accounts from here...</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4 items-center justify-center">
        <ScrollArea className="h-72 w-[500px] rounded-xl border bg-card ">
          {accounts.map((account, index) => {
            return (
              <>
                <AccountDialog key={account.id} account={account} />
              </>
            );
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
