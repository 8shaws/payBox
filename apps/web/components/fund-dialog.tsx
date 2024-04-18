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
import { BACKEND_URL, ClientProvider, CryptoCurrencyCode, GetBuyUrlSchema, Network, responseStatus } from "@paybox/common"
import { accountAtom, clientAtom, clientJwtAtom, fetchQuote, getQuote, quoteAtom, useQuote } from "@paybox/recoil"
import React, { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import SolanaIcon from "./icon/SolanaIcon"
import EthIcon from "./icon/Eth";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { cryptoIcon } from "./icon/icon"
import { BitcoinIcon } from "./icon/bitcoin"
import { ArrowUpDown, CaseUpperIcon } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

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
    const jwt = useRecoilValue(clientJwtAtom);
    const [quoteState, setQuoteAtom] = useRecoilState(quoteAtom);
    const [key, setKey] = useState<string>();
    const [amount, setAmount] = useState<number>(0);
    const router = useRouter();
    const rate = useQuote({
        quoteCurrencyAmount: 0,
        areFeesIncluded: false,
        currencyCode: token || "eth"
    });

    const quoteValue = useRecoilValue(getQuote);

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

    function onSubmit() {
        const call = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/buy/`, {
                    method: "post",
                    headers: {
                        'Content-type': "application/json",
                        Authorization: `Bearer ${jwt}`
                    },
                    body: JSON.stringify({
                        clientPlatform: ClientProvider.MoonPay,
                        amount,
                        type: quoteState.type == "crypto" ? "fiat" : "crypto",
                        defaultCurrencyCode: token,
                        walletAddress: key,
                        email: client?.email,
                        accountId: account?.id
                    })
                }).then(res => res.json());
                if(response.status === responseStatus.Error) {
                    return Promise.reject({msg: response.msg});
                }
                return Promise.resolve({url: response.url})
            } catch (error) {
                console.log(error);
                return Promise.reject({ msg: "Internal Error" })
            }
        };

        toast.promise(call(), {
            loading: "Getting the url...",
            success: ({url}) => {
                router.push(url);
                return 'Redirecting to Payment Portal...';
            },
            error: ({msg}) => {
                return msg;
            }
        });

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
                                setAmount(Number(e.target.value))
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
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex gap-x-1 px-2 text-muted-foreground items-center hover:underline cursor-pointer">
                                        <span>
                                            {quoteState.type == "fiat" ? "$" : ""} {quoteValue} {quoteState.type == "crypto" ? token.toLocaleUpperCase() : ""}
                                        </span>
                                        <ArrowUpDown className="w-4 h-4" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Quote for {token.charAt(0).toLocaleUpperCase()+token.slice(1)} with Usd</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={onSubmit}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}