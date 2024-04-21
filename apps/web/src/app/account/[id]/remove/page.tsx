import { authOptions } from "@/src/app/api/auth/[...nextauth]/util";
import { Button } from "@/src/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card"
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { BACKEND_URL, responseStatus } from "@paybox/common";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { AccountDeleteButton } from "./delete-button";

export const metadata: Metadata = {
    title: "Remove Account | Paybox",
    description: "Remove your account from PayBox",
};

const deleteAccount = async (jwt: string, accountId: string) => {
    try {
        const response = await fetch(`${BACKEND_URL}/account?accountId=${accountId}`, {
            method: "delete",
            headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${jwt}`,
            },
            cache: "no-cache"
        }).then(res => res.json());
        return response
    } catch (error) {
        console.log(error);
        return null
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    console.log(params);
    const session = await getServerSession(authOptions);
    //@ts-ignore
    let jwt = session?.user.jwt;

    if(!jwt) {
        toast.error("You need to be signed in to delete an account");
        redirect('/signin');
    }

    return (
        <div className="flex justify-center items-center">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Remove Your Account</CardTitle>
                    <CardDescription>We recommend to save the memonic for this account before deleting...</CardDescription>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        <ScrollArea className="h-[100px] w-[350px] rounded-md border p-4 text-accent-foreground">
                            Even though you are deleting this account, you can always recover it using the memonic in paybox or any other wallet.
                        </ScrollArea>
                    </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Link
                        href={`/account/${params.id}/secretPhrase`}
                    >
                        <Button variant={"outline"}>Copy memonic</Button>
                    </Link>
                    <AccountDeleteButton jwt={jwt} />
                </CardFooter>
            </Card>
        </div>
    );
}