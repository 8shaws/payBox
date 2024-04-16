import { Chain, order_by } from "@paybox/zeus";
import { AcceptFriendship, AccountType, BitcoinKey, dbResStatus, EthKey, Friend, FriendPubKeys, FriendshipStatusEnum, FriendshipType, HASURA_ADMIN_SERCRET, HASURA_URL, JWT, SolKey } from "@paybox/common";
import { FriendshipStatus } from "@paybox/common";

const chain = Chain(HASURA_URL, {
    headers: {
        Authorization: `Bearer ${JWT}`,
        "x-hasura-admin-secret": HASURA_ADMIN_SERCRET,
    },
});


export const insertCentTxn = async (payload: any): Promise<{
    status: dbResStatus,
    id?: string
}> => {
    const respon1 = await chain("query")({
        account: [{
            where: {
                [payload.currency.code]: {
                    publicKey: {_eq: payload.walletAddress}
                }
            }
        }, {
            id: true
        }]
    }, {operationName: "account"});
    const accountId = respon1.account[0].id as string;

    const response = await chain("mutation")({
        insert_centralized_txn_one: [{
            object: {   
                baseCurrency: payload.baseCurrency.code,
                baseCurrencyAmount: payload.baseCurrencyAmount,
                clientId: payload.externalCustomerId,
                createdAt: payload.createdAt,
                cryptoTransactionId: payload.cryptoTransactionId,
                failedReason: payload.failureReason,
                paymentMethod: payload.paymentMethod,
                provider: payload.getValidQuote.provider,
                quoteCurrency: payload.currency.code,
                quoteCurrencyAmount: payload.quoteCurrencyAmount,
                status: payload.status,
                updatedAt: payload.updatedAt,
                feeAmount: payload.feeAmount,
                providerTxnId: payload.id,
                accountId,
                signature: payload.getValidQuote.signature,
                walletAddress: payload.walletAddress,
            }
        }, {
            id: true
        }]
    }, {operationName: "insert_centralized_txn_one"});
    if(response.insert_centralized_txn_one?.id) {
        return {
            status: dbResStatus.Ok,
            id: response.insert_centralized_txn_one.id as string
        }
    }
    return {
        status: dbResStatus.Error
    }
}