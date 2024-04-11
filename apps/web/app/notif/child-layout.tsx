"use client";

import { userData } from "@/app/friendship/friends/data";
import React, { useEffect, useState } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

import { LinksProps, Sidenav } from "@/components/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { AccountSwitcher } from "@/app/account/components/account-switcher";
import { AccountType, NotifType } from "@paybox/common";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import { accountsAtom, clientAtom, getAccounts, notifsAtom } from "@paybox/recoil";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClientNameTab } from "@/components/client-name-tab";
import { clientNavLinks } from "../account/components/navLinks";
import { topNavLinks } from "./nav.links";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface NotifChildLayoutProps {
    defaultLayout: number[] | undefined;
    defaultCollapsed?: boolean;
    navCollapsedSize: number;
    children: React.ReactNode;
}



export function NotifChildLayout({
    defaultLayout = [100, 480],
    defaultCollapsed = false,
    navCollapsedSize,
    children,
}: NotifChildLayoutProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const [isMobile, setIsMobile] = useState(false);
    const setNotifs = useSetRecoilState(notifsAtom);


    const client = useRecoilValue(clientAtom);

    const path = usePathname()
    const router = useRouter();
    const [selectedTab, setSelectedTab] = React.useState<string>(path.split('/')[path.split('/').length - 1]);

    useEffect(() => {
        const checkScreenWidth = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenWidth();

        window.addEventListener("resize", checkScreenWidth);


        return () => {
            window.removeEventListener("resize", checkScreenWidth);
        };
    }, []);


    useEffect(() => {
        if (path.split("/").length === 2) {
            setSelectedTab(path.split("/")[2] || "");
            router.push(path)
        }
        if (path.split("/").length === 3) {
            setSelectedTab(path.split("/")[3] || "");
            router.push(path)
        }
    }, [path]);

    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                    document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                        sizes
                    )}`
                }}
                className="h-full max-h-[800px] items-stretch"
            ></ResizablePanelGroup>
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                    document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                        sizes
                    )}`;
                }}
                className="min-h-fit w-screen rounded-lg border"
            >
                <ResizablePanel
                    defaultSize={defaultLayout[0]}
                    collapsedSize={navCollapsedSize}
                    collapsible={true}
                    minSize={isMobile ? 0 : 10}
                    maxSize={isMobile ? 10 : 18}
                    onCollapse={() => {
                        setIsCollapsed(true);
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                            true
                        )}`;
                    }}
                    onExpand={() => {
                        setIsCollapsed(false);
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                            false
                        )}`;
                    }}
                    className={cn(
                        isCollapsed && " min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out",
                        "flex flex-col h-[93vh]"
                    )}
                >
                    <div
                        className={cn(
                            "flex h-[52px] items-center justify-start",
                            isCollapsed ? "h-[52px] justify-center" : "px-4"
                        )}
                    >
                        <ClientNameTab isCollapsed={isCollapsed} />
                    </div>
                    <Separator />
                    <Sidenav
                        isCollapsed={isCollapsed}
                        links={topNavLinks as LinksProps[]}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                    {/* <Separator /> */}
                    {/* <Sidenav
                        isCollapsed={isCollapsed}
                        links={commonNavLinks as LinksProps[]}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    /> */}
                    <div className="flex-grow" />
                    <Sidenav
                        isCollapsed={isCollapsed}
                        links={clientNavLinks(client?.firstname)}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={defaultLayout[1]} minSize={30} className="dark:bg-primary-foreground">
                    <ScrollArea className="h-full rounded-md border">
                        <div className="h-[93.5vh] p-4 flex flex-col gap-y-8">
                            <div className="">
                                <Breadcrumb>
                                    <BreadcrumbList key={"list"}>
                                        <BreadcrumbItem key={"home"}>
                                            <BreadcrumbLink href={`/`}>Home</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        {path.split("/").map((item, index) => {
                                            let link = path.split("/").slice(0, index + 1).join("/")
                                            if(index+1 === path.split("/").length) {
                                                return (
                                                    <BreadcrumbItem key={link}>
                                                        <BreadcrumbPage>{item.charAt(0).toLocaleUpperCase()}{item.slice(1)}</BreadcrumbPage>
                                                    </BreadcrumbItem>
                                                )
                                            }
                                            return (
                                                <>
                                                    <BreadcrumbItem key={link}>
                                                        <BreadcrumbLink href={link}>{item.charAt(0).toLocaleUpperCase()}{item.slice(1)}</BreadcrumbLink>
                                                    </BreadcrumbItem>
                                                    <BreadcrumbSeparator />
                                                </>
                                            )
                                        })}
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                            {children}
                        </div>
                    </ScrollArea>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    );
}