import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/util';
import { redirect } from 'next/navigation';
import { getNotifs } from '@/lib/helper';
import { UserNav } from '../txn/components/user-nav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SetNotifs } from './set-notif';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';


export default async function NotifPage() {

  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user?.email) {
    redirect('/signup');
  }
  //@ts-ignore
  const jwt = session?.user?.jwt;
  const notifs = await getNotifs(jwt);

  return (
    <>
      <SetNotifs notifs={notifs}>
        <div className="flex flex-col w-screen items-center">
          <div className="w-5/6 hidden h-full flex-1 flex-col border-2 rounded-lg space-y-8 p-8 md:flex  dark:bg-card">
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
            <Tabs defaultValue="account" className="w-[400px]">
              <TabsList className='dark:bg'>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">Make changes to your account here.</TabsContent>
              <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>


            {notifs && <DataTable data={notifs} columns={columns} />}
          </div>
        </div>
      </SetNotifs>
    </>
  )
}
