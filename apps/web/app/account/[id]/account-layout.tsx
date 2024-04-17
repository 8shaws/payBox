"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { AccountType } from "@paybox/common"
import { accountAtom, accountsAtom, clientJwtAtom } from "@paybox/recoil"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { toast } from "sonner"

export const AccountLayout = ({
    children,
    account,
    id,
}: {
    children: React.ReactNode,
    account: AccountType,
    id: string,
}) => {
    const setAccount = useSetRecoilState(accountAtom);
    const accounts = useRecoilValue(accountsAtom);
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        if (account) {
            setAccount(account)
            
        } else {
            const acc = accounts.find(acc => acc.id === id);
            if (!acc) {
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
            <div className="h-screen p-4">
                {children}
            </div>
        </>
    );
}