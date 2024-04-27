"use server"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card"
import { Skeleton } from "@/src/components/ui/skeleton";

import React from "react";
import { Tab } from "./tab";
import { CodeWrapper } from "./components/Code-wrapper";
import { Share } from "./components/share";
import { CLIENT_URL, Network } from "@paybox/common";
import BuyButton from "./components/buy-button";
import { loadMoonPay } from '@moonpay/moonpay-js';
import TransferButton from "./components/tsf-btn";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/src/components/ui/tooltip"


interface PageProps {
    params: { id: string }
}
export default async function Page({
    params,
}: PageProps) {
    //todo: fetch all the monitor detaial like txn etc


    return (
        <>
            <div className="flex flex-col h-fit justify-start gap-y-10 items-center p-5">
                <div className="flex justify-around w-1/3">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <BuyButton />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Fund your Wallet with tokens</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <TransferButton />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Transfer Tokens from your account</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </div>
                <div className="flex w-full justify-around items-center">
                    <Card className="w-fit">
                        <CardHeader>
                            <CardTitle className="text-start items-center flex">{"Account Name" ? "QRcode" : <Skeleton className="w-[100px] h-[22px]" />} </CardTitle>
                            <CardDescription>Share this for accepting payment...</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-y-4 items-center justify-center">
                            <CodeWrapper accountId={params.id} />
                        </CardContent>
                        <CardFooter>
                            <Share title="Account Transactions" url={`${CLIENT_URL}/txn/accept?to=${params.id}`} />
                        </CardFooter>
                    </Card>
                    <Card className="w-[500px] ">
                        <CardHeader>
                            <CardTitle className="w-[100px] h-[22px] text-start items-center flex">{"Account Name" ? "Account" : <Skeleton className="w-[100px] h-[22px]" />} </CardTitle>
                            <CardDescription>Multi chain Web3 Account by Paybox</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-y-4">
                            <Tab
                                chain={"Solana"}
                                key={"sol"}
                                net={Network.Sol}
                            />
                            <Tab
                                chain={"Ethereum"}
                                key={"eth"}
                                net={Network.Eth}
                            />
                            <Tab
                                chain={"Bitcoin"}
                                key={"btc"}
                                net={Network.Bitcoin}
                            />
                        </CardContent>
                        <CardFooter>
                            <p>Footer</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>

        </>
    );
}