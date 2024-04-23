import { Chain } from "@paybox/zeus";
import { HASURA_URL, JWT } from "../config";
import { AddressBook, HASURA_ADMIN_SERCRET, dbResStatus, } from "@paybox/common";

const ins = Chain(HASURA_URL, {
    headers: {
        Authorization: `Bearer ${JWT}`,
        "x-hasura-admin-secret": HASURA_ADMIN_SERCRET,
    },
});

/**
 * 
 * @param clientId 
 * @param name 
 * @param publicKey 
 * @param chain 
 * @param tag 
 * @returns 
 */
export const insertAddress = async (
    clientId: string,
    name: string,
    publicKey: string,
    chain: string,
    tag?: string
): Promise<{
    status: dbResStatus,
    id?: string
}> => {
    const response = await ins("mutation")({
        insert_address_book_one: [{
            object: {
                clientId,
                chain,
                name,
                publicKey,
                tag
            }
        }, {
            id: true
        }]
    }, {operationName: "insert_address_book_one"});
    if(response.insert_address_book_one?.id) {
        return {
            id: response.insert_address_book_one.id as string,
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
export const getBook = async (
    clientId: string
): Promise<{
    status: dbResStatus,
    book?: AddressBook[]
}> => {
    const response = await ins("query")({
        address_book: [{
            where: {
                clientId: {_eq: clientId},
            }
        }, {
            id: true,
            name: true,
            publicKey: true,
            chain: true,
            tag: true,
        }]
    }, {operationName: "address_book"});
    if(Array.isArray(response.address_book)) {
        return {
            book: response.address_book as AddressBook[],
            status: dbResStatus.Ok
        }
    }
    return {
        status: dbResStatus.Error
    }
}