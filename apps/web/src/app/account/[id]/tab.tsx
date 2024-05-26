"use client";
import EthIcon from "@/src/components/icon/Eth";
import SolanaIcon from "@/src/components/icon/SolanaIcon";
import { Button } from "@/src/components/ui/button";
import { Skeleton } from "@/src/components/ui/skeleton";
import { CopyIcon, DollarSign, QrCode, Text } from "lucide-react";
import React, { useEffect } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { useRecoilValue } from "recoil";
import { accountAtom, expPrefAtom } from "@paybox/recoil";
import { QRCode } from "react-qrcode-logo";
import {
  AccountType,
  EthKey,
  Network,
  SolKey,
  getExplorerLink,
} from "@paybox/common";
import KeyTab from "@/src/components/key-tab";
import { Badge } from "@/src/components/ui/badge";
import Link from "next/link";

export const Tab = ({
  chain,
  account,
  net,
}: {
  chain: "Solana" | "Ethereum" | "Bitcoin";
  account?: {
    key: Pick<EthKey, "publicKey"> | Pick<SolKey, "publicKey"> | undefined;
    name: string | undefined;
  };
  net: Network;
}) => {
  const accountState = useRecoilValue(accountAtom);
  const [tabData, setTabData] = React.useState<{
    publicKey: string | undefined;
    name: string | undefined;
  }>();

  const pref = useRecoilValue(expPrefAtom);

  useEffect(() => {
    if (account) {
      setTabData({
        name: account?.name,
        publicKey: account?.key?.publicKey,
      });
    } else {
      if (chain === "Ethereum") {
        setTabData({
          name: accountState?.name,
          publicKey: accountState?.eth.publicKey,
        });
      } else if (chain === "Solana") {
        setTabData({
          name: accountState?.name,
          publicKey: accountState?.sol.publicKey,
        });
      } else if (chain === "Bitcoin" && accountState?.bitcoin) {
        setTabData({
          name: accountState?.name,
          publicKey: accountState?.bitcoin.publicKey,
        });
      }
    }
  }, [account, chain, accountState]);

  const [copyText, setCopyText] = React.useState<string>("Copy");
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex gap-x-8 items-center ">
            <KeyTab chain={chain} tabData={tabData} />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {tabData?.name}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href={
                        (tabData?.publicKey &&
                          getExplorerLink(
                            net,
                            net == Network.Sol
                              ? pref.solExp
                              : net == Network.Eth
                                ? pref.ethExp
                                : pref.btcExp,
                            tabData?.publicKey,
                          )) ||
                        "#"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Badge
                        className="mx-2 w-fit h-fit text-sm"
                        variant={"secondary"}
                      >
                        {chain}
                      </Badge>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Check the account on explorer...</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              Public Key
            </DialogTitle>
            <DialogDescription>
              Share this public key to receive money.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-y-4 space-x-2 ">
            <div className="justify-center flex">
              <QRCode
                logoImage={`/network/${chain?.slice(0, 3).toLocaleLowerCase()}Dark.png`}
                logoPadding={5}
                size={128}
                logoPaddingStyle="circle"
                style={{
                  margin: "auto",
                  padding: "1rem",
                  borderRadius: "10px",
                }}
                qrStyle="squares"
                eyeRadius={5}
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
                placeholder="Public Key"
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
                navigator.clipboard.writeText(tabData?.publicKey as string);
                setCopyText("Copied!");
                setTimeout(() => {
                  setCopyText("Copy");
                }, 5000);
              }}
            >
              <CopyIcon className="h-4 w-4" />
              <div className="">{copyText}</div>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
