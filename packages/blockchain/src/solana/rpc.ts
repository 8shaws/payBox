import { Network, SolCluster, TxnStatus, TxnType } from "@paybox/common";
import { Cluster, Connection, clusterApiUrl } from "@solana/web3.js";

export class SolRpc {
    private static instance: SolRpc;
    private connection: Connection;

    private constructor(
        cluster: Cluster = SolCluster.Devnet
    ) {
        this.connection = new Connection(clusterApiUrl(cluster));
    }

    public static getInstance(cluster: Cluster = SolCluster.Devnet) {
        if(!this.instance) {
            this.instance = new SolRpc(cluster);
        }
        return this.instance;
    }

    async getTxn(
        hash: string
    ): Promise<Omit<TxnType, "id" | "clientId" | "time"> | null> {
        try {
            const txn = await this.connection.getParsedTransaction(hash);
            if(txn === null) {
                return null;
            }
            return {
                //@ts-ignore
                amount: txn.meta?.postBalances[0] - txn.meta?.preBalances[0],
                blockHash: txn.transaction.message.recentBlockhash,
                fee: Number(txn.meta?.fee),
                from: txn.transaction.message.accountKeys.filter(({signer}) => signer)[0].pubkey.toBase58(),
                to: txn.transaction.message.accountKeys.filter(({signer}) => !signer)[0].pubkey.toBase58(),
                hash,
                network: Network.Sol,
                slot: txn.slot,
                status: TxnStatus.Completed    
            };

        } catch (error) {
            console.log(error);
            return null;
        }
    }

}