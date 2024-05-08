"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Switch } from "@/src/components/ui/switch";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { useForm } from "react-hook-form";
import { ChangePasswordValid } from "@paybox/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EyeClosedIcon, EyeNoneIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { patchPassword } from "@/src/lib/helper";
import { useRecoilValue } from "recoil";
import { clientJwtAtom } from "@paybox/recoil";
import Captcha from "@/src/components/verify-cloudflare";

function ChangePassword() {
  const jwt = useRecoilValue(clientJwtAtom);
  const [showNew, setNewShow] = React.useState(false);
  const [showCon, setConShow] = React.useState(false);
  const [token, setToken] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  let [open, setOpen] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof ChangePasswordValid>>({
    resolver: zodResolver(ChangePasswordValid),
    defaultValues: {},
    criteriaMode: "firstError",
  });
  form.register("password", { required: true });
  form.register("confirmPassword", {
    validate: (value) => value === form.getValues().newPassword,
  });

  function onSubmit(data: z.infer<typeof ChangePasswordValid>) {
    console.log(data);
    if (data.confirmPassword !== data.newPassword) {
      return form.setError("confirmPassword", {
        message: "Confirm Password and New Password mismatches",
      });
    }
    toast.promise(patchPassword(jwt as string, data, token), {
      loading: "Updating Password",
      success: ({ msg }) => {
        setOpen(false);
        return "Password Updated";
      },
      error: ({ msg }) => {
        setOpen(false);
        return msg;
      },
    });
    return;
  }

  React.useEffect(() => {
    if (!jwt) {
      toast.error("Please login again");
      setOpen(false);
    }
  }, [jwt]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="w-2/3">
          <Button
            variant="secondary"
            onClick={() => setOpen(true)}
            className="flex gap-x-2 justify-between"
          >
            Change Password
            <ChevronRight className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className=" flex flex-row justify-between items-center">
            <div className="w-5/6 flex flex-col gap-y-2">
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                If you don't remember your current password request a email...
              </DialogDescription>
            </div>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="">
                    <div className="flex gap-x-2 items-center justify-center">
                      <Button
                        type="button"
                        className="mt-2 w-1/4 text-sm text-center cursor-none"
                      >
                        Current
                      </Button>
                      <FormControl className="">
                        <Input
                          type="password"
                          placeholder="Your current password..."
                          className="w-3/4"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="">
                    <div className="flex gap-x-2 items-center justify-center">
                      <Button
                        type="button"
                        className="mt-2 w-1/4 text-sm text-center cursor-none"
                      >
                        New
                      </Button>
                      <FormControl className="">
                        <div className="relative w-full">
                          <Input
                            type={showNew ? "text" : "password"}
                            placeholder="Your New password..."
                            className="w-full"
                            {...field}
                          />
                          <Button
                            type="button"
                            onClick={() => setNewShow(!showNew)}
                            className="w-9 px-0 absolute right-0 top-0"
                            variant={"ghost"}
                          >
                            {!showNew ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="">
                    <div className="flex gap-x-2 items-center justify-center">
                      <Button
                        type="button"
                        className="mt-2 w-1/4 text-sm text-center cursor-none"
                      >
                        Confirm
                      </Button>
                      <FormControl className="">
                        <div className="relative w-full">
                          <Input
                            type={showCon ? "text" : "password"}
                            placeholder="Confirm your new password..."
                            className="w-full"
                            {...field}
                          />
                          <Button
                            type="button"
                            onClick={() => setConShow(!showCon)}
                            className="w-9 px-0 absolute right-0 top-0"
                            variant={"ghost"}
                          >
                            {!showCon ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="">
                <Captcha setIsLoading={setLoading} setToken={setToken} />
              </div>
              <DialogFooter className="flex flex-col h-fit">
                <Button className="w-full" variant={"secondary"} type="submit">
                  Update Password
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChangePassword;
