import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Textarea } from "@/src/components/ui/textarea";
import React, { Suspense, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { accountAtom, accountPrivateKeysAtom } from "@paybox/recoil";
import { Skeleton } from "@/src/components/ui/skeleton";

export function SecretPhraseDialogBox({
  open,
  setOpen,
  seed,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  seed?: string | null;
}) {
  const account = useRecoilValue(accountAtom);
  const [copyText, setCopyText] = React.useState<string>("Copy");

  useEffect(() => {
    if (copyText === "Copied") {
      setTimeout(() => {
        setCopyText("Copy");
      }, 2000);
    }
  }, [copyText]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{account?.name} Secret Phrase</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Card className="border-none">
          <CardHeader>
            <Alert variant={"default"}>
              <AlertTriangle className="h-4 w-4" color="#ff4545" />
              <AlertTitle className="text-[#ff4545]">Caution!</AlertTitle>
              <AlertDescription className="text-[#ff4545]">
                Do not share your Secret Phrase. Indiviual bearing this has full
                control on this account!
              </AlertDescription>
            </Alert>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* Create ui */}
            {seed ? (
              <div className="grid grid-cols-3 gap-3">
                {seed.split(" ").map((word, index) => (
                  <Label className="flex flex-row justify-around px-4 items-center border border-input rounded-md focus-visible:ring-1 focus-visible:ring-ring">
                    <Label className="text-sm">{index + 1}.</Label>
                    <Input
                      type="text"
                      className="text-center min-w-fit border-none hover:border-none focus-visible:ring-0"
                      value={word}
                      readOnly
                    />
                  </Label>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {Array(24)
                  .fill(0)
                  .map((index) => (
                    <Skeleton className="min-w-fit min-h-9" />
                  ))}
              </div>
            )}
          </CardContent>
          <DialogFooter className="sm:justify-start">
            <CardFooter className="w-full flex flex-row justify-between gap-x-12">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="w-full">
                  Close
                </Button>
              </DialogClose>
              <Button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(seed || "");
                  setCopyText("Copied");
                }}
                variant="default"
                className="w-full flex gap-x-3"
              >
                <CopyIcon className="w-4 h-4" /> {copyText}
              </Button>
            </CardFooter>
          </DialogFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
