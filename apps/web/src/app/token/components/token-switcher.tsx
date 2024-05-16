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
import { accountsAtom, tokensAtom } from "@paybox/recoil";
import { useRecoilValue } from "recoil";
import { Skeleton } from "@/src/components/ui/skeleton";

interface TokenSwitcherProps {
  isCollapsed: boolean;
  selectedToken: string;
  setSelectedToken: (tokenId: string) => void;
}

export function TokensSwitcher({
  isCollapsed,
  selectedToken,
  setSelectedToken,
}: TokenSwitcherProps) {
  const tokens = useRecoilValue(tokensAtom);
  const name = tokens.find((token) => token.id === selectedToken)?.name;

  return (
    <Select defaultValue={selectedToken} onValueChange={setSelectedToken}>
      {tokens.length == 0 && isCollapsed ? (
        <Wallet className="h-5 w-5" />
      ) : (
        <SelectTrigger
          className={cn(
            "flex items-center gap-2  [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
            isCollapsed &&
              "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden",
          )}
          aria-label="Select Token"
        >
          <SelectValue placeholder="Select an Token">
            <Wallet className="h-5 w-5" />
            <span className={cn("ml-2", isCollapsed && "hidden")}>
              {name ? name : <Skeleton className="min-w-80 h-5 block" />}
            </span>
          </SelectValue>
        </SelectTrigger>
      )}
      <SelectContent>
        {tokens.map(
          (token) =>
            token && (
              <SelectItem key={token.id} value={token.id}>
                <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                  <Wallet className="h-5 w-5 " />
                  {token.name ? token.name : <Skeleton className="w-20 h-5" />}
                </div>
              </SelectItem>
            ),
        )}
      </SelectContent>
    </Select>
  );
}
