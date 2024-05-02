import {
    InfuraProvider,
    ethers
} from "ethers";
import {EthCluster, Network, TxnStatus, TxnType} from "@paybox/common";
import { ETH_NODE_API_KEY } from "../config";


export class EthRpc {
    private provider: InfuraProvider;
    private static instance: EthRpc;

    private constructor(
        cluster: EthCluster = EthCluster.Sepolia
    ) {
        this.provider = new ethers.InfuraProvider(cluster, ETH_NODE_API_KEY);
    }

    public static getInstance(cluster: EthCluster = EthCluster.Sepolia): EthRpc {
        if (!this.instance) {
            this.instance = new EthRpc(cluster);
        }
        return this.instance
    }

    async getTxn(hash: string): Promise<Omit<TxnType, "id" | "clientId" | "time"> | null> {
        try {
            const txn = await this.provider.getTransaction(hash);
            let minedBlock = await txn?.confirmations();
            if(minedBlock && minedBlock >= 12) {
                return {
                    amount: Number(txn?.value),
                    blockHash: txn?.blockHash || "",
                    fee: Number(txn?.gasPrice),
                    from: txn?.from || "",
                    to: txn?.to || "",
                    hash,
                    network: Network.Eth,
                    chainId: Number(txn?.chainId),
                    status: TxnStatus.Completed,
                    slot: txn?.nonce,
                }
            } else {
                return null;
            }
            
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}