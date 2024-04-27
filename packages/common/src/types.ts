import {z} from "zod";
import {
    ClientSignupFormValidate,
    MetadataUpdateForm,
} from "./validations/clientValid";
import {
    AddressForm,
    AddressFormPartial,
    GetQrQuerySchema,
    TxnQeuryByHash,
    TxnSendQuery,
    TxnsQeury,
    networkPublicKey,
} from "./validations";
import {Message} from "@solana/web3.js";
import {BitcoinCluster, EthCluster, SolCluster, USDCCluster} from "./constant";
import {Cluster} from "@solana/web3.js";
import { BitcoinChainId, BitcoinToken, EthChainId, EthToken, MsgTopics, Network, NotifTopics, SolChainId, SolToken, TopicTypes, WsMessageTypeEnum, hookStatus } from "./enum";
import { BtcExplorer, EthExplorer, SolExplorer } from "./settings";



export type Client = z.infer<typeof ClientSignupFormValidate> & { id: string, valid: boolean };

export type ClientForm = z.infer<typeof ClientSignupFormValidate>;

export type useSignUpHookProps = {
    status: hookStatus;
    msg: string;
    load?: string;
};

export type ClientWithJwt = Partial<Client> & { jwt: string };

export type MetadataUpdateFormType = z.infer<typeof MetadataUpdateForm>;
export type AddressFormPartialType = z.infer<typeof AddressFormPartial>;

export type AddressPartial = AddressFormPartialType & { id: string };

export type Address = z.infer<typeof AddressForm>;

export type AcceptSolTxn = {
    from: string;
    amount: number;
    to: string;
};

export type AcceptEthTxn = {
    from: string;
    amount: number;
    to: string;
};

export type TxnSendQueryType = z.infer<typeof TxnSendQuery>;

export type InsertTxnType = {
    clientId: string;
    time: number;
    amount: number;
    fee: number;
    from: string;
    to: string;
    blockHash: string;
    hash: string;
    network: Network;
    slot?: number;
    chainId?: number;
    cluster?: EthCluster | Cluster | BitcoinCluster | USDCCluster;
    status?: string;
};

export type TxnType = InsertTxnType & {
    id: string;
    time?: string;
    status?: string
};

export type TxnsQeuryType = z.infer<typeof TxnsQeury> & { clientId: string };
export type TxnQuerySignType = z.infer<typeof TxnQeuryByHash> & {
    clientId: string;
};

export type KafkaTopicType = {
    topicName: string;
    partitions: number;
};

export type PublishType = {
    topic: string;
    message: Array<{
        partition: number;
        key: string;
        value: any;
    }>;
};


export type TxnSolana = {
    message: Message;
    signatures: string[];
};

export type Token = SolToken | EthToken | BitcoinToken;

export type GetQrQuerySchemaType = z.infer<typeof GetQrQuerySchema>;


export type WalletKeys = {
    privateKey: string;
    publicKey: string;
};

export type WalletType = {
    secretPhase?: string;
    id: string;
    clientId: string;
    accounts?: AccountType[];
}

export type AccountType = {
    clientId: string;
    sol: SolKey;
    eth: EthKey;
    usdc?: UsdcKey;
    bitcoin?: BitcoinKey;
    walletId: string
    id: string;
    name: string,
    img: string | null,
    createdAt: string;
    updatedAt: string;
}

export type SolKey = {
    publicKey: string,
}

export type EthKey = {
    publicKey: string,
}

export type BitcoinKey = {
    publicKey: string,
}

export type UsdcKey = {
    publicKey: string,
}


export type EthChain = {
    chainId: EthChainId,
    name: "Ethereum",
    network: Network.Eth
}

export type SolChain = {
    chainId: SolChainId,
    name: "Solana",
    network: Network.Sol
}

export type BitcoinChain = {
    chainId: BitcoinChainId,
    name: "Bitcoin",
    network: Network.Bitcoin
}


export type ChainAccount = {
    chain: EthChain | SolChain | BitcoinChain;
    publicKey: string;
}

export type ChainAccountPrivate = ChainAccount & WalletKeys;

export type NetworkPublicKeyType = z.infer<typeof networkPublicKey>;


export type getClientId = {
    id?: unknown;
};


export type ChatPayload = {
    senderId: string,
    friendshipId: string,
    message: string,
}

export type WsChatMessageType = {
    type: WsMessageTypeEnum,
    payload: ChatPayload,
}

export type FriendshipStatus = "pending" | "accepted" | "rejected" | "blocked" | "deleted";


export type ChatType = {
    id: string,
    senderId: string,
    message: string,
    friendshipId: string,
    updatedAt: string, 
    sendAt: string
}

export type FriendshipType = {
    id: string,
    clientId1: string,
    clientId2: string,
    status: FriendshipStatus,
    updatedAt?: string,
    createdAt?: string,
    friend?: Friend,
}

export type AcceptFriendship = FriendshipType & {
    chats: ChatType[]
}


export type Friend = Pick<Client, "id" | "firstname" | "lastname" | "email" | "mobile" | "username">
export interface NotifSubType {
    clientId: string,
    auth: string,
    endpoint: string,
    expirationTime: string | null,
    p256dh: string,
    id: string,
    updatedAt?: string,
}

export interface NotifType {
    id: string,
    clientId?: string,
    body: string,
    tag: MsgTopics | NotifTopics,
    image: string,
    timestamp: string,
    updatedAt?: string,
    title: string
    viewed?: boolean,
    topic: TopicTypes,
}

export interface FriendPubKeys {
    bitcoin?: Pick<BitcoinKey, "publicKey">,
    eth?: Pick<EthKey, "publicKey">,
    sol?: Pick<SolKey, "publicKey">,
    id: string,
    walletId: string
}

export interface Settings {
    locale: string,
    testmode: boolean,
    solNet: SolCluster,
    ethNet: EthCluster,
    btcNet: BitcoinCluster,
    btcExp: BtcExplorer,
    ethExp: EthExplorer,
    solExp: SolExplorer,
    id?: string,
    clientId?: string,
}

export type ChainNet = EthCluster | SolCluster | BitcoinCluster

export interface AddressBook {
    id: string,
    clientId?: string,
    name: string,
    publicKey: string,
    chain: Network,
    tag?: string,
}