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

interface PageProps {
    params: { id: string }
}
export default async function Page({
    params,
}: PageProps) {
    //todo: fetch all the monitor detaial like txn etc

    return (
        <>
        <div className="flex h-screen justify-center items-center p-5">
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
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
            
        </>
    );
}