"use client";
import { Button } from '@/src/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/src/components/ui/dialog';
import { Switch } from '@/src/components/ui/switch'
import { BACKEND_URL, responseStatus } from '@paybox/common';
import { clientJwtAtom, testmodeAtom } from '@paybox/recoil';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { Terminal } from 'lucide-react';
import Pako from 'pako';
import React, { use, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { toast } from 'sonner';

function TestModeSwitch({
  testMode
}: {
  testMode: boolean
}) {
  const [test, setTestmode] = useRecoilState(testmodeAtom);
  const jwt = useRecoilValue(clientJwtAtom);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setTestmode(testMode);
  }, [testMode])

  const onSubmit = async () => {
    const call = async () => {
      try {

        const { status, message }: { status: responseStatus, message?: string }
          = await fetch(`${BACKEND_URL}/settings/testmode`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${jwt}`,
              "content-encoding": "gzip"
            },
            body: Pako.gzip(JSON.stringify({ testMode: test }))
          }).then(res => res.json());
        if (status == responseStatus.Error) {
          return Promise.reject({ msg: message })
        }

        return Promise.resolve({ msg: "Test Mode Updated" })

      } catch (error) {
        console.log(error);
        return Promise.reject({ msg: "Internal Server Error" })
      }
    }
    toast.promise(call(), {
      loading: 'Updating Test Mode',
      success: () => {
        setOpen(false);
        return "Test Mode Updated"
      },
      error: ({ msg }) => {
        setOpen(false);
        return msg
      }
    });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="w-2/3">
          <Button variant="secondary" className="flex gap-x-2 justify-start">
            <Terminal className="w-4 h-4" />
            Developer Settings
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className=" flex flex-row justify-between items-center">
            <div className="w-2/3">
              <DialogTitle >Test Mode</DialogTitle>
              <DialogDescription className='text-muted-foreground'>
                This is applicable to balances and connections.
              </DialogDescription>

            </div>
            <Switch onCheckedChange={setTestmode} checked={test} />
          </DialogHeader>
          <DialogFooter >
            <Button onClick={onSubmit} type="button">Update changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>

  )
}

export default TestModeSwitch