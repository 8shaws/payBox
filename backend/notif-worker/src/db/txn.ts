import { Chain } from "@paybox/zeus";
import { HASURA_URL, JWT } from "../config";
import { HASURA_ADMIN_SERCRET, Network, NotifSubType, dbResStatus } from "@paybox/common";

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
    username?: string
): Promise<{
    status: dbResStatus,
    network?: Network,
    amount?: number,
}> => {
    const response = await chain("query")({
        transactions: [{
            limit: 1,
            where: {
                id: { _eq: id }
            }
        }, {
            network: true,
            amount: true,
        }]
    }, { operationName: "getTxnDetails" });
    if (Array.isArray(response.transactions)) {
        return {
            status: dbResStatus.Ok,
            network: response.transactions[0].network as Network,
            amount: response.transactions[0].amount as number
        }
    }
    return {
        status: dbResStatus.Error
    }
}

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
    clientId: string
): Promise<{
    status: dbResStatus,
}> => {
    const response = await chain("mutation")({
        insert_centralized_txn_one: [{
            object: {
                accountId,
                clientId,
                id,
                provider,
                status
            }
        }, {
            id: true
        }]
    }, {operationName: "insertCentTxn"});
    if(response.insert_centralized_txn_one?.id) {
        return {
            status: dbResStatus.Ok
        }
    }
    return {
        status: dbResStatus.Error
    }
}