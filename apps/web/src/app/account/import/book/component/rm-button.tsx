"use client";

import { rmAddress } from '@/src/actions/book';
import { Button } from '@/src/components/ui/button';
import { cn } from '@/src/utils/cn';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

function RemoveButton({
    jwt,
    id
}: {
    jwt: string,
    id: string,
}) {
    const router = useRouter();
    return (
        <Button
            variant={"link"}
            className={cn(
                "text-center text-muted-foreground "
            )}
            onClick={() => {
                toast.promise(rmAddress(jwt, id), {
                    loading: 'Removing...',
                    success: 'Address removed from book',
                    error: 'Failed to remove address'
                });
                return;
            }}
        >Remove the address from Book</Button>
    )
}

export default RemoveButton