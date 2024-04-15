"use client";

import { TokenCommandMenu } from '@/components/buy-combo'
import { FundDialog } from '@/components/fund-dialog';
import { Button } from '@/components/ui/button'
import { Network } from '@paybox/common';
import { DollarSign } from 'lucide-react'
import React, { useEffect } from 'react'

function BuyButton() {
    const [open, setOpen] = React.useState(false);
    const [selectedToken, setSelectedToken] = React.useState<Network>();
    const [urlOpen, setUrlOpen] = React.useState(false);

    useEffect(() => {
        if(selectedToken) {
            setUrlOpen(true);
        }
    }, [selectedToken])

    return (
        <>
            <Button
                onClick={() => setOpen(!open)}
                className="dark:bg-card w-40 h-fit flex flex-col gap-y-2 p-4"
            >
                <div className="">
                    <DollarSign className="w-6 h-6 dark:text-muted-foreground" />
                </div>
                <div className="text-xl text-white font-semibold">Buy Tokens</div>
            </Button>
            <TokenCommandMenu open={open} setOpen={setOpen} onSelect={setSelectedToken}/>
            <FundDialog open={urlOpen} setOpen={setUrlOpen} token={selectedToken as Network}/>
        </>
    )
}

export default BuyButton