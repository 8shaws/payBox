import { Chain, order_by } from "@paybox/zeus";
import { HASURA_URL, JWT } from "../config";
import {
  AccountType,
  BitcoinKey,
  EthKey,
  HASURA_ADMIN_SERCRET,
  Network,
  SolKey,
  WalletKeys,
  WalletType,
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
 * @param clientId
 * @param walletId
 * @param name
 * @param solKeys
 * @param ethKeys
 * @returns Promise<{
    status: dbResStatus,
    id?: string
}>
 */
export const createAccount = async (
  clientId: string,
  walletId: string,
  name: string,
  solKeys: WalletKeys,
  ethKeys: WalletKeys,
  btcKeys: WalletKeys,
): Promise<{
  status: dbResStatus;
  account?: AccountType;
}> => {
  const response = await chain("mutation")(
    {
      insert_account_one: [
        {
          object: {
            clientId,
            walletId,
            name,
            sol: {
              data: {
                publicKey: solKeys.publicKey,
                privateKey: solKeys.privateKey,
              },
            },
            eth: {
              data: {
                publicKey: ethKeys.publicKey,
                privateKey: ethKeys.privateKey,
              },
            },
            bitcoin: {
              data: {
                privateKey: btcKeys.privateKey,
                publicKey: btcKeys.publicKey,
              },
            },
          },
        },
        {
          id: true,
          eth: {
            publicKey: true,
          },
          sol: {
            publicKey: true,
          },
          walletId: true,
          bitcoin: {
            publicKey: true,
          },
          name: true,
          createdAt: true,
          updatedAt: true,
          clientId: true,
        },
      ],
    },
    { operationName: "createAccount" },
  );
  if (response.insert_account_one?.id) {
    return {
      status: dbResStatus.Ok,
      account: response.insert_account_one as AccountType,
    };
  }
  return {
    status: dbResStatus.Error,
  };
};

/**
 *
 * @param name
 * @param id
 * @returns
 */
export const updateAccountName = async (
  name: string,
  id: string,
): Promise<{
  status: dbResStatus;
  account?: AccountType;
}> => {
  const response = await chain("mutation")(
    {
      update_account: [
        {
          where: {
            id: { _eq: id },
          },
          _set: {
            name,
          },
        },
        {
          returning: {
            id: true,
            clientId: true,
            name: true,
            walletId: true,
            eth: {
              publicKey: true,
            },
            sol: {
              publicKey: true,
            },
            bitcoin: {
              publicKey: true,
            },
            createdAt: true,
            updatedAt: true,
          },
        },
      ],
    },
    { operationName: "updateName" },
  );
  if (response.update_account?.returning[0]?.id) {
    return {
      status: dbResStatus.Ok,
      account: response.update_account.returning[0] as AccountType,
    };
  }
  return {
    status: dbResStatus.Error,
  };
};

/**
 *
 * @param accountId
 * @param network
 * @returns
 */
export const getPrivate = async (
  accountId: string,
): Promise<{
  status: dbResStatus;
  sol?: {
    privateKey: string;
  };
  eth?: {
    privateKey: string;
  };
}> => {
  const response = await chain("query")({
    account: [
      {
        limit: 1,
        where: {
          id: { _eq: accountId },
        },
      },
      {
        sol: {
          privateKey: true,
        },
        eth: {
          privateKey: true,
        },
      },
    ],
  });
  if (
    response.account[0].eth?.privateKey &&
    response.account[0].sol?.privateKey
  ) {
    return {
      status: dbResStatus.Ok,
      sol: {
        privateKey: response.account[0].sol.privateKey as string,
      },
      eth: {
        privateKey: response.account[0].eth.privateKey as string,
      },
    };
  }
  return {
    status: dbResStatus.Error,
  };
};

/**
 * Remove Account
 *
 * @param accountId
 * @returns
 */

// Delete the sol eth and bitcoin first before deleting the account
export const deleteAccount = async (
  accountId: string,
): Promise<{
  status: dbResStatus;
}> => {
  const response = await chain("mutation")(
    {
      delete_account_by_pk: [
        {
          id: { _eq: accountId },
        },
        {
          id: true,
        },
      ],
    },
    { operationName: "deleteAccount" },
  );
  if (Array.isArray(response.delete_account_by_pk?.id)) {
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
 * @param accountId
 * @returns
 */
export const getAccount = async (
  accountId: string,
): Promise<{
  status: dbResStatus;
  account?: AccountType;
}> => {
  const response = await chain("query")(
    {
      account_by_pk: [
        {
          id: { _eq: accountId },
        },
        {
          id: true,
          eth: {
            publicKey: true,
          },
          sol: {
            publicKey: true,
          },
          walletId: true,
          bitcoin: {
            publicKey: true,
          },
          name: true,
          clientId: true,
          createdAt: true,
          updatedAt: true,
        },
      ],
    },
    { operationName: "getAccount" },
  );
  if (response.account_by_pk?.id) {
    return {
      status: dbResStatus.Ok,
      account: response.account_by_pk as AccountType,
    };
  }
  return {
    status: dbResStatus.Error,
  };
};

/**
 *
 * @param id
 * @returns
 */
export const getAccounts = async (
  id: string,
): Promise<{
  status: dbResStatus;
  accounts?: AccountType[];
}> => {
  const response = await chain("query")(
    {
      account: [
        {
          where: {
            clientId: { _eq: id },
          },
          order_by: [
            {
              createdAt: order_by["asc"],
            },
          ],
        },
        {
          id: true,
          eth: {
            publicKey: true,
          },
          sol: {
            publicKey: true,
          },
          walletId: true,
          bitcoin: {
            publicKey: true,
          },
          name: true,
          clientId: true,
          createdAt: true,
          updatedAt: true,
        },
      ],
    },
    { operationName: "getAccounts" },
  );
  if (response.account) {
    return {
      status: dbResStatus.Ok,
      accounts: response.account as AccountType[],
    };
  }
  return {
    status: dbResStatus.Error,
  };
};

/**
 *
 * @param id
 * @param img
 * @returns
 */
export const putImgUrl = async (
  id: string,
  img: string,
): Promise<{
  status: dbResStatus;
}> => {
  const response = await chain("mutation")(
    {
      update_account_by_pk: [
        {
          pk_columns: {
            id: {
              _eq: id,
            },
          },
          _set: {
            img,
          },
        },
        {
          id: true,
        },
      ],
    },
    { operationName: "putImgUrl" },
  );
  if (response.update_account_by_pk?.id) {
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
 * @param accountId
 * @returns
 */
export const getAccountSecret = async (
  accountId: string,
): Promise<{
  status: dbResStatus;
  secret?: string;
}> => {
  const response = await chain("query")(
    {
      account_by_pk: [
        {
          id: { _eq: accountId },
        },
        {
          wallet: {
            secretPhase: true,
          },
        },
      ],
    },
    { operationName: "getAccountSecret" },
  );
  if (response.account_by_pk?.wallet.secretPhase) {
    return {
      status: dbResStatus.Ok,
      secret: response.account_by_pk.wallet.secretPhase as string,
    };
  }
  return {
    status: dbResStatus.Error,
  };
};

/**
 *
 * @param clientId
 * @returns
 */
export const getMainAccount = async (
  clientId: string,
): Promise<{
  status: dbResStatus;
  account?: AccountType;
}> => {
  const response = await chain("query")(
    {
      account: [
        {
          where: {
            clientId: { _eq: clientId },
            isMain: { _eq: true },
          },
          limit: 1,
        },
        {
          id: true,
          eth: {
            publicKey: true,
          },
          sol: {
            publicKey: true,
          },
          walletId: true,
          bitcoin: {
            publicKey: true,
          },
          name: true,
          clientId: true,
          createdAt: true,
          updatedAt: true,
        },
      ],
    },
    { operationName: "getMainAccount" },
  );
  if (response.account[0]?.id) {
    return {
      status: dbResStatus.Ok,
      account: response.account[0] as AccountType,
    };
  }
  return {
    status: dbResStatus.Error,
  };
};

/**
 *
 * @param accountId
 * @returns
 */
export const changeMainAccount = async (
  accountId: string,
): Promise<{
  status: dbResStatus;
}> => {
  const response = await chain("mutation")(
    {
      update_account_many: [
        {
          updates: [
            {
              where: {
                isMain: { _eq: true },
              },
              _set: {
                isMain: false,
              },
            },
            {
              where: {
                id: { _eq: accountId },
              },
              _set: {
                isMain: true,
              },
            },
          ],
        },
        {
          returning: {
            id: true,
          },
        },
      ],
    },
    { operationName: "changeMainAccount" },
  );
  if (
    Array.isArray(response.update_account_many) &&
    response.update_account_many[1]?.returning[0]?.id
  ) {
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
 * @param pubKey
 * @returns
 */
export const getNetworkPrivateKey = async (
  pubKey: string,
  network: Network,
): Promise<{
  status: dbResStatus;
  privateKey?: string;
}> => {
  switch (network) {
    case Network.Eth:
      const ethResponse = await chain("query")(
        {
          eth: [
            {
              where: {
                publicKey: { _eq: pubKey },
              },
              limit: 1,
            },
            {
              privateKey: true,
            },
          ],
        },
        { operationName: "getEthPrivateKey" },
      );
      if (ethResponse.eth[0]?.privateKey) {
        return {
          status: dbResStatus.Ok,
          privateKey: ethResponse.eth[0].privateKey as string,
        };
      }
      break;
    case Network.Sol:
      const solResponse = await chain("query")(
        {
          sol: [
            {
              where: {
                publicKey: { _eq: pubKey },
              },
              limit: 1,
            },
            {
              privateKey: true,
            },
          ],
        },
        { operationName: "getSolPrivateKey" },
      );
      if (solResponse.sol[0]?.privateKey) {
        return {
          status: dbResStatus.Ok,
          privateKey: solResponse.sol[0].privateKey as string,
        };
      }
      break;
    case Network.Bitcoin:
      const btcResponse = await chain("query")(
        {
          bitcoin: [
            {
              where: {
                publicKey: { _eq: pubKey },
              },
              limit: 1,
            },
            {
              privateKey: true,
            },
          ],
        },
        { operationName: "getBtcPrivateKey" },
      );
      if (btcResponse.bitcoin[0]?.privateKey) {
        return {
          status: dbResStatus.Ok,
          privateKey: btcResponse.bitcoin[0].privateKey as string,
        };
      }
      break;
  }
  return {
    status: dbResStatus.Error,
  };
};
