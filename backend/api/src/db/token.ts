import { Chain } from "@paybox/zeus";
import { HASURA_URL, JWT } from "../config";
import { HASURA_ADMIN_SERCRET, dbResStatus } from "@paybox/common";

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
