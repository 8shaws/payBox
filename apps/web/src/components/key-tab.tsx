"use client"
import React from 'react'
import { Button } from './ui/button'
import SolanaIcon from './icon/SolanaIcon'
import EthIcon from './icon/Eth'
import { Skeleton } from './ui/skeleton'
import { CopyIcon, QrCode } from 'lucide-react'

function KeyTab({
    chain,
    tabData,
}: {
    chain: "Solana" | "Ethereum",
    tabData: {
        publicKey: string | undefined,
        name: string | undefined
    } | undefined
}) {
    const [copyText, setCopyText] = React.useState<string>("Copy")
    return (
        <>
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
                        <QrCode className='w-6 rounded-full h-6' />
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
        </>
    )
}

export default KeyTab