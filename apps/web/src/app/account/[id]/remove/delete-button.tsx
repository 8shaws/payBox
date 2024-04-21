"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog"
import { Button } from "@/src/components/ui/button"
import { cn } from "@/src/lib/utils"
import { BACKEND_URL, responseStatus } from "@paybox/common"
import { accountAtom, accountsAtom } from "@paybox/recoil"
import { Trash2 } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useRecoilState, useSetRecoilState } from "recoil"
import { toast } from "sonner"


export function AccountDeleteButton({
    jwt
}: {
    jwt: string,
}) {
    const pathname = usePathname();
    const router = useRouter();
    const setAccounts = useSetRecoilState(accountsAtom);
    const [account, setAccount] = useRecoilState(accountAtom);
    

    const onDialogAction = async () => {
        const { status, msg }: { status: responseStatus, msg: string }
            = await fetch(`${BACKEND_URL}/accounts?accountId=${pathname.split('/')[3]}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            }).then(res => res.json());
        if (status == responseStatus.Error) {
            return Promise.reject(msg);
        }
        return Promise.resolve({ status, msg })
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Remove</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account though you can import the account again in any web3 wallet using its memonic.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button variant={"default"} onClick={() => {
                        toast.promise(onDialogAction, {
                            loading: "Deleting Account...",
                            success({ status, msg }) {
                                router.push("/account");
                                setAccounts((prev) => {
                                    if(prev) {
                                        return prev.filter((acc) => acc.id != account?.id);
                                    }
                                    return prev;
                                });
                                setAccount(null);
                                return msg;
                            },
                            error: (msg) => {
                                return msg;
                            }
                        });
                    }}>
                        <Trash2 className={cn("h-4 w-4 mr-3",)} />
                        Remove
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
