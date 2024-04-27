import crypto from 'crypto';
import { PRIVATE_KEY_ENCRYPTION_KEY } from './config';
import { AccountType, BACKEND_URL, ChangePasswordValid, ExplorerPref, FriendPubKeys, FriendshipStatusEnum, FriendshipType, Locales, NotifType, WS_BACKEND_URL, responseStatus } from '@paybox/common';
import { z } from 'zod';
import Pako from 'pako';

export function toBase64(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}


export function _arrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const commonEncryptionKey = crypto
  .createHash('sha256')
  .update(PRIVATE_KEY_ENCRYPTION_KEY)
  .digest();


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

export const getAccount = async (jwt: string, id: string): Promise<AccountType | null> => {
  try {
    const { status, account }: { status: responseStatus, account: AccountType } = await fetch(`${BACKEND_URL}/account?accountId=${id}`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      next: {
        revalidate: 1
      }
    }).then(res => res.json());
    if (status == responseStatus.Error) {
      return null
    }
    return account
  } catch (error) {
    console.log(error);
    return null
  }
}

/**
 * 
 * @param jwt 
 * @param friendshipStatus 
 * @returns 
 */
export const getFriendships = async (jwt: string, friendshipStatus: FriendshipStatusEnum): Promise<FriendshipType[]> => {
  try {
    const response: { status: responseStatus, msg?: string, friendships: FriendshipType[] } =
      await fetch(`${WS_BACKEND_URL}/friendship?friendshipStatus=${friendshipStatus}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-type": "application/json"
        },
        cache: "no-cache"
      }).then(res => res.json());
    if (response.friendships.length > 0) {
      return response.friendships;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function isWord(word: string): Promise<boolean> {
  const response = await fetch(`https://api.datamuse.com/words?sp=${word}`);
  const data = await response.json();
  return data.length > 0;
}

/**
 * 
 * @param jwt 
 * @param id 
 */
export const getFriendPubKey = async (
  jwt: string,
  id: string
): Promise<FriendPubKeys | undefined> => {
  try {
    const response = await fetch(`${BACKEND_URL}/friendship/pubkey?friendId=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-type": "application/json"
      }
    }).then(res => res.json());
    if (response.status == responseStatus.Error) {
      console.log("error getting pub keys for friend");
      throw new Error(response.msg);
    }
    console.log(response)
    return response.keys as FriendPubKeys;
  } catch (error) {
    console.error(error);
  }
}

/**
 * 
 * @param jwt 
 * @param limit 
 * @param offset 
 * @param topic 
 * @returns notifications
 */
export const getNotifs = async ({
  jwt,
  limit = 25,
  offset = 0,
  topic = "notif",
  viewed = false
}: {
  jwt: string,
  limit?: number,
  offset?: number,
  topic: string,
  viewed?: boolean
}): Promise<NotifType[]> => {
  try {
    const { status, notifs }: { status: responseStatus, notifs: NotifType[] } =
      await fetch(`${BACKEND_URL}/notif?limit=${limit}&offset=${offset}&topic=${topic}&viewed=${viewed}`, {
        method: "get",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
        cache: "no-cache"
      }).then(res => res.json());
    if (status === responseStatus.Error) {
      console.log("error getting notifications");
      return [];
    }
    return notifs;
  } catch (error) {
    console.error(error);
    return []
  }
}

/**
 * 
 * @param jwt 
 * @param id 
 * @returns 
 */
export const updateNotif = async (
  jwt: string,
  id: string
): Promise<void> => {
  try {
    const { status, msg }: { status: responseStatus, msg: string } =
      await fetch(`${BACKEND_URL}/notif/viewed?id=${id}`, {
        method: "put",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
        cache: "no-cache"
      }).then(res => res.json());
    if (status === responseStatus.Error) {
      console.log("error getting notifications");
      return;
    }
  } catch (error) {
    console.log(error);
    return;
  }
}

/**
 * 
 * @param jwt 
 * @param notifIds 
 * @returns 
 */
export const markViewed = async (
  jwt: string,
  notifIds: string[]
): Promise<{ status: responseStatus, msg?: string }> => {
  try {
    const { status }: { status: responseStatus } = await fetch(`${BACKEND_URL}/notif/viewed`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ ids: notifIds }),
      cache: "no-cache"
    }).then(res => res.json());
    if (status === responseStatus.Error) {
      console.log("error marking notifications as viewed");
      return Promise.reject({ msg: "error marking notifications as viewed", status: responseStatus.Error });
    }
    return Promise.resolve({ status: responseStatus.Ok });
  } catch (error) {
    console.log(error);
    return Promise.reject({ msg: "error marking notifications as viewed", status: responseStatus.Error });
  }
}

/**
 * Fetch to update locale
 * @param jwt 
 * @param locale 
 * @returns 
 */
export const updateLocale = async (
  jwt: string,
  locale: Locales
): Promise<void> => {
  try {
    const { status, msg }: { status: responseStatus, msg?: string } =
      await fetch(`${BACKEND_URL}/locale?locale=${locale}`, {
        method: "get",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
        cache: "force-cache"
      }).then(res => res.json());
    if (status == responseStatus.Error) {
      return Promise.reject({ msg: "error updating locale", status: responseStatus.Error });
    }
    return Promise.resolve();
  } catch (error) {
    console.log(error);
    return Promise.reject({ msg: "error updating locale", status: responseStatus.Error });
  }
}

/**
 * 
 * @param jwt 
 * @param data 
 * @returns 
 */
export const patchPassword = async (
  jwt: string,
  data: z.infer<typeof ChangePasswordValid>
): Promise<void> => {
  try {
    const { status, msg }: { status: responseStatus, msg?: string } =
      await fetch(`${BACKEND_URL}/client/password`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "content-encoding": "gzip",
          authorization: `Bearer ${jwt}`,
        },
        body: Pako.gzip(JSON.stringify(data))
      }).then(res => res.json());
    if (status == responseStatus.Error) {
      return Promise.reject({ msg, status: responseStatus.Error });
    }
    return Promise.resolve();
  } catch (error) {
    console.log(error);
    return Promise.reject({ msg: "error updating password", status: responseStatus.Error });
  }
}

//todo: get the local from db if not set, set it to en
const getLocale = async (jwt: string) => {
  try {
    const { status, locale, msg }: { status: responseStatus, locale: Locales, msg?: string }
      = await fetch(`${BACKEND_URL}/locale/locale`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
        cache: "no-cache"
      }).then(res => res.json());
    console.log(locale);
    if (status === responseStatus.Error) {
      console.log(msg)
      return Locales.en;
    }
    return locale;
  } catch (error) {
    console.log(error);
    return Locales.en;
  }
}

export const putExpPref = async (
  jwt: string,
  pref: ExplorerPref
) => {
  try {
    const { status, msg }: { status: responseStatus, msg?: string }
      = await fetch(`${BACKEND_URL}/settings/pref_exp`, {
        method: "put",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(pref)
      }).then(res => res.json());

      if(status == responseStatus.Error) {
        return Promise.reject({ msg, status: responseStatus.Error });
      }

      return Promise.resolve({status});

  } catch (error) {
    console.log(error);
    return Promise.reject({ msg: "error updating explorer preferences", status: responseStatus.Error });
  }
}