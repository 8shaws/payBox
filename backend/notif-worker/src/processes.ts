import {
  MsgTopics,
  Network,
  NotifTopics,
  OTP_CACHE_EXPIRE,
  TOTP_DIGITS,
  TOTP_TIME,
  TopicTypes,
  dbResStatus,
} from "@paybox/common";
import { getClientFriendship } from "./db/friendship";
import { getUsername } from "./db/client";
import { notify } from "./notifier";
import { getTxnDetails, insertCentTxn, insertTxn } from "./db/txn";
import { RedisBase, upadteMobileEmail } from "@paybox/backend-common";
import { genOtp, sendOTP } from "./auth/utils";
import { addNotif } from "./db/notif";
import { getSubs, getSubsId } from "./db/notif-sub";
import { EthRpc, SolRpc } from "@paybox/blockchain";

/**
 *
 * @param to
 * @param from
 * @returns
 */
export const notifyFriendRequest = async (to: string, from: string) => {
  const { status, fromUsername, friendshipId } = await getClientFriendship(
    to,
    from,
  );
  // con
  if (status === dbResStatus.Error || !fromUsername) {
    return;
  }

  await notify({
    to,
    body: `Friend Request from ${fromUsername}`,
    title: `Friend Request`,
    href: `/popup.html#/notifications?title="Notifications"&props=%7B%7D&nav=tab`,
    actions: [
      {
        action: "accept",
        type: "button",
        title: "👍 Accept Request",
      },
    ],
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1711238400&semt=ais",
    tag: NotifTopics.FriendRequest,
    vibrate: [200, 100, 200],
    payload: {
      friendshipId,
    },
    topic: TopicTypes.Notif,
  });
};

/**
 *
 * @param to
 * @param from
 * @param friendshipId
 * @returns
 */
export const notifyFriendRequestAccepted = async (
  to: string,
  from: string,
  friendshipId: string,
) => {
  const { status, username } = await getUsername(from);
  if (status === dbResStatus.Error || !username) {
    return;
  }

  await notify({
    to,
    body: `Friend Request Accepted by ${username}`,
    title: `Friend Request Accepted`,
    href: `/popup.html#/notifications?title="Notifications"&props=%7B%7D&nav=tab`,
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1711238400&semt=ais",
    tag: NotifTopics.FriendRequestAccepted,
    vibrate: [200, 100, 200],
    payload: {
      friendshipId,
    },
    topic: TopicTypes.Notif,
  });
};

/**
 *
 * @param to
 * @param from
 * @param friendshipId
 * @returns
 */
export const notifyFriendRequestRejected = async (
  to: string,
  from: string,
  friendshipId: string,
) => {
  const { status, username } = await getUsername(from);
  if (status === dbResStatus.Error || !username) {
    return;
  }

  await notify({
    to,
    body: `Friend Request Rejected by ${username}`,
    title: `Friend Request Rejected`,
    href: `/popup.html#/notifications?title="Notifications"&props=%7B%7D&nav=tab`,
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1711238400&semt=ais",
    tag: NotifTopics.FriendRequestRejected,
    vibrate: [200, 100, 200],
    payload: {
      friendshipId,
    },
    topic: TopicTypes.Notif,
  });
};

/**
 *
 * @param to
 * @param from
 * @param txnId
 * @returns
 */
export const notifyReceiveTxn = async (
  to: string,
  from: string,
  txnId: string,
) => {
  const { status, username } = await getUsername(from);
  if (status === dbResStatus.Error || !username) {
    return;
  }

  const {
    amount,
    network,
    status: txnDetailsStatus,
  } = await getTxnDetails(txnId, to);
  if (txnDetailsStatus === dbResStatus.Error || !amount || !network) {
    return;
  }

  await notify({
    to,
    body: `Received ${amount} ${network} from ${username}`,
    title: `Transaction Received`,
    href: getTxnHref(txnId),
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1711238400&semt=ais",
    tag: NotifTopics.TxnAccept,
    vibrate: [200, 100, 200],
    payload: {
      txnId,
    },
    topic: TopicTypes.Notif,
  });
};

const getTxnHref = (txnId?: string) => {
  if (!txnId) {
    return undefined;
  }
  return `/popup.html#/txn?props=%7B"id"%3A"${txnId}`;
};

/**
 *
 * @param notifyTo
 * @param paidTo
 * @param txnId
 * @returns
 */
