"use client";
import { ClientWithJwt } from "@paybox/common";
import { clientAtom, clientJwtAtom } from "@paybox/recoil";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";

function SetClientJwtWrapper({
  children,
  client,
}: {
  children: React.ReactNode;
  client: ClientWithJwt;
}) {
  const router = useRouter();
  const setClientAtom = useSetRecoilState(clientAtom);
  const setJwtAtom = useSetRecoilState(clientJwtAtom);

  useEffect(() => {
    if (client) {
      setClientAtom(client);
      setJwtAtom(client.jwt);
    } else {
      toast("Signup to use the account in Strengths", {
        action: {
          label: "Onboard",
          onClick: () => {
            router.push("/signup");
          },
        },
      });
    }
  }, [client]);

  return <>{children}</>;
}

export default SetClientJwtWrapper;
