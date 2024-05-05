"use client";

import { userData } from "@/src/app/friendship/friends/data";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/src/components/ui/resizable";
import { cn } from "@/src/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";

import { LinksProps, Sidenav } from "@/src/components/sidebar";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import { Separator } from "@/src/components/ui/separator";
import { AccountSwitcher } from "@/src/app/account/components/account-switcher";
import { AccountType } from "@paybox/common";
import { usePathname, useRouter } from "next/navigation";
import { clientNavLinks, commonNavLinks, getNavLinks } from "./navLinks";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import { accountsAtom, clientAtom, getAccounts } from "@paybox/recoil";
import { toast } from "sonner";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { AccountList } from "./accounts-list";

interface AccountsLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  children: React.ReactNode;
  accounts: AccountType[];
}

export function AccountsLayout({
  defaultLayout = [100, 480],
  defaultCollapsed = false,
  navCollapsedSize,
  children,
  accounts,
}: AccountsLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [selectedUser, setSelectedUser] = React.useState(userData[0]);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedAccount, setSelectedAccount] = React.useState<string>(
    accounts[0].id,
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

  const path = usePathname();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = React.useState<string>(
    path.split("/")[path.split("/").length - 1],
  );

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenWidth();
    if (accounts.length === 0) {
      toast.info("No accounts found, please create one");
      return router.push("/account/create");
    }
    window.addEventListener("resize", checkScreenWidth);

    // loadAccounts()
    setAccounts(accounts);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  useEffect(() => {
    setSelectedTab(path.split("/")[3] || "all");
  }, [selectedAccount]);

  useEffect(() => {
    if (path.split("/").length === 2) {
      setSelectedTab(path.split("/")[2] || "all");
      router.push(path);
    }
    if (path.split("/").length === 3) {
      setSelectedTab(path.split("/")[3] || "all");
      router.push(path);
    }
  }, [path]);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      ></ResizablePanelGroup>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="min-h-fit w-screen rounded-lg border"
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
              true,
            )}`;
          }}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false,
            )}`;
          }}
          className={cn(
            isCollapsed &&
              " min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out",
            "flex flex-col h-[93vh]",
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-4",
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
        <ResizablePanel
          defaultSize={defaultLayout[1]}
          minSize={30}
          className="dark:bg-primary-foreground"
        >
          <ScrollArea className="h-full rounded-md border">
            <div className="h-[93.5vh] p-4">
              <div className="">
                <Breadcrumb>
                  <BreadcrumbList key={"list"}>
                    <BreadcrumbItem key={"home"}>
                      <BreadcrumbLink href={`/`}>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    {path.split("/").map((item, index) => {
                      let link = path
                        .split("/")
                        .slice(0, index + 1)
                        .join("/");
                      if (index + 1 === path.split("/").length) {
                        return (
                          <BreadcrumbItem key={link}>
                            <BreadcrumbPage>
                              {item.charAt(0).toLocaleUpperCase()}
                              {item.slice(1)}
                            </BreadcrumbPage>
                          </BreadcrumbItem>
                        );
                      }
                      return (
                        <>
                          <BreadcrumbItem key={link}>
                            <BreadcrumbLink href={link}>
                              {item.charAt(0).toLocaleUpperCase()}
                              {item.slice(1)}
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator />
                        </>
                      );
                    })}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div>{children}</div>
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
