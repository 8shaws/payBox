import z from "zod";
import { Network } from "../enum";
import { isBitcoinPrivateKey, isBitcoinPublicKey, isEthereumPrivateKey, isEthereumPublicKey, isSolanaAddress, isSolanaPrivateKey, secretPhraseRefine } from "../constant";
import { SolKeyParser } from "./sol";
import { EthKeyParser } from "./eth";
import { BtcParser } from "./btc";

export const AccountCreateQuery = z.object({
    name: z
        .string()
        .min(5),
    imgUrl: z
        .string()
        .optional(),
});

export const AccountNameQuery = z.object({
    name: z
        .string()
        .min(5),
    accountId: z
        .string()
        .regex(
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            "should be a valid UUID.",
        ),
    walletId: z
        .string()
        .regex(
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            "should be a valid UUID.",
        ),
});

export const AccountGetPrivateKey = z.object({
    password: z
        .string()
        .refine(value =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
            {
                message: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
            }
        ),
    accountId: z
        .string()
        .regex(
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            "should be a valid UUID.",
        ),
});

export const AccountDelete = z.object({
    accountId: z
        .string()
        .regex(
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            "should be a valid UUID.",
        ),
});

export const AccountGetQuery = z.object({
    accountId: z
        .string()
        .regex(
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            "should be a valid UUID.",
        ),
});

export const secretKeyType = z.union([
    z.string().refine(isSolanaPrivateKey, {
        message: "Invalid Solana address",
    }),
    z.string().refine(isEthereumPrivateKey, {
        message: "Invalid Ethereum address",
    }),
    z.string().refine(isBitcoinPrivateKey, {
        message: "Invalid Ethereum address",
    }),
]);

export const publicKeyType = z.union([
    z.string().refine(isSolanaAddress, {
        message: "Invalid Solana address",
    }),
    z.string().refine(isEthereumPublicKey, {
        message: "Invalid Ethereum address",
    }),
    z.string().refine(isBitcoinPublicKey, {
        message: "Invalid Bitcoin address",
    }),
]);

export const ImportAccountSecret = z.object({
    secretKey: z.string(),
    network: z.nativeEnum(Network),
    name: z.string()
});

export const GetAccount = z.object({
    secretPhrase: z.string().refine(secretPhraseRefine(), {
        message: 'Seed should be either 12 or 24 words',
    }),
    count: z.number().default(21),
});

export const networkPublicKey = z.object({
    network: z.nativeEnum(Network),
    publicKey: publicKeyType,
});

export const ImportAccount = z.object({
    name: z.string(),
    keys: z.array(networkPublicKey),
    secretPhrase: z.string().refine(secretPhraseRefine(), {
        message: 'Seed should be either 12 or 24 words',
    }),
    imgUrl: z
        .string()
        .optional(),
});

export const AccountParser = z.object({
    id: z.string(),
    name: z.string(),
    walletId: z.string(),
    clientId: z.string(),
    eth: EthKeyParser,
    sol: SolKeyParser,
    bitcoin: BtcParser,
    usdc: z.undefined().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const AccountsParser = z.array(AccountParser);