import "./globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/src/app/components/Client/theme-provider";
import { cn } from "@/src/lib/utils";
import { getServerSession } from "next-auth";
import SessionProvider from "@/src/components/ui/session-provider";
import RecoilRootWrapper from "@paybox/recoil/src/hooks/recoilRootWraper";
import { authOptions } from "./api/auth/[...nextauth]/util";
import RootChildLayout from "./RootChildLayout";
import NotifWrapper from "./NotifWrapper";
import { ClientWithJwt } from "@paybox/common";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "PayBox",
  description: "By Akash Shaw",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <link
          rel="icon"
          href="/favicon.png"
          type="image/png"
          sizes="<generated>"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session} refetchInterval={5 * 60}>
            <NotifWrapper>
              <RecoilRootWrapper>
                <RootChildLayout children={children} />
              </RecoilRootWrapper>
            </NotifWrapper>
          </SessionProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
