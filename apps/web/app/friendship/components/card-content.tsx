"use client";
import { Friend, FriendshipType } from '@paybox/common'
import { clientJwtAtom, pendingFriendshipAtom } from '@paybox/recoil';
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Content } from './drawer-content';
import { AcceptButton } from './accept-request';

export function FriendsCard({
    friendships,
}: {
    friendships: FriendshipType[],
}) {
    const jwt = useRecoilValue(clientJwtAtom)
    const [pendingFriendships, setPendingFriendship] = useRecoilState(pendingFriendshipAtom);
    useEffect(() => {
        setPendingFriendship(friendships)
    }, [friendships]);

    if(pendingFriendships.length === 0) {
        return (
            <p className="text-muted-foreground">No pending friend requests</p>
        )
    }

    return (
        <>
            {
                pendingFriendships.map((friendship) => {
                    return (
                        <div className="flex items-center  gap-4 w-full" key={friendship.id}>
                            <Drawer>
                                <DrawerTrigger className="flex items-center gap-4 w-full">
                                    <>
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage src={`/avatars/0${Math.floor(Math.random() * 5 + 1)}.png`} alt="Avatar" />
                                            <AvatarFallback>{friendship.friend?.firstname?.charAt(0).toLocaleUpperCase()}{friendship.friend?.lastname?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none">
                                                {friendship.friend?.firstname} {friendship.friend?.lastname}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {friendship.friend?.username}
                                            </p>
                                        </div>
                                    </>
                                </DrawerTrigger>
                                <DrawerContent className="flex items-center justify-center w-full">
                                    {friendship.friend && <Content friend={friendship.friend} friendshipId={friendship.id} />}
                                </DrawerContent>
                            </Drawer>

                            <div className="flex-grow" />
                            <AcceptButton
                                friendshipId={friendship.id}
                                jwt={jwt as string}
                                key={friendship.id}
                            />
                        </div>
                    );
                })
            }
        </>
    )
}