export const notifyPaid = async (
  notifyTo: string,
  paidTo: string,
  txnId: string,
) => {
  const { status, username } = await getUsername(paidTo);
  if (status === dbResStatus.Error || !username) {
    return;
  }

  const {
    amount,
    network,
    status: txnDetailsStatus,
  } = await getTxnDetails(txnId);
  if (txnDetailsStatus === dbResStatus.Error || !amount || !network) {
    return;
  }

  await notify({
    to: notifyTo,
    body: `Paid ${amount} ${network} to ${username}`,
    title: `Transaction Paid`,
    href: getTxnHref(txnId),
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1711238400&semt=ais",
    tag: NotifTopics.Paid,
    vibrate: [200, 100, 200],
    payload: {
      txnId,
    },
    topic: TopicTypes.Notif,
  });
};

/**
 *
 * @param name
 * @param mobile
 * @param email
 * @param clientId
 * @returns
 */
export const otpSendProcess = async (
  name: string,
  mobile: number,
  email: string,
  clientId: string,
): Promise<void> => {
  try {
    const otp = genOtp(TOTP_DIGITS, TOTP_TIME);
    await sendOTP(name, email, otp, Number(mobile));
    await RedisBase.getInstance().cacheIdUsingKey(
      otp.toString(),
      clientId,
      OTP_CACHE_EXPIRE,
    );

    const { status, subs } = await getSubsId(clientId);
    if (status == dbResStatus.Error || !subs) {
      return;
    }
    const mutate = await addNotif(
      clientId,
      "Validation Otp send",
      "Paybox validation service",
      new Date().toISOString(),
      subs,
      null,
      MsgTopics.SendOtp,
      TopicTypes.Msg,
    );
    if (mutate.status == dbResStatus.Error) {
      console.error("Error adding notification to db.");
    }
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

/**
 *
 * @param name
 * @param mobile
 * @param email
 * @param clientId
 * @returns
 */
export const resendOtpProcess = async (
  name: string,
  mobile: number,
  email: string,
  clientId: string,
): Promise<void> => {
  try {
    const otp = genOtp(TOTP_DIGITS, TOTP_TIME);
    await sendOTP(name, email, otp, Number(mobile));
    await RedisBase.getInstance().cacheIdUsingKey(
      otp.toString(),
      clientId,
      OTP_CACHE_EXPIRE,
    );

    const updateQuery = await upadteMobileEmail(
      clientId,
      Number(mobile),
      email,
    );
    if (updateQuery.status == dbResStatus.Error) {
      throw new Error("Error updating mobile and email");
    }

    const { status, subs } = await getSubsId(clientId);
    if (status == dbResStatus.Error || !subs) {
      return;
    }
    const mutate = await addNotif(
      clientId,
      "Validation Otp send",
      "Paybox validation service",
      new Date().toISOString(),
      subs,
      null,
      MsgTopics.ResendOtp,
      TopicTypes.Msg,
    );
    if (mutate.status == dbResStatus.Error) {
      console.error("Error adding notification to db.");
    }

    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

/**
 *
 * @param param0
 * @returns
 */
export const processInsertCentTxn = async ({
  id,
  accountId,
  provider,
  status,
  clientId,
}: {
  id: string;
  accountId: string;
  provider: string;
  status: string;
  clientId: string;
}): Promise<void> => {
  try {
    const { status: dbstatus } = await insertCentTxn(
      id,
      accountId,
      provider,
      status,
      clientId,
    );
    if (dbstatus == dbResStatus.Error) {
      throw new Error("Error inserting txn");
    }
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

/**
 *
 * @param
 * @returns
 */
export const finalizedTxn = async ({
  chain,
  hash,
  from,
  to,
}: {
  chain: Network;
  hash: string;
  from: string;
  to: string;
}): Promise<void> => {
  try {
    let txnId = "";
    switch (chain) {
      case Network.Eth:
        {
          let ethTxn = await EthRpc.getInstance().getTxn(hash);
          if (ethTxn == null) {
            console.log(hash, "txn not yet confirmed...");
            return;
          }
          const { status, id } = await insertTxn(ethTxn, from);
          if (status == dbResStatus.Error || !id) {
            console.log("DB mutate error...");
            return;
          }
          txnId = id;
        }
        break;

      case Network.Sol:
        {
          const solTxn = await SolRpc.getInstance().getTxn(hash);
          if (solTxn == null) {
            console.log(hash, "txn not confirmed");
            return;
          }
          const { status, id } = await insertTxn(solTxn, from);
          if (status == dbResStatus.Error || !id) {
            console.log("DB mutate error...");
            return;
          }
          txnId = id;
        }
        break;
    }
    await notifyReceiveTxn(to, from, txnId);
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};
