"use client";

import * as React from "react";

import { cn } from "@/src/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Wallet } from "lucide-react";
import { accountsAtom } from "@paybox/recoil";
import { useRecoilValue } from "recoil";
import { Skeleton } from "@/src/components/ui/skeleton";

interface AccountSwitcherProps {
  isCollapsed: boolean;
  selectedAccount: string;
  setSelectedAccount: (accountId: string) => void;
}

export function AccountSwitcher({
  isCollapsed,
  selectedAccount,
  setSelectedAccount,
}: AccountSwitcherProps) {
  const accounts = useRecoilValue(accountsAtom);
  const name = accounts.find((account) => account.id === selectedAccount)?.name;

  return (
    <Select defaultValue={selectedAccount} onValueChange={setSelectedAccount}>
      <SelectTrigger
        className={cn(
          "flex items-center gap-2  [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
          isCollapsed &&
            "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden",
        )}
        aria-label="Select account"
      >
        <SelectValue placeholder="Select an account">
          <Wallet className="h-5 w-5" />
          <span className={cn("ml-2", isCollapsed && "hidden")}>
            {name ? name : <Skeleton className="min-w-80 h-5 block" />}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {accounts.map(
          (account) =>
            account && (
              <SelectItem key={account.id} value={account.id}>
                <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                  <Wallet className="h-5 w-5 " />
                  {account.name ? (
                    account.name
                  ) : (
                    <Skeleton className="w-20 h-5" />
                  )}
                </div>
              </SelectItem>
            ),
        )}
      </SelectContent>
    </Select>
  );
}
