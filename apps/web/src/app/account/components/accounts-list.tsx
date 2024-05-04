import * as React from "react";

import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Separator } from "@/src/components/ui/separator";
import { accountsAtom } from "@paybox/recoil";
import { useRecoilValue } from "recoil";
import AccountDialog from "./acocunt-dialog";

export function AccountList() {
  const accounts = useRecoilValue(accountsAtom);
  return (
    <ScrollArea className="h-72 w-[600px] rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {accounts.map((account, index) => {
          return <AccountDialog key={account.id} account={account} />;
        })}
      </div>
    </ScrollArea>
  );
}
