import { getServerSession } from "next-auth";
import { MutateAccountForm } from "./mutate-account";
import { authOptions } from "@/app/api/auth/[...nextauth]/util";
import { getAccount } from "@/lib/helper";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    if(!session?.user?.jwt) {
        redirect("/signin")
    }

    //@ts-ignore
    const account = await getAccount(session?.user.jwt, params.id);
    console.log(account)

    return (
        <>
            {account && <MutateAccountForm 
                accountId={params.id}
                // @ts-ignore
                jwt={session?.user.jwt}
                accountName={account.name}
            />}
        </>
    );
}