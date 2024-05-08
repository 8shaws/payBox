"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import React from "react";
import { getIcon } from "@/src/actions/icon";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
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
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Separator } from "@/src/components/ui/separator";
import {
  AddressBook,
  BACKEND_URL,
  UpdateBook,
  chains,
  responseStatus,
} from "@paybox/common";
import RemoveButton from "./rm-button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { booksAtom, clientJwtAtom } from "@paybox/recoil";
import { toast } from "sonner";
import Pako from "pako";
import { Textarea } from "@/src/components/ui/textarea";
import { SquarePen, Unlink } from "lucide-react";

const BookEdit = ({ address }: { address: AddressBook }) => {
  const [open, setOpen] = React.useState(false);
  const jwt = useRecoilValue(clientJwtAtom);
  const icon = getIcon(address.chain);
  const form = useForm<z.infer<typeof UpdateBook>>({
    resolver: zodResolver(UpdateBook),
    defaultValues: {
      chain: address.chain,
      name: address.name,
      publicKey: address.publicKey,
      id: address.id,
    },
  });

  const setBook = useSetRecoilState(booksAtom);

  function onSubmit(data: z.infer<typeof UpdateBook>) {
    console.log(data);
    const call = async () => {
      try {
        const {
          status,
          msg,
          id,
        }: {
          status: responseStatus;
          msg?: string;
          id: string;
        } = await fetch(`${BACKEND_URL}/book/`, {
          method: "put",
          headers: {
            authorization: `Bearer ${jwt}`,
            "Content-type": "application/json",
            "Content-Encoding": "gzip",
          },
          body: Pako.gzip(JSON.stringify(data)),
        }).then((res) => res.json());

        if (status == responseStatus.Error) {
          return Promise.reject({ msg });
        }
        return Promise.resolve({ data });
      } catch (error) {
        console.log(error);
        return Promise.reject({ msg: "Internal server error" });
      }
    };

    toast.promise(call(), {
      loading: "Updataing address...",
      success: ({ data }) => {
        setBook((old) =>
          old.map((address) =>
            address.id === data.id ? (data as AddressBook) : address,
          ),
        );
        setOpen(false);
        return "Address updated...";
      },
      error: ({ msg }) => {
        return msg;
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant={"ghost"}
          className="flex gap-x-4 rounded-none w-full h-fit py-4"
          key={address.id}
        >
          <Avatar>
            <AvatarImage src="https://github.com/shawakash.pn" alt="@shadcn" />
            <AvatarFallback>
              {address.name.slice(0, 2).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <p className="text-base h-1/2 font-semibold w-full text-start">
              {address.name}
            </p>
            <p className="text-muted-foreground w-full h-1/2 text-start font-normal">
              {address.publicKey.slice(0, 4) +
                "..." +
                address.publicKey.slice(address.publicKey.length - 4)}
            </p>
          </div>
          <div className="flex flex-grow" />
          <div className="">
            <icon.icon className="w-6 h-6" />
          </div>
        </Button>
        <Separator />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
          <DialogDescription>
            Save your frequently used address to your address book...
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
            <FormField
              control={form.control}
              name="chain"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-x-4 justify-between items-center">
                    <Button className="gap-x-2 px-2 w-1/5 cursor-none">
                      <Unlink className="w-4 h-4" />
                      <span className="text-xs">Network</span>
                    </Button>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {chains.map(({ label, value }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormDescription>
                    Network of the storing address...
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-x-4 justify-between items-center">
                    <Button className="gap-x-2 w-1/5 px-1 cursor-none">
                      <SquarePen className="w-4 h-4" />
                      <span className="text-xs">Name</span>
                    </Button>
                    <Input
                      defaultValue={address.name}
                      placeholder="Label for the address..."
                      {...field}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publicKey"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-x-4 justify-between items-center">
                    <Textarea
                      defaultValue={address.publicKey}
                      placeholder="Address..."
                      className="resize-none"
                      {...field}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose className="w-full">
              <RemoveButton jwt={jwt as string} id={address.id} />
            </DialogClose>
            <DialogFooter className="flex gap-x-4 justify-between">
              <DialogClose className="w-full">
                <Button variant="secondary" className="w-full">
                  Close
                </Button>
              </DialogClose>
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookEdit;
