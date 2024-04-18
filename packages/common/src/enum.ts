export enum ClientProvider {
    MoonPay = "moonpay",
}

export enum BaseCurrencyCode {
    USD = 'usd',
    AUD = 'aud',
    GBP = 'gbp',
    EUR = 'eur',
    CAD = 'cad',
    JPY = 'jpy',
    CNY = 'cny',
    INR = 'inr',
    BRL = 'brl',
    ZAR = 'zar',
    RUB = 'rub',
}

export enum CryptoCurrencyCode {
    Bitcoin = 'btc',
    Ethereum = 'eth',
    Litecoin = 'ltc',
    BitcoinCash = 'bch',
    Ripple = 'xrp',
    Cardano = 'ada',
    Polkadot = 'dot',
    BinanceCoin = 'bnd',
    Chainlink = 'link',
    Stellar = 'xlm',
    Dogecoin = 'doge',
    Solana = 'sol',
}

export enum Network {
    Sol = "sol",
    Eth = "eth",
    Bitcoin = "btc",
    USDC = "usdc",
}

export enum SignType {
    Signin = "Signin",
    Signout = "Signout",
    Signup = "Signup",
}


export enum responseStatus {
    Error = "error",
    Ok = "ok",
}

export enum wsResponseStatus {
    Error = "error",
    Ok = "ok",
}

export enum hookStatus {
    Error = "error",
    Ok = "ok",
}

export enum dbResStatus {
    Error = "error",
    Ok = "ok",
}

export enum Partitions {
    SolTxn = "solTxn",
    EthTxn = "ethTxn",
    BtcTxn = "btcTxn",
    USDCTxn = "usdcTxn",
}

export enum Topics {
    Txn = "transaction",
    Client = "client",
}

export enum SolToken {
    Lamp = "lamp",
    Sol = "sol",
}

export enum EthToken {
    Eth = "eth",
    Gwei = "gwei",
}

export enum BitcoinToken {
    Bitcoin = "bitcoin",
}


export enum CoinType {
    Sol = "501",
    Eth = "60",
    Bitcoin = "0"
}

export enum EthChainId {
    Mainnet = "epi155:1",
    Goerli = "epi155:5",
    Kovan = "epi155:42",
    Rinkeby = "epi155:4",
    Ropsten = "epi155:3",
    Sepolia = "epi155:1337",
}

export enum BitcoinChainId {
    Mainnet = "bip122:000000000019d6689c085ae165831e93",
    Testnet = "bip122:000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943"
}

export enum SolChainId {
    Mainnet = "solana:101",
    Devnet = "solana:101",
    Testnet = "solana:101"
}


export enum WsMessageType {
    Index = "index",
    Message = "message"
}


export enum SignStatus {
    Verify = "verify",
    Details = "details"
}

export enum WsMessageTypeEnum {
    Join = "join",
    Chat = "message"
}

export enum FriendshipStatusEnum {
    Pending = "pending",
    Accepted = "accepted",
    Rejected = "rejected",
    Blocked = "blocked",
    Deleted = "deleted"
}


export enum NotifTopics {
    FriendRequest = "friendRequest",
    FriendRequestAccepted = "friendRequestAccepted",
    FriendRequestRejected = "friendRequestRejected",
    TxnAccept = "txnAccept",
    TxnReject = "txnReject",
    Paid = "paid",
}

export enum TopicTypes {
    Msg = "msg-notif",
    Notif = "notif",
    Db = "db",
}

export enum DBTopics {
    InsertCentTxn = "insertCentTxn",
}

export enum MsgTopics {
    SendOtp = "otp",
    ResendOtp = "resendOtp",
}

export enum TxnStatus {
    Initiated = "initiated",
    Completed = "completed",
    Rejected = "rejected",
    Pending = "pending",
}