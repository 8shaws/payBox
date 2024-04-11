"use client";
import { ClientWithJwt, NotifType } from '@paybox/common';
import { clientAtom, clientJwtAtom, notifsAtom } from '@paybox/recoil';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil';
import { toast } from 'sonner';

export function SetNotifs({
  notifs,
  children
}: {
  children: React.ReactNode;
  notifs: NotifType[];
}) {

    const router = useRouter();
    const setNotifsAtoms = useSetRecoilState(notifsAtom);

    useEffect(() => {
        if(Array.isArray(notifs)) {
            setNotifsAtoms(notifs);
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
