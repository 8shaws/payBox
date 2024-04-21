import { Icons } from "@/src/components/icon/icon"
import { ArrowLeftRight, Home, LucideIcon, PhoneCall, UserRound, Wallet } from "lucide-react"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: LucideIcon
  label?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
      icon: Home
    },
    {
      title: "Profile",
      href: "/profile",
      icon: UserRound
    },
    {
      title: "Account",
      href: "/account",
      icon: Wallet
    },
    {
      title: "Transactions",
      href: "/txn",
      icon: ArrowLeftRight
    },
    {
      title: "Friendships",
      href: "/friendship",
      icon: PhoneCall
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Home",
          href: "/",
          items: [],
        },
        {
          title: "Workflow",
          href: "/docs/flow",
          items: [],
        },
        {
          title: "Signup",
          href: "/signup",
          items: [],
        },
        {
          title: "Sigin",
          href: "/signin",
          items: [],
        },
        {
          title: "Dark mode",
          href: "/docs/dark-mode",
          items: [],
        },
      ],
    },
  ],
}