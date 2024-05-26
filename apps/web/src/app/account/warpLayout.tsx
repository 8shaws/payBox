"use client";
import { clientAtom, clientJwtAtom } from "@paybox/recoil";
import { Session } from "next-auth";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export function Wrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const setJwt = useSetRecoilState(clientJwtAtom);
  const setClient = useSetRecoilState(clientAtom);
  useEffect(() => {
    //@ts-ignore
    setJwt(session?.user?.jwt);
    //@ts-ignore
    setClient(session?.user);
  }, [session]);
  return <>{children}</>;
}
