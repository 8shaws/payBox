"use client"
import React, { useEffect } from 'react';
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/src/components/ui/tabs"
import { ShowAccounts } from './show-accounts';
import { ImportSecret } from './import-secret';
import { useSetRecoilState } from 'recoil';
import { clientJwtAtom } from '@paybox/recoil';
import { usePathname, useSearchParams } from 'next/navigation';
import { AddAccount } from './add-account';

export enum ITab {
    Import = "import",
    Show = "show",
    Add = "add"
}

export function Wrapper({ jwt }: { jwt: string }) {
    const setClientJwt = useSetRecoilState(clientJwtAtom);
    const [selectedTab, setTab] = React.useState<ITab>(ITab.Import);
    const params = useSearchParams()

    useEffect(() => {
        setClientJwt(jwt);
    }, []);

    useEffect(() => {
        params.get("tab") && setTab(params.get("tab") as ITab)
    }, [params])

    return (
        <Tabs value={selectedTab} className="w-fit">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value={ITab.Import}>Recovery Phrase</TabsTrigger>
                <TabsTrigger value={ITab.Show}>Accounts</TabsTrigger>
                <TabsTrigger value={ITab.Add}>Add</TabsTrigger>
            </TabsList>
            <TabsContent value={ITab.Import}>
                <ImportSecret jwt={jwt} />
            </TabsContent>
            <TabsContent value={ITab.Show}>
                <ShowAccounts  />
            </TabsContent>
            <TabsContent value={ITab.Add}>
                <AddAccount  />
            </TabsContent>
        </Tabs>
    )
}
