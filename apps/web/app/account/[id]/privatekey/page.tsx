import {
    Card,
    CardHeader,
} from "@/components/ui/card"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/util";
import { PrivateKeyFrom } from "@/app/account/[id]/privatekey/components/private-key-form";
import { AlertMsg } from "@/app/account/[id]/components/msg-comp";


export default async function Page({ params }: { params: { id: string } }) {
    console.log(params);
    const session = await getServerSession(authOptions);

    return (
        <>
            <div className="flex flex-col gap-y-4 p-5">
                <Card className="min-w-56 max-w-[500px]">
                    <CardHeader>
                        {/* <CardTitle>Private key</CardTitle> */}
                        <AlertMsg tab="private key" />
                    </CardHeader>
                    <PrivateKeyFrom
                        accountId={params.id}
                        key={params.id}
                        //@ts-ignore
                        jwt={session?.user.jwt}
                    />
                </Card>
            </div>


        </>
    );

}

