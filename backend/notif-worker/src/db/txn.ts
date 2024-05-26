import { Chain } from "@paybox/zeus";
import { HASURA_URL, JWT } from "../config";
import {
  HASURA_ADMIN_SERCRET,
  Network,
  NotifSubType,
  TokenTxn,
  TxnType,
  dbResStatus,
} from "@paybox/common";

const chain = Chain(HASURA_URL, {
  headers: {
    Authorization: `Bearer ${JWT}`,
    "x-hasura-admin-secret": HASURA_ADMIN_SERCRET,
  },
});

/**
 *
 * @param id
 * @param clientId
 * @returns
 */
export const getTxnDetails = async (
  id: string,
  username?: string,
): Promise<{
  status: dbResStatus;
  network?: Network;
  amount?: number;
}> => {
  const response = await chain("query")(
    {
      transactions: [
        {
          limit: 1,
          where: {
            id: { _eq: id },
          },
        },
        {
          network: true,
          amount: true,
        },
      ],
    },
    { operationName: "getTxnDetails" },
  );
  if (Array.isArray(response.transactions)) {
    return {
      status: dbResStatus.Ok,
      network: response.transactions[0].network as Network,
      amount: response.transactions[0].amount as number,
    };
  }
  return {
    status: dbResStatus.Error,
  };
};

/**
 *
 * @param id
 * @param accountId
 * @param provider
 * @param status
 * @param clientId
 * @returns
 */
export const insertCentTxn = async (
  id: string,
  accountId: string,
  provider: string,
  status: string,
  clientId: string,
): Promise<{
  status: dbResStatus;
}> => {
  const response = await chain("mutation")(
    {
      insert_centralized_txn_one: [
        {
          object: {
            accountId,
            clientId,
            id,
            provider,
            status,
          },
        },
        {
          id: true,
        },
      ],
    },
    { operationName: "insertCentTxn" },
  );
  if (response.insert_centralized_txn_one?.id) {
    return {
      status: dbResStatus.Ok,
    };
  }
  return {
    status: dbResStatus.Error,
  };
};

/**
 *
 * @param txn
 * @param clientId
 * @returns
 */
export const insertTxn = async (
  txn: Omit<TxnType, "id" | "time" | "clientId">,
  clientId: string,
  network: Network,
): Promise<{
  status: dbResStatus;
  id?: string;
}> => {
  const response = await chain("mutation")(
    {
      insert_transactions_one: [
        {
          object: {
            ...txn,
            clientId,
            time: new Date().toISOString(),
            network,
          },
        },
        {
          id: true,
          status: true,
        },
      ],
    },
    { operationName: "insertTxn" },
  );
  if (response.insert_transactions_one?.id) {
    return {
      id: response.insert_transactions_one.id as string,
      status: dbResStatus.Ok,
    };
  }
  return {
    status: dbResStatus.Error,
  };
};

export const insertTokenTxn = async (
  txn: TokenTxn,
): Promise<{
  status: dbResStatus;
  id?: string;
}> => {
  const fromAta = await chain("query")(
    {
      ata: [
        {
          where: {
            token: { _eq: txn.token },
            owner: { _eq: txn.fromAta },
          },
        },
        {
          pubKey: true,
        },
      ],
    },
    { operationName: "fromata" },
  );
  const toAta = await chain("query")(
    {
      ata: [
        {
          where: {
            token: { _eq: txn.token },
            owner: { _eq: txn.toAta },
          },
        },
        {
          pubKey: true,
        },
      ],
    },
    { operationName: "toAta" },
  );

  txn.fromAta = fromAta.ata[0].pubKey;
  txn.toAta = fromAta.ata[0].pubKey;

  const response = await chain("mutation")(
    {
      insert_token_txn_one: [
        {
          object: {
            ...txn,
          },
        },
        {
          id: true,
        },
      ],
    },
    { operationName: "insert_token_txn_one" },
  );
  if (response.insert_token_txn_one?.id) {
    return {
      status: dbResStatus.Ok,
      id: response.insert_token_txn_one.id as string,
    };
  }
  return {
    status: dbResStatus.Error,
  };
};

export const getTokenTxnDetails = async (
  txnId: string,
  to: string,
): Promise<{
  status: dbResStatus;
  amount?: number;
}> => {
  const response = await chain("query")(
    {
      token_txn: [
        {
          where: {
            client: {
              username: { _eq: to },
            },
            id: { _eq: txnId },
          },
        },
        {
          amount: true,
        },
      ],
    },
    { operationName: "getTokenDetails" },
  );
  if (response.token_txn[0]) {
    return {
      status: dbResStatus.Ok,
      amount: response.token_txn[0].amount as number,
    };
  }
  return {
    status: dbResStatus.Error,
  };
};
