"use client"

import { AccountType } from "@paybox/common"
import { accountAtom, accountsAtom } from "@paybox/recoil"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { toast } from "sonner"

export const AccountLayout = ({
    children,
    account,
    id
}: {
    children: React.ReactNode,
    account: AccountType,
    id: string
}) => {
    const setAccount = useSetRecoilState(accountAtom);
    const accounts = useRecoilValue(accountsAtom);
    const router = useRouter();
    
    useEffect(() => {
        if (account) {
            setAccount(account)
        } else {
            const acc = accounts.find(acc => acc.id === id);
            if(!acc) {
                toast.error("Account not found");
                router.push('/account/');
                return;
            }
            if (acc) {
                setAccount(acc)
            }
        }
    }, [account]);

    return (
        <>
            {children}
        </>
    );
}