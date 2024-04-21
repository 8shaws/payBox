"use client";
import { Nav } from "@/src/components/ui/nav";
import { Progress } from "@/src/components/ui/progress";
import { SiteHeader } from "@/src/components/ui/siteHeader";
import { Toaster } from "@/src/components/ui/sonner";
import { loadingAtom } from "@paybox/recoil";
import { QRCode } from "react-qrcode-logo";
import { useRecoilValue } from "recoil";

export default function RootChildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoading = useRecoilValue(loadingAtom);
  return (
    <>
      {/* <Progress value={33} className="absolute top-0 bg-transparent" /> */}
      <main className="flex min-h-screen flex-col w-full justify-start">
        <SiteHeader />
        {children}
      </main>
      <Toaster/>
    </>
  );
}
