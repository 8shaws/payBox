import { Chain, news_letter_constraint } from "@paybox/zeus";
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

/**
 * 
 * @param email 
 * @returns 
 */
export const subscribeNewsletter = async (
    email: string,
): Promise<{
    status: dbResStatus
}> => {
    const response = await chain("mutation")({
        insert_news_letter_one: [{
            object: {
                email
            },
            on_conflict: {
                constraint: news_letter_constraint.news_letter_email_key,
                where: {
                    email: {_eq: email}
                },
                update_columns: []
            }
        }, {
            email: true
        }]
    }, {operationName: "subscribeNewsletter"});
    if(response.insert_news_letter_one?.email) {
        return {
            status: dbResStatus.Ok
        }
    }
    return {
        status: dbResStatus.Error
    }
}