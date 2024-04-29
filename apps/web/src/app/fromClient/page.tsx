"use client";
import { loadMoonPay } from "@moonpay/moonpay-js";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MoonPayBuyWidget, MoonPayProvider } from '@moonpay/moonpay-react';

export default function APITestPage() {
  const [name, setName] = useState<string>();
  const se = getSession();
  /**
   * Either by useSession or fetch the api
   */
  const session = useSession();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  // useEffect(() => {
  //   fetch("/api/whoami",
  //   {     cache: "no-store",
  //       next: { revalidate: 10 }})
  //     .then((res) => res.json())
  //     .then((data) => {console.log(data); setName(data.name)});
  // }, [session]);

  return (
    <div>
      {/* <MoonPayProvider
        apiKey="pk_test_vbgzACHz9ggzGLm9vEEwAWZQlnjiZ4Ux"
        debug
      >
        <div>
          API Route From <span className="font-bold underline">Client</span>
        </div>
        <MoonPayBuyWidget
            variant="embedded"
            baseCurrencyCode="usd"
            baseCurrencyAmount="100"
            defaultCurrencyCode="eth"
            visible={visible}
            paymentMethod="mobile_wallet"
        />
        <button onClick={() => setVisible(!visible)}>
            Toggle widget
        </button>

        <div onClick={() => router.push("/fromServer")}>Name: {name}</div>
      </MoonPayProvider> */}
    </div>
  );
}
