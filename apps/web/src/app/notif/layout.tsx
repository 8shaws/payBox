import type { Metadata } from "next";
import { cn } from "@/src/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/util";
import { getNotifs } from "@/src/lib/helper";
import SetClientJwtWrapper from "@/src/components/set-client-jwt-wrapper";
import { redirect } from "next/navigation";
import { ClientWithJwt } from "@paybox/common";
import { NotifChildLayout } from "./child-layout";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Notif | PayBox",
  description: "By Akash Shaw",
  creator: "Akash Shaw",
  icons: ["/"],
};
export default async function NotifLayout({
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
  return (
    <div className="">
      <SetClientJwtWrapper client={session?.user as ClientWithJwt}>
        <NotifChildLayout
          children={children}
          defaultLayout={defaultLayout}
          navCollapsedSize={4}
        />
      </SetClientJwtWrapper>
    </div>
  );
}
