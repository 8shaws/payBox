import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/util";
import { redirect } from "next/navigation";
import { getNotifs } from "@/src/lib/helper";
import { UserNav } from "../txn/components/user-nav";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { SetNotifs } from "./set-notif";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import NotifTab from "./notif-tab";
import MailsTab from "./mails-tab";

export default async function NotifPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user?.email) {
    redirect("/signup");
  }
  //@ts-ignore
  const jwt = session?.user?.jwt;

  return (
    <>
      <div className="flex flex-col w-screen items-start">
        <div className="w-4/6 hidden h-full flex-1 flex-col border-2 rounded-lg space-y-8 p-8 md:flex  dark:bg-card">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back!
              </h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your Notifications you have received!
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <UserNav />
            </div>
          </div>
          <Tabs defaultValue="notif" className="w-full">
            <TabsList className="dark:bg">
              <TabsTrigger value="notif">Notif</TabsTrigger>
              <TabsTrigger value="mails">Mails</TabsTrigger>
            </TabsList>
            <TabsContent value="notif" className="">
              <NotifTab jwt={jwt} />
            </TabsContent>
            <TabsContent value="mails">
              <MailsTab jwt={jwt} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
