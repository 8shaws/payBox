import { Chain, order_by } from "@paybox/zeus";
import { HASURA_URL, JWT } from "../config";
import { Address, HASURA_ADMIN_SERCRET, NotifType, TopicTypes, dbResStatus } from "@paybox/common";

const chain = Chain(HASURA_URL, {
    headers: {
        Authorization: `Bearer ${JWT}`,
        "x-hasura-admin-secret": HASURA_ADMIN_SERCRET,
    },
});

/**
 * 
 * @param auth 
 * @param endpoint 
 * @param expirationTime 
 * @param p256dh 
 * @param clientId 
 * @returns 
 */
export const insertSub = async (
    auth: string,
    endpoint: string,
    expirationTime: string | null,
    p256dh: string,
    clientId: string,
): Promise<{
    status: dbResStatus;
    id?: string;
}> => {

    const response = await chain("mutation")({
        insert_notification_subscription_one: [{
            object: {
                auth,
                endpoint,
                expirationTime,
                p256dh,
                clientId,
            }
        }, {
            id: true
        }]
    }, { operationName: "insertSub" });
    if (response.insert_notification_subscription_one?.id) {
        return {
            status: dbResStatus.Ok,
            id: response.insert_notification_subscription_one.id as string
        }
    }
    return {
        status: dbResStatus.Error,
    }
}

/**
 * 
 * @param clientId 
 * @param offset 
 * @param limit 
 * @returns 
 */
export const getNotif = async (
    clientId: string,
    offset: number,
    limit: number,
    topic: TopicTypes,
    viewed: boolean
): Promise<{
    status: dbResStatus,
    notifs?: NotifType[]
}> => {
    const response = await chain("query")({
        notification: [{
            order_by: [{timestamp: order_by.desc}],
            offset,
            limit,
            where: {
                clientId: {_eq: clientId},
                topic: {_eq: topic},
                viewed: {_eq: viewed}
            }
        }, {
            body: true,
            id: true,
            image: true,
            tag: true,
            timestamp: true,
            updatedAt: true,
            viewed: true,
            title: true,
            clientId: true,
            topic: true
        }]
    }, {operationName: "getNotif"});

    if(Array.isArray(response.notification)) {
        return {
            status: dbResStatus.Ok,
            notifs: response.notification as NotifType[]
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
export const updateNotif = async (
    id: string
): Promise<{
    status: dbResStatus
}> => {
    const resposne = chain("mutation")({
        update_notification: [{
            where: {id: {_eq: id}},
            _set: {viewed: true}
        }, {
            affected_rows: true
        }]
    }, {operationName: "updateNotif"});
    if((await resposne).update_notification?.affected_rows) {
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
 * @param id 
 * @returns 
 */
export const markViewed = async (
    id: string[]
): Promise<{
    status: dbResStatus
}> => {
    const response = await chain("mutation")({
        update_notification_many: [{
            updates: id.map((id) => ({
                where: {id: {_eq: id}},
                _set: {viewed: true}
            }))
        }, {
            affected_rows: true
        }]
    }, {operationName: "markViewed"});
    if(Array.isArray(response.update_notification_many)) {
        return {
            status: dbResStatus.Ok
        }
    }
    return {
        status: dbResStatus.Error
    }
}