import { VAPID_PUBLIC_KEY_DEFAULT } from "@paybox/common";

export const VAPID_PUBLIC_KEY =
  process.env.VAPID_PUBLIC_KEY || VAPID_PUBLIC_KEY_DEFAULT;

export const PRIVATE_KEY_ENCRYPTION_KEY =
  process.env.PRIVATE_KEY_ENCRYPTION_KEY ||
  "e53e0e6fb7120f8793e0127371f6265a52e9baecdbf3e336f7965a6b5bad9282";

export const SITEKEY = process.env.NEXT_PUBLIC_SITEKEY || "";
