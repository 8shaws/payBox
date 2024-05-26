import { Chain } from "@paybox/zeus";
import { HASURA_URL, JWT } from "../config";
import { HASURA_ADMIN_SERCRET, dbResStatus } from "@paybox/common";

const chain = Chain(HASURA_URL, {
  headers: {
    Authorization: `Bearer ${JWT}`,
    "x-hasura-admin-secret": HASURA_ADMIN_SERCRET,
  },
});

/** Insert Ata into db */
export const insertAta = async (
  pubKey: string,
  token: string,
  clientId: string,
  isMinter: boolean,
  owner: string,
): Promise<{
  status: dbResStatus;
  id?: string;
}> => {
  const response = await chain("mutation")(
    {
      insert_ata_one: [
        {
          object: {
            pubKey,
            token,
            clientId,
            isMinter,
            owner,
          },
        },
        {
          id: true,
        },
      ],
    },
    {
      operationName: "insertAta",
    },
  );
  if (response.insert_ata_one?.id) {
    return {
      id: response.insert_ata_one.id as string,
      status: dbResStatus.Ok,
    };
  }

  return {
    status: dbResStatus.Ok,
  };
};
