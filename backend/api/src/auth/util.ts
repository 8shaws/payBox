import bcryptjs from "bcryptjs";
import { PRIVATE_KEY_ENCRYPTION_KEY } from "../config";
import {
  Address,
  CLIENT_URL,
  ChainAccountPrivate,
  SALT_ROUNDS,
} from "@paybox/common";
import * as qr from "qrcode";
import * as bip39 from "bip39";
// import ed from "ed25519-hd-key";
// import * as ed25519 from 'ed25519';

import crypto from 'crypto';
import { cloud } from "..";
import { Readable } from "stream";
import { PutObjectCommand, GetObjectCommand, CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { SolOps, EthOps } from "@paybox/blockchain";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from 'uuid';


/**
 * To create a hash password
 * @param password
 * @returns
 */
export const setHashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcryptjs.hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};


/**
 *
 * @param payload
 * @param path
 * @returns true if the qr code is generated successfully else false
 */
export const generateQRCode = async (
  bucketName: string,
  payload: Partial<Address>,
  id: string,
): Promise<Buffer | undefined> => {
  try {
    let redirectUrl = `${CLIENT_URL}/txn/send?`;
    if (payload.sol) {
      redirectUrl += `sol=${payload.sol}&`;
    }
    if (payload.eth) {
      redirectUrl += `eth=${payload.eth}&`;
    }
    if (payload.bitcoin) {
      redirectUrl += `&bitcoin=${payload.bitcoin}&`;
    }
    const buffer = await qr.toBuffer(redirectUrl);
    const ETag = await putObjectInR2<Buffer>(bucketName, `qr:${id.slice(5)}`, buffer, 'image/png');
    return buffer;

  } catch (error) {
    console.error("Error generating QR code:", error);
    return undefined;
  }
};

export const getUniqueImageName = (id: string): string => {
  const timestamp: number = Date.now();
  const imageName: string = `./codes/${id.slice(5)}_${timestamp
    .toString()
    .slice(5)}.png`;
  return imageName;
};

export const generateSeed = (strength: number): string => {
  const mnemonic: string = bip39.generateMnemonic(strength);
  return mnemonic;
};

export const getAccountOnPhrase = async (
  secretPhrase: string,
  count: number,
): Promise<ChainAccountPrivate[]> => {
  try {
    const solAccounts = await SolOps.getInstance().fromPhrase(secretPhrase, count);
    const ethAccounts = EthOps.getInstance().fromPhrase(secretPhrase, count);
    return [...solAccounts, ...ethAccounts];
  } catch (error) {
    console.log(error);
    return [];
  }
};



/**
 * 
 * @param bucketName 
 * @param fileName 
 * @param content 
 * @param contentType 
 */
export const putObjectInR2 = async <T extends string | Uint8Array | Buffer>(
  bucketName: string,
  fileName: string,
  content: T,
  contentType: string
): Promise<string | undefined> => {
  const mutate = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: content,
    ContentType: contentType,
    Metadata: {
      'Uploaded-By': 'payBox',
      'Upload-Date': new Date().toISOString(),
      'Content-Type': contentType,
      'owner': 'paybox'
    }
  });

  try {
    const { ETag } = await cloud.send(mutate);
    console.log(`File ${fileName} uploaded with ETag: ${ETag}`);
    return ETag;
  } catch (error) {
    console.error('Error uploading object:', error);
    throw error;
  }
}

/**
 * 
 * @param bucketName 
 * @param fileName 
 * @returns 
 */
export const getObjectFromR2 = async (
  bucketName: string,
  fileName: string
): Promise<{ code: Buffer, type: string } | undefined> => {

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: fileName
  });

  try {
    const { Body, ContentType } = await cloud.send(command);
    if (Body) {
      const chunks: Buffer[] = [];
      for await (const chunk of Body as Readable) {
        if (Buffer.isBuffer(chunk)) {
          chunks.push(chunk);
        } else {
          chunks.push(Buffer.from(chunk));
        }
      }
      console.log(`Get ${fileName} from R2`);
      return {
        code: Buffer.concat(chunks),
        type: ContentType as string
      };
    } else {
      console.log(`File ${fileName} not found in R2`);
      return undefined;
    }
  } catch (error) {
    console.error('Error getting object:', error);
    return undefined;
  }
}

