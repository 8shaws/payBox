"use client";
import * as React from "react";

import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Separator } from "@/src/components/ui/separator";
import { useRecoilValue } from "recoil";
import { fromPhraseAccountAtom, importKeysAtom } from "@paybox/recoil";
import { Network } from "@paybox/common";
import { Tab } from "./tab";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Checkbox } from "@/src/components/ui/checkbox";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { StepForward } from "lucide-react";
import { ITab } from "./wrapper";
import { useRouter } from "next/navigation";

export function ShowAccounts({}: {}) {
  const router = useRouter();
  const accounts = useRecoilValue(fromPhraseAccountAtom);
  const [error, setError] = React.useState<string>("");
  const keys = useRecoilValue(importKeysAtom);

  React.useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 2500);
    }
  }, [error]);

  return (
    <>
      <Card className="w-[650px] ">
        <CardHeader>
          <CardTitle>Accounts on the recovery phrase</CardTitle>
          <CardDescription>
            We have found {accounts.length} Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Solana" className="">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value={"Solana"}>Solana</TabsTrigger>
              <TabsTrigger value="Ethereum">Ethereum</TabsTrigger>
            </TabsList>
            <TabsContent value="Solana">
              <ScrollArea className="h-72 w-full rounded-md border p-4">
                {accounts.length &&
                  accounts
                    .filter((acc) => acc.chain.name == "Solana")
                    .map((solAcc) => (
                      <>
                        <Tab
                          chain={solAcc.chain.name}
                          publicKey={solAcc.publicKey}
                          setError={setError}
                        />
                        <Separator className="my-2" />
                      </>
                    ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="Ethereum">
              <ScrollArea className="h-72 w-full rounded-md border">
                {accounts.length &&
                  accounts
                    .filter((acc) => acc.chain.name == "Ethereum")
                    .map((ethAcc) => (
                      <>
                        <Tab
                          chain={ethAcc.chain.name}
                          publicKey={ethAcc.publicKey}
                          setError={setError}
                        />
                        <Separator className="my-2" />
                      </>
                    ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="w-full flex flex-col gap-y-4">
          {error && (
            <div
              className={cn(
                "flex flex-row gap-x-4 justify-center items-center text-red-400 ease-in-out",
              )}
            >
              <ExclamationTriangleIcon className="h-4 w-4" />
              {error}
            </div>
          )}
          <Button
            variant={"default"}
            className="w-full"
            onClick={() => {
              if (keys.length === 2) {
                router.push(`/account/import/secret?tab=${ITab.Add}`);
              } else {
                setError("Please select one account from each chain...");
              }
            }}
          >
            <StepForward className="w-4 h-4" /> Continue
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
