import { z } from "zod";
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
} from "./validations";
import { Message } from "@solana/web3.js";
import { BitcoinCluster, EthCluster, USDCCluster } from "./constant";
import { Cluster } from "@solana/web3.js";

export enum Network {
  Sol = "sol",
  Eth = "eth",
  Bitcoin = "bitcoin",
  USDC = "usdc",
}

export type Client = z.infer<typeof ClientSignupFormValidate> & { id: string };
export enum SignType {
  Signin = "Signin",
  Signout = "Signout",
  Signup = "Signup",
}

export type ClientForm = z.infer<typeof ClientSignupFormValidate>;

export enum responseStatus {
  Error = "error",
  Ok = "ok",
}

export enum hookStatus {
  Error = "error",
  Ok = "ok",
}

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
  blockTime: number;
  amount: number;
  fee: number;
  from: string;
  to: string;
  postBalances?: number[] | null;
  preBalances?: number[] | null;
  recentBlockhash: string;
  signature: string[];
  network: Network;
  slot?: number | null;
  nonce?: number | null;
  chainId?: number;
  cluster?: EthCluster | Cluster | BitcoinCluster | USDCCluster;
};

export type TxnType = InsertTxnType & {
  id: string;
  date?: string;
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

export type TxnSolana = {
  message: Message;
  signatures: string[];
};

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
  sol: WalletKeys;
  eth: WalletKeys;
  usdc?: WalletKeys;
  bitcoin?: WalletKeys;
  id: string;
}