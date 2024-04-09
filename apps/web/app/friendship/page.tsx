import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/util"
import { getFriendships } from "@/lib/helper";
import { FriendshipStatusEnum } from "@paybox/common";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
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
