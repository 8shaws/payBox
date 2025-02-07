"use client";

import { userData } from "@/src/app/friendship/friends/data";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/src/components/ui/resizable";
import { cn } from "@/src/lib/utils";
import { Sidebar } from "../sidebar";
import { Chat } from "./chat";
import { FriendshipType } from "@paybox/common";

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  friendships: FriendshipType[];
}

export function ChatLayout({
  defaultLayout = [100, 480],
  defaultCollapsed = false,
  navCollapsedSize,
  friendships,
}: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  // TODO: fetch the data from the server
  const [selectedUser, setSelectedUser] = React.useState(userData[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // TODO: join the ws server
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes,
        )}`;
      }}
      className="h-full items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 14}
        maxSize={isMobile ? 8 : 22}
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
            "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out",
        )}
      >
        <Sidebar
          isCollapsed={isCollapsed || isMobile}
          links={userData.map((user) => ({
            name: user.name,
            messages: user.messages ?? [],
            avatar: user.avatar,
            variant: selectedUser.name === user.name ? "grey" : "ghost",
          }))}
          isMobile={isMobile}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={defaultLayout[1]}
        minSize={30}
        className="dark:bg-primary-foreground"
      >
        <Chat
          messages={selectedUser.messages}
          selectedUser={selectedUser}
          isMobile={isMobile}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
