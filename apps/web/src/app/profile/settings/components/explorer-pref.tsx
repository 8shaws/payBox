"use client";

import React, { useEffect } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { Button } from '@/src/components/ui/button';
import { CheckCheck, Sprout } from 'lucide-react';
import { ScrollArea } from '@/src/components/ui/scroll-area';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card"
import SolanaIcon from '@/src/components/icon/SolanaIcon';
import { btcExpObj, ethExpObj, solExpObj } from '@/src/lib/utils';
import { Separator } from '@/src/components/ui/separator';
import EthIcon from '@/src/components/icon/Eth';
import { BitcoinIcon } from '@/src/components/icon/bitcoin';
import { ExplorerPref, SolExplorer } from '@paybox/common';
import { useRecoilState, useRecoilValue } from 'recoil';
import { clientJwtAtom, expPrefAtom, useJwt } from '@paybox/recoil';
import { toast } from 'sonner';
import { putExpPref } from '@/src/lib/helper';


const Explore = ({
    pref
}: {
    pref: ExplorerPref
}) => {
    const [open, setOpen] = React.useState(false);
    const [expPref, setExpPref] = useRecoilState(expPrefAtom);
    const jwt = useJwt();

    

    useEffect(() => {
        if (pref.solExp) {
            setExpPref(pref);
        }
    }, [pref]);

    const handleChange = () => {
        
        if(expPref.solExp === pref.solExp && expPref.ethExp === pref.ethExp && expPref.btcExp === pref.btcExp){
            setOpen(false);
            toast.message('No changes observed...');
            return;
        }

        toast.promise(putExpPref(jwt as string, expPref), {
            loading: 'Saving...',
            success: ({status}) => {
                return 'Explorer preference saved'
            },
            error: ({msg}) => {
                setExpPref(pref);
                return msg
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="w-2/3">
                <Button variant="secondary" className="flex gap-x-2 justify-between">
                    Explorer Preference
                    <Sprout className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className=" flex flex-row justify-between items-center">
                    <div className="w-11/12 flex flex-col gap-y-2">
                        <DialogTitle>
                            <span className="font-bold">Explore preference</span>
                        </DialogTitle>
                        <DialogDescription>
                            Preference for your explorer...
                        </DialogDescription>
                    </div>
                </DialogHeader>
                <ScrollArea className='h-72 rounded-lg py-2 '>
                    <Card className='border-none mb-5'>
                        <CardHeader className='px-0 py-2'>
                            <CardTitle className='flex gap-x-4 text-start font-semibold'>
                                <SolanaIcon className="w-5 h-5" />
                                Solana
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='border rounded-lg p-0'>
                            {solExpObj.map(({ label, value }) => {
                                return (
                                    <>
                                        <Button
                                            key={value}
                                            variant={"ghost"}
                                            className="w-full flex justify-between rounded-none"
                                            onClick={() => {
                                                setExpPref({
                                                    ...expPref,
                                                    solExp: value
                                                })
                                            }}
                                        >
                                            <span>{label}</span>
                                            {expPref.solExp === value ? <CheckCheck className='w-4' /> : ""}
                                        </Button>
                                        <Separator />
                                    </>
                                )
                            })}
                        </CardContent>
                    </Card>
                    <Card className='border-none  mb-5'>
                        <CardHeader className='px-0 py-2'>
                            <CardTitle className='flex gap-x-4 text-start font-semibold'>
                                <EthIcon className="w-5 h-5" />
                                Ethereum
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='border rounded-lg p-0'>
                            {ethExpObj.map(({ label, value }) => {
                                return (
                                    <>
                                        <Button
                                            key={value}
                                            variant={"ghost"}
                                            className="w-full flex justify-between rounded-none"
                                            onClick={() => {
                                                setExpPref({
                                                    ...expPref,
                                                    ethExp: value
                                                })
                                            }}
                                        >
                                            <span>{label}</span>
                                            {expPref.ethExp === value ? <CheckCheck className='w-4' /> : ""}
                                        </Button>
                                        <Separator />
                                    </>
                                )
                            })}
                        </CardContent>
                    </Card>
                    <Card className='border-none'>
                        <CardHeader className='px-0 py-2'>
                            <CardTitle className='flex gap-x-4 text-start font-semibold'>
                                <BitcoinIcon className="w-5 h-5" />
                                Bitcoin
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='border rounded-lg p-0'>
                            {btcExpObj.map(({ label, value }) => {
                                return (
                                    <>
                                        <Button
                                            key={value}
                                            variant={"ghost"}
                                            className="w-full flex justify-between rounded-none"
                                            onClick={() => {
                                                setExpPref({
                                                    ...expPref,
                                                    btcExp: value
                                                })
                                            }}
                                        >
                                            <span>{label}</span>
                                            {expPref.btcExp === value ? <CheckCheck className='w-4' /> : ""}
                                        </Button>
                                        <Separator />
                                    </>
                                )
                            })}
                        </CardContent>
                    </Card>

                </ScrollArea>
                <DialogFooter className="w-full gap-x-2">
                    <DialogClose className="w-full">
                        <Button className="w-full" onClick={handleChange}>
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Explore