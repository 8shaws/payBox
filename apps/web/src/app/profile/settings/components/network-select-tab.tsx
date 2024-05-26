import EthIcon from "@/src/components/icon/Eth";
import SolanaIcon from "@/src/components/icon/SolanaIcon";
import { BitcoinIcon } from "@/src/components/icon/bitcoin";
import { Button } from "@/src/components/ui/button";
import { Skeleton } from "@/src/components/ui/skeleton";
import {
  BitcoinCluster,
  BtcNets,
  EthCluster,
  EthNets,
  SolCluster,
  SolNets,
} from "@paybox/common";
import React, { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { SetterOrUpdater } from "recoil";

function NetworkTab({
  chain,
  net,
  setNet,
}: {
  chain: "Solana" | "Ethereum" | "Bitcoin";
  net: SolCluster | EthCluster | BitcoinCluster;
  setNet: (net: SolCluster | EthCluster | BitcoinCluster) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectObject, setSelectObject] =
    React.useState<
      { value: SolCluster | EthCluster | BitcoinCluster; label: string }[]
    >();
  useEffect(() => {
    switch (chain) {
      case "Solana":
        setSelectObject(SolNets.filter(({ value }) => value != "mainnet-beta"));
        break;
      case "Ethereum":
        setSelectObject(EthNets.filter(({ value }) => value != "mainnet"));
        break;
      case "Bitcoin":
        setSelectObject(BtcNets.filter(({ value }) => value != "mainnet"));
        break;
    }
  }, [chain]);
  return (
    <>
      <Button
        variant={"ghost"}
        onClick={() => setOpen((op) => !op)}
        className="flex flex-row items-center justify-start h-12 gap-x-2 w-full rounded-none "
      >
        <div className="w-10 flex items-center justify-center">
          {chain === "Solana" ? (
            <SolanaIcon className="w-6" />
          ) : chain == "Bitcoin" ? (
            <BitcoinIcon className="w-8 h-8" />
          ) : (
            <EthIcon className="w-4" />
          )}
        </div>
        <div className="h-1/2 text-center flex items-center w-fit text-base font-medium">
          {chain}
        </div>

        <div className="flex-grow" />
        <div className="copy flex flex-row gap-x-2 items-center">
          <Select open={open} onOpenChange={setOpen} onValueChange={setNet}>
            <SelectTrigger className="border-none focus:ring-0 outline-none hover:border-none focus:outline-none">
              <SelectValue
                placeholder={
                  selectObject?.find(({ value, label }) => value == net)?.label
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{chain} Networks</SelectLabel>
                {selectObject &&
                  selectObject.map(({ label, value }) => {
                    return (
                      <SelectItem
                        value={value}
                        onClick={() => {
                          setNet(value);
                        }}
                      >
                        {label}
                      </SelectItem>
                    );
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Button>
    </>
  );
}

export default NetworkTab;
