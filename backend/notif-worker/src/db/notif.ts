import { Chain } from "@paybox/zeus";
import { HASURA_URL, JWT } from "../config";
import { HASURA_ADMIN_SERCRET, NotifSubType, NotifTopics, dbResStatus } from "@paybox/common";

const chain = Chain(HASURA_URL, {
    headers: {
        Authorization: `Bearer ${JWT}`,
        "x-hasura-admin-secret": HASURA_ADMIN_SERCRET,
    },
});

/**
 * 
 * @param clientId 
 * @param title 
 * @param body 
 * @param timestamp 
 * @param notifSubs 
 * @param image 
 * @param tag 
 * @returns notif.id
 */
export const addNotif = async (
    clientId: string,
    title: string,
    body: string,
    timestamp: string,
    notifSubs: NotifSubType[],
    image?: string,
    tag?: NotifTopics,
): Promise<{
    status: dbResStatus,
}> => {
    const response = await chain("mutation")({
        insert_notification_one: [{
            object: {
                clientId,
                body,
                image,
                tag,
                timestamp,
                title,
                viewed: false,
                notif_to_subs: {
                    data: notifSubs.map((sub) => ({
                        notifSubsId: sub.id,
                    }))
                }
            }
        }, {
            id: true,
        }]
    }, {operationName: "insert_notification_one"});
    if(response.insert_notification_one) {
        return {
            status: dbResStatus.Ok
        }
    }
    return {
        status: dbResStatus.Error
    }
}