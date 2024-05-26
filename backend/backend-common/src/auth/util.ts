import { type Request, type Response } from "express";
import { importPKCS8, importSPKI, jwtVerify, SignJWT } from "jose";
import {
  AUTH_JWT_PRIVATE_KEY,
  AUTH_JWT_PUBLIC_KEY,
  PRIVATE_KEY_ENCRYPTION_KEY,
} from "../config";
import bcryptjs from "bcryptjs";
import { JWT_ALGO } from "@paybox/common";

import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

const commonEncryptionKey = crypto
  .createHash("sha256")
  .update(PRIVATE_KEY_ENCRYPTION_KEY)
  .digest();

/**
 * @param jwt
 * @returns
 */
export const validateJwt = async (jwt: string) => {
  const publicKey = await importSPKI(AUTH_JWT_PUBLIC_KEY, JWT_ALGO);
  return await jwtVerify(jwt, publicKey, {
    issuer: "shawakash",
    audience: "payBox",
  });
};

/**
 *
 * @param res
 * @param cookieName
 */
export const clearCookie = (res: Response, cookieName: string) => {
  res.clearCookie(cookieName);
};

export const setJWTCookie = async (
  req: Request,
  res: Response,
  userId: string,
) => {
  const secret = await importPKCS8(AUTH_JWT_PRIVATE_KEY, JWT_ALGO);

  const jwt = await new SignJWT({
    sub: userId,
  })
    .setProtectedHeader({ alg: JWT_ALGO })
    .setIssuer("shawakash")
    .setAudience("payBox")
    .setIssuedAt()
    .sign(secret);

  setCookieOnResponse(req, res, "jwt", jwt);

  return jwt;
};

export const setCookieOnResponse = (
  req: Request,
  res: Response,
  cookieName: string,
  cookieValue: string,
) => {
  res.cookie(cookieName, cookieValue, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    // Note: the leading . below is significant, as it enables us to use the
    // cookie on subdomains
    domain: req.hostname.includes("localhost") ? "localhost" : ".paybox.dev",
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // approx 1 year
  });
};

/**
 *
 * @param length
 * @returns
 */
export const genRand = (length: number): string => {
  return crypto.randomBytes(length).toString("hex");
};

/**
 * @returns
 */
export const genUUID = (): string => {
  return uuidv4();
};

/**
 *
 * @param password
 * @param hashPassword
 * @returns Boolean if the above is matched
 */
export const validatePassword = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  try {
    const isMatch = await bcryptjs.compare(password, hashPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

/**
 *
 * @param privateKey
 * @param password
 * @returns
 */
export const encryptWithPassword = (
  privateKey: string,
  password: string,
): string => {
  const hashedPassword = crypto.createHash("sha256").update(password).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", hashedPassword, iv);

  let encryptedPrivateKey = cipher.update(privateKey, "utf8", "hex");
  encryptedPrivateKey += cipher.final("hex");

  const commonCipherIv = crypto.randomBytes(16);
  const commonCipher = crypto.createCipheriv(
    "aes-256-cbc",
    commonEncryptionKey,
    commonCipherIv,
  );

  encryptedPrivateKey = commonCipher.update(encryptedPrivateKey, "hex", "hex");
  encryptedPrivateKey += commonCipher.final("hex");

  return (
    iv.toString("hex") +
    ":" +
    commonCipherIv.toString("hex") +
    ":" +
    encryptedPrivateKey
  );
};
