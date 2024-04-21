import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/util";
import { SparklesCore } from "@/src/components/ui/sparklecore";
import Sparkles from "./components/Client/sparkle";
import { QRCode } from 'react-qrcode-logo';
import { Hero } from "@/src/components/hero";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/src/components/ui/canvas-reveal-effect";
import { Heading } from "./heading";
import { ContainerScroll } from "@/src/components/container-scroll-animation";


export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="flex flex-col justify-center">
        <Heading classname={"h-screen"} />
        {/* <Sparkles
          classname="flex flex-col items-center justify-center overflow-hidden rounded-md"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleColor="#FFFFFF"
          body="PayBox"
        /> */}
        <Hero />
      </div>
    </>
  );
}
