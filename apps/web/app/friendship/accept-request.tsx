"use client";
import { Button } from '@/components/ui/button'
import { FriendshipStatusEnum, WS_BACKEND_URL, responseStatus } from '@paybox/common';
import { clientJwtAtom } from '@paybox/recoil';
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
    useEffect(() => {
        setClientJwt(jwt);
    }, [jwt]);
    const [unmount, setUnmount] = React.useState(false);

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
                const { status, friendshipStatus, msg }: {status: responseStatus, friendshipStatus: FriendshipStatusEnum, msg?: string} =
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
                return {friendshipStatus, status, msg};
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
            success: ({msg, friendshipStatus, status}) => {
                //todo: set some atoms
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
