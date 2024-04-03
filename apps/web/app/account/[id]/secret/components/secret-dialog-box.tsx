import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from 'lucide-react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea";
import React, { Suspense } from "react";
import { useRecoilValue } from "recoil";
import { accountAtom, accountPrivateKeysAtom } from "@paybox/recoil";
import { Skeleton } from "@/components/ui/skeleton";

export function SecretPhraseDialogBox({
    open,
    setOpen,
    seed,
}: {
    open: boolean,
    setOpen: (open: boolean) => void,
    seed?: string | null
}) {
    const account = useRecoilValue(accountAtom);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {account?.name} Secret Phrase
                    </DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>

                <Card className="border-none">
                    <CardHeader>
                        <Alert variant={"default"}>
                            <AlertTriangle className="h-4 w-4" color="#ff4545" />
                            <AlertTitle className="text-[#ff4545]">Caution!</AlertTitle>
                            <AlertDescription className="text-[#ff4545]">Do not share your Secret Phrase. Indiviual bearing this has full control on this account!</AlertDescription>
                        </Alert>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {/* Create ui */}
                        {seed ?
                            <div className="grid grid-cols-3 gap-3">
                                {seed.split(" ").map((word, index) => (
                                    <Label className="flex flex-row justify-around px-4 items-center border border-input rounded-md focus-visible:ring-1 focus-visible:ring-ring">
                                        <Label className="text-sm">{index + 1}.</Label>
                                        <Input
                                            type="text"
                                            className="text-center min-w-fit border-none hover:border-none focus-visible:ring-0"
                                            value={word}
                                            readOnly
                                        />
                                    </Label>
                                ))}
                            </div>
                            : <div className="grid grid-cols-3 gap-3">
                                {Array(24).fill(0).map((index) => (
                                    <Skeleton
                                        className="min-w-fit min-h-9"
                                    />
                                ))}
                            </div>
                        }
                    </CardContent>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <CardFooter className="w-full">
                                <Button type="button" variant="secondary" className="w-full">
                                    Close
                                </Button>
                            </CardFooter>
                        </DialogClose>
                    </DialogFooter>
                </Card>
            </DialogContent>
        </Dialog>
    )
}
