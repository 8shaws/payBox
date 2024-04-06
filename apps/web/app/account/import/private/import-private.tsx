"use client";
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AccountType, BACKEND_URL, ImportAccountSecret, Network, WalletType, responseStatus } from "@paybox/common"
import SolanaIcon from "@/components/icon/SolanaIcon"
import EthIcon from "@/components/icon/Eth"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { accountsAtom, clientAtom } from "@paybox/recoil";
import pako from "pako";

export function PrivateKeyForm({
    jwt
}: {
    jwt: string
}) {
    const setAccounts = useSetRecoilState(accountsAtom);

    const form = useForm<z.infer<typeof ImportAccountSecret>>({
        resolver: zodResolver(ImportAccountSecret),
        defaultValues: {
            network: Network.Sol,
        },
        resetOptions: {
            keepIsSubmitSuccessful: false,
            keepErrors: true,
        },

    });

    const onSubmit = (data: z.infer<typeof ImportAccountSecret>) => {
        const call = async () => {
            const { status, msg, wallet }: {
                status: responseStatus,
                msg: string,
                wallet: WalletType
            } = await fetch(`${BACKEND_URL}/account/private`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`,
                    "Content-Encoding": "gzip",
                },
                body: pako.gzip(JSON.stringify(data)),
            }).then(res => res.json());
            if(status === responseStatus.Error) {
                return Promise.reject(msg)
            }
            return Promise.resolve({status, account: (wallet.accounts || {}) as AccountType})
        }
        toast.promise(call(), {
            loading: "Importing account...",
            success: ({status, account}) => {

                setAccounts((accounts) => {
                    if(accounts) {
                        return [...accounts, account]
                    }
                    return [account]
                })
                return "Account imported successfully"
            },
            error: (msg) => {
                return msg
            }
        })
    }

    return (
        <Card className="w-fit">
            <CardHeader>
                <CardTitle>Import From Private Key</CardTitle>
                <CardDescription>Add your solana or ethereum account using its private key.</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <CardContent className="flex flex-col gap-y-4">
                        <FormField
                            control={form.control}
                            name="network"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Chain</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select the chain for private key..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="w-full">
                                            <SelectItem value={Network.Sol} className="">
                                                <div className="flex flex-row gap-x-3 items-center justify-start">
                                                    <SolanaIcon className="h-5 w-5" />
                                                    <div className="">Solana</div>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value={Network.Eth} className="">
                                                <div className="flex flex-row gap-x-3 items-center justify-start">
                                                    <EthIcon className="h-5 w-5" />
                                                    <div className="">Ethereum</div>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Don't worry about the network, you can change it later...
                                        {/* todo: add link for changing network */}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Account Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            required
                                            placeholder="Account name..."
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="secretKey"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Private key</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Private key..."
                                            rows={2}
                                            required
                                            className="resize-none w-full min-w-max"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="submit">Import</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
