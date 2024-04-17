import { z } from 'zod';
import { BaseCurrencyCode, ClientProvider, CryptoCurrencyCode } from '../enum';
import { publicKeyType } from './account';

export const GetBuyUrlSchema = z.object({
    clientPlatform: z
        .nativeEnum(ClientProvider),
    amount: z
        .string(),
    type: z.string(),
    currencyCode: z.nativeEnum(CryptoCurrencyCode),
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