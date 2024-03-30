"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { toast } from "sonner";
import React, { useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AccountGetPrivateKey, BACKEND_URL, SecretValid, responseStatus } from "@paybox/common"
import { CardContent, CardFooter } from "@/components/ui/card"
import { decryptWithPassword } from "@/lib/helper"
import { useRecoilValue } from "recoil"
import { accountAtom } from "@paybox/recoil"
import { SecretPhraseDialogBox } from "./secret-dialog-box"


export const SecretPhraseForm = ({
    accountId,
    jwt
}: {
    accountId: string,
    jwt: string
}) => {

    const [checked, setChecked] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);
    const account = useRecoilValue(accountAtom);
    const [seed, setSeed] = React.useState<string | null>(null);

    const form = useForm<z.infer<typeof SecretValid>>({
        resolver: zodResolver(SecretValid),
        defaultValues: {
            password: "",
        },
    });

    useEffect(() => {
        if(account?.walletId) {
            form.setValue("walletId", account?.walletId);
        }
    }, [account]);

    function onSubmit(data: z.infer<typeof SecretValid>) {
        const call = async () => {
            const {status, secret, msg, hashPassword}: {
                status: responseStatus, secret: string, msg: string, hashPassword: string
            } = await fetch(`${BACKEND_URL}/wallet/secret`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                },
                body: JSON.stringify(data),
                cache: "no-store"
            }).then(res => res.json());
            if (status == responseStatus.Error) {
               return Promise.reject(msg);
            }
            return {status, secret, msg, hashPassword};
        }

        toast.promise(call(), {
            loading: "Fetching Private Key...",
            success: ({status, secret, hashPassword}) => {
                // todo: decrypt it
                setOpen(true);
                setTimeout(() => {
                }, 1000);
                setSeed(secret);
                return "Seed fetched Successfully!";
            },
            error: (error) => {
                return error;
            }
        });
    }

    const setCheckedFn = (check: boolean) => {
        setChecked(check)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Your Password..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex flex-col gap-y-5">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="terms_for_privateKey"
                                checked={checked}
                                onCheckedChange={setCheckedFn}
                            />
                            <label
                                htmlFor="terms_for_privateKey"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I will not share my private key with anyone, including PayBox.
                            </label>
                        </div>
                        <Button className="w-full" disabled={!checked} type="submit">Submit</Button>
                    </CardFooter>
                </form>
            </Form>
            {open &&
                <SecretPhraseDialogBox
                    open={open}
                    setOpen={setOpen}
                    seed={seed}
                />
                }
        </>
    )
}


