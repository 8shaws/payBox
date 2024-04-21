"use client";
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
} from "@/src/components/ui/command"
import React from "react"
import { Button } from "./ui/button"
import { CheckCheck } from "lucide-react";


interface Option {
    name: string,
    value: string,
}

export function CommandMenu({
    open,
    setOpen,
    onSelect,
    options,
    strokeKey,
    heading,
    selected
}: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    onSelect: (value: string) => void,
    options: Option[],
    strokeKey: string,
    heading: string,
    selected: string
}) {

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === strokeKey && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type to make life simpler..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading={heading}>
                    {options.map((option) => (
                        <CommandItem
                            className=""
                            key={option.value}
                        >
                            <Button
                                className="w-full h-fit gap-x-2 flex justify-between p-0 cursor-pointer border-none bg-transparent" variant={"secondary"}
                                onClick={() => {
                                    setOpen(false);
                                    onSelect(option.value);
                                }}
                            >
                                <div className="">{option.name}</div>
                                {selected === option.value && <CheckCheck />}
                            </Button>
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandSeparator />
            </CommandList>
           

        </CommandDialog>
    )
}
