import { Chain } from "@paybox/zeus";
import { HASURA_URL, JWT } from "../config";
import { HASURA_ADMIN_SERCRET, Locales, dbResStatus } from "@paybox/common";

const chain = Chain(HASURA_URL, {
    headers: {
        Authorization: `Bearer ${JWT}`,
        "x-hasura-admin-secret": HASURA_ADMIN_SERCRET,
    },
});

/**
 * @param clientId 
 */
export const getLocale = async (
    clientId: string
): Promise<{
    status: dbResStatus,
    locale?: Locales
}> => {
    const response = await chain("query")({
        client_settings: [{
            limit: 1,
            where: {
                 clientId: {_eq: clientId}
            },
        }, {
            locale: true
        }]
    }, {operationName: "getLocale"});
    if(response.client_settings[0].locale) {
        return {
            locale: response.client_settings[0].locale as Locales,
            status: dbResStatus.Ok
        }
    }
    return {
        status: dbResStatus.Error
    }
}