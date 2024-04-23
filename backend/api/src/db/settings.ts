import { Chain } from "@paybox/zeus";
import { HASURA_URL, JWT } from "../config";
import { BitcoinCluster, EthCluster, HASURA_ADMIN_SERCRET, Settings, SolCluster, dbResStatus, } from "@paybox/common";

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
 * @param solNet 
 * @param ethNet 
 * @param btcNet 
 * @returns 
 */
export const updateTestmode = async (
    clientId: string,
    testmode?: boolean,
    solNet?: SolCluster,
    ethNet?: EthCluster,
    btcNet?: BitcoinCluster
): Promise<{
    status: dbResStatus
}> => {
    let _set: {
        testmode?: boolean,
        solNet?: SolCluster,
        ethNet?: EthCluster,
        btcNet?: BitcoinCluster
    } = {
        testmode,
    }
    if(solNet) {
        _set = {
            ..._set,
            solNet: solNet
        }
    }
    if(ethNet) {
        _set = {
            ..._set,
            ethNet: ethNet
        }
    }
    if(btcNet) {
        _set = {
            ..._set,
            btcNet: btcNet
        }
    }
    const response = await chain("mutation")({
        update_client_settings: [{
            where: {
                clientId: { _eq: clientId }
            },
            _set
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
            clientId: true,
            btcNet: true,
            ethNet: true,
            solNet: true
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