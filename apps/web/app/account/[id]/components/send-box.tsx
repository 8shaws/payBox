"use client";
import EthIcon from '@/components/icon/Eth';
import SolanaIcon from '@/components/icon/SolanaIcon'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { BACKEND_URL, BitcoinCluster, EthCluster, Network, SolCluster, TxnSendQuery, responseStatus } from '@paybox/common'
import { accountAtom, clientAtom, clientJwtAtom } from '@paybox/recoil';
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { number, z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { BitcoinIcon } from '@/components/icon/bitcoin';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

function SendBox({
  token,
  open,
  setOpen,
  cluster,
}: {
  token: Network,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  cluster: EthCluster | BitcoinCluster | SolCluster,
}) {
  const account = useRecoilValue(accountAtom);
  const jwt = useRecoilValue(clientJwtAtom);
  const client = useRecoilValue(clientAtom);
  const [fromKey, setFromKey] = useState<string>('');
  const [toKey, setToKey] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);



  useEffect(() => {
    if (account) {
      switch (token) {
        case Network.Sol:
          setFromKey(account.sol.publicKey);
          break;
        case Network.Eth:
          setFromKey(account.eth.publicKey);
          break;
        case Network.Bitcoin:
          break;
      }
    }
  }, [account, token]);

  const onSubmit = async () => {
    console.log("fuck")
    let data = TxnSendQuery.parse({
      from: fromKey,
      to: toKey,
      amount: amount,
      network: token,
      cluster: cluster,
      password: client?.password
    });
    console.log(data)
    const call = async () => {
      const response = await fetch(`${BACKEND_URL}/txn/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(data),
      }).then(res => res.json());
      if(response.status === responseStatus.Error) {
        console.error(response.msg);
        return Promise.reject({msg: response.msg});
      }
      return Promise.resolve({sig: response.signature});
    }
    toast.promise(call(), {
      loading: 'Sending transaction...',
      success: 'Transaction sent successfully',
      error: 'Failed to send transaction'
    });
  }

  if (!token) {
    return <></>
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] w-2/3 space-y-6">
          <DialogHeader>
            <DialogTitle>Send {token.charAt(0).toLocaleUpperCase() + token.slice(1)}</DialogTitle>
            <DialogDescription>
              Make sure to double check the address before checking out...
            </DialogDescription>
            <div className="flex flex-col gap-y-2 items-center justify-center">
              <div className="text-xl font-semibold">Buy {token.charAt(0)}{token.slice(1)}</div>
              {token == Network.Sol ? <SolanaIcon className="w-12 h-12" /> : token == Network.Eth ? <EthIcon className="w-12 h-12" /> : <BitcoinIcon className="w-12 h-12" />}
            </div>
          </DialogHeader>
          <Input
            id='to'
            required
            value={toKey}
            onChange={(e) => setToKey(e.target.value)}
            className=''
            placeholder={`Recipient ${token.charAt(0).toLocaleUpperCase() + token.slice(1)} Address`}
          />

          <div className='flex relative item-center justify-center '>
            <Label
              className="text-right absolute right-3 mt-4 text-muted-foreground"
            >
              {token.toLocaleUpperCase()}
            </Label>
            <Input
              id='amount'
              required
              value={amount == 0 ? '' : amount}
              onChange={(e) => {
                if(Number(e.target.value) > 10000) return
                setAmount(Number(e.target.value))
              }}
              type='number'
              className="w-full px-4 py-[5px] [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
              placeholder={`Amount`}
            />
          </div>
          <DialogFooter className='w-full'>
            <Button onClick={onSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog >
    </>
  )
}

export default SendBox