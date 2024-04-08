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
} from "@/components/ui/card"
import { Check, CheckCheck } from "lucide-react";
import { AcceptButton } from "./accept-request";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const jwt = session?.user?.jwt;
    if(!jwt) {
        redirect('/signin');
    }
    const friendships = await getFriendships(jwt, FriendshipStatusEnum.Pending);
    console.log(friendships)
    return (
        <div>
            <main>
                <Card x-chunk="dashboard-01-chunk-5" className="w-[500px]">
                    <CardHeader>
                        <CardTitle>Friend Requests</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-8 w-full">
                        {
                            friendships.map((friendship) => {
                                return (
                                    <div className="flex items-center gap-4 w-full">
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage src={`/avatars/0${Math.floor(Math.random() * 5 + 1)}.png`} alt="Avatar" />
                                            <AvatarFallback>{friendship.friend?.firstname?.charAt(0).toLocaleUpperCase()}{friendship.friend?.lastname?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none">
                                                {friendship.friend?.firstname} {friendship.friend?.lastname}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {friendship.friend?.username}
                                            </p>
                                        </div>
                                        <div className="flex-grow" />
                                        <AcceptButton
                                            friendshipId={friendship.id}
                                            jwt={jwt}
                                            key={friendship.id}
                                        />
                                    </div>
                                );
                            })
                        }

                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
