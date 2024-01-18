"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { BACKEND_URL, ClientSignupFormValidate } from "@paybox/common"
import { headers } from "next/headers"
import { useToast } from "./use-toast"
import { ToastAction } from "@radix-ui/react-toast"


interface ClientSignupFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function ClientSignupForm({ className, ...props }: ClientSignupFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const { data: session, update } = useSession(); // Use the useSession hook to get the session state
    const router = useRouter();
    const { toast } = useToast()

    React.useEffect(() => {
        // Check if the session is defined and navigate to the protected page
        if (session) {
            router.push('/protected');
        }
    }, [session, router]);

    const form = useForm<z.infer<typeof ClientSignupFormValidate>>({
        resolver: zodResolver(ClientSignupFormValidate),
        defaultValues: {
            username: "",
            email: ""
        },
    })

    async function onSubmit(values: z.infer<typeof ClientSignupFormValidate>) {
        try {

            const response = await fetch(`${BACKEND_URL}/client/`, {
                method: "post",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(values),
                cache: "no-store"
            });
            const res = await response.json();
            const r = await update({...res});

            toast({
                title: `Signed as ${res.username}`,
                //@ts-ignore
                description: `Your Client id: ${res.id}`,
            });
            setIsLoading(false);
            router.push("/protected")
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                //@ts-ignore
                description: `There was a problem with your signin. ${error.msg}`,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={(form.handleSubmit(onSubmit))}>
                    <div className="grid gap-3">
                        <div className="grid grid-flow-col gap-x-5">
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }) => (
                                    <FormItem className="grid gap-1">
                                        <FormLabel className="sr-only" htmlFor="firstname">
                                            Firstname
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="firstname"
                                                placeholder="Joe"
                                                type="text"
                                                autoCapitalize="words"
                                                autoComplete="name"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem className="grid gap-1">
                                        <FormLabel className="sr-only" htmlFor="lastname">
                                            Lastname
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="lastname"
                                                placeholder="Frazer"
                                                type="text"
                                                autoCapitalize="words"
                                                autoComplete="name"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="grid gap-1">
                                    <FormLabel className="sr-only" htmlFor="username">
                                        Username
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="username"
                                            placeholder="@username"
                                            type="text"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="grid gap-1">
                                    <FormLabel className="sr-only" htmlFor="email">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            placeholder="name@example.com"
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="grid gap-1">
                                    <FormLabel className="sr-only" htmlFor="password">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="password"
                                            placeholder="@password"
                                            type="password"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mobile"
                            render={({ field }) => (
                                <FormItem className="grid gap-1">
                                    <FormLabel className="sr-only" htmlFor="mobile">
                                        Mobile
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="mobile"
                                            placeholder="1234567890"
                                            type="text "
                                            autoCapitalize="none"
                                            autoComplete="mobile"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading} type="submit" onSubmit={() => setIsLoading(true)}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign In with Email
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-y-3">
                <Button
                    variant="outline"
                    type="button"
                    disabled={isLoading}
                    onClick={() => {
                        setIsLoading(true);
                        signIn("github").then(() => setIsLoading(false));
                    }}
                >
                    {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.gitHub className="mr-2 h-4 w-4" />
                    )}{" "}
                    GitHub
                </Button>
                <Button
                    variant="outline"
                    type="button"
                    disabled={isLoading}
                    onClick={() => {
                        signIn("google");
                    }}
                >
                    {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.google className="mr-2 h-4 w-4" />
                    )}{" "}
                    Google
                </Button>
            </div>
        </div>
    )
}