import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icon/icon"
import { MainNav } from "@/components/ui/main-nav"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { buttonVariants } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { getAuthSelector } from "@paybox/recoil"

export function SiteHeader() {
  const pathname = usePathname();
  const session = useSession();
  const getAuth = useRecoilValue(getAuthSelector);
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-0",
        (pathname == "/") && "-mt-14",
      )}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 text-sm items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <div className="mr-4">
              <Link
                href={`/${getAuth.toLocaleLowerCase()}`}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/signup" ? "text-foreground" : "text-foreground/60"
                )}
              >
                {getAuth}
              </Link>
            </div>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.twitter className="h-3 w-3 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}