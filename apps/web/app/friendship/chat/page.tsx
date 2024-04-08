import { cookies } from "next/headers";
import { ChatLayout } from "@/app/friendship/chat/components/chat/chat-layout";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FriendshipStatusEnum, FriendshipType, WS_BACKEND_URL, responseStatus } from "@paybox/common";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/util";
import { redirect } from "next/navigation";



export default async function Home({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    console.log(searchParams["friendshipId"]);
    const session = await getServerSession(authOptions);

    //@ts-ignore
    const jwt = session?.user.jwt as string;
    if (!jwt) {
        redirect('/signin');
    }


    const layout = cookies().get("react-resizable-panels:layout");
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
    return (
        <main className="flex h-[calc(100dvh)] flex-col w-full">

            <div className="z-10 border-t-none rounded-lg w-full h-full text-sm lg:flex">
                {/* <ChatLayout
                    defaultLayout={defaultLayout}
                    navCollapsedSize={8}
                    // friendships={friendships}
                /> */}
            </div>

        </main>
    );
}