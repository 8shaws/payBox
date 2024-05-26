"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/src/config/site";
import { cn } from "@/src/lib/utils";
import { Icons } from "@/src/components/icon/icon";
import { Badge } from "@/src/components/ui/badge";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/account"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.includes("account")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Account
        </Link>
        <Link
          href="/token"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.includes("token")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Token
        </Link>
        <Link
          href="/txn"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/txn")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Transactions
        </Link>
        <Link
          href="/chat"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/chat")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Chat
        </Link>
        <Link
          href="/profile"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/profile")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Profile
        </Link>
        <Link
          href={siteConfig.links.github}
          className={cn(
            "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block",
          )}
        >
          GitHub
        </Link>
      </nav>
    </div>
  );
}
