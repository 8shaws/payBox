import type { FromSchema } from "json-schema-to-ts";
import * as schemas from "./schemas";

export type ExecuteSwapQuoteBodyParam = FromSchema<
  typeof schemas.ExecuteSwapQuote.body
>;
export type ExecuteSwapQuoteMetadataParam = FromSchema<
  typeof schemas.ExecuteSwapQuote.metadata
>;
export type ExecuteSwapQuoteResponse200 = FromSchema<
  (typeof schemas.ExecuteSwapQuote.response)["200"]
>;
export type ExecuteSwapQuoteResponse401 = FromSchema<
  (typeof schemas.ExecuteSwapQuote.response)["401"]
>;
export type GetAccountResponse200 = FromSchema<
  (typeof schemas.GetAccount.response)["200"]
>;
export type GetAccountResponse401 = FromSchema<
  (typeof schemas.GetAccount.response)["401"]
>;
export type GetBuyQuoteMetadataParam = FromSchema<
  typeof schemas.GetBuyQuote.metadata
>;
export type GetBuyQuoteResponse200 = FromSchema<
  (typeof schemas.GetBuyQuote.response)["200"]
>;
export type GetBuyQuoteResponse401 = FromSchema<
  (typeof schemas.GetBuyQuote.response)["401"]
>;
export type GetBuyTransactionByExternalIdMetadataParam = FromSchema<
  typeof schemas.GetBuyTransactionByExternalId.metadata
>;
export type GetBuyTransactionByExternalIdResponse200 = FromSchema<
  (typeof schemas.GetBuyTransactionByExternalId.response)["200"]
>;
export type GetBuyTransactionByExternalIdResponse401 = FromSchema<
  (typeof schemas.GetBuyTransactionByExternalId.response)["401"]
>;
export type GetBuyTransactionMetadataParam = FromSchema<
  typeof schemas.GetBuyTransaction.metadata
>;
export type GetBuyTransactionResponse200 = FromSchema<
  (typeof schemas.GetBuyTransaction.response)["200"]
>;
export type GetBuyTransactionResponse401 = FromSchema<
  (typeof schemas.GetBuyTransaction.response)["401"]
>;
export type GetCountriesResponse200 = FromSchema<
  (typeof schemas.GetCountries.response)["200"]
>;
export type GetCountriesResponse401 = FromSchema<
  (typeof schemas.GetCountries.response)["401"]
>;
export type GetCurrenciesResponse200 = FromSchema<
  (typeof schemas.GetCurrencies.response)["200"]
>;
export type GetCurrenciesResponse401 = FromSchema<
  (typeof schemas.GetCurrencies.response)["401"]
>;
export type GetCurrencyLimitsMetadataParam = FromSchema<
  typeof schemas.GetCurrencyLimits.metadata
>;
export type GetCurrencyLimitsResponse200 = FromSchema<
  (typeof schemas.GetCurrencyLimits.response)["200"]
>;
export type GetCurrencyLimitsResponse401 = FromSchema<
  (typeof schemas.GetCurrencyLimits.response)["401"]
>;
export type GetIpAddressMetadataParam = FromSchema<
  typeof schemas.GetIpAddress.metadata
>;
export type GetIpAddressResponse200 = FromSchema<
  (typeof schemas.GetIpAddress.response)["200"]
>;
export type GetIpAddressResponse401 = FromSchema<
  (typeof schemas.GetIpAddress.response)["401"]
>;
export type GetNetworkFeesMetadataParam = FromSchema<
  typeof schemas.GetNetworkFees.metadata
>;
export type GetNetworkFeesResponse200 = FromSchema<
  (typeof schemas.GetNetworkFees.response)["200"]
>;
export type GetNetworkFeesResponse401 = FromSchema<
  (typeof schemas.GetNetworkFees.response)["401"]
>;
export type GetSellQuoteMetadataParam = FromSchema<
  typeof schemas.GetSellQuote.metadata
>;
export type GetSellQuoteResponse200 = FromSchema<
  (typeof schemas.GetSellQuote.response)["200"]
>;
export type GetSellQuoteResponse401 = FromSchema<
  (typeof schemas.GetSellQuote.response)["401"]
>;
export type GetSellTransactionByExternalIdMetadataParam = FromSchema<
  typeof schemas.GetSellTransactionByExternalId.metadata
>;
export type GetSellTransactionByExternalIdResponse200 = FromSchema<
  (typeof schemas.GetSellTransactionByExternalId.response)["200"]
>;
export type GetSellTransactionByExternalIdResponse401 = FromSchema<
  (typeof schemas.GetSellTransactionByExternalId.response)["401"]
>;
export type GetSellTransactionMetadataParam = FromSchema<
  typeof schemas.GetSellTransaction.metadata
>;
export type GetSellTransactionResponse200 = FromSchema<
  (typeof schemas.GetSellTransaction.response)["200"]
>;
export type GetSellTransactionResponse401 = FromSchema<
  (typeof schemas.GetSellTransaction.response)["401"]
>;
export type GetSwapPairsResponse200 = FromSchema<
  (typeof schemas.GetSwapPairs.response)["200"]
>;
export type GetSwapPairsResponse401 = FromSchema<
  (typeof schemas.GetSwapPairs.response)["401"]
>;
export type GetSwapQuoteMetadataParam = FromSchema<
  typeof schemas.GetSwapQuote.metadata
>;
export type GetSwapQuoteResponse200 = FromSchema<
  (typeof schemas.GetSwapQuote.response)["200"]
>;
export type GetSwapQuoteResponse401 = FromSchema<
  (typeof schemas.GetSwapQuote.response)["401"]
>;
export type GetSwapRequoteMetadataParam = FromSchema<
  typeof schemas.GetSwapRequote.metadata
>;
export type GetSwapRequoteResponse200 = FromSchema<
  (typeof schemas.GetSwapRequote.response)["200"]
>;
export type GetSwapRequoteResponse401 = FromSchema<
  (typeof schemas.GetSwapRequote.response)["401"]
>;
export type GetSwapTransactionMetadataParam = FromSchema<
  typeof schemas.GetSwapTransaction.metadata
>;
export type GetSwapTransactionResponse200 = FromSchema<
  (typeof schemas.GetSwapTransaction.response)["200"]
>;
export type GetSwapTransactionResponse401 = FromSchema<
  (typeof schemas.GetSwapTransaction.response)["401"]
>;
export type RejectSwapRequoteBodyParam = FromSchema<
  typeof schemas.RejectSwapRequote.body
>;
export type RejectSwapRequoteMetadataParam = FromSchema<
  typeof schemas.RejectSwapRequote.metadata
>;
export type RejectSwapRequoteResponse200 = FromSchema<
  (typeof schemas.RejectSwapRequote.response)["200"]
>;
export type RejectSwapRequoteResponse401 = FromSchema<
  (typeof schemas.RejectSwapRequote.response)["401"]
>;
