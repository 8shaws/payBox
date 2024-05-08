import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/util";
import { getFriendships } from "@/src/lib/helper";
import { FriendshipStatusEnum } from "@paybox/common";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { redirect } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { FriendsCard } from "./components/card-content";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/src/components/ui/drawer";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Content } from "./components/drawer-content";
import { AcceptButton } from "./components/accept-request";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const jwt = session?.user?.jwt;
  if (!jwt) {
    redirect("/signin");
  }
  const friendships = await getFriendships(jwt, FriendshipStatusEnum.Pending);
  return (
    <div>
      <main className={cn("flex items-center justify-center h-screen")}>
        <Card x-chunk="dashboard-01-chunk-5" className="w-[500px]">
          <CardHeader>
            <CardTitle>Friend Requests</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8 w-full">
            <FriendsCard friendships={friendships}>
              {friendships.map((friendship) => {
                return (
                  <div
                    className="flex items-center  gap-4 w-full"
                    key={friendship.id}
                  >
                    <Drawer>
                      <DrawerTrigger className="flex items-center gap-4 w-full">
                        <>
                          <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage
                              src={`/avatars/0${Math.floor(Math.random() * 5 + 1)}.png`}
                              alt="Avatar"
                            />
                            <AvatarFallback>
                              {friendship.friend?.firstname
                                ?.charAt(0)
                                .toLocaleUpperCase()}
                              {friendship.friend?.lastname?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                              {friendship.friend?.firstname}{" "}
                              {friendship.friend?.lastname}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {friendship.friend?.username}
                            </p>
                          </div>
                        </>
                      </DrawerTrigger>
                      <DrawerContent className="flex items-center justify-center w-full">
                        {friendship.friend && (
                          <Content
                            friend={friendship.friend}
                            friendshipId={friendship.id}
                          />
                        )}
                      </DrawerContent>
                    </Drawer>

                    <div className="flex-grow" />
                    <AcceptButton
                      friendshipId={friendship.id}
                      jwt={jwt as string}
                      key={friendship.id}
                    />
                  </div>
                );
              })}
            </FriendsCard>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
