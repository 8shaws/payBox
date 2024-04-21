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

interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
export default async function Page({
    searchParams
}: PageProps) {
    //todo: fetch all the monitor detaial like txn etc
   console.log(searchParams)

    return (
        <>
            <div className="flex flex-col h-screen justify-around items-center p-5">
                Hol {searchParams["transactionId"]}
            </div>

        </>
    );
}