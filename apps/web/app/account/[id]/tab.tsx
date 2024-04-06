"use client"
import EthIcon from '@/components/icon/Eth'
import SolanaIcon from '@/components/icon/SolanaIcon'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { CopyIcon, DollarSign, QrCode, Text } from 'lucide-react'
import React, { useEffect } from 'react'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import { useRecoilValue } from 'recoil'
import { accountAtom } from '@paybox/recoil'
import { QRCode } from 'react-qrcode-logo'

export const Tab = ({
    chain,
}: {
    chain: "Solana" | "Ethereum" | undefined,
}) => {
    const account = useRecoilValue(accountAtom);
    const [tabData, setTabData] = React.useState<{
        publicKey: string | undefined,
        name: string | undefined
    }>()

    useEffect(() => {
        if (account) {
            if (chain === "Ethereum") {
                setTabData({
                    name: account?.name,
                    publicKey: account?.eth.publicKey
                });
            } else {
                setTabData({
                    name: account?.name,
                    publicKey: account?.sol.publicKey
                });
            }
        }
    }, [account, chain]);

    const [copyText, setCopyText] = React.useState<string>("Copy")
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="flex gap-x-8 items-center ">
                        <Button variant={"ghost"} className="flex flex-row items-center justify-start h-16 gap-x-8 w-full border">
                            <div className="w-10 flex items-center justify-center">
                                {chain === "Solana" ? <SolanaIcon className="w-10" /> : <EthIcon className="w-6" />}
                            </div>
                            <div className="">
                                <div className="text-base h-1/2 font-semibold w-full text-start">{chain === "Solana" ? "Solana Devnet" : "Ethereum Sepolia"}</div>
                                {tabData ? <div className="w-full h-1/2 text-start font-normal">
                                    {tabData.publicKey?.slice(0, 4)}...{tabData.publicKey?.slice(tabData.publicKey?.length - 4)}
                                </div> :
                                    <Skeleton className="h-[20px] w-[100px]" />
                                }
                            </div>
                            <div className="flex-grow" />
                            <div className="copy flex flex-row gap-x-2 items-center">
                            <div className="qrcode">
                                <QrCode className='w-6 rounded-full h-6'/>
                            </div>
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="px-3 flex gap-x-2 font-semibold"
                                    disabled={!tabData}
                                    onClick={() => {
                                        navigator.clipboard.writeText(tabData?.publicKey as string)
                                        setCopyText("Copied!")
                                        setTimeout(() => {
                                            setCopyText("Copy")
                                        }, 5000)
                                    }}
                                >
                                    <CopyIcon className="h-4 w-4" />
                                    <div className="">
                                        {copyText}
                                    </div>
                                </Button>
                            </div>
                        </Button>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>{tabData?.name} {chain} Public Key</DialogTitle>
                        <DialogDescription>
                            Share this public key to receive money.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-y-4 space-x-2 ">
                        <div className="justify-center flex">
                            <QRCode
                                logoImage={`/network/${chain?.slice(0,3).toLocaleLowerCase()}Dark.png`}
                                logoPadding={10}
                                size={128}
                                logoPaddingStyle="circle"
                                style={{ margin: "auto", padding: "1rem", borderRadius: "10px" }}
                                qrStyle="squares"
                                eyeRadius={10}
                                enableCORS={true}
                                // fgColor="#4287f5"
                                ecLevel="Q"
                                removeQrCodeBehindLogo={true}
                                value={tabData?.publicKey as string}
                            />
                        </div>
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Public Key
                            </Label>
                            <Textarea
                                id="link"
                                defaultValue={tabData?.publicKey}
                                placeholder='Public Key'
                                readOnly
                                className="min-w-fit resize-none"
                            />
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-between">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            size="sm"
                            className="px-3 flex gap-x-2 font-semibold"
                            disabled={!tabData}
                            onClick={() => {
                                navigator.clipboard.writeText(tabData?.publicKey as string)
                                setCopyText("Copied!")
                                setTimeout(() => {
                                    setCopyText("Copy")
                                }, 5000)
                            }}
                        >
                            <CopyIcon className="h-4 w-4" />
                            <div className="">
                                {copyText}
                            </div>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}
