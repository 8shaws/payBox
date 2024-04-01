"use client";
import { clientJwtAtom } from '@paybox/recoil'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

export function Wrapper({
    children,
    jwt
}: {
    children: React.ReactNode,
    jwt: string
}) {
    const setJwt = useSetRecoilState(clientJwtAtom);
    useEffect(() => {
        setJwt(jwt);
    }, [jwt])
    return (
        <>
            {children}
        </>
    );
}