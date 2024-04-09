"use client";
import { Tab } from '@/app/account/[id]/tab';
import AccountTab from '@/components/key-tab';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button'
import { DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { getFriendPubKey } from '@/lib/helper'
import { Client, Friend, FriendPubKeys } from '@paybox/common'
import { clientJwtAtom, friendsPubKeysAtom, friendPubKeySelector } from '@paybox/recoil'
import React, { use, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState, } from 'recoil'
import { AcceptButton } from './accept-request';
import { Badge } from '@/components/ui/badge';

export function Content({
    friend,
    friendshipId
}: {
    friend: Friend,
    friendshipId: string
}) {
    const jwt = useRecoilValue(clientJwtAtom);
    const setFriendsPubKey = useSetRecoilState(friendsPubKeysAtom);
    const [pubKey, setPubKey] = React.useState<FriendPubKeys | null>(null);
    //@ts-ignore

    useEffect(() => {
        if (jwt) {
            getFriendPubKey(jwt, friend.id).then(res => {
                if (res) {
                    setPubKey(res)
                    setFriendsPubKey((pre) => [...pre, res]);
                }
            });
        }
    }, [jwt, friend]);

    return (
        <>
            {pubKey &&
                <div className='flex flex-col py-4 items-start justify-start'>
                    <DrawerHeader className='flex flex-row gap-x-4 w-full'>
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src={`/avatars/0${Math.floor(Math.random() * 5 + 1)}.png`} alt="Avatar" />
                            <AvatarFallback>{friend?.firstname?.charAt(0).toLocaleUpperCase()}{friend?.lastname?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="">
                            <DrawerTitle>{friend.firstname} {friend.lastname}</DrawerTitle>
                            <DrawerDescription>{friend.email}</DrawerDescription>
                        </div>
                        <div className="flex-grow" />
                        <Badge variant="outline">{friend.username}</Badge>
                    </DrawerHeader>
                    <div className="space-y-2">
                        <Tab
                            chain='Ethereum'
                            account={{
                                key: pubKey.eth,
                                name: friend.firstname
                            }}
                        />
                        <Tab
                            chain='Solana'
                            account={{
                                key: pubKey.sol,
                                name: friend.firstname
                            }}
                        />
                    </div>
                    <DrawerFooter className='w-full px-0'>
                        <DrawerClose>
                            <Button className='w-full' variant="secondary">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            }
        </>
    )
}
