import { Chain, order_by } from "@paybox/zeus";
import { HASURA_URL, JWT } from "../config";
import {
  Address,
  HASURA_ADMIN_SERCRET,
  Locales,
  NotifType,
  TopicTypes,
  dbResStatus,
} from "@paybox/common";

const chain = Chain(HASURA_URL, {
  headers: {
    Authorization: `Bearer ${JWT}`,
    "x-hasura-admin-secret": HASURA_ADMIN_SERCRET,
  },
});

/**
 * updateLocale for signed up client
 * @param locale
 * @param clientId
 * @returns
 */
export const updateLocale = async (
  locale: Locales,
  clientId: string,
): Promise<{
  status: dbResStatus;
}> => {
  const response = await chain("mutation")(
    {
      update_client_settings: [
        {
          where: {
            clientId: { _eq: clientId },
          },
          _set: {
            locale,
          },
        },
        {
          affected_rows: true,
        },
      ],
    },
    { operationName: "update_client_settings" },
  );
  if (response.update_client_settings?.affected_rows === 1) {
    return {
      status: dbResStatus.Ok,
    };
  }
  return {
    status: dbResStatus.Error,
  };
};
