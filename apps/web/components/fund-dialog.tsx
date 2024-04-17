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
import { ClientProvider, CryptoCurrencyCode, GetBuyUrlSchema, Network } from "@paybox/common"
import { accountAtom, clientAtom, quoteAtom } from "@paybox/recoil"
import React, { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import SolanaIcon from "./icon/SolanaIcon"
import EthIcon from "./icon/Eth";

import { cryptoIcon } from "./icon/icon"
import { BitcoinIcon } from "./icon/bitcoin"
import { ArrowUpDown, CaseUpperIcon } from "lucide-react"

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
    const client = useRecoilValue(clientAtom);
    const [quoteState, setQuoteAtom] = useRecoilState(quoteAtom);
    const [key, setKey] = useState<string>();
    const [amount, setAmount] = useState<number>(0)

    useEffect(() => {
        if (token == Network.Sol && account?.sol) {
            setKey(account.sol.publicKey);
        } else if (token == Network.Eth && account?.eth) {
            setKey(account.eth.publicKey);
        }
        setQuoteAtom({
            type: "fiat",
            amount: amount,
            token: "usd"
        })
    }, [token]);


    useEffect(() => {
        setQuoteAtom((old) => {
            return {
                ...old,
                amount
            }
        })
    }, [amount])

    function onSubmit(data: any) {

    }

    if (!token) {
        return <></>
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Fund {token.charAt(0).toLocaleUpperCase() + token.slice(1)} to your Account</DialogTitle>
                    <DialogDescription>
                        It's safe and secure to fund your account with {token.toUpperCase()} tokens.
                    </DialogDescription>
                    <div className="flex flex-col gap-y-2 items-center justify-center">
                        <div className="text-xl font-semibold">Buy {token.charAt(0)}{token.slice(1)}</div>
                        {token == Network.Sol ? <SolanaIcon className="w-12 h-12" /> : token == Network.Eth ? <EthIcon className="w-12 h-12" /> : <BitcoinIcon className="w-12 h-12" />}
                    </div>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div
                        className="dark:bg-primary-foreground border flex gap-x-4 px-4 py-[5px] rounded justify-start cursor-not-allowed"
                    >
                        <span className="text-white">
                            {account?.name}
                        </span>
                        <div className="text-muted-foreground">({key?.slice(0, 4)}...{key?.slice(key?.length - 5)})</div>
                    </div>
                    <div className="flex relative item-center justify-center ">
                        <Label
                            className="text-right absolute right-3 top-[10px] text-muted-foreground"
                        >{quoteState.type == "fiat" ? token.toLocaleUpperCase() : "USD"}</Label>
                        <Input
                            required
                            id="amount"
                            type="number"
                            placeholder="Amount"
                            onChange={(e) => {
                                setQuoteAtom((old) => {
                                    return {
                                        ...old,
                                        amount: Number(e.target.value)
                                    }
                                })
                            }}
                            className="w-full px-4 py-[5px] [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
                        />
                    </div>
                        <div
                            className="flex gap-x-1 px-2 text-muted-foreground items-center"
                            onClick={() => {
                                setQuoteAtom((old) => {
                                    return {
                                        ...old,
                                        type: old.type == "fiat" ? "crypto" : "fiat"
                                    }
                                });
                            }}>
                            <span>
                                {quoteState.type == "fiat" ? "$" : ""} {quoteState.amount} {quoteState.type == "crypto" ? token.toLocaleUpperCase() : ""}
                            </span>
                            <ArrowUpDown className="w-4 h-4" />
                        </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}