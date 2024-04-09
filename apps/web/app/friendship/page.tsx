import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/util"
import { getFriendships } from "@/lib/helper";
import { FriendshipStatusEnum } from "@paybox/common";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Check, CheckCheck } from "lucide-react";
import { AcceptButton } from "./components/accept-request";
import { redirect } from "next/navigation";
import { Content } from "./components/drawer-content";
import { cn } from "@/lib/utils";
import { FriendsCard } from "./components/card-content";

export default async function Page({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const jwt = session?.user?.jwt;
    if (!jwt) {
        redirect('/signin');
    }
    const friendships = await getFriendships(jwt, FriendshipStatusEnum.Pending);
    console.log(friendships)
    return (
        <div>
            <main className={cn(
                "flex items-center justify-center h-screen"
            )}>
                <Card x-chunk="dashboard-01-chunk-5" className="w-[500px]">
                    <CardHeader>
                        <CardTitle>Friend Requests</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-8 w-full">


                        <FriendsCard
                            friendships={friendships}
                        />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
