"use client";
import EthIcon from "@/src/components/icon/Eth";
import SolanaIcon from "@/src/components/icon/SolanaIcon";
import { Button } from "@/src/components/ui/button";
import { Skeleton } from "@/src/components/ui/skeleton";
import { CopyIcon, DollarSign, Text } from "lucide-react";
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
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountAtom, importKeysAtom } from "@paybox/recoil";
import { Network } from "@paybox/common";
import { Checkbox } from "@/src/components/ui/checkbox";
import { cn } from "@/src/lib/utils";
import { set } from "date-fns";

export const Tab = ({
  chain,
  publicKey,
  setError,
}: {
  chain: "Solana" | "Ethereum" | "Bitcoin";
  publicKey: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [tabData, setTabData] = React.useState<{
    publicKey: string | undefined;
    network: Network;
  }>();
  const [select, setSelect] = React.useState<boolean>(false);
  const [keys, setKeys] = useRecoilState(importKeysAtom);

  useEffect(() => {
    if (chain === "Ethereum") {
      setTabData({
        network: Network.Eth,
        publicKey,
      });
    } else {
      setTabData({
        network: Network.Sol,
        publicKey,
      });
    }
  }, [chain, publicKey]);

  const [copyText, setCopyText] = React.useState<string>("Copy");
  return (
    <>
      <div className="flex gap-x-8 items-center ">
        <Button
          variant={"ghost"}
          className={cn(
            "flex flex-row items-center justify-start h-16 gap-x-8 w-full border",
            select && "dark:bg-muted",
          )}
        >
          <Checkbox
            id="add-account"
            checked={select}
            onCheckedChange={() => {
              if (!select) {
                if (!keys.find((key) => key.network === "Solana")?.publicKey) {
                  console.log(keys.find((key) => key.network === "Solana"));
                  setKeys([
                    ...keys,
                    {
                      network: chain,
                      publicKey,
                    },
                  ]);
                  setSelect(true);
                } else {
                  setError(`You can select only one account from ${chain}`);
                }
              } else {
                setKeys(keys.filter((key) => key.network !== chain));
                setSelect(!select);
              }
            }}
            className="w-4 h-4"
          />

          <div className="w-10 flex items-center justify-center">
            {chain === "Solana" ? (
              <SolanaIcon className="w-10" />
            ) : (
              <EthIcon className="w-6" />
            )}
          </div>
          <div className="">
            <div className="text-base h-1/2 font-semibold w-full text-start">
              {chain === "Solana" ? "Solana Devnet" : "Ethereum Sepolia"}
            </div>
            {tabData ? (
              <div className="w-full h-1/2 text-start font-normal">
                {tabData.publicKey?.slice(0, 4)}...
                {tabData.publicKey?.slice(tabData.publicKey?.length - 4)}
              </div>
            ) : (
              <Skeleton className="h-[20px] w-[100px]" />
            )}
          </div>
          <div className="flex-grow" />
          <div className="qrcode"></div>
          <div className="copy">
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
          </div>
        </Button>
      </div>
    </>
  );
};
