"use client";
import { TokenCommandMenu } from '@/src/components/buy-combo';
import { Button } from '@/src/components/ui/button';
import { EthCluster, Network, SolCluster } from '@paybox/common';
import { accountAtom, clientAtom } from '@paybox/recoil';
import { Send } from 'lucide-react';
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import SendBox from './send-box';

function TransferButton() {
    const [open, setOpen] = React.useState(false);
    const [selectedToken, setSelectedToken] = React.useState<Network>();
    const [dialogOpen, setDialogOpen] = React.useState(false);
   

    useEffect(() => {
        if(selectedToken) {
            setDialogOpen(true);
        }
    }, [selectedToken])

    return (
        <>
            <Button
                onClick={() => setOpen(!open)}
                className="dark:bg-card w-fit h-fit flex gap-x-2 px-2"
            >
                <div className="">
                    <Send className="w-4 h-4 dark:text-muted-foreground" />
                </div>
                <div className="text-lg text-white font-semibold">Send</div>
            </Button>
            <TokenCommandMenu open={open} setOpen={setOpen} onSelect={setSelectedToken} />
            <SendBox
                open={dialogOpen}
                setOpen={setDialogOpen}
                cluster={EthCluster.Sepolia}
                token={selectedToken as Network}
            />
        </>
    )
}

export default TransferButton