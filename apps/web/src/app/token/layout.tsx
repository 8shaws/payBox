import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "../api/auth/[...nextauth]/util";
import { redirect } from "next/navigation";
import { BACKEND_URL, TokenType, responseStatus } from "@paybox/common";
import { TokensLayout } from "./components/token-layout";

export const metadata: Metadata = {
  title: "Tokens | PayBox",
  description: "Tokens | PayBox",
};

const getTokens = async (jwt: string): Promise<TokenType[] | null> => {
  try {
    const {
      status,
      tokens,
    }: {
      status: responseStatus;
      tokens: TokenType[];
    } = await fetch(`${BACKEND_URL}/token/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        ContentType: "application/json",
      },
      cache: "no-cache",
    }).then((res) => res.json());

    if (status == responseStatus.Error) {
      console.log("Error fetching tokens");
      return null;
    }
    return tokens;
  } catch (er) {
    console.log(er);
    return null;
  }
};

export default async function TokenLayoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user?.email) {
    redirect("/signup");
  }
  //@ts-ignore
  const tokens = await getTokens(session.user.jwt);

  return (
    <div>
      {tokens && (
        <TokensLayout
          children={children}
          tokens={tokens}
          defaultLayout={defaultLayout}
          defaultCollapsed={true}
          navCollapsedSize={4}
        />
      )}
    </div>
  );
}
