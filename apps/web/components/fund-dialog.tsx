import { Button } from "@/components/ui/button"
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
import { Network } from "@paybox/common"
import { accountAtom } from "@paybox/recoil"
import React, { useEffect } from "react"
import { useRecoilValue } from "recoil"
import SolanaIcon from "./icon/SolanaIcon"
import EthIcon from "./icon/Eth"

export function FundDialog({
    open,
    setOpen,
    token
}: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    token: Network,
}) {
    const account = useRecoilValue(accountAtom);
    const [tabData, setTabData] = React.useState<{
        name: string,
        publicKey: string,
        icon: React.ElementType,
        value: "Solana" | "Ethereum" | "Bitcoin",
        selectedCurrency: "USD" | "SOL" | "ETH" | "BTC"
    } | null>(null);
    const ref = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (token == Network.Sol && account?.sol) {
            setTabData({
                name: account?.name,
                publicKey: account?.sol.publicKey,
                icon: SolanaIcon,
                value: "Solana",
                selectedCurrency: "SOL"
            })
        } else if (token == Network.Eth && account?.eth) {
            setTabData({
                name: account?.name,
                publicKey: account?.eth.publicKey,
                icon: EthIcon,
                value: "Ethereum",
                selectedCurrency: "ETH"
            })
        }
    }, [token]);

    const getUrl = async () => {
        if(ref.current?.value) {
            //todo: fetch the api to get the url
            const call = async () => {

            }
            console.log(ref.current.value)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Fund your {tabData?.value} Account</DialogTitle>
                    <DialogDescription>
                        It's safe and secure to fund your account with {tabData?.value} tokens.
                    </DialogDescription>
                    <div className="flex flex-col gap-y-2 items-center justify-center">
                        <div className="text-xl font-semibold">Buy {tabData?.value}</div>
                        {tabData && <tabData.icon className="w-12 h-12" />}
                    </div>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div
                        className="dark:bg-primary-foreground border flex gap-x-4 px-4 py-[5px] rounded justify-start cursor-not-allowed"
                    >
                        <span className="text-white">
                            {tabData?.name}
                        </span>
                        <div className="text-muted-foreground">({tabData?.publicKey.slice(0, 4)}...{tabData?.publicKey.slice(tabData.publicKey.length - 5)})</div>
                    </div>
                    <div className="flex relative items-center ">
                        <Label htmlFor="username" className="text-right absolute right-3 text-muted-foreground">
                            {tabData?.selectedCurrency}
                        </Label>
                        <Input
                            ref={ref}
                            required
                            id="amount"
                            type="number"
                            placeholder="Amount"
                            className="w-full px-4 py-[5px] [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={getUrl} type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}