import { Button } from '@/components/ui/button'
import { DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { getFriendPubKey } from '@/lib/helper'
import { Client, Friend } from '@paybox/common'
import React from 'react'

export async function Content({
    friend,
    jwt
}: {
    friend: Friend,
    jwt: string
}) {

    const pubkeys = await getFriendPubKey(jwt, friend.id);
    console.log(pubkeys, "from")

    return (
        <>
            <DrawerHeader>
                <DrawerTitle>{friend.firstname} {friend.lastname}</DrawerTitle>
                <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                </DrawerClose>
            </DrawerFooter>
        </>
    )
}
