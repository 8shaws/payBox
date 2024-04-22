import { Chain } from "@paybox/zeus";
import { HASURA_URL, JWT } from "../config";
import { HASURA_ADMIN_SERCRET, Settings, dbResStatus, } from "@paybox/common";

const chain = Chain(HASURA_URL, {
    headers: {
        Authorization: `Bearer ${JWT}`,
        "x-hasura-admin-secret": HASURA_ADMIN_SERCRET,
    },
});

/**
 * 
 * @param testmode 
 * @param clientId 
 * @returns 
 */
export const updateTestmode = async (
    testmode: boolean,
    clientId: string
): Promise<{
    status: dbResStatus
}> => {
    const response = await chain("mutation")({
        update_client_settings: [{
            where: {
                clientId: { _eq: clientId }
            },
            _set: {
                testmode
            }
        }, {
            affected_rows: true
        }]
    }, { operationName: "updateTestmode" });
    if (response.update_client_settings?.affected_rows) {
        return {
            status: dbResStatus.Ok
        }
    }
    return {
        status: dbResStatus.Error
    }
}

/**
 * 
 * @param clientId 
 * @returns 
 */
export const getSettings = async (
    clientId: string
): Promise<{
    status: dbResStatus,
    settings?: Settings 
}> => {
    const response = await chain("query")({
        client_settings: [{
            limit: 1,
            where: {
                clientId: {_eq: clientId}
            }
        }, {
            locale: true,
            testmode: true,
            preferedWallet: true,
            preferedExplorer: true,
            clientId: true
        }]
    }, {operationName: "getSettings"});
    if(response.client_settings[0].locale) {
        return {
            status: dbResStatus.Ok,
            settings: response.client_settings[0] as Settings
        }
    }
    return {
        status: dbResStatus.Error
    }
}