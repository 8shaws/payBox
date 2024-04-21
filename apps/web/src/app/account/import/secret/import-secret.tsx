"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { toast } from "sonner"
const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})


import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card"
import { Button } from '@/src/components/ui/button';
import { BACKEND_URL, ChainAccount, GetAccount, responseStatus } from "@paybox/common"
import { Label } from "@/src/components/ui/label"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { clientJwtAtom, fromPhraseAccountAtom, importSecretAtom } from "@paybox/recoil"
import { cn } from "@/src/lib/utils"
import { isWord } from "@/src/lib/helper"
import { ITab } from "./wrapper"
import { useRouter } from "next/navigation"
import pako from "pako";


export const ImportSecret = ({
    jwt,
}: {
    jwt: string,
}) => {
    const router = useRouter();
    const clientJwt = useRecoilValue(clientJwtAtom);
    const setSecretPhraseAtom = useSetRecoilState(importSecretAtom);
    const setFromPhraseAtom = useSetRecoilState(fromPhraseAccountAtom);
    const [error, setError] = useState<{ msg: string, index: number } | null>(null);

    
    const [length, setLength] = useState<12 | 24>(12);
    const [secretPhrase, setSecretPhrase] = useState<string[]>([])
    const form = useForm<z.infer<typeof GetAccount>>({
        resolver: zodResolver(GetAccount),
        defaultValues: {
            count: 21,
        },
        resetOptions: {
            keepIsSubmitted: true,
            keepIsSubmitSuccessful: true,
            keepValues: true,
        }
    })

    function onSubmit(data: z.infer<typeof GetAccount>) {
        const call = async () => {
            // secretPhrase.map(async (word, index) => {
            //     const check = await isWord(word);
            //     if(!check) {
            //         setError({
            //             index,
            //             msg: "The memonic should contain valid words only..."
            //         });
            //         return;
            //     }
            // })
            const { status, accounts, msg }: { status: responseStatus, accounts: ChainAccount[], msg: string }
                = await fetch(`${BACKEND_URL}/account/fromPhrase`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${clientJwt}`,
                        "Content-Encoding": "gzip",
                    },
                    body: pako.gzip(JSON.stringify(data)),
                }).then(res => res.json());
            if (status === responseStatus.Error) {
                return Promise.reject(msg);
            }
            return Promise.resolve({ status, accounts, msg });
        }
        toast.promise(call(), {
            loading: "Getting accounts on this phrase...",
            success: ({ accounts, msg, status }) => {
                console.log(accounts)
                setSecretPhraseAtom(data.secretPhrase);
                setFromPhraseAtom(accounts)
                router.push(`/account/import/secret?tab=${ITab.Show}`)
                return "Gotcha!"
            },
            error: (msg) => {
                return msg
            }
        });
    }

    return (
        <>
            <Card className="w-[600px]">
                <CardHeader>
                    <CardTitle>Secret Recovery Phrase</CardTitle>
                    <CardDescription>Import an existing wallet with your 12 or 24 word secret recovery phrase...</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="secretPhrase"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="grid grid-cols-3 gap-3">
                                                {Array(length).fill(0).map((_, index) => (
                                                    <div className="flex flex-row justify-start px-4 items-center border border-input rounded-md focus-visible:ring-1 focus-visible:ring-ring">
                                                        <Label className="text-sm">{index + 1}.</Label>
                                                        <Input
                                                            {...field}
                                                            type="text"
                                                            value={secretPhrase[index] || ""}
                                                            className={cn(
                                                                error?.index === index && "border-red-500",
                                                                "text-start min-w-fit border-none hover:border-none focus-visible:ring-0"
                                                            )}
                                                            onChange={(e) => {
                                                                if (/^[a-zA-Z]*$/.test(e.target.value)) {
                                                                    const newPhrase = [...secretPhrase];
                                                                    newPhrase[index] = e.target.value;
                                                                    setSecretPhrase(newPhrase);
                                                                    setError(null);
                                                                } else {
                                                                    setError({
                                                                        index,
                                                                        msg: 'Input must be a single word with no spaces or special characters'
                                                                    });
                                                                }
                                                            }}
                                                            onPaste={(e) => {
                                                                e.preventDefault();
                                                                const pastedData = e.clipboardData.getData('text');
                                                                const words = pastedData.split(' ');
                                                                setSecretPhrase(words);
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                        </CardContent>
                        <CardFooter className="flex flex-col gap-y-2">
                            <Button
                                onClick={() => setLength((length) => length === 12 ? 24 : 12)}
                                className="bg-transparent hover:bg-transparent hover:text-primary text-muted-foreground underline-o"
                            >
                                I have a {length === 12 ? 24 : 12} recovery word phrase
                            </Button>
                            <Button type="submit" onClick={() => form.setValue("secretPhrase", secretPhrase.join(" "))}>Import Account</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>

        </>
    );
}
