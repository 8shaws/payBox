"use client";

import { CLIENT_URL } from "@paybox/common";
import React from "react";
import { QRCode } from "react-qrcode-logo";

export function CodeWrapper({ accountId }: { accountId: string }) {
  return (
    <>
      <QRCode
        logoImage={`/network/ethDark.png`}
        logoPadding={5}
        size={140}
        logoPaddingStyle="circle"
        style={{ margin: "auto", padding: "1rem", borderRadius: "10px" }}
        qrStyle="squares"
        eyeRadius={10}
        enableCORS={true}
        // fgColor="#4287f5"
        ecLevel="Q"
        removeQrCodeBehindLogo={true}
        value={`${CLIENT_URL}/txn/accept?to=${accountId}`}
      />
    </>
  );
}
