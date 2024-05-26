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
  AccountNameQuery,
  AccountType,
  BACKEND_URL,
  responseStatus,
} from "@paybox/common";
import { ToastAction } from "@radix-ui/react-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountAtom, clientJwtAtom, loadingAtom } from "@paybox/recoil";
import { RocketIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

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
import { AvatarUpload } from "./avatar-upload";
import { accountsAtom, defaultAccountNumberAtom } from "@paybox/recoil";
import { useSetRecoilState } from "recoil";

interface AccountMutateProps extends React.HTMLAttributes<HTMLDivElement> {
  accountId: string;
  jwt: string;
  accountName: string;
  walletId: string;
}

export function MutateAccountForm({
  accountId,
  jwt,
  accountName,
  walletId,
}: AccountMutateProps) {
  const router = useRouter();
  const setClientJwt = useSetRecoilState(clientJwtAtom);
  const [account, setAccount] = useRecoilState(accountAtom);
  const setAccounts = useSetRecoilState(accountsAtom);

  React.useEffect(() => {
    console.log("setting account state");
    if (account) {
      form.setValue("name", account?.name);
    } else {
      form.setValue("name", accountName);
    }
  }, []);

  React.useEffect(() => {
    setClientJwt(jwt);
  }, [jwt]);

  const form = useForm<z.infer<typeof AccountNameQuery>>({
    resolver: zodResolver(AccountCreateQuery),
    defaultValues: {
      name: account?.name,
      accountId,
    },
  });

  async function onSubmit(values: z.infer<typeof AccountCreateQuery>) {
    const call = async () => {
      try {
        let accountQueryUrl = `${BACKEND_URL}/account/updateName?name=${values.name}&accountId=${accountId}&walletId=${walletId}`;
        // try {
        //     if (values.imgUrl && putUrl) {
        //         const putResponse = await fetch(putUrl, {
        //             method: "PUT",
        //             headers: {
        //                 "Content-Type": "image/*",
        //             },
        //             body: values.imgUrl
        //         });
        //         if (putResponse) {
        //             accountQueryUrl += `&imgUrl=${putUrl}`
        //             toast.success("Image uploaded successfully");
        //         }
        //     }
        // } catch (error) {
        //     console.log(error);
        //     toast.error("Error uploading image");
        // }
        const { status, msg } = await fetch(accountQueryUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }).then((res) => res.json());
        if (status == responseStatus.Error) {
          return Promise.reject(msg);
        }
        return Promise.resolve({ status, msg });
      } catch (error) {
        throw new Error("Error creating Account");
      }
    };
    toast.promise(call(), {
      loading: "Creating Account...",
      success({ status, msg }) {
        setAccount((prev) => {
          if (prev) {
            return {
              ...prev,
              name: values.name,
            };
          }
          return prev;
        });
        setAccounts((prev) => {
          if (prev) {
            return prev.map((acc) => {
              if (acc.id == accountId) {
                return {
                  ...acc,
                  name: values.name,
                };
              }
              return acc;
            });
          }
          return prev;
        });
        router.push(`/account/${accountId}`);
        return msg;
      },
      error({ status, msg }) {
        return msg;
      },
    });
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Change Account Name</CardTitle>
          <CardDescription>Keep it simple.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={cn("grid gap-6")}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-5">
                  <div className="flex flex-row justify-center items-center gap-x-5">
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
                    <RocketIcon /> <p>Update Account</p>{" "}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Want a tip?</AccordionTrigger>
              <AccordionContent>There is no tommorow.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardFooter>
      </Card>
    </div>
  );
}