/**
 * 
 * @param bucketName 
 * @param fileName 
 * @returns 
 */
export const getPutSignUrl = async (bucketName: string, fileName: string, expiresIn: number): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Metadata: {
      'Uploaded-By': 'payBox',
      // 'Upload-Date': new Date().toISOString(),
      'owner': 'paybox'
    }
  });

  try {
    const url = await getSignedUrl(cloud, command, { expiresIn });
    console.log(`Get signed url for ${fileName}`);
    return url;
  } catch (error) {
    console.error('Error getting signed url:', error);
    throw error;
  }
}

/**
 * 
 * @param bucketName 
 * @param key 
 * @param newKey 
 * @returns 
 */
export const updateKey = async (bucketName: string, key: string, newKey: string): Promise<string | undefined> => {
  const copyCommand = new CopyObjectCommand({
    Bucket: bucketName,
    CopySource: `${bucketName}/${key}`,
    Key: newKey,
    Metadata: {
      'Uploaded-By': 'payBox',
      // 'Upload-Date': new Date().toISOString(),
      'owner': 'paybox'
    }
  });

  const deleteCommand = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key
  });

  try {
    const copy = await cloud.send(copyCommand);
    await cloud.send(deleteCommand);
    return copy.CopyObjectResult?.ETag;
  } catch (error) {
    console.error('Error updating the key:', error);
    throw error;
  }
}

export const calculateGas = (gasLimit: BigInt, gasPrice: BigInt): number => {
  const maxGasFeeInWei = Number(gasLimit) * Number(gasPrice);
  return maxGasFeeInWei / 1e18;
};

const commonEncryptionKey = crypto
  .createHash('sha256')
  .update(PRIVATE_KEY_ENCRYPTION_KEY)
  .digest();

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
  const hashedPassword = crypto.createHash('sha256').update(password).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', hashedPassword, iv);

  let encryptedPrivateKey = cipher.update(privateKey, 'utf8', 'hex');
  encryptedPrivateKey += cipher.final('hex');

  const commonCipherIv = crypto.randomBytes(16);
  const commonCipher = crypto.createCipheriv('aes-256-cbc', commonEncryptionKey, commonCipherIv);

  encryptedPrivateKey = commonCipher.update(encryptedPrivateKey, 'hex', 'hex');
  encryptedPrivateKey += commonCipher.final('hex');

  return iv.toString('hex') + ':' + commonCipherIv.toString('hex') + ':' + encryptedPrivateKey;
}

/**
 * 
 * @param encryptedPrivateKey 
 * @param password 
 * @returns 
 */
export const decryptWithPassword = (
  encryptedPrivateKey: string,
  password: string,
): string => {
  const [iv, commonCipherIv, encrypted] = encryptedPrivateKey.split(':');

  const hashedPassword = crypto.createHash('sha256').update(password).digest();
  const commonDecipher = crypto.createDecipheriv('aes-256-cbc', commonEncryptionKey, Buffer.from(commonCipherIv, 'hex'));

  let decryptedPrivateKey = commonDecipher.update(encrypted, 'hex', 'hex');
  decryptedPrivateKey += commonDecipher.final('hex');

  const decipher = crypto.createDecipheriv('aes-256-cbc', hashedPassword, Buffer.from(iv, 'hex'));

  let privateKey = decipher.update(decryptedPrivateKey, 'hex', 'utf8');
  privateKey += decipher.final('utf8');

  return privateKey;
}

export const generateUUID = () => {
  return uuidv4();
}