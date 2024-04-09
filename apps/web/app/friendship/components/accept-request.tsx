"use client";
import { Button } from '@/components/ui/button'
import { FriendshipStatusEnum, FriendshipType, WS_BACKEND_URL, responseStatus } from '@paybox/common';
import { acceptedFriendshipAtom, clientJwtAtom, pendingFriendshipAtom } from '@paybox/recoil';
import { CheckCheck } from 'lucide-react'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil';
import { toast } from 'sonner';

export function AcceptButton({
    jwt,
    friendshipId
}: {
    jwt: string,
    friendshipId: string
}) {
    const setClientJwt = useSetRecoilState(clientJwtAtom);
    const setFriendships = useSetRecoilState(acceptedFriendshipAtom);
    const [unmount, setUnmount] = React.useState(false);
    const setPendingFriendship = useSetRecoilState(pendingFriendshipAtom);
    
    useEffect(() => {
        setClientJwt(jwt);
    }, [jwt]);
    
    useEffect(() => {
        if(unmount) {
            return () => {
                setUnmount(false);
            }
        }
    }, [unmount]);

    const accept = () => {
        const call = async () => {
            try {
                const { status, friendship, msg }: {status: responseStatus, friendship: FriendshipType, msg?: string} =
                    await fetch(`${WS_BACKEND_URL}/friendship/accept?friendshipId=${friendshipId}`, {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwt}`,
                        }
                    }).then(res => res.json());
                if (status === responseStatus.Error) {
                   console.error(msg);
                   Promise.reject(msg);
                }
                return {friendship, status, msg};
            } catch (error) {
                console.log(error);
                return {
                    status: responseStatus.Error,
                    msg: "Internal error",
                    error: error,
                }
            }
        };

        toast.promise(call(), {
            loading: "Accepting...",
            success: ({msg, friendship, status}) => {
                if(friendship) {
                    console.log(friendship)
                    setFriendships((old) => [friendship, ...old]);
                    setPendingFriendship((old) => old.filter((f) => f.id !== friendshipId));
                }
                return "Friendship Accepted"
            },
            error: ({msg}) => {
                setUnmount(true);
                return msg;
            }
        });

    }
    return (
        <>
            <Button
                onClick={accept}
                variant={"default"}
                className="flex justify-around gap-x-4"
            >
                <CheckCheck className="w-4 h-4" />
                <span>Accept</span>
            </Button>
        </>
    )
}
