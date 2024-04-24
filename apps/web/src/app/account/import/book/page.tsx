import { getServerSession } from "next-auth"
import { authOptions } from "../../../api/auth/[...nextauth]/util";
import { getAddressbook, rmAddress } from "@/src/actions/book";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/src/components/ui/avatar"

import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { AddressBook, Network } from "@paybox/common";
import { Separator } from "@/src/components/ui/separator";
import { getIcon } from "@/src/actions/icon";
import { cn } from "@/src/lib/utils";
import RemoveButton from "./component/rm-button";



export default async function Page({
    params
}: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const jwt = session?.user.jwt as string;

    const book = await getAddressbook(jwt);

    return (
        <div className="flex justify-center items-center h-full">
            <Card className="w-[450px]">
                <CardHeader>
                    <CardTitle>Address Book</CardTitle>
                    <CardDescription>A currated list of your stored address...</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-72 w-full rounded-md border">
                        <div className="flex flex-col">
                            {book && book.map((address: AddressBook) => {
                                const icon = getIcon(address.chain);
                                return (

                                    <Dialog>
                                        <DialogTrigger>
                                            <Button
                                                variant={"ghost"}
                                                key={address.id}
                                                className="flex gap-x-4 rounded-none w-full h-fit py-4"
                                            >
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shawakash.pn" alt="@shadcn" />
                                                    <AvatarFallback>{address.name.slice(0, 2).toLocaleUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <div className="">
                                                    <p className="text-base h-1/2 font-semibold w-full text-start">{address.name}</p>
                                                    <p className="text-muted-foreground w-full h-1/2 text-start font-normal">{address.publicKey.slice(0, 4) + "..." + address.publicKey.slice(address.publicKey.length - 4)}</p>
                                                </div>
                                                <div className="flex flex-grow" />
                                                <div className="">
                                                    <icon.icon className="w-6 h-6" />
                                                </div>
                                            </Button>
                                            <Separator />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Address</DialogTitle>
                                            </DialogHeader>
                                            <DialogFooter className="w-full h-fit flex sm:flex-col gap-y-2">
                                                <DialogClose>
                                                    <RemoveButton jwt={jwt} id={address.id} />
                                                </DialogClose>
                                                <div className="flex w-full flex-row gap-x-4">
                                                    <Button variant={"secondary"} className="w-1/2">
                                                        Cancel
                                                    </Button>
                                                    <DialogClose className="w-1/2">
                                                        <Button className="w-full">Close</Button>
                                                    </DialogClose>
                                                </div>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                )
                            })}
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter>
                    <p>Made with 💙 love by Paybox</p>
                </CardFooter>
            </Card>

        </div>
    );
}
