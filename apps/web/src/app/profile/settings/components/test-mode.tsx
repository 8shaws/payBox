"use client";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Switch } from "@/src/components/ui/switch";
import {
  BACKEND_URL,
  BitcoinCluster,
  EthCluster,
  SolCluster,
  TestModeSetSchema,
  responseStatus,
} from "@paybox/common";
import {
  btcNetAtom,
  clientJwtAtom,
  ethNetAtom,
  solNetAtom,
  testmodeAtom,
} from "@paybox/recoil";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Terminal } from "lucide-react";
import Pako from "pako";
import React, { use, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "sonner";
import NetworkTab from "./network-select-tab";
import { z } from "zod";

function TestModeSwitch({
  testMode,
  nets,
}: {
  testMode: boolean;
  nets: {
    solNet: SolCluster;
    ethNet: EthCluster;
    btcNet: BitcoinCluster;
  };
}) {
  const [test, setTestmode] = useRecoilState(testmodeAtom);
  const jwt = useRecoilValue(clientJwtAtom);
  const [open, setOpen] = React.useState(false);
  const [ethNet, setEthNet] = useRecoilState(ethNetAtom);
  const [solNet, setSolNet] = useRecoilState(solNetAtom);
  const [btcNet, setBtcNet] = useRecoilState(btcNetAtom);

  useEffect(() => {
    setTestmode(testMode);
  }, [testMode]);

  useEffect(() => {
    if (nets) {
      setEthNet(nets.ethNet);
      setSolNet(nets.solNet);
      setBtcNet(nets.btcNet);
    }
  }, [nets]);

  const onSubmit = async () => {
    if (
      solNet == nets.solNet &&
      btcNet == nets.btcNet &&
      ethNet == nets.ethNet
    ) {
      if (testMode == test) {
        toast.message("No changes observed...");
        return;
      }
    }
    const call = async () => {
      try {
        let body: z.infer<typeof TestModeSetSchema> = {
          testMode: test,
        };
        if (solNet != nets.solNet) {
          body = { ...body, solNet };
        }
        if (ethNet != nets.ethNet) {
          body = { ...body, ethNet };
        }
        if (btcNet != nets.btcNet) {
          body = { ...body, btcNet };
        }
        const {
          status,
          message,
        }: { status: responseStatus; message?: string } = await fetch(
          `${BACKEND_URL}/settings/nets`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${jwt}`,
              "content-encoding": "gzip",
            },
            body: Pako.gzip(JSON.stringify(body)),
          },
        ).then((res) => res.json());
        if (status == responseStatus.Error) {
          return Promise.reject({ msg: message });
        }

        return Promise.resolve({ msg: "Network Configs Updated" });
      } catch (error) {
        console.log(error);
        return Promise.reject({ msg: "Internal Server Error" });
      }
    };
    toast.promise(call(), {
      loading: "Updating Test Mode",
      success: () => {
        setOpen(false);
        return "Test Mode Updated";
      },
      error: ({ msg }) => {
        setOpen(false);
        return msg;
      },
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="w-2/3">
          <Button variant="secondary" className="flex gap-x-2 justify-start">
            <Terminal className="w-4 h-4" />
            Developer Settings
          </Button>
        </DialogTrigger>
        <DialogContent className="w-fit flex flex-col gap-y-9">
          <DialogHeader className=" flex flex-row justify-between items-center">
            <div className="w-2/3">
              <DialogTitle className="font-semibold">Test Mode</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                This is applicable to balances and connections.
              </DialogDescription>
            </div>
            <Switch onCheckedChange={setTestmode} checked={test} />
          </DialogHeader>
          {test && (
            <>
              <div className="flex flex-col rounded-lg border">
                <NetworkTab
                  chain="Solana"
                  net={solNet}
                  setNet={(net) => setSolNet(net as SolCluster)}
                />
                <NetworkTab
                  chain="Ethereum"
                  net={ethNet}
                  setNet={(net) => setEthNet(net as EthCluster)}
                />
                <NetworkTab
                  chain="Bitcoin"
                  net={btcNet}
                  setNet={(net) => setBtcNet(net as BitcoinCluster)}
                />
              </div>
            </>
          )}
          <DialogFooter>
            <Button onClick={onSubmit} type="button">
              Update changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TestModeSwitch;
