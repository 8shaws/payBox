import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { EyeOff } from 'lucide-react';
import { RocketIcon } from "lucide-react"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/util";
import { SecretPhraseForm } from "./components/secret-phrase";
import { AlertMsg } from "@/app/account/[id]/msg-comp";


export default async function Page({ params }: { params: { id: string } }) {
    console.log(params);
    const session = await getServerSession(authOptions);

    return (
        <>
            <div className="flex flex-col gap-y-4 p-5">
                <Card className="min-w-56 max-w-[500px]">
                    <CardHeader>
                        <AlertMsg tab={"secret phrase"} />
                    </CardHeader>
                    <SecretPhraseForm
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