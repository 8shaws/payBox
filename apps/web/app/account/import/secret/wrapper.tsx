"use client"
import React, { useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ShowAccounts } from './show-accounts';
import { ImportSecret } from './import-secret';
import { useSetRecoilState } from 'recoil';
import { clientJwtAtom } from '@paybox/recoil';

export enum ITab {
    Import = "import",
    Show = "show",
    Add = "add"
}

export function Wrapper({ jwt }: { jwt: string }) {
    const setClientJwt = useSetRecoilState(clientJwtAtom);
    const [selectedTab, setTab] = React.useState<ITab>(ITab.Import);

    useEffect(() => {
        setClientJwt(jwt);
    }, []);

    return (
        <Tabs value={selectedTab} className="w-fit">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value={ITab.Import}>Recovery Phrase</TabsTrigger>
                <TabsTrigger value={ITab.Show}>Accounts</TabsTrigger>
                <TabsTrigger value={ITab.Add}>Add</TabsTrigger>
            </TabsList>
            <TabsContent value={ITab.Import}>
                <ImportSecret jwt={jwt} setTab={setTab} />
            </TabsContent>
            <TabsContent value={ITab.Show}>
                <ShowAccounts  setTab={setTab} />
            </TabsContent>
            <TabsContent value={ITab.Add}>
                <ShowAccounts  setTab={setTab} />
            </TabsContent>
        </Tabs>
    )
}
