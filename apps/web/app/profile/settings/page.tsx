import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/util";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge"; import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { Terminal } from "lucide-react";
import TestModeSwitch from "./components/test-mode";



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

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Settings</h3>
                    <p className="text-sm text-muted-foreground">
                        Configure your {" "}
                        <Badge variant={"secondary"}>Account</Badge>  settings{" "}.
                    </p>
                </div>
                <Separator />
                <Dialog>
                    <DialogTrigger asChild className="w-2/3">
                        <Button variant="secondary" className="flex gap-x-2 justify-start">
                            <Terminal className="w-4 h-4" />
                            Developer Settings
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader className=" flex flex-row justify-between items-center">
                            <div className="w-2/3">
                                <DialogTitle>Test Mode</DialogTitle>
                                <DialogDescription>
                                    This is applicable to balances and connections.
                                </DialogDescription>

                            </div>
                            <TestModeSwitch />
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {/* <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input id="name" value="Pedro Duarte" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Username
                                </Label>
                                <Input id="username" value="@peduarte" className="col-span-3" />
                            </div> */}
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

        </main>
    );
}