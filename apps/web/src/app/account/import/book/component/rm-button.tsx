"use client";

import { rmAddress } from "@/src/actions/book";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/utils/cn";
import { booksAtom } from "@paybox/recoil";
import { useRouter } from "next/navigation";
import React from "react";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";

function RemoveButton({ jwt, id }: { jwt: string; id: string }) {
  const router = useRouter();
  const setBook = useSetRecoilState(booksAtom);
  return (
    <Button
      variant={"link"}
      className={cn("text-center w-full text-muted-foreground ")}
      onClick={() => {
        toast.promise(rmAddress(jwt, id), {
          loading: "Removing...",
          success: () => {
            setBook((old) => old.filter((address) => address.id !== id));
            return "Address removed from book";
          },
          error: "Failed to remove address",
        });
        return;
      }}
    >
      Remove the address from Book
    </Button>
  );
}

export default RemoveButton;
