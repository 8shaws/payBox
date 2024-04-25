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

import { PlusCircle } from "lucide-react";
import AddAddressBook from "./component/add-address";
import { Wrapper } from "../../warpLayout";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import ShowBook from "./component/show-book";



export default async function Page({
    params,
    searchParams
}: {
    params: { id: string },
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/signup');
    }

    //@ts-ignore
    const jwt = session?.user.jwt as string;

    const book = await getAddressbook(jwt);

    return (
        <Wrapper session={session} >
            <div className="flex justify-center items-center h-full">
                <Card className="w-[450px] h-fit">
                    <CardHeader className="pt-4">
                        <CardTitle className="flex justify-between items-center pt-0">
                            <p className="text-center text-lg">Address Book</p>
                            <div className="">
                                <AddAddressBook type="plus" open={searchParams.open == "true" ? true : false} />
                            </div>
                        </CardTitle>
                        <CardDescription>A currated list of your stored address...</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {book.length > 0 ?
                            <ShowBook book={book} />
                            :
                            <div className="flex flex-col justify-center items-center h-72 w-full gap-y-12">
                                <div className="flex flex-col items-center justify-center gap-y-4">
                                    <PlusCircle className="w-10 h-10" />
                                    <div className="space-y-1">
                                        <p className="text-center">Your Address Book is empty</p>
                                        <p className="text-center text-muted-foreground">Click on the '+' or 'Add Address' button to save frequently used address...</p>
                                    </div>
                                </div>
                                <AddAddressBook type="button" />
                            </div>
                        }
                    </CardContent>
                    <CardFooter>
                        <p>Made with 💙 love by Paybox</p>
                    </CardFooter>
                </Card>

            </div>
        </Wrapper>
    );
}
