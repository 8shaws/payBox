import { z } from 'zod';
import { BaseCurrencyCode, ClientProvider, CryptoCurrencyCode } from '../enum';
import { publicKeyType } from './account';

export const GetBuyUrlSchema = z.object({
    clientPlatform: z
        .nativeEnum(ClientProvider),
    amount: z.number(),
    type: z.string(),
    defaultCurrencyCode: z.nativeEnum(CryptoCurrencyCode),
    accountId: z.
        string()
        .regex(
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            "should be a valid UUID.",
        ),
    walletAddress: publicKeyType,
    email: z
        .string()
        .email('Invalid email address'),
});

export const GetQuoteSchema = z.object({
    baseCurrencyAmount: z
        .number().optional().default(0),
    currencyCode: z.nativeEnum(CryptoCurrencyCode),
    quoteCurrencyAmount: z.number().optional().default(0),
    areFeesIncluded: z.boolean(),
});