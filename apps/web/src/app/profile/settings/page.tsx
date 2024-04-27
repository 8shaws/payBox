import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/util";
import { redirect } from "next/navigation";
import { Separator } from "@/src/components/ui/separator";
import { Badge } from "@/src/components/ui/badge";
import { Button, buttonVariants } from "@/src/components/ui/button"

import { BookA, Languages, Plus, Sprout } from "lucide-react";
import TestModeSwitch from "./components/test-mode";
import LocaleButton from "./components/locale-btn";
import { BACKEND_URL, ClientWithJwt, Locales, Settings, responseStatus } from "@paybox/common";
import ChangePassword from "./components/change-password";
import SetClientJwtWrapper from "@/src/components/set-client-jwt-wrapper";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { cn } from "@/src/lib/utils";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import Link from "next/link";
import { getAddressbook } from "@/src/actions/book";
import { getSettings } from "@/src/actions/settings";
import Explore from "./components/explorer-pref";



export default async function Home({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const session = await getServerSession(authOptions);

    //@ts-ignore
    const jwt = session?.user.jwt as string;
    if (!session || !session.user || !session.user?.email || !jwt) {
        redirect("/signup");
    }
    const settings = await getSettings(jwt);
    if(!settings) {
        redirect("/signup");
    }
    const book = await getAddressbook(jwt);
    // const pref = await getPref(jwt);

    const layout = cookies().get("react-resizable-panels:layout");
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
    return (
        <SetClientJwtWrapper client={session.user as ClientWithJwt}>
            <main className="flex h-[calc(100dvh)] flex-col w-full">

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium">Settings</h3>
                        <p className="text-sm text-muted-foreground">
                            Configure your {" "}
                            <Badge variant={"secondary"}>Account</Badge>  settings{" "}.
                        </p>
                    </div>
                    <Separator />
                    {settings && <TestModeSwitch
                        testMode={settings?.testmode}
                        nets={{
                            btcNet: settings?.btcNet,
                            ethNet: settings?.ethNet,
                            solNet: settings?.solNet
                        }}
                    />}
                    <div className="flex w-2/3 items-center space-x-2">
                        <Button className="gap-x-2 px-2 cursor-none">
                            <Languages className="w-5 h-5" />
                            <span className="font-bold">
                                Locale
                            </span>
                        </Button>
                        <LocaleButton locale={settings?.locale as Locales} />
                    </div>
                    <ChangePassword />
                    <div className="">
                        <Dialog>
                            <DialogTrigger asChild className="w-2/3">
                                <Button variant="secondary" className="flex gap-x-2 justify-between">
                                    Address Book
                                    <BookA className="w-4 h-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader className=" flex flex-row justify-between items-center">
                                    <div className="w-11/12 flex flex-col gap-y-2">
                                        <DialogTitle>
                                            <span className="font-bold">Address Book</span>
                                        </DialogTitle>
                                        <DialogDescription>
                                            Save you most used addresses here...
                                        </DialogDescription>
                                    </div>
                                </DialogHeader>
                                <ScrollArea>
                                    <div className="flex flex-col gap-y-2">
                                        {book && book.map((b: any) => (
                                            <Button variant={"secondary"} key={b.id} className="flex justify-between">
                                                <span>{b.name}</span>
                                                <span>{b.publicKey}</span>
                                            </Button>
                                        ))}
                                    </div>
                                </ScrollArea>
                                <DialogFooter className="w-full gap-x-2">
                                    <Link
                                        href={"/account/import/book"}
                                        target="_self"
                                        rel="noreferrer"
                                        className="w-1/2"
                                    >
                                        <div
                                            className={cn(
                                                buttonVariants({
                                                    variant: "secondary",
                                                }),
                                                "w-full px-0 mr-1 gap-x-2 flex justify-center items-center"
                                            )}
                                        >
                                            <Plus className="h-4 w-4" />
                                            <span>Add Address</span>
                                            <span className="sr-only">Add Address</span>
                                        </div>
                                    </Link>
                                    <DialogClose className="w-1/2">
                                        <Button className="w-full">
                                            Close
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="">
                        <Explore pref={{
                            btcExp: settings.btcExp,
                            ethExp: settings.ethExp,
                            solExp: settings.solExp
                        }} />
                    </div>
                </div>

            </main>
        </SetClientJwtWrapper>
    );
}