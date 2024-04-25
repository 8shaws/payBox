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
import React, { use } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select"


import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button, buttonVariants } from '@/src/components/ui/button';
import { Plus, SquarePen, Unlink } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { AddressBook, BACKEND_URL, InsertAddressBook, Network, chains, responseStatus } from "@paybox/common"
import Link from "next/link"
import { Textarea } from "@/src/components/ui/textarea"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { booksAtom, clientJwtAtom } from "@paybox/recoil"
import { toast } from "sonner"
import Pako from "pako"

function AddAddressBook({
    type,
    open,
}: {
    type: "plus" | "button",
    open?: boolean,
}) {

    const jwt = useRecoilValue(clientJwtAtom);
    const setBook = useSetRecoilState(booksAtom);

    const form = useForm<z.infer<typeof InsertAddressBook>>({
        resolver: zodResolver(InsertAddressBook),
        defaultValues: {
            chain: Network.Sol
        },
    });

    function onSubmit(data: z.infer<typeof InsertAddressBook>) {
        console.log(data);
        const call = async () => {
            try {
                const { status, msg, id }: {
                    status: responseStatus,
                    msg?: string,
                    id: string
                } = await fetch(`${BACKEND_URL}/book/`, {
                    method: "post",
                    headers: {
                        authorization: `Bearer ${jwt}`,
                        'Content-type': 'application/json',
                        'Content-Encoding': 'gzip'
                    },
                    body: Pako.gzip(JSON.stringify(data))
                }).then(res => res.json());

                if (status == responseStatus.Error) {
                    return Promise.reject({ msg });
                }
                return Promise.resolve({ id });

            } catch (error) {
                console.log(error);
                return Promise.reject({ msg: "Internal server error" });
            }
        }

        toast.promise(call(), {
            loading: "Adding address...",
            success: ({ id }) => {
                setBook((old) => [...old, { ...data, id } as AddressBook]);
                return "Address added";
            },
            error: ({ msg }) => {
                return msg;
            }
        });
    }


    return (
        <Dialog defaultOpen={open}>

            <DialogTrigger>
                {type == "button" ?
                    <Button variant={"default"} className="w-full h-fit">
                        Add Address to your Book
                    </Button>
                    :
                    <div
                        className={cn(
                            buttonVariants({
                                variant: "ghost",
                            }),
                            "px-2"
                        )}
                    >

                        <Plus size={20} className='text-muted-foreground' />
                    </div>
                }
            </DialogTrigger>
            <DialogContent className="space-y-4">
                <DialogHeader>
                    <DialogTitle>Add Address</DialogTitle>
                    <DialogDescription>
                        Save your frequently used address to your address book...
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8">
                        <FormField
                            control={form.control}
                            name="chain"
                            render={({ field }) => (
                                <FormItem >
                                    <div className="flex gap-x-4 justify-between items-center">

                                        <Button className="gap-x-2 px-2 w-1/5 cursor-none">
                                            <Unlink className="w-4 h-4" />
                                            <span className="text-xs">
                                                Network
                                            </span>
                                        </Button>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a verified email to display" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {chains.map(({ label, value }) => (
                                                    <SelectItem key={value} value={value}>
                                                        {label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <FormDescription>
                                        Network of the storing address...
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem >
                                    <div className="flex gap-x-4 justify-between items-center">

                                        <Button className="gap-x-2 w-1/5 px-1 cursor-none">
                                            <SquarePen className="w-4 h-4" />
                                            <span className="text-xs">
                                                Name
                                            </span>
                                        </Button>
                                        <Input

                                            placeholder="Label for the address..."
                                            {...field}
                                        />

                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="publicKey"
                            render={({ field }) => (
                                <FormItem >
                                    <div className="flex gap-x-4 justify-between items-center">
                                        <Textarea
                                            placeholder="Address..."
                                            className="resize-none"
                                            {...field}
                                        />

                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="w-full flex justify-between gap-x-3">
                            <DialogClose className="w-full">
                                <Button className="w-full" variant="secondary">Cancel</Button>
                            </DialogClose>
                            <Button className="w-full" type="submit">Submit</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddAddressBook