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
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/components/ui/drawer";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";

import { Textarea } from "@/src/components/ui/textarea";

import { LinksProps, Sidenav } from "@/src/components/sidebar";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import { Separator } from "@/src/components/ui/separator";
import { AccountSwitcher } from "@/src/app/account/components/account-switcher";
import {
  AccountType,
  ClientWithJwt,
  Friend,
  FriendshipType,
} from "@paybox/common";
import { usePathname, useRouter } from "next/navigation";
// import { clientNavLinks, commonNavLinks, getNavLinks } from "./navLinks";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import {
  acceptedFriendshipAtom,
  accountsAtom,
  clientAtom,
  clientJwtAtom,
  friendsAtom,
  getAccounts,
} from "@paybox/recoil";
import { toast } from "sonner";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import {
  getFriendsTab,
  sidenavLinks,
} from "../friends/components/sidenav-links";
import { clientNavLinks } from "../../account/components/navLinks";
import { Bird, Rabbit, Settings, Share, Turtle } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ClientNameTab } from "@/src/components/client-name-tab";

interface FriendshipLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  children: React.ReactNode;
  friendships: FriendshipType[];
  jwt: string;
  client: ClientWithJwt;
}

export function FriendshipLayout({
  defaultLayout = [100, 480],
  defaultCollapsed = false,
  navCollapsedSize,
  children,
  friendships,
  jwt,
  client,
}: FriendshipLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [selectedUser, setSelectedUser] = React.useState(userData[0]);
  const [isMobile, setIsMobile] = useState(false);
  // const [selectedChat, setSelectedChat] = React.useState<string>(
  //     accounts[0].id
  // );
  const setFriendships = useSetRecoilState(acceptedFriendshipAtom);
  const setFriends = useSetRecoilState(friendsAtom);
  // const loadAccounts = useRecoilCallback(({ snapshot, set }) => async () => {
  //     const load = snapshot.getLoadable(getAccounts);
  //     if (load.state === 'hasValue') {
  //         const accounts = load.contents;
  //         console.log(accounts)
  //         set(accountsAtom, accounts);
  //     }
  // });
  const setClient = useSetRecoilState(clientAtom);
  const setJwt = useSetRecoilState(clientJwtAtom);

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

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  useEffect(() => {
    if (client) {
      setClient(client);
    }
  }, [client]);

  useEffect(() => {
    if (friendships.length > 0) {
      setFriendships(friendships);
      setFriends(friendships.map((friendship) => friendship.friend as Friend));
    }
  }, [friendships]);

  useEffect(() => {
    setJwt(jwt);
  }, [jwt]);

  // useEffect(() => {
  //     setSelectedTab(path.split("/")[3] || "dashboard")
  // }, [selectedAccount])

  useEffect(() => {
    if (path.split("/").length === 2) {
      setSelectedTab(path.split("/")[2] || "");
      router.push(path);
    }
    if (path.split("/").length === 3) {
      setSelectedTab(path.split("/")[3] || "dashboard");
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
              "flex h-[58px] items-center",
              isCollapsed ? "h-[58px] justify-center" : "",
            )}
          >
            <ClientNameTab isCollapsed={isCollapsed} />
          </div>
          <Separator />
          {path.includes("/chat") && getFriendsTab(friendships).length > 0 && (
            <Sidenav
              isCollapsed={isCollapsed}
              links={getFriendsTab(friendships) as LinksProps[]}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          )}
          <Separator />
          <Sidenav
            isCollapsed={isCollapsed}
            links={sidenavLinks as LinksProps[]}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <Separator />
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
          <ScrollArea className="h-full rounded-md border-t-0">
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
              {children}
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
