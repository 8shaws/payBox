import { Chain } from "@paybox/zeus";
import { HASURA_URL, JWT } from "../config";
import { HASURA_ADMIN_SERCRET, TokenType, dbResStatus } from "@paybox/common";

const chain = Chain(HASURA_URL, {
  headers: {
    Authorization: `Bearer ${JWT}`,
    "x-hasura-admin-secret": HASURA_ADMIN_SERCRET,
  },
});

/** Insert token into db */
export const insertToken = async (
  name: string,
  authority: string,
  description: string,
  network: string,
  mintPub: string,
  mintPrivate: string,
  clientId: string,
): Promise<{
  status: dbResStatus;
  id?: string;
}> => {
  const response = await chain("mutation")(
    {
      insert_token_one: [
        {
          object: {
            name,
            authority,
            description,
            network,
            pubKey: mintPub,
            privateKey: mintPrivate,
            clientId,
          },
        },
        {
          id: true,
        },
      ],
    },
    { operationName: "insertToken" },
  );
  if (response.insert_token_one?.id) {
    return {
      id: response.insert_token_one.id as string,
      status: dbResStatus.Ok,
    };
  }

  return {
    status: dbResStatus.Error,
  };
};

/** Get token query */
export const getTokens = async (
  clientId: string,
): Promise<{
  status: dbResStatus;
  tokens?: TokenType[];
}> => {
  const response = await chain("query")(
    {
      token: [
        {
          where: {
            clientId: { _eq: clientId },
          },
        },
        {
          id: true,
          pubKey: true,
          name: true,
          authority: true,
          network: true,
          description: true,
          clientId: true,
        },
      ],
    },
    { operationName: "getTokens" },
  );
  if (response.token.length > 0) {
    return {
      status: dbResStatus.Ok,
      tokens: response.token as TokenType[],
    };
  }
  return {
    status: dbResStatus.Error,
  };
};

/** Get token by id */
export const getToken = async (
  tokenId: string,
): Promise<{
  status: dbResStatus;
  token?: TokenType;
}> => {
  const response = await chain("query")(
    {
      token: [
        {
          where: {
            id: { _eq: tokenId },
          },
          limit: 1,
        },
        {
          id: true,
          pubKey: true,
          name: true,
          authority: true,
          network: true,
          description: true,
          clientId: true,
        },
      ],
    },
    { operationName: "getToken" },
  );
  if (response.token[0].id) {
    return {
      status: dbResStatus.Ok,
      token: response.token[0] as TokenType,
    };
  }
  return {
    status: dbResStatus.Error,
  };
};
