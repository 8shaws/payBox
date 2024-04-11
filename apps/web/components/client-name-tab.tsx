"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { UserRound, Wallet } from 'lucide-react';
import { accountsAtom, clientAtom } from "@paybox/recoil";
import { useRecoilValue } from "recoil";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface ClientNameTabProps {
    isCollapsed: boolean
}

export function ClientNameTab({
    isCollapsed,
}: ClientNameTabProps) {

    const client = useRecoilValue(clientAtom);
    const router = useRouter();

    if (isCollapsed) {
        return (

            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>

                    <Button onClick={() => router.push("/profile")} variant={"link"}>
                        <Avatar className="hidden h-7 w-7 sm:flex">
                            <AvatarImage src={`/avatars/0${Math.floor(Math.random() * 5 + 1)}.png`} alt="Avatar" />
                            <AvatarFallback>{client?.firstname?.charAt(0).toLocaleUpperCase()}{client?.lastname?.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4 relative right-1">
                    <span className="mr-auto text-muted-foreground">
                        <UserRound className="w-4 h-4"/>
                    </span>
                    {client?.firstname}
                </TooltipContent>
            </Tooltip>
        );
    }

    return (
        <Card
            className="border-none flex justify-start px-6 cursor-pointer "
            onClick={() => router.push("/profile")}
        >
            <CardHeader className="flex flex-row items-center justify-start gap-x-4 w-full  p-0 rounded-lg">
                <Avatar className="hidden h-7 w-7 sm:flex">
                    <AvatarImage src={`/avatars/0${Math.floor(Math.random() * 5 + 1)}.png`} alt="Avatar" />
                    <AvatarFallback>{client?.firstname?.charAt(0).toLocaleUpperCase()}{client?.lastname?.charAt(0)}</AvatarFallback>
                </Avatar>
                {client ? <div className="">
                    <CardTitle>{client.firstname}</CardTitle>
                    <CardDescription>{client.username}</CardDescription>
                </div> :
                    <Skeleton className="w-[200px] h-[30px]" />
                }
            </CardHeader>
        </Card>
    )
}