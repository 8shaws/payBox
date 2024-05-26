import { Button } from "@/src/components/ui/button";
import { Skeleton } from "@/src/components/ui/skeleton";
import { getPaymentLink } from "@/src/lib/utils";
import { AccountType } from "@paybox/common";
import { CopyIcon, QrCode, UsersRound } from "lucide-react";
import { useState } from "react";

export default function AccountTab({ account }: { account: AccountType }) {
  const [copyText, setCopyText] = useState<"Copy" | "Copied!">("Copy");
  return (
    <>
      <Button
        variant={"outline"}
        className="flex flex-row items-center justify-start h-16 gap-x-8 w-full rounded-none h-20"
      >
        <div className="w-10 flex items-center justify-center">
          <UsersRound className="w-4 h-4" />
        </div>
        <div className="">
          <div className="text-base h-1/2 font-semibold w-full text-start">
            {account ? (
              account.name
            ) : (
              <Skeleton className="h-[20px] w-[100px]" />
            )}
          </div>
          {account ? (
            <div className="w-full text-muted-foreground h-1/2 text-start font-normal">
              {account.walletId?.slice(0, 4)}...
              {account.walletId?.slice(account.walletId?.length - 4)}
            </div>
          ) : (
            <Skeleton className="h-[20px] w-[100px]" />
          )}
        </div>
        <div className="flex-grow" />
        <div className="copy flex flex-row gap-x-2 items-center">
          <div className="qrcode">
            <QrCode className="w-6 rounded-full h-6" />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3 flex gap-x-2 font-semibold"
            disabled={!account}
            onClick={() => {
              navigator.clipboard.writeText(getPaymentLink(account.id));
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
    </>
  );
}
