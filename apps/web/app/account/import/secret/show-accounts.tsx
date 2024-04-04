"use client"
import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useRecoilValue } from "recoil"
import { fromPhraseAccountAtom } from "@paybox/recoil"
import { Network } from "@paybox/common"
import { Tab } from "./tab";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { StepForward } from "lucide-react";
import { ITab } from "./wrapper"


const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export function ShowAccounts({
    setTab
}: {
    setTab: React.Dispatch<React.SetStateAction<ITab>>
}) {
    const accounts = useRecoilValue(fromPhraseAccountAtom);
    const [selectedSolKeys, setSelectedSolKeys] = React.useState<{
        network: Network.Sol,
        publicKey: string
    } | null>(null);
    const [selectedEthKeys, setSelectedEthKeys] = React.useState<{
        network: Network.Eth,
        publicKey: string
    } | null>(null);
    const [error, setError] = React.useState<string>("");

    React.useEffect(() => {
        if (error) {
            setTimeout(() => setError(""), 2500)
        }
    }, [error]);

    return (
        <>
            <Card className="w-[650px] ">
                <CardHeader>
                    <CardTitle>Accounts on the recovery phrase</CardTitle>
                    <CardDescription>We have found {accounts.length} Account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="Solana" className="">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value={"Solana"}>Solana</TabsTrigger>
                            <TabsTrigger value="Ethereum">Ethereum</TabsTrigger>
                        </TabsList>
                        <TabsContent value="Solana">
                            <ScrollArea className="h-72 w-full rounded-md border p-4">
                                {accounts.length && accounts.filter(acc => acc.chain.name == "Solana").map((solAcc) => (
                                    <>

                                        <Tab
                                            chain={solAcc.chain.name}
                                            publicKey={solAcc.publicKey}
                                            setError={setError}
                                        />
                                        <Separator className="my-2" />
                                    </>
                                ))}
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="Ethereum">
                            <ScrollArea className="h-72 w-full rounded-md border">
                                <div className="p-4">
                                    <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                                    {accounts.length && accounts.filter(acc => acc.chain.name == "Ethereum").map((ethAcc) => (
                                        <>
                                            <Tab
                                                chain={ethAcc.chain.name}
                                                publicKey={ethAcc.publicKey}
                                                setError={setError}
                                            />
                                            <Separator className="my-2" />
                                        </>
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>

                </CardContent>
                <CardFooter className="w-full">
                    {error && <div
                        className={cn(
                            "flex flex-row gap-x-4 justify-center items-center text-red-400 ease-in-out"
                        )}
                    >
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        {error}
                    </div>}
                    <Button variant={"default"} className="w-full" onClick={() => setTab(ITab.Add)}>
                        <StepForward className="w-4 h-4" /> Continue
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}
