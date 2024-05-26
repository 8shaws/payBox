"use client";

import { TokenCommandMenu } from "@/src/components/buy-combo";
import { FundDialog } from "@/src/components/fund-dialog";
import { Button } from "@/src/components/ui/button";
import { Network } from "@paybox/common";
import { DollarSign } from "lucide-react";
import React, { useEffect } from "react";

function BuyButton() {
  const [open, setOpen] = React.useState(false);
  const [selectedToken, setSelectedToken] = React.useState<Network>();
  const [urlOpen, setUrlOpen] = React.useState(false);

  useEffect(() => {
    if (selectedToken) {
      setUrlOpen(true);
    }
  }, [selectedToken]);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        className="dark:bg-card w-fit h-fit flex  gap-x-2 px-2"
      >
        <div className="">
          <DollarSign className="w-4 h-5 text-muted-foreground" />
        </div>
        <div className="text-lg text-white font-semibold">Buy</div>
      </Button>
      <TokenCommandMenu
        open={open}
        setOpen={setOpen}
        onSelect={setSelectedToken}
      />
      <FundDialog
        open={urlOpen}
        setOpen={setUrlOpen}
        token={selectedToken as Network}
      />
    </>
  );
}

export default BuyButton;
