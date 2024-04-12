"use client";
import { ClientWithJwt, NotifType } from '@paybox/common';
import { clientAtom, clientJwtAtom, msgNotifAtom, notifsAtom } from '@paybox/recoil';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil';
import { toast } from 'sonner';

export function SetNotifs({
  notifs,
  children,
  tab
}: {
  children: React.ReactNode;
  notifs: NotifType[];
  tab: "Mails" | "Notif" 
}) {

    const router = useRouter();
    const setNotifsAtoms = useSetRecoilState(notifsAtom);
    const setMsgNotifAtom = useSetRecoilState(msgNotifAtom);

    useEffect(() => {
        if(Array.isArray(notifs)) {
          if(tab == "Mails") {
            setMsgNotifAtom(notifs)
          } else {
            setNotifsAtoms(notifs);
          }
        } else {
            router.refresh();
        }
    }, [notifs])

  return (
    <>
        {children}
    </>
  )
}
