import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/util";
import { getAccount } from "@/src/lib/helper";
import { redirect } from "next/navigation";
import { MutateAccountForm } from "@/src/app/account/[id]/update/mutate-account";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  if (!session?.user?.jwt) {
    redirect("/signin");
  }

  //@ts-ignore
  const account = await getAccount(session?.user.jwt, params.id);

  return (
    <>
      {account && (
        <MutateAccountForm
          accountId={params.id}
          // @ts-ignore
          jwt={session?.user.jwt}
          accountName={account.name}
          walletId={account.walletId}
        />
      )}
    </>
  );
}
