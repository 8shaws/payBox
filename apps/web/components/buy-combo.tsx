import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { Bitcoin, LucideIcon, LucideTrafficCone } from "lucide-react"
import React from "react"
import SolanaIcon from "./icon/SolanaIcon"
import EthIcon from "./icon/Eth"
import { UsdcIcon } from "./icon/usdc"
import { Button } from "./ui/button"
import { Network } from "@paybox/common"


interface Token {
    name: string,
    icon: React.ElementType | LucideIcon,
    value: Network,
}

export const tokens: Token[] = [
    {
        name: "Solana",
        icon: SolanaIcon,
        value: Network.Sol,
    },
    {
        name: "Ethereum",
        icon: EthIcon,
        value: Network.Eth,
    },
    {
        name: "Usdc",
        icon: UsdcIcon,
        value: Network.USDC,
    },
    {
        name: "Bitcoin",
        icon: Bitcoin,
        value: Network.Bitcoin,
    },
]

export function TokenCommandMenu({
    open,
    setOpen,
    onSelect,
}: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    onSelect: (network: Network) => void
}) {

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type Token name to search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Tokens">
                    {tokens.map((token) => (
                        <CommandItem
                            className=""
                            key={token.value}
                        >
                            <Button
                                className="w-full h-fit gap-x-2 flex justify-start p-0 cursor-pointer border-none bg-transparent" variant={"secondary"}
                                onClick={() => {
                                    setOpen(false);
                                    onSelect(token.value);
                                }}
                            >
                                <div className="">
                                    <token.icon />
                                </div>
                                <div className="">{token.name}</div>
                            </Button>
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandSeparator />
            </CommandList>
            <CommandGroup heading={"Settings"}>
                <Button onClick={() => setOpen(false)} variant={"outline"} className="w-full">Close</Button>
            </CommandGroup>

        </CommandDialog>
    )
}
