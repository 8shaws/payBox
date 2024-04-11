"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"


export interface LinksProps {
    id: string
    title: string
    label?: string
    icon: LucideIcon
    link: string
    variant: "default" | "ghost"
}

interface NavProps {
    isCollapsed: boolean
    links: LinksProps[]
    selectedTab: string
    setSelectedTab: (tab: string) => void
}

export function Sidenav({ links, isCollapsed, selectedTab, setSelectedTab }: NavProps) {
    return (
        <div
            data-collapsed={isCollapsed}
            className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
        >
            <nav className="grid gap-4 px-4 pt-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {links.map((link, index) =>
                    isCollapsed ? (
                        <Tooltip key={index} delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Link
                                    href={`${link.link}`}
                                    onClick={() => setSelectedTab(link.id)}
                                    className={cn(
                                        buttonVariants({ variant: link.variant, size: "icon" }),
                                        "h-9 w-9 rounded-full  dark:text-muted-foreground ",
                                        link.id !== selectedTab && "dark:hover:text-slate-100",
                                        link.id === selectedTab &&
                                        "dark:bg-white dark:text-black dark:hover:font-bold"
                                    )}
                                >
                                    <link.icon className={cn(
                                        "h-4 w-4",
                                    )} />
                                    <span className="sr-only">{link.title}</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="flex items-center gap-4 relative -right-2">
                                {link.title}
                                {link.label && (
                                    <span className="ml-auto text-muted-foreground">
                                        {link.label}
                                    </span>
                                )}
                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        <Link
                            key={index}
                            href={link.link}
                            onClick={() => setSelectedTab(link.id)}
                            className={cn(
                                buttonVariants({ variant: link.variant, size: "sm" }),
                                link.id === selectedTab &&
                                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                "justify-start",
                                "h-10 flex gap-x-2"
                            )}
                        >
                            <link.icon className="mr-2 h-4 w-4" />
                            <div
                                className={cn("font-semibold leading-none tracking-tight text-[18px]")}
                            >
                                {link.title}
                            </div>
                            {link.label && (
                                <span
                                    className={cn(
                                        "ml-auto",
                                        link.variant === "default" &&
                                        "text-background dark:text-white"
                                    )}
                                >
                                    {link.label}
                                </span>
                            )}
                        </Link>
                    )
                )}
            </nav>
        </div>
    )
}