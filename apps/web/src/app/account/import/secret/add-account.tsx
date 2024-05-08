"use client";

import * as React from "react";

import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AccountCreateQuery,
  AccountType,
  BACKEND_URL,
  ImportAccount,
  Network,
  WalletType,
  responseStatus,
} from "@paybox/common";
import { ToastAction } from "@radix-ui/react-toast";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  accountNumber,
  accountsAtom,
  clientJwtAtom,
  importKeysAtom,
  importSecretAtom,
  loadingAtom,
} from "@paybox/recoil";
import { RocketIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import pako from "pako";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { useRouter } from "next/navigation";
import { AvatarUpload } from "../../[id]/update/avatar-upload";
import { ITab } from "./wrapper";

export function AddAccount() {
  const defaultNumber = useRecoilValue(accountNumber);
  const jwt = useRecoilValue(clientJwtAtom);
  const setAccounts = useSetRecoilState(accountsAtom);
  const keys = useRecoilValue(importKeysAtom);
  const phrase = useRecoilValue(importSecretAtom);
  const router = useRouter();

  const form = useForm<z.infer<typeof ImportAccount>>({
    resolver: zodResolver(ImportAccount),
    defaultValues: {
      name: `Account ${defaultNumber}`,
    },
  });

  React.useEffect(() => {
    if (keys.length != 2) {
      toast.error("Please select the accounts to import...");
      return router.push(`/account/import/secret?tab=${ITab.Show}`);
    }
    if (!phrase) {
      toast.error("State management Error, Please Try again");
      return router.push(`/account/import/secret?tab=${ITab.Import}`);
    }
    form.setValue(
      "keys",
      keys.map((key) => {
        return {
          network: key.network as Network,
          publicKey: key.publicKey,
        };
      }),
    );
    form.setValue("secretPhrase", phrase);
  }, []);

  async function onSubmit(values: z.infer<typeof ImportAccount>) {
    const call = async () => {
      try {
        let accountQueryUrl = `${BACKEND_URL}/account/import`;

        const {
          status,
          msg,
          wallet,
        }: { status: responseStatus; msg: string; wallet: WalletType } =
          await fetch(accountQueryUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
              "Content-Encoding": "gzip",
            },
            body: pako.gzip(JSON.stringify(values)),
          }).then((res) => res.json());
        if (status == responseStatus.Error) {
          return Promise.reject(msg);
        }
        if (!wallet.accounts) {
          return Promise.reject(msg);
        }
        return { account: wallet.accounts[0], status, msg };
      } catch (error) {
        throw new Error("Error creating Account");
      }
    };
    toast.promise(call(), {
      loading: "Importing Account...",
      success({
        account,
      }: {
        account: AccountType;
        status: responseStatus;
        msg: string;
      }) {
        setAccounts((oldAccounts) => {
          return [...oldAccounts, account];
        });

        router.push("/account/");
        return `Account '${account.name}' Created Successfully`;
      },
      error({ status, msg }) {
        return msg;
      },
    });
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Import Account</CardTitle>
            <CardDescription>
              Your New Web3 Account in just a click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={cn("grid gap-6")}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-5">
                    <div className="flex flex-row justify-center items-center gap-x-5">
                      <FormField
                        control={form.control}
                        name="imgUrl"
                        render={({ field }) => (
                          <FormItem className="w-fit">
                            <FormControl>
                              <AvatarUpload
                                value={field.value}
                                onChange={field.onChange}
                                fallbackName={`A${defaultNumber}`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel htmlFor="name" className="w-fit h-fit">
                              Account Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="name"
                                placeholder="Account name"
                                type="text"
                                autoCapitalize="words"
                                autoComplete="name"
                                autoCorrect="off"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit">
                      <RocketIcon /> <p>Create An Account</p>{" "}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
