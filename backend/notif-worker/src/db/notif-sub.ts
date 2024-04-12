import { Chain } from "@paybox/zeus";
import { HASURA_URL, JWT } from "../config";
import { HASURA_ADMIN_SERCRET, NotifSubType, dbResStatus } from "@paybox/common";

const chain = Chain(HASURA_URL, {
    headers: {
        Authorization: `Bearer ${JWT}`,
        "x-hasura-admin-secret": HASURA_ADMIN_SERCRET,
    },
});


/**
 * 
 * @param clientId 
 * @returns 
 */
export const getSubs = async (
    username: string,
): Promise<{
    status: dbResStatus;
    subs?: NotifSubType[];
}> => {
    const response = await chain("query")({
        notification_subscription: [{
            where: {
                client: {
                    username: { _eq: username }
                }
            }
        }, {
            id: true,
            auth: true,
            endpoint: true,
            expirationTime: true,
            p256dh: true,
            clientId: true,
        }]
    }, { operationName: "getSubs" });
    if(Array.isArray(response.notification_subscription)) {
        return {
            status: dbResStatus.Ok,
            subs: response.notification_subscription as NotifSubType[]
        }
    }
    return {
        status: dbResStatus.Error
    }
}


/**
 * 
 * @param id 
 * @returns 
 */
export const deleteSubs = async (
    id: string,
): Promise<{
    status: dbResStatus;
}> => {
    const response = await chain("mutation")({
        delete_notification_subscription_by_pk: [{
            id
        }, {
            id: true
        }]
    }, { operationName: "deleteSubs" });
    if(response.delete_notification_subscription_by_pk?.id) {
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
export const getSubsId = async (
    clientId: string
) => {
    const response = await chain("query")({
        notification_subscription: [{
            where: {
                client: {
                    id: { _eq: clientId }
                }
            }
        }, {
            id: true,
            auth: true,
            endpoint: true,
            expirationTime: true,
            p256dh: true,
            clientId: true,
        }]
    }, { operationName: "getSubsId" });
    if(Array.isArray(response.notification_subscription)) {
        return {
            status: dbResStatus.Ok,
            subs: response.notification_subscription as NotifSubType[]
        }
    }
    return {
        status: dbResStatus.Error
    }
}