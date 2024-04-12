import { Chain, Subscription } from "@paybox/zeus";
import { HASURA_URL, JWT } from "../config";
import { HASURA_ADMIN_SERCRET, NotifSubType, TopicTypes, dbResStatus } from "@paybox/common";


const chain = Chain(HASURA_URL, {
    headers: {
        Authorization: `Bearer ${JWT}`,
        "x-hasura-admin-secret": HASURA_ADMIN_SERCRET,
    },
});

const subsribe = Subscription(HASURA_URL, {
    headers: {
        Authorization: `Bearer ${JWT}`,
        "x-hasura-admin-secret": HASURA_ADMIN_SERCRET,
    },
    websocket: ['ws://localhost:8112/v1/graphql'],
});


export const subscribeNotif = async (
    id: string,
    topic: TopicTypes
) => {
    const response = subsribe("subscription")({
        notification: [{
            where: {
                clientId: { _eq: id }
            }
        }, {
            id: true,
            title: true,
            body: true,
            timestamp: true,
            image: true,
            tag: true,
            topic: true,
            viewed: true,
            
        }]
    })
    console.log(response)
}