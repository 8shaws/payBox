"use client";

import * as React from "react";

import { cn } from "@/src/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import { LogOut, UserRound, Wallet } from "lucide-react";
import { accountsAtom, clientAtom } from "@paybox/recoil";
import { useRecoilValue } from "recoil";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface ClientNameTabProps {
  isCollapsed: boolean;
}

export function ClientNameTab({ isCollapsed }: ClientNameTabProps) {
  const client = useRecoilValue(clientAtom);

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuLabel className="flex gap-x-2">
              <span className="text-muted-foreground">
                <UserRound className="w-4 h-4" />
              </span>
              {client?.firstname}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link
              href={`/profile`}
              className={cn("transition-colors hover:text-foreground/80")}
            >
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <Link
              href={`/account`}
              className={cn("transition-colors hover:text-foreground/80")}
            >
              <DropdownMenuItem>Accounts</DropdownMenuItem>
            </Link>
            <Link
              href={`/txn`}
              className={cn("transition-colors hover:text-foreground/80")}
            >
              <DropdownMenuItem>Transactions</DropdownMenuItem>
            </Link>
            <Link
              href={`/friendship`}
              className={cn("transition-colors hover:text-foreground/80")}
            >
              <DropdownMenuItem>Chat</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut()}
              className="flex gap-x-2 "
            >
              <LogOut className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger>
                <Button className="p-0" variant={"link"}>
                  <Avatar className="hidden h-7 w-7 sm:flex">
                    <AvatarImage
                      src={`/avatars/0${Math.floor(Math.random() * 5 + 1)}.png`}
                      alt="Avatar"
                    />
                    <AvatarFallback>
                      {client?.firstname?.charAt(0).toLocaleUpperCase()}
                      {client?.lastname?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="flex items-center gap-4 relative right-1"
            >
              <span className="mr-auto text-muted-foreground">
                <UserRound className="w-4 h-4" />
              </span>
              {client?.firstname}
            </TooltipContent>
          </Tooltip>
        </DropdownMenu>
      </TooltipProvider>
    );
  }

  return (
    <Card className="border-none flex justify-start px-6 cursor-pointer ">
      <CardHeader className="flex flex-row items-center justify-start gap-x-4 w-full  p-0 rounded-lg">
        <Avatar className="hidden h-7 w-7 sm:flex">
          <AvatarImage
            src={`/avatars/0${Math.floor(Math.random() * 5 + 1)}.png`}
            alt="Avatar"
          />
          <AvatarFallback>
            {client?.firstname?.charAt(0).toLocaleUpperCase()}
            {client?.lastname?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        {client ? (
          <div className="">
            <CardTitle>{client.firstname}</CardTitle>
            <CardDescription>{client.username}</CardDescription>
          </div>
        ) : (
          <Skeleton className="w-[200px] h-[30px]" />
        )}
      </CardHeader>
    </Card>
  );
}
