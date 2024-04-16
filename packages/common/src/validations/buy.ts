import { z } from 'zod';
import { BaseCurrencyCode, ClientProvider, CryptoCurrencyCode } from '../enum';
import { publicKeyType } from './account';

export const GetBuyUrlSchema = z.object({
    clientPlatform: z
        .nativeEnum(ClientProvider),
    baseCurrencyCode: z.nativeEnum(BaseCurrencyCode),
    baseCurrencyAmount: z
        .string(),
    defaultCurrencyCode: z.nativeEnum(CryptoCurrencyCode),
    quoteCurrencyAmount: z
        .string(),
    walletAddress: publicKeyType,
    email: z
        .string()
        .email('Invalid email address'),
});

export const GetQuoteSchema = z.object({
    baseCurrencyCode: z.nativeEnum(BaseCurrencyCode),
    baseCurrencyAmount: z
        .number().optional(),
    currencyCode: z.nativeEnum(CryptoCurrencyCode),
    quoteCurrencyAmount: z.number().optional(),
    areFeesIncluded: z.boolean(),
});