"use client";

import { userData } from "@/app/friendship/chat/data";
import React, { useEffect, useState } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

import { LinksProps, Sidenav } from "@/app/account/components/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { AccountSwitcher } from "@/app/account/components/account-switcher";
import { AccountType } from "@paybox/common";
import { usePathname, useRouter } from "next/navigation";
import { clientNavLinks, commonNavLinks, getNavLinks } from "./navLinks";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import { accountsAtom, clientAtom, getAccounts } from "@paybox/recoil";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AccountsLayoutProps {
    defaultLayout: number[] | undefined;
    defaultCollapsed?: boolean;
    navCollapsedSize: number;
    children: React.ReactNode;
    accounts: AccountType[]
}



export function AccountsLayout({
    defaultLayout = [100, 480],
    defaultCollapsed = false,
    navCollapsedSize,
    children,
    accounts
}: AccountsLayoutProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const [selectedUser, setSelectedUser] = React.useState(userData[0]);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedAccount, setSelectedAccount] = React.useState<string>(
        accounts[0].id
    );
    const setAccounts = useSetRecoilState(accountsAtom);
    // const loadAccounts = useRecoilCallback(({ snapshot, set }) => async () => {
    //     const load = snapshot.getLoadable(getAccounts);
    //     if (load.state === 'hasValue') {
    //         const accounts = load.contents;
    //         console.log(accounts)
    //         set(accountsAtom, accounts);
    //     }
    // });
    const client = useRecoilValue(clientAtom);

    const path = usePathname()
    const router = useRouter();
    const [selectedTab, setSelectedTab] = React.useState<string>(path.split('/')[path.split('/').length - 1]);

    useEffect(() => {
        const checkScreenWidth = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenWidth();
        if (accounts.length === 0) {
            toast.info("No accounts found, please create one");
            return router.push('/account/create');
        }
        window.addEventListener("resize", checkScreenWidth);

        // loadAccounts()
        setAccounts(accounts);

        return () => {
            window.removeEventListener("resize", checkScreenWidth);
        };
    }, []);

    useEffect(() => {
        setSelectedTab(path.split("/")[3] || "dashboard")
    }, [selectedAccount])

    useEffect(() => {
        if (path.split("/").length === 2) {
            setSelectedTab(path.split("/")[2] || "");
            router.push(path)
        }
        if (path.split("/").length === 3) {
            setSelectedTab(path.split("/")[3] || "dashboard");
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
                className="min-h-screen w-screen rounded-lg border"
            >
                <ResizablePanel
                    defaultSize={defaultLayout[0]}
                    collapsedSize={navCollapsedSize}
                    collapsible={true}
                    minSize={isMobile ? 0 : 14}
                    maxSize={isMobile ? 14 : 25}
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
                        "flex flex-col h-screen"
                    )}
                >
                    <div
                        className={cn(
                            "flex h-[52px] items-center justify-center",
                            isCollapsed ? "h-[52px]" : "px-4"
                        )}
                    >
                        <AccountSwitcher
                            isCollapsed={isCollapsed}
                            selectedAccount={selectedAccount}
                            setSelectedAccount={setSelectedAccount}
                        />
                    </div>
                    <Separator />
                    <Sidenav
                        isCollapsed={isCollapsed}
                        links={getNavLinks(selectedAccount) as LinksProps[]}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                    <Separator />
                    <Sidenav
                        isCollapsed={isCollapsed}
                        links={commonNavLinks as LinksProps[]}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
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
                        {children}
                    </ScrollArea>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    );
}