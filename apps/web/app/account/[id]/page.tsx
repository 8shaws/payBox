"use server"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";

import React from "react";
import { Tab } from "./tab";
import { CodeWrapper } from "./Code-wrapper";

interface PageProps {
    params: { id: string }
}
export default async function Page({
    params,
}: PageProps) {
    //todo: fetch all the monitor detaial like txn etc

    return (
        <>
            <div className="flex h-screen justify-around items-center p-5">
                <Card className="w-fit">
                    <CardHeader>
                        <CardTitle className="text-start items-center flex">{"Account Name" ? "QRcode" : <Skeleton className="w-[100px] h-[22px]" />} </CardTitle>
                        <CardDescription>Share this for accepting payment...</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-4 items-center justify-center">
                        <CodeWrapper accountId={params.id} />
                    </CardContent>
                    <CardFooter>
                        <p>Use this to accept transactions...</p>
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
                        />
                        <Tab
                            chain={"Ethereum"}
                            key={"eth"}
                        />
                    </CardContent>
                    <CardFooter>
                        <p>Footer</p>
                    </CardFooter>
                </Card>
            </div>

        </>
    );
}