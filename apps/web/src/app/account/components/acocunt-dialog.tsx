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
import AccountTab from "./account-tab";
import { AccountType } from "@paybox/common";
import Link from "next/link";
import { getPaymentLink } from "@/src/lib/utils";
import { Badge } from "@/src/components/ui/badge";
import { QRCode } from "react-qrcode-logo";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import { useState } from "react";
import { CopyIcon } from "lucide-react";

const AccountDialog = ({ account }: { account: AccountType }) => {
  const [copyText, setCopyText] = useState<"Copy" | "Copied!">("Copy");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-x-8 items-center">
          <AccountTab account={account} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={(account && getPaymentLink(account.id)) || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Badge
                      className="w-fit h-fit text-base"
                      variant={"secondary"}
                    >
                      {account?.name}
                    </Badge>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Payments page for this account...</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTitle>
          <DialogDescription>
            Use this qrcode to accept payment on this account.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4 space-x-2 ">
          <div className="justify-center flex">
            <QRCode
              // logoImage={`/favicon.png`}
              logoPadding={5}
              size={128}
              logoPaddingStyle="circle"
              style={{ margin: "auto", padding: "1rem", borderRadius: "10px" }}
              qrStyle="squares"
              eyeRadius={5}
              enableCORS={true}
              // fgColor="#4287f5"
              ecLevel="Q"
              removeQrCodeBehindLogo={true}
              value={getPaymentLink(account.id)}
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Payment Link
            </Label>
            <Textarea
              id="link"
              defaultValue={getPaymentLink(account.id)}
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccountDialog;
