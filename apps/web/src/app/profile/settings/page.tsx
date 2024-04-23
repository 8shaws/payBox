import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/util";
import { redirect } from "next/navigation";
import { Separator } from "@/src/components/ui/separator";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button"

import { BookA, Languages } from "lucide-react";
import TestModeSwitch from "./components/test-mode";
import LocaleButton from "./components/locale-btn";
import { BACKEND_URL, ClientWithJwt, Locales, Settings, responseStatus } from "@paybox/common";
import ChangePassword from "./components/change-password";
import SetClientJwtWrapper from "@/src/components/set-client-jwt-wrapper";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";



const getSettings = async (jwt: string) => {
    try {
        const { status, settings, msg }:
            { status: responseStatus, settings: any, msg?: string }
            = await fetch(`${BACKEND_URL}/settings/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "content-encoding": "gzip",
                    authorization: `Bearer ${jwt}`,
                },
                cache: "no-cache"
            }).then(res => res.json());
        if (status === responseStatus.Error) {
            console.log(msg)
            return null;
        }
        return settings;
    } catch (error) {
        console.log(error);
        return null
    }
}

const getAddressbook = async (jwt: string) => {
    try {
        const { status, book, msg }:
            { status: responseStatus, book: any, msg?: string }
            = await fetch(`${BACKEND_URL}/book/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${jwt}`,
                },
                cache: "no-cache"
            }).then(res => res.json());
        if (status === responseStatus.Error) {
            console.log(msg)
            return null;
        }
        return book;
    } catch (error) {
        console.log(error);
        return null
    }

}

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
    const book = await getAddressbook(jwt);

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
                                    <div className="w-5/6 flex flex-col gap-y-2">
                                        <DialogTitle>Address Book</DialogTitle>
                                        <DialogDescription>
                                            Save you most used addresses here...
                                        </DialogDescription>
                                    </div>
                                </DialogHeader>
                                <div className="flex flex-col gap-y-2">
                                    {book && book.map((b: any) => (
                                        <Button variant={"secondary"} key={b.id} className="flex justify-between">
                                            <span>{b.name}</span>
                                            <span>{b.publicKey}</span>
                                        </Button>
                                    ))}
                                </div>
                                <DialogClose>
                                    <Button>
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

            </main>
        </SetClientJwtWrapper>
    );
}