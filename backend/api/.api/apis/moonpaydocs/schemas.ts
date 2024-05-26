const ExecuteSwapQuote = {
  body: {
    properties: {
      signature: {
        type: "string",
        description:
          'Signature from the <a href="/reference/get_v4-swap-pair-quote">GET quote</a> response.',
        examples: ["***"],
      },
      externalTransactionId: {
        type: "string",
        description:
          "A valid Swap transaction ID from your backend. You can use this to associate your transaction with our transaction.",
        examples: ["6ec52bc3-236a-4570-a9e0-743e14818619"],
      },
      walletAddresses: {
        type: "object",
        properties: {
          destinationWalletAddress: {
            type: "string",
            description:
              "The address where the quote currency is going to be sent to.",
            examples: [7.55070758245981e47],
          },
          destinationWalletAddressTag: {
            type: "string",
            description: "The tag for `destinationWalletAddress`",
            examples: ["tag"],
          },
          refundWalletAddress: {
            type: "string",
            description:
              "The address where we will refund the crypto back to, in case the Swap transaction cannot be completed.",
            examples: [7.55070758245981e47],
          },
          refundWalletAddressTag: {
            type: "string",
            description: "The tag for `refundWalletAddress`.",
            examples: ["tag"],
          },
        },
        required: ["destinationWalletAddress", "refundWalletAddress"],
      },
    },
    required: ["signature", "walletAddresses"],
    type: "object",
    $schema: "http://json-schema.org/draft-04/schema#",
  },
  metadata: {
    allOf: [
      {
        type: "object",
        properties: {
          authorization: {
            type: "string",
            examples: ["***"],
            $schema: "http://json-schema.org/draft-04/schema#",
            description:
              "A valid customer authentication token in the format 'Bearer [auth token]'.",
          },
        },
        required: ["authorization"],
      },
    ],
  },
  response: {
    "200": {
      type: "object",
      properties: {
        baseCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["aaefa32f-161b-42c8-8115-debcbf3d6a2d"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["crypto"],
              description: "Always `crypto`\n\n`crypto`",
              examples: ["crypto"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["USD Coin (ERC-20)"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["usdc"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum amount of cryptocurrency you can buy.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum amount of cryptocurrency you can buy.",
              examples: [1000],
            },
            minSellAmount: {
              type: ["number", "null"],
              description: "The minimum amount of cryptocurrency you can sell.",
              examples: [15],
            },
            maxSellAmount: {
              type: ["number", "null"],
              description: "The maximum amount of cryptocurrency you can sell.",
              examples: [100000],
            },
            addressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            testnetAddressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's testnet wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            supportsAddressTag: {
              type: "boolean",
              description: "Whether the currency supports address tags.",
              examples: [false],
            },
            addressTagRegex: {
              type: ["string", "null"],
              description:
                "A regular expression which you can test against a wallet address tag. Defined only if the currency supports address tags.",
            },
            supportsTestMode: {
              type: "boolean",
              description: "Whether the currency supports test mode.",
              examples: [true],
            },
            isSuspended: {
              type: "boolean",
              description:
                "Whether purchases for this currency are suspended. If the currency is suspended, exchange rates may not be available and it is not possible to create a transaction with this currency.",
              examples: [false],
            },
            isSupportedInUs: {
              type: "boolean",
              description:
                "Whether purchases for this currency are supported in the US.",
              examples: [true],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
            notAllowedUSStates: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "AS",
                  "CA",
                  "CO",
                  "CT",
                  "DC",
                  "DE",
                  "FL",
                  "GA",
                  "GU",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "MA",
                  "MD",
                  "ME",
                  "MI",
                  "MN",
                  "MO",
                  "MP",
                  "MS",
                  "MT",
                  "NE",
                  "NH",
                  "NV",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "PR",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "TT",
                  "UT",
                  "VT",
                  "VA",
                  "VI",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ],
                description:
                  "`AL` `AK` `AZ` `AR` `AS` `CA` `CO` `CT` `DC` `DE` `FL` `GA` `GU` `HI` `ID` `IL` `IN` `IA` `KS` `KY` `LA` `MA` `MD` `ME` `MI` `MN` `MO` `MP` `MS` `MT` `NE` `NH` `NV` `NJ` `NM` `NY` `NC` `ND` `OH` `OK` `OR` `PA` `PR` `RI` `SC` `SD` `TN` `TX` `TT` `UT` `VT` `VA` `VI` `WA` `WV` `WI` `WY`",
              },
              description:
                "A list with all the US states for this currency that are not supported.",
              examples: ["LA", "VI"],
            },
            notAllowedCountries: {
              type: "array",
              items: { type: "string" },
              description:
                "A list with all the ISO 3166-1 alpha-2 country codes for this currency that are not supported.",
              examples: ["CA"],
            },
            metadata: {
              type: "object",
              description: "Additional metadata for the currency.",
              properties: {
                contractAddress: {
                  type: ["string", "null"],
                  description:
                    "Unique contract address where the token smart contract is hosted.",
                  examples: [0],
                },
                chainId: {
                  type: ["string", "null"],
                  description:
                    "ID used to identify different EVM compatible chains.",
                  examples: ["1"],
                },
                networkCode: {
                  type: "string",
                  description: "Name of the cryptocurrency",
                  examples: ["ethereum"],
                },
              },
            },
          },
          description:
            "Details about the cryptocurrency the customer wants to swap.",
        },
        quoteCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["aaefa32f-161b-42c8-8115-debcbf3d6a2d"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["crypto"],
              description: "Always `crypto`\n\n`crypto`",
              examples: ["crypto"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["USD Coin (ERC-20)"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["usdc"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum amount of cryptocurrency you can buy.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum amount of cryptocurrency you can buy.",
              examples: [1000],
            },
            minSellAmount: {
              type: ["number", "null"],
              description: "The minimum amount of cryptocurrency you can sell.",
              examples: [15],
            },
            maxSellAmount: {
              type: ["number", "null"],
              description: "The maximum amount of cryptocurrency you can sell.",
              examples: [100000],
            },
            addressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            testnetAddressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's testnet wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            supportsAddressTag: {
              type: "boolean",
              description: "Whether the currency supports address tags.",
              examples: [false],
            },
            addressTagRegex: {
              type: ["string", "null"],
              description:
                "A regular expression which you can test against a wallet address tag. Defined only if the currency supports address tags.",
            },
            supportsTestMode: {
              type: "boolean",
              description: "Whether the currency supports test mode.",
              examples: [true],
            },
            isSuspended: {
              type: "boolean",
              description:
                "Whether purchases for this currency are suspended. If the currency is suspended, exchange rates may not be available and it is not possible to create a transaction with this currency.",
              examples: [false],
            },
            isSupportedInUs: {
              type: "boolean",
              description:
                "Whether purchases for this currency are supported in the US.",
              examples: [true],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
            notAllowedUSStates: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "AS",
                  "CA",
                  "CO",
                  "CT",
                  "DC",
                  "DE",
                  "FL",
                  "GA",
                  "GU",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "MA",
                  "MD",
                  "ME",
                  "MI",
                  "MN",
                  "MO",
                  "MP",
                  "MS",
                  "MT",
                  "NE",
                  "NH",
                  "NV",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "PR",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "TT",
                  "UT",
                  "VT",
                  "VA",
                  "VI",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ],
                description:
                  "`AL` `AK` `AZ` `AR` `AS` `CA` `CO` `CT` `DC` `DE` `FL` `GA` `GU` `HI` `ID` `IL` `IN` `IA` `KS` `KY` `LA` `MA` `MD` `ME` `MI` `MN` `MO` `MP` `MS` `MT` `NE` `NH` `NV` `NJ` `NM` `NY` `NC` `ND` `OH` `OK` `OR` `PA` `PR` `RI` `SC` `SD` `TN` `TX` `TT` `UT` `VT` `VA` `VI` `WA` `WV` `WI` `WY`",
              },
              description:
                "A list with all the US states for this currency that are not supported.",
              examples: ["LA", "VI"],
            },
            notAllowedCountries: {
              type: "array",
              items: { type: "string" },
              description:
                "A list with all the ISO 3166-1 alpha-2 country codes for this currency that are not supported.",
              examples: ["CA"],
            },
            metadata: {
              type: "object",
              description: "Additional metadata for the currency.",
              properties: {
                contractAddress: {
                  type: ["string", "null"],
                  description:
                    "Unique contract address where the token smart contract is hosted.",
                  examples: [0],
                },
                chainId: {
                  type: ["string", "null"],
                  description:
                    "ID used to identify different EVM compatible chains.",
                  examples: ["1"],
                },
                networkCode: {
                  type: "string",
                  description: "Name of the cryptocurrency",
                  examples: ["ethereum"],
                },
              },
            },
          },
          description:
            "Details about the cryptocurrency the customer will receive.",
        },
        baseCurrencyAmount: {
          type: "string",
          description:
            "A positive string number representing how much crypto the user wants to swap.",
          examples: ["1.123"],
        },
        quoteCurrencyAmount: {
          type: "string",
          description:
            "A positive string number representing the amount of cryptocurrency the customer will receive. Set when the swap is executed.",
          examples: ["0.0056"],
        },
        extraFeeAmount: {
          type: "string",
          description:
            "A positive number string representing your extra fee for the transaction. It is added to baseCurrencyAmount, feeAmount and networkFeeAmount when the swap is executed.",
          examples: ["0.0000005"],
        },
        networkFeeAmount: {
          type: "string",
          description:
            "A positive number string representing the network fee for the transaction. It is added to baseCurrencyAmount, feeAmount and extraFeeAmount when the swap is executed.",
          examples: ["0.00039"],
        },
        feeAmount: {
          type: "string",
          description:
            "A positive number representing the fee for the transaction.",
          examples: ["0.0002"],
        },
        transactionId: {
          type: "string",
          description: "A valid Swap transaction ID.",
          examples: ["3ea41bef-cfd7-445c-91cc-853f417d4f1e"],
        },
        status: {
          type: "string",
          description:
            "The transaction's status. Possible values are `completed`, `failed`, `waitingForDepositAddressGeneration`, `waitingForDeposit`, `executingSwap`, `reQuoteRequired`, `screeningWalletAddress`, `frozen`.\n\n`completed` `failed` `waitingForDepositAddressGeneration` `waitingForDeposit` `executingSwap` `reQuoteRequired` `screeningWalletAddress` `frozen`",
          enum: [
            "completed",
            "failed",
            "waitingForDepositAddressGeneration",
            "waitingForDeposit",
            "executingSwap",
            "reQuoteRequired",
            "screeningWalletAddress",
            "frozen",
          ],
          examples: ["completed"],
        },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
    "401": {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "A descriptive error message.",
        },
        type: { type: "string", description: "An error type." },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
  },
} as const;
const GetAccount = {
  response: {
    "200": {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Unique identifier for the account.",
          examples: ["f65af778-f2b1-4bc3-a9e6-2ccc0724201b"],
        },
        createdAt: {
          type: "string",
          description:
            "Time at which the object was created. Returned as an ISO 8601 string.",
          examples: ["2021-11-10T07:53:21.551Z"],
        },
        updatedAt: {
          type: "string",
          description:
            "Time at which the object was last updated. Returned as an ISO 8601 string.",
          examples: ["2021-11-10T07:53:21.551Z"],
        },
        name: {
          type: "string",
          description: "The account's name.",
          examples: ["MoonPay App"],
        },
        isVerified: {
          type: "boolean",
          description: "Whether this account is verified or not.",
          examples: [true],
        },
        cardFeePercentage: {
          type: "number",
          description:
            "A positive number representing the MoonPay fee percentage for buy transactions using a debit/credit card, Apple Pay, Google Pay or Samsung Pay.",
          examples: [1],
        },
        sepaFeePercentage: {
          type: "number",
          description:
            "A positive number representing the MoonPay fee percentage for buy transactions using a EUR or GBP bank account.",
          examples: [1],
        },
        sellBankTransferFeePercentage: {
          type: "number",
          description:
            "A positive number representing the MoonPay fee percentage for sell transactions using a EUR or GBP bank account.",
          examples: [1],
        },
        sellCardFeePercentage: {
          type: "number",
          description:
            "A positive number representing the MoonPay fee percentage for sell transactions using a debit/credit card.",
          examples: [4.5],
        },
        cardExtraFeePercentage: {
          type: "number",
          description:
            "A positive number representing the account's affiliate fee percentage for buy transactions using a debit/credit card, Apple Pay, Google Pay or Samsung Pay.",
          examples: [0],
        },
        sepaExtraFeePercentage: {
          type: "number",
          description:
            "A positive number representing the account's affiliate fee percentage for buy transactions using a EUR or GBP bank account.",
          examples: [0],
        },
        sellBankTransferExtraFeePercentage: {
          type: "number",
          description:
            "A positive number representing the account's affiliate fee percentage for sell transactions using a EUR or GBP bank account.",
          examples: [0],
        },
        sellCardExtraFeePercentage: {
          type: "number",
          description:
            "A positive number representing the account's affiliate fee percentage for sell transactions using a debit/credit card.",
          examples: [0],
        },
        cardMinimumFee: {
          type: "object",
          description:
            "MoonPay minimum fee per Currency Code for buy transactions using a debit/credit card, Apple Pay, Google Pay or Samsung Pay.",
          additionalProperties: { type: "number" },
        },
        bankTransferMinimumFee: {
          type: "object",
          description:
            "MoonPay minimum fee per Currency Code for buy transactions using a EUR or GBP bank account.",
          additionalProperties: { type: "number" },
        },
        sellBankTransferMinimumFee: {
          type: "object",
          description:
            "MoonPay minimum fee per Currency Code for sell transactions using a EUR or GBP bank account.",
          additionalProperties: { type: "number" },
        },
        sellCardMinimumFee: {
          type: "object",
          description:
            "MoonPay minimum fee per Currency Code for sell transactions using a debit/credit card.",
          additionalProperties: { type: "number" },
        },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
    "401": {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "A descriptive error message.",
        },
        type: { type: "string", description: "An error type." },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
  },
} as const;
const GetBuyQuote = {
  metadata: {
    allOf: [
      {
        type: "object",
        properties: {
          currencyCode: {
            type: "string",
            examples: ["eth"],
            $schema: "http://json-schema.org/draft-04/schema#",
            description:
              'The code of the cryptocurrency of interest from <a href="/reference/getcurrencies">the currencies list</a> with `type=crypto`',
          },
        },
        required: ["currencyCode"],
      },
      {
        type: "object",
        properties: {
          query: {
            type: "object",
            properties: {
              baseCurrencyCode: {
                type: "string",
                description:
                  'The code of the base currency used for the transaction from <a href="/reference/getcurrencies">the currencies list</a> with `type=fiat`',
                examples: ["usd"],
              },
              quoteCurrencyAmount: {
                type: "number",
                description:
                  "A positive number representing how much crypto the customer wants to buy. Best used together with the `currencyCode` parameter. Note that if you pass both `baseCurrencyAmount` and `quoteCurrencyAmount`, the quote currency amount will take precedence. REQUIRED if `baseCurrencyAmount` is not provided.",
                examples: [3],
              },
              baseCurrencyAmount: {
                type: "number",
                description:
                  "A positive number representing how much fiat the user wants to spend. Note that if you give us a `baseCurrencyAmount` that is lower than the currency's minimum amount, we will return a quote based on the currency's minimum amount instead. REQUIRED if `quoteCurrencyAmount` is not provided.",
                examples: [200],
              },
              extraFeePercentage: {
                type: "integer",
                description:
                  'A positive integer representing your extra fee percentage for the transaction. The minimum is <span class="value">0</span> and the maximum is <span class="value">10</span>. If you don\'t provide it, we\'ll use the default value set to your account.',
                examples: [1],
              },
              paymentMethod: {
                type: "string",
                enum: [
                  "ach_bank_transfer",
                  "credit_debit_card",
                  "gbp_bank_transfer",
                  "gbp_open_banking_payment",
                  "pix_instant_payment",
                  "sepa_bank_transfer",
                ],
                description: "The transaction's payment method.",
                examples: ["credit_debit_card"],
              },
              areFeesIncluded: {
                type: "boolean",
                description:
                  'A boolean indicating whether `baseCurrencyAmount` should include extra fees. Defaults to <span class="value">false</span>.',
                examples: [false],
              },
            },
            $schema: "http://json-schema.org/draft-04/schema#",
          },
        },
        required: ["query"],
      },
    ],
  },
  response: {
    "200": {
      type: "object",
      properties: {
        accountId: {
          type: "string",
          description: "ID of your business account",
          examples: ["717a8a80-5c17-46f9-84f8-a5253c372f51"],
        },
        baseCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["6f424585-8936-4eb1-b01e-443fb306d1f5"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["fiat"],
              description: "Always `fiat`\n\n`fiat`",
              examples: ["fiat"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["Pound Sterling"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["gbp"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum transaction buy amount when using this currency as a base currency.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum transaction buy amount when using this currency as a base currency.",
              examples: [9000],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
          },
          description:
            "The fiat currency the customer wants to use for the transaction.",
        },
        baseCurrencyCode: { type: "string", examples: ["usd"] },
        baseCurrencyAmount: {
          type: "number",
          description:
            "A positive number representing how much the customer wants to spend. The minimum amount is 20.",
          examples: [288.37],
        },
        quoteCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["aaefa32f-161b-42c8-8115-debcbf3d6a2d"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["crypto"],
              description: "Always `crypto`\n\n`crypto`",
              examples: ["crypto"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["USD Coin (ERC-20)"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["usdc"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum amount of cryptocurrency you can buy.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum amount of cryptocurrency you can buy.",
              examples: [1000],
            },
            minSellAmount: {
              type: ["number", "null"],
              description: "The minimum amount of cryptocurrency you can sell.",
              examples: [15],
            },
            maxSellAmount: {
              type: ["number", "null"],
              description: "The maximum amount of cryptocurrency you can sell.",
              examples: [100000],
            },
            addressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            testnetAddressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's testnet wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            supportsAddressTag: {
              type: "boolean",
              description: "Whether the currency supports address tags.",
              examples: [false],
            },
            addressTagRegex: {
              type: ["string", "null"],
              description:
                "A regular expression which you can test against a wallet address tag. Defined only if the currency supports address tags.",
            },
            supportsTestMode: {
              type: "boolean",
              description: "Whether the currency supports test mode.",
              examples: [true],
            },
            isSuspended: {
              type: "boolean",
              description:
                "Whether purchases for this currency are suspended. If the currency is suspended, exchange rates may not be available and it is not possible to create a transaction with this currency.",
              examples: [false],
            },
            isSupportedInUs: {
              type: "boolean",
              description:
                "Whether purchases for this currency are supported in the US.",
              examples: [true],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
            notAllowedUSStates: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "AS",
                  "CA",
                  "CO",
                  "CT",
                  "DC",
                  "DE",
                  "FL",
                  "GA",
                  "GU",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "MA",
                  "MD",
                  "ME",
                  "MI",
                  "MN",
                  "MO",
                  "MP",
                  "MS",
                  "MT",
                  "NE",
                  "NH",
                  "NV",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "PR",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "TT",
                  "UT",
                  "VT",
                  "VA",
                  "VI",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ],
                description:
                  "`AL` `AK` `AZ` `AR` `AS` `CA` `CO` `CT` `DC` `DE` `FL` `GA` `GU` `HI` `ID` `IL` `IN` `IA` `KS` `KY` `LA` `MA` `MD` `ME` `MI` `MN` `MO` `MP` `MS` `MT` `NE` `NH` `NV` `NJ` `NM` `NY` `NC` `ND` `OH` `OK` `OR` `PA` `PR` `RI` `SC` `SD` `TN` `TX` `TT` `UT` `VT` `VA` `VI` `WA` `WV` `WI` `WY`",
              },
              description:
                "A list with all the US states for this currency that are not supported.",
              examples: ["LA", "VI"],
            },
            notAllowedCountries: {
              type: "array",
              items: { type: "string" },
              description:
                "A list with all the ISO 3166-1 alpha-2 country codes for this currency that are not supported.",
              examples: ["CA"],
            },
            metadata: {
              type: "object",
              description: "Additional metadata for the currency.",
              properties: {
                contractAddress: {
                  type: ["string", "null"],
                  description:
                    "Unique contract address where the token smart contract is hosted.",
                  examples: [0],
                },
                chainId: {
                  type: ["string", "null"],
                  description:
                    "ID used to identify different EVM compatible chains.",
                  examples: ["1"],
                },
                networkCode: {
                  type: "string",
                  description: "Name of the cryptocurrency",
                  examples: ["ethereum"],
                },
              },
            },
          },
          description: "The cryptocurrency the customer wants to purchase.",
        },
        quoteCurrencyCode: { type: "string", examples: ["btc"] },
        quoteCurrencyAmount: {
          type: "number",
          description:
            "A positive number representing the amount of cryptocurrency the customer will receive. Set when the purchase of cryptocurrency has been executed.",
          examples: [0.0055],
        },
        quoteCurrencyPrice: {
          type: "number",
          description: "The price of the crypto the customer will receive",
          examples: [52474.5036],
        },
        paymentMethod: {
          type: "string",
          enum: [
            "ach_bank_transfer",
            "credit_debit_card",
            "gbp_bank_transfer",
            "gbp_open_banking_payment",
            "pix_instant_payment",
            "sepa_bank_transfer",
          ],
          description:
            "The transaction's payment method.\n\n`ach_bank_transfer` `credit_debit_card` `gbp_bank_transfer` `gbp_open_banking_payment` `pix_instant_payment` `sepa_bank_transfer`",
          examples: ["credit_debit_card"],
        },
        feeAmount: {
          type: "number",
          description:
            "A positive number representing the fee for the transaction.",
          examples: [3.99],
        },
        extraFeePercentage: { type: "number", examples: [0] },
        extraFeeAmount: { type: "number", examples: [0] },
        networkFeeAmount: {
          type: "number",
          description:
            "A positive number representing the network fee for the transaction. It is added to baseCurrencyAmount, feeAmount and extraFeeAmount when the customer's card is charged.",
          examples: [7.64],
        },
        networkFeeAmountNonRefundable: { type: "boolean", examples: [false] },
        totalAmount: { type: "number", examples: [300] },
        externalId: { type: ["string", "null"] },
        externalCustomerId: { type: ["string", "null"] },
        signature: {
          type: ["string", "null"],
          description: "The signature for executing the quote for fixed flow",
          examples: ["really-long-string"],
        },
        expiresIn: {
          type: ["number", "null"],
          description: "The time in seconds until the quote expires.",
          examples: [1800],
        },
        expiresAt: {
          type: ["string", "null"],
          description:
            "Time at which the quote expires. Returned as an ISO 8601 string.",
          examples: ["2024-02-23T00:58:26.577Z"],
        },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
    "401": {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "A descriptive error message.",
        },
        type: { type: "string", description: "An error type." },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
  },
} as const;
const GetBuyTransaction = {
  metadata: {
    allOf: [
      {
        type: "object",
        properties: {
          transactionId: {
            type: "string",
            examples: ["a617e457-7ea6-4e29-9415-0be500d478cf"],
            $schema: "http://json-schema.org/draft-04/schema#",
            description: "A valid Buy transaction ID.",
          },
        },
        required: ["transactionId"],
      },
    ],
  },
  response: {
    "200": {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Unique identifier for the transaction.",
          examples: ["defb7c52-7bd3-422b-9052-374df50cc51a"],
        },
        createdAt: {
          type: "string",
          description:
            "Time at which the object was created. Returned as an ISO 8601 string.",
          examples: ["2024-02-17T18:24:45.206Z"],
        },
        updatedAt: {
          type: "string",
          description:
            "Time at which the object was last updated. Returned as an ISO 8601 string.",
          examples: ["2024-02-17T18:24:45.206Z"],
        },
        baseCurrencyAmount: {
          type: "number",
          description:
            "A positive number representing how much the customer wants to spend. The minimum amount is 20.",
          examples: [45.5],
        },
        quoteCurrencyAmount: {
          type: "number",
          description:
            "A positive number representing the amount of cryptocurrency the customer will receive. Set when the purchase of cryptocurrency has been executed.",
          examples: [0.0154],
        },
        feeAmount: {
          type: "number",
          description:
            "A positive number representing the fee for the transaction. It is added to baseCurrencyAmount, extraFeeAmount and networkFeeAmount when the customer's card is charged.",
          examples: [1.7],
        },
        extraFeeAmount: {
          type: "number",
          description:
            "A positive number representing your extra fee for the transaction. It is added to baseCurrencyAmount and feeAmount when the customer's card is charged.",
          examples: [0.43],
        },
        paymentMethod: {
          type: "string",
          enum: [
            "ach_bank_transfer",
            "credit_debit_card",
            "gbp_bank_transfer",
            "gbp_open_banking_payment",
            "pix_instant_payment",
            "sepa_bank_transfer",
          ],
          description:
            "The transaction's payment method.\n\n`ach_bank_transfer` `credit_debit_card` `gbp_bank_transfer` `gbp_open_banking_payment` `pix_instant_payment` `sepa_bank_transfer`",
          examples: ["credit_debit_card"],
        },
        networkFeeAmount: {
          type: "number",
          description:
            "A positive number representing the network fee for the transaction. It is added to baseCurrencyAmount, feeAmount and extraFeeAmount when the customer's card is charged.",
          examples: [2.37],
        },
        areFeesIncluded: {
          type: "boolean",
          description:
            "A boolean indicating whether baseCurrencyAmount includes or excludes the feeAmount, extraFeeAmount and networkFeeAmount.",
          examples: [true],
        },
        status: {
          type: "string",
          description:
            "The transaction's status.\nPossible values are `waitingPayment` (pending bank transfers where MoonPay is not in receipt), `pending` (transaction is in progress), `waitingAuthorization` (waiting for card approval, i.e. 3DS, bank side security), `failed` or `completed`.\n\n\n`waitingPayment` `pending` `waitingAuthorization` `failed` `completed`",
          enum: [
            "waitingPayment",
            "pending",
            "waitingAuthorization",
            "failed",
            "completed",
          ],
          examples: ["completed"],
        },
        failureReason: {
          type: ["string", "null"],
          description:
            "The transaction's failure reason. Set when transaction's status is failed.\n- `card_not_supported`: The customer used an unsupported card brand or type.\n- `daily_purchase_limit_exceeded`: The customer reached their daily purchase limit or this transaction would put them over their limit.\n- `payment_authorization_declined`: The payment was declined by the issuing bank of the customer's credit card. The customer should try again with another payment method or contact the bank for more details.\n- `timeout_3d_secure`: The customer did not authorize their 3D Secure transaction in time. The customer should place a new order and enter the authorization code in time (usually arrives through SMS or banking app), or contact their bank if they don't receive a code.\n- `timeout_bank_transfer`: The transaction was cancelled. The bank transfer was not received within 7 days or the transfer can't be accepted due to a mismatch (e.g. incorrect amount, incorrect / missing reference, name mismatch).\n- `timeout_kyc_verification`: The customer's identity check timed out because they did not complete their KYC / Proof of Address / Proof of Income verification within 10 hours.\n- `timeout_card_verification`: The customer did not complete their card verification within 10 hours. This could be a verification code from a bank statement, micro-authorization where the customer needs to enter the last 2 digits of the micro-auth amount, or verification by selfie. This may also refer to timeouts caused by delays on MoonPay's side in reviewing the submitted photos.\n- `rejected_kyc`: The customer's KYC or Proof of Address documents were rejected and their account was closed for safety purposes.\n- `rejected_card`\n- `rejected_other`\n- `cancelled`: The transaction was cancelled by MoonPay's support team per the customer's request or engineering team because of a technical issue.\n- `refund`: The sell order was refunded by MoonPay. The order may have been rejected for safety purposes or fiat payout failure.\n- `failed_testnet_withdrawal`: For sandbox transactions only. The MoonPay testnet wallet doesn't have enough crypto for the test transaction and needs to be topped up before new transactions can be completed.\n- `error`: General message for an error not listed.\n",
        },
        walletAddress: {
          type: "string",
          description:
            "The cryptocurrency wallet address the purchased funds will be sent to.",
          examples: [8.978072538997387e47],
        },
        walletAddressTag: {
          type: ["string", "null"],
          description:
            "The secondary cryptocurrency wallet address identifier for coins such as EOS, XRP and XMR.",
        },
        cryptoTransactionId: {
          type: ["string", "null"],
          description:
            "The cryptocurrency transaction identifier representing the transfer to the customer's wallet. Set when the withdrawal has been executed.",
          examples: [8.25717145014808e75],
        },
        redirectUrl: {
          type: ["string", "null"],
          description:
            "The URL provided to you, when required, to which to redirect the customer as part of a redirect authentication flow.",
          examples: [
            "https://api.moonpay.com/secure/url?transactionId=defb7c52-7bd3-422b-9052-374df50cc51a",
          ],
        },
        returnUrl: {
          type: "string",
          description:
            "The URL the customer is returned to after they authenticate or cancel their payment on the payment method's app or site. If you are using our widget implementation, this is always our transaction tracker page, which provides the customer with real-time information about their transaction.",
          examples: [
            "https://buy.moonpay.com/transaction_receipt?transactionId=defb7c52-7bd3-422b-9052-374df50cc51a",
          ],
        },
        widgetRedirectUrl: {
          type: ["string", "null"],
          description:
            "An optional URL used in a widget implementation. It is passed to us by you in the query parameters, and we include it as a link on the transaction tracker page.",
        },
        eurRate: {
          type: "number",
          description:
            "The exchange rate between the transaction's base currency and Euro at the time of the transaction.",
          examples: [0.92432],
        },
        usdRate: {
          type: "number",
          description:
            "The exchange rate between the transaction's base currency and US Dollar at the time of the transaction.",
          examples: [1],
        },
        gbpRate: {
          type: "number",
          description:
            "The exchange rate between the transaction's base currency and British Pound at the time of the transaction.",
          examples: [0.79016],
        },
        bankDepositInformation: {
          type: ["object", "null"],
          description:
            "For bank transfer transactions, the information about our bank account to which the customer should make the transfer.",
          properties: {
            iban: {
              type: ["string", "null"],
              description: "The IBAN of the bank account.",
            },
            bic: {
              type: ["string", "null"],
              description: "The BIC of the bank account.",
            },
            accountNumber: {
              type: ["string", "null"],
              description: "The account number of the bank account.",
            },
            sortCode: {
              type: ["string", "null"],
              description: "The sort code of the bank account.",
            },
            bankName: {
              type: ["string", "null"],
              description: "The name of the bank.",
            },
            bankAddress: {
              type: ["string", "null"],
              description: "The address of the bank.",
            },
            accountName: {
              type: "string",
              description: "The account name of the bank account.",
            },
            accountAddress: {
              type: "string",
              description: "The address of the bank account.",
            },
          },
        },
        bankTransferReference: {
          type: ["string", "null"],
          description:
            "For bank transfer transactions, the reference code the customer should cite when making the transfer.",
        },
        currencyId: {
          type: "string",
          description:
            "The identifier of the cryptocurrency the customer wants to purchase.",
          examples: ["8d305f63-1fd7-4e01-a220-8445e591aec4"],
        },
        currency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["aaefa32f-161b-42c8-8115-debcbf3d6a2d"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["crypto"],
              description: "Always `crypto`\n\n`crypto`",
              examples: ["crypto"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["USD Coin (ERC-20)"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["usdc"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum amount of cryptocurrency you can buy.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum amount of cryptocurrency you can buy.",
              examples: [1000],
            },
            minSellAmount: {
              type: ["number", "null"],
              description: "The minimum amount of cryptocurrency you can sell.",
              examples: [15],
            },
            maxSellAmount: {
              type: ["number", "null"],
              description: "The maximum amount of cryptocurrency you can sell.",
              examples: [100000],
            },
            addressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            testnetAddressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's testnet wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            supportsAddressTag: {
              type: "boolean",
              description: "Whether the currency supports address tags.",
              examples: [false],
            },
            addressTagRegex: {
              type: ["string", "null"],
              description:
                "A regular expression which you can test against a wallet address tag. Defined only if the currency supports address tags.",
            },
            supportsTestMode: {
              type: "boolean",
              description: "Whether the currency supports test mode.",
              examples: [true],
            },
            isSuspended: {
              type: "boolean",
              description:
                "Whether purchases for this currency are suspended. If the currency is suspended, exchange rates may not be available and it is not possible to create a transaction with this currency.",
              examples: [false],
            },
            isSupportedInUs: {
              type: "boolean",
              description:
                "Whether purchases for this currency are supported in the US.",
              examples: [true],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
            notAllowedUSStates: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "AS",
                  "CA",
                  "CO",
                  "CT",
                  "DC",
                  "DE",
                  "FL",
                  "GA",
                  "GU",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "MA",
                  "MD",
                  "ME",
                  "MI",
                  "MN",
                  "MO",
                  "MP",
                  "MS",
                  "MT",
                  "NE",
                  "NH",
                  "NV",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "PR",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "TT",
                  "UT",
                  "VT",
                  "VA",
                  "VI",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ],
                description:
                  "`AL` `AK` `AZ` `AR` `AS` `CA` `CO` `CT` `DC` `DE` `FL` `GA` `GU` `HI` `ID` `IL` `IN` `IA` `KS` `KY` `LA` `MA` `MD` `ME` `MI` `MN` `MO` `MP` `MS` `MT` `NE` `NH` `NV` `NJ` `NM` `NY` `NC` `ND` `OH` `OK` `OR` `PA` `PR` `RI` `SC` `SD` `TN` `TX` `TT` `UT` `VT` `VA` `VI` `WA` `WV` `WI` `WY`",
              },
              description:
                "A list with all the US states for this currency that are not supported.",
              examples: ["LA", "VI"],
            },
            notAllowedCountries: {
              type: "array",
              items: { type: "string" },
              description:
                "A list with all the ISO 3166-1 alpha-2 country codes for this currency that are not supported.",
              examples: ["CA"],
            },
            metadata: {
              type: "object",
              description: "Additional metadata for the currency.",
              properties: {
                contractAddress: {
                  type: ["string", "null"],
                  description:
                    "Unique contract address where the token smart contract is hosted.",
                  examples: [0],
                },
                chainId: {
                  type: ["string", "null"],
                  description:
                    "ID used to identify different EVM compatible chains.",
                  examples: ["1"],
                },
                networkCode: {
                  type: "string",
                  description: "Name of the cryptocurrency",
                  examples: ["ethereum"],
                },
              },
            },
          },
        },
        baseCurrencyId: {
          type: "string",
          description:
            "The identifier of the fiat currency the customer wants to use for the transaction.",
          examples: ["edd81f1f-f735-4692-b410-6def107f17d2"],
        },
        baseCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["6f424585-8936-4eb1-b01e-443fb306d1f5"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["fiat"],
              description: "Always `fiat`\n\n`fiat`",
              examples: ["fiat"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["Pound Sterling"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["gbp"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum transaction buy amount when using this currency as a base currency.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum transaction buy amount when using this currency as a base currency.",
              examples: [9000],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
          },
        },
        customerId: {
          type: "string",
          description:
            "The identifier of the customer the transaction is associated with.",
          examples: ["77cc1309-0058-4177-b170-8e9657fe12eb"],
        },
        cardId: {
          type: ["string", "null"],
          description:
            "For token or card transactions, the identifier of the payment card used for this transaction.",
          examples: ["0a7e23d8-6a52-44c7-b189-91b37bd13796"],
        },
        bankAccountId: {
          type: ["string", "null"],
          description:
            "For bank transfer transactions, the identifier of the bank account used for this transaction.",
        },
        externalCustomerId: {
          type: ["string", "null"],
          description:
            "An identifier associated with the customer, provided by you.",
        },
        externalTransactionId: {
          type: ["string", "null"],
          description:
            "An identifier associated with the transaction, provided by you.",
        },
        country: {
          type: "string",
          description:
            "The customer's country. Returned as an ISO 3166-1 alpha-3 code.",
          examples: ["GBR"],
        },
        state: {
          type: ["string", "null"],
          description:
            "The customer's state, if the customer is from the USA. Returned as a two-letter code.",
        },
        cardType: {
          type: ["string", "null"],
          description:
            "The card type used for the transaction.\n\n`apple_pay` `google_pay` `samsung_pay` `card`",
          enum: ["apple_pay", "google_pay", "samsung_pay", "card"],
        },
        cardPaymentType: {
          type: ["string", "null"],
          description:
            "The card payment type used for the transaction.\n\n`credit` `debit` `unknown`",
          enum: ["credit", "debit", "unknown"],
        },
        stages: {
          type: "array",
          description:
            "An array of four objects, each representing one of the four stages of the purchase process.",
          items: {
            type: "object",
            properties: {
              stage: {
                type: "string",
                description:
                  "Stage type\n\n`stage_one_ordering` `stage_two_verification` `stage_three_processing` `stage_four_delivery`",
                enum: [
                  "stage_one_ordering",
                  "stage_two_verification",
                  "stage_three_processing",
                  "stage_four_delivery",
                ],
                examples: ["stage_one_ordering"],
              },
              status: {
                type: "string",
                description:
                  "Status of the stage\n\n`not_started` `in_progress` `success` `failed`",
                enum: ["not_started", "in_progress", "success", "failed"],
                examples: ["success"],
              },
              failureReason: {
                type: ["string", "null"],
                description:
                  "The reason for the failure of the stage. Set when the stage's status is failed.\n\n`card_not_supported` `daily_purchase_limit_exceeded` `payment_authorization_declined` `timeout_3d_secure` `timeout_bank_transfer` `timeout_kyc_verification` `timeout_card_verification` `rejected_kyc` `rejected_card` `rejected_other` `cancelled` `refund` `failed_testnet_withdrawal` `error`",
                enum: [
                  "card_not_supported",
                  "daily_purchase_limit_exceeded",
                  "payment_authorization_declined",
                  "timeout_3d_secure",
                  "timeout_bank_transfer",
                  "timeout_kyc_verification",
                  "timeout_card_verification",
                  "rejected_kyc",
                  "rejected_card",
                  "rejected_other",
                  "cancelled",
                  "refund",
                  "failed_testnet_withdrawal",
                  "error",
                ],
              },
              actions: {
                type: "array",
                items: {
                  type: "object",
                  description:
                    "Sometimes, the customer is required to take an action or actions to further the purchase process, usually by submitting information at a provided URL. For each action, we pass an object with a type and a url. \nPossible types are `complete_bank_transfer`, `retry_kyc`, `verify_card_by_code`, `verify_card_by_file`. If no actions are required, this returns an empty array.\n",
                  properties: {
                    type: { type: "string" },
                    url: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
    "401": {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "A descriptive error message.",
        },
        type: { type: "string", description: "An error type." },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
  },
} as const;
const GetBuyTransactionByExternalId = {
  metadata: {
    allOf: [
      {
        type: "object",
        properties: {
          externalTransactionId: {
            type: "string",
            examples: ["d228e63d-627e-4e3c-8dfb-b916a8950ff0"],
            $schema: "http://json-schema.org/draft-04/schema#",
            description:
              "An identifier associated with the transaction, provided by you.",
          },
        },
        required: ["externalTransactionId"],
      },
    ],
  },
  response: {
    "200": {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Unique identifier for the transaction.",
          examples: ["defb7c52-7bd3-422b-9052-374df50cc51a"],
        },
        createdAt: {
          type: "string",
          description:
            "Time at which the object was created. Returned as an ISO 8601 string.",
          examples: ["2024-02-17T18:24:45.206Z"],
        },
        updatedAt: {
          type: "string",
          description:
            "Time at which the object was last updated. Returned as an ISO 8601 string.",
          examples: ["2024-02-17T18:24:45.206Z"],
        },
        baseCurrencyAmount: {
          type: "number",
          description:
            "A positive number representing how much the customer wants to spend. The minimum amount is 20.",
          examples: [45.5],
        },
        quoteCurrencyAmount: {
          type: "number",
          description:
            "A positive number representing the amount of cryptocurrency the customer will receive. Set when the purchase of cryptocurrency has been executed.",
          examples: [0.0154],
        },
        feeAmount: {
          type: "number",
          description:
            "A positive number representing the fee for the transaction. It is added to baseCurrencyAmount, extraFeeAmount and networkFeeAmount when the customer's card is charged.",
          examples: [1.7],
        },
        extraFeeAmount: {
          type: "number",
          description:
            "A positive number representing your extra fee for the transaction. It is added to baseCurrencyAmount and feeAmount when the customer's card is charged.",
          examples: [0.43],
        },
        paymentMethod: {
          type: "string",
          enum: [
            "ach_bank_transfer",
            "credit_debit_card",
            "gbp_bank_transfer",
            "gbp_open_banking_payment",
            "pix_instant_payment",
            "sepa_bank_transfer",
          ],
          description:
            "The transaction's payment method.\n\n`ach_bank_transfer` `credit_debit_card` `gbp_bank_transfer` `gbp_open_banking_payment` `pix_instant_payment` `sepa_bank_transfer`",
          examples: ["credit_debit_card"],
        },
        networkFeeAmount: {
          type: "number",
          description:
            "A positive number representing the network fee for the transaction. It is added to baseCurrencyAmount, feeAmount and extraFeeAmount when the customer's card is charged.",
          examples: [2.37],
        },
        areFeesIncluded: {
          type: "boolean",
          description:
            "A boolean indicating whether baseCurrencyAmount includes or excludes the feeAmount, extraFeeAmount and networkFeeAmount.",
          examples: [true],
        },
        status: {
          type: "string",
          description:
            "The transaction's status.\nPossible values are `waitingPayment` (pending bank transfers where MoonPay is not in receipt), `pending` (transaction is in progress), `waitingAuthorization` (waiting for card approval, i.e. 3DS, bank side security), `failed` or `completed`.\n\n\n`waitingPayment` `pending` `waitingAuthorization` `failed` `completed`",
          enum: [
            "waitingPayment",
            "pending",
            "waitingAuthorization",
            "failed",
            "completed",
          ],
          examples: ["completed"],
        },
        failureReason: {
          type: ["string", "null"],
          description:
            "The transaction's failure reason. Set when transaction's status is failed.\n- `card_not_supported`: The customer used an unsupported card brand or type.\n- `daily_purchase_limit_exceeded`: The customer reached their daily purchase limit or this transaction would put them over their limit.\n- `payment_authorization_declined`: The payment was declined by the issuing bank of the customer's credit card. The customer should try again with another payment method or contact the bank for more details.\n- `timeout_3d_secure`: The customer did not authorize their 3D Secure transaction in time. The customer should place a new order and enter the authorization code in time (usually arrives through SMS or banking app), or contact their bank if they don't receive a code.\n- `timeout_bank_transfer`: The transaction was cancelled. The bank transfer was not received within 7 days or the transfer can't be accepted due to a mismatch (e.g. incorrect amount, incorrect / missing reference, name mismatch).\n- `timeout_kyc_verification`: The customer's identity check timed out because they did not complete their KYC / Proof of Address / Proof of Income verification within 10 hours.\n- `timeout_card_verification`: The customer did not complete their card verification within 10 hours. This could be a verification code from a bank statement, micro-authorization where the customer needs to enter the last 2 digits of the micro-auth amount, or verification by selfie. This may also refer to timeouts caused by delays on MoonPay's side in reviewing the submitted photos.\n- `rejected_kyc`: The customer's KYC or Proof of Address documents were rejected and their account was closed for safety purposes.\n- `rejected_card`\n- `rejected_other`\n- `cancelled`: The transaction was cancelled by MoonPay's support team per the customer's request or engineering team because of a technical issue.\n- `refund`: The sell order was refunded by MoonPay. The order may have been rejected for safety purposes or fiat payout failure.\n- `failed_testnet_withdrawal`: For sandbox transactions only. The MoonPay testnet wallet doesn't have enough crypto for the test transaction and needs to be topped up before new transactions can be completed.\n- `error`: General message for an error not listed.\n",
        },
        walletAddress: {
          type: "string",
          description:
            "The cryptocurrency wallet address the purchased funds will be sent to.",
          examples: [8.978072538997387e47],
        },
        walletAddressTag: {
          type: ["string", "null"],
          description:
            "The secondary cryptocurrency wallet address identifier for coins such as EOS, XRP and XMR.",
        },
        cryptoTransactionId: {
          type: ["string", "null"],
          description:
            "The cryptocurrency transaction identifier representing the transfer to the customer's wallet. Set when the withdrawal has been executed.",
          examples: [8.25717145014808e75],
        },
        redirectUrl: {
          type: ["string", "null"],
          description:
            "The URL provided to you, when required, to which to redirect the customer as part of a redirect authentication flow.",
          examples: [
            "https://api.moonpay.com/secure/url?transactionId=defb7c52-7bd3-422b-9052-374df50cc51a",
          ],
        },
        returnUrl: {
          type: "string",
          description:
            "The URL the customer is returned to after they authenticate or cancel their payment on the payment method's app or site. If you are using our widget implementation, this is always our transaction tracker page, which provides the customer with real-time information about their transaction.",
          examples: [
            "https://buy.moonpay.com/transaction_receipt?transactionId=defb7c52-7bd3-422b-9052-374df50cc51a",
          ],
        },
        widgetRedirectUrl: {
          type: ["string", "null"],
          description:
            "An optional URL used in a widget implementation. It is passed to us by you in the query parameters, and we include it as a link on the transaction tracker page.",
        },
        eurRate: {
          type: "number",
          description:
            "The exchange rate between the transaction's base currency and Euro at the time of the transaction.",
          examples: [0.92432],
        },
        usdRate: {
          type: "number",
          description:
            "The exchange rate between the transaction's base currency and US Dollar at the time of the transaction.",
          examples: [1],
        },
        gbpRate: {
          type: "number",
          description:
            "The exchange rate between the transaction's base currency and British Pound at the time of the transaction.",
          examples: [0.79016],
        },
        bankDepositInformation: {
          type: ["object", "null"],
          description:
            "For bank transfer transactions, the information about our bank account to which the customer should make the transfer.",
          properties: {
            iban: {
              type: ["string", "null"],
              description: "The IBAN of the bank account.",
            },
            bic: {
              type: ["string", "null"],
              description: "The BIC of the bank account.",
            },
            accountNumber: {
              type: ["string", "null"],
              description: "The account number of the bank account.",
            },
            sortCode: {
              type: ["string", "null"],
              description: "The sort code of the bank account.",
            },
            bankName: {
              type: ["string", "null"],
              description: "The name of the bank.",
            },
            bankAddress: {
              type: ["string", "null"],
              description: "The address of the bank.",
            },
            accountName: {
              type: "string",
              description: "The account name of the bank account.",
            },
            accountAddress: {
              type: "string",
              description: "The address of the bank account.",
            },
          },
        },
        bankTransferReference: {
          type: ["string", "null"],
          description:
            "For bank transfer transactions, the reference code the customer should cite when making the transfer.",
        },
        currencyId: {
          type: "string",
          description:
            "The identifier of the cryptocurrency the customer wants to purchase.",
          examples: ["8d305f63-1fd7-4e01-a220-8445e591aec4"],
        },
        currency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["aaefa32f-161b-42c8-8115-debcbf3d6a2d"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["crypto"],
              description: "Always `crypto`\n\n`crypto`",
              examples: ["crypto"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["USD Coin (ERC-20)"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["usdc"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum amount of cryptocurrency you can buy.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum amount of cryptocurrency you can buy.",
              examples: [1000],
            },
            minSellAmount: {
              type: ["number", "null"],
              description: "The minimum amount of cryptocurrency you can sell.",
              examples: [15],
            },
            maxSellAmount: {
              type: ["number", "null"],
              description: "The maximum amount of cryptocurrency you can sell.",
              examples: [100000],
            },
            addressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            testnetAddressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's testnet wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            supportsAddressTag: {
              type: "boolean",
              description: "Whether the currency supports address tags.",
              examples: [false],
            },
            addressTagRegex: {
              type: ["string", "null"],
              description:
                "A regular expression which you can test against a wallet address tag. Defined only if the currency supports address tags.",
            },
            supportsTestMode: {
              type: "boolean",
              description: "Whether the currency supports test mode.",
              examples: [true],
            },
            isSuspended: {
              type: "boolean",
              description:
                "Whether purchases for this currency are suspended. If the currency is suspended, exchange rates may not be available and it is not possible to create a transaction with this currency.",
              examples: [false],
            },
            isSupportedInUs: {
              type: "boolean",
              description:
                "Whether purchases for this currency are supported in the US.",
              examples: [true],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
            notAllowedUSStates: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "AS",
                  "CA",
                  "CO",
                  "CT",
                  "DC",
                  "DE",
                  "FL",
                  "GA",
                  "GU",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "MA",
                  "MD",
                  "ME",
                  "MI",
                  "MN",
                  "MO",
                  "MP",
                  "MS",
                  "MT",
                  "NE",
                  "NH",
                  "NV",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "PR",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "TT",
                  "UT",
                  "VT",
                  "VA",
                  "VI",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ],
                description:
                  "`AL` `AK` `AZ` `AR` `AS` `CA` `CO` `CT` `DC` `DE` `FL` `GA` `GU` `HI` `ID` `IL` `IN` `IA` `KS` `KY` `LA` `MA` `MD` `ME` `MI` `MN` `MO` `MP` `MS` `MT` `NE` `NH` `NV` `NJ` `NM` `NY` `NC` `ND` `OH` `OK` `OR` `PA` `PR` `RI` `SC` `SD` `TN` `TX` `TT` `UT` `VT` `VA` `VI` `WA` `WV` `WI` `WY`",
              },
              description:
                "A list with all the US states for this currency that are not supported.",
              examples: ["LA", "VI"],
            },
            notAllowedCountries: {
              type: "array",
              items: { type: "string" },
              description:
                "A list with all the ISO 3166-1 alpha-2 country codes for this currency that are not supported.",
              examples: ["CA"],
            },
            metadata: {
              type: "object",
              description: "Additional metadata for the currency.",
              properties: {
                contractAddress: {
                  type: ["string", "null"],
                  description:
                    "Unique contract address where the token smart contract is hosted.",
                  examples: [0],
                },
                chainId: {
                  type: ["string", "null"],
                  description:
                    "ID used to identify different EVM compatible chains.",
                  examples: ["1"],
                },
                networkCode: {
                  type: "string",
                  description: "Name of the cryptocurrency",
                  examples: ["ethereum"],
                },
              },
            },
          },
        },
        baseCurrencyId: {
          type: "string",
          description:
            "The identifier of the fiat currency the customer wants to use for the transaction.",
          examples: ["edd81f1f-f735-4692-b410-6def107f17d2"],
        },
        baseCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["6f424585-8936-4eb1-b01e-443fb306d1f5"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["fiat"],
              description: "Always `fiat`\n\n`fiat`",
              examples: ["fiat"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["Pound Sterling"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["gbp"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum transaction buy amount when using this currency as a base currency.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum transaction buy amount when using this currency as a base currency.",
              examples: [9000],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
          },
        },
        customerId: {
          type: "string",
          description:
            "The identifier of the customer the transaction is associated with.",
          examples: ["77cc1309-0058-4177-b170-8e9657fe12eb"],
        },
        cardId: {
          type: ["string", "null"],
          description:
            "For token or card transactions, the identifier of the payment card used for this transaction.",
          examples: ["0a7e23d8-6a52-44c7-b189-91b37bd13796"],
        },
        bankAccountId: {
          type: ["string", "null"],
          description:
            "For bank transfer transactions, the identifier of the bank account used for this transaction.",
        },
        externalCustomerId: {
          type: ["string", "null"],
          description:
            "An identifier associated with the customer, provided by you.",
        },
        externalTransactionId: {
          type: ["string", "null"],
          description:
            "An identifier associated with the transaction, provided by you.",
        },
        country: {
          type: "string",
          description:
            "The customer's country. Returned as an ISO 3166-1 alpha-3 code.",
          examples: ["GBR"],
        },
        state: {
          type: ["string", "null"],
          description:
            "The customer's state, if the customer is from the USA. Returned as a two-letter code.",
        },
        cardType: {
          type: ["string", "null"],
          description:
            "The card type used for the transaction.\n\n`apple_pay` `google_pay` `samsung_pay` `card`",
          enum: ["apple_pay", "google_pay", "samsung_pay", "card"],
        },
        cardPaymentType: {
          type: ["string", "null"],
          description:
            "The card payment type used for the transaction.\n\n`credit` `debit` `unknown`",
          enum: ["credit", "debit", "unknown"],
        },
        stages: {
          type: "array",
          description:
            "An array of four objects, each representing one of the four stages of the purchase process.",
          items: {
            type: "object",
            properties: {
              stage: {
                type: "string",
                description:
                  "Stage type\n\n`stage_one_ordering` `stage_two_verification` `stage_three_processing` `stage_four_delivery`",
                enum: [
                  "stage_one_ordering",
                  "stage_two_verification",
                  "stage_three_processing",
                  "stage_four_delivery",
                ],
                examples: ["stage_one_ordering"],
              },
              status: {
                type: "string",
                description:
                  "Status of the stage\n\n`not_started` `in_progress` `success` `failed`",
                enum: ["not_started", "in_progress", "success", "failed"],
                examples: ["success"],
              },
              failureReason: {
                type: ["string", "null"],
                description:
                  "The reason for the failure of the stage. Set when the stage's status is failed.\n\n`card_not_supported` `daily_purchase_limit_exceeded` `payment_authorization_declined` `timeout_3d_secure` `timeout_bank_transfer` `timeout_kyc_verification` `timeout_card_verification` `rejected_kyc` `rejected_card` `rejected_other` `cancelled` `refund` `failed_testnet_withdrawal` `error`",
                enum: [
                  "card_not_supported",
                  "daily_purchase_limit_exceeded",
                  "payment_authorization_declined",
                  "timeout_3d_secure",
                  "timeout_bank_transfer",
                  "timeout_kyc_verification",
                  "timeout_card_verification",
                  "rejected_kyc",
                  "rejected_card",
                  "rejected_other",
                  "cancelled",
                  "refund",
                  "failed_testnet_withdrawal",
                  "error",
                ],
              },
              actions: {
                type: "array",
                items: {
                  type: "object",
                  description:
                    "Sometimes, the customer is required to take an action or actions to further the purchase process, usually by submitting information at a provided URL. For each action, we pass an object with a type and a url. \nPossible types are `complete_bank_transfer`, `retry_kyc`, `verify_card_by_code`, `verify_card_by_file`. If no actions are required, this returns an empty array.\n",
                  properties: {
                    type: { type: "string" },
                    url: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
    "401": {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "A descriptive error message.",
        },
        type: { type: "string", description: "An error type." },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
  },
} as const;
const GetCountries = {
  response: {
    "200": {
      type: "array",
      items: {
        type: "object",
        properties: {
          alpha2: {
            type: "string",
            description: "The country's ISO 3166-1 alpha-2 code.",
            examples: ["GB"],
          },
          alpha3: {
            type: "string",
            description: "The country's ISO 3166-1 alpha-3 code.",
            examples: ["GBR"],
          },
          isAllowed: {
            type: "boolean",
            description:
              "Whether residents of this country can use the service.",
            examples: [true],
          },
          isBuyAllowed: {
            type: "boolean",
            description:
              "Whether residents of this country can buy cryptocurrencies.",
            examples: [true],
          },
          isSellAllowed: {
            type: "boolean",
            description:
              "Whether residents of this country can sell cryptocurrencies.",
            examples: [true],
          },
          name: {
            type: "string",
            description: "The country's name.",
            examples: ["United Kingdom"],
          },
          supportedDocuments: {
            type: "array",
            items: {
              type: "string",
              enum: [
                "additional_proof_of_income",
                "driving_licence",
                "national_identity_card",
                "passport",
                "proof_of_address",
                "proof_of_income",
                "residence_permit",
                "selfie",
              ],
              description:
                "`additional_proof_of_income` `driving_licence` `national_identity_card` `passport` `proof_of_address` `proof_of_income` `residence_permit` `selfie`",
            },
            description:
              "A list of supported identity documents for the country.\n\nPossible values are: `additional_proof_of_income`, `driving_licence`, `national_identity_card`, `passport`, `proof_of_address`, `proof_of_income`, `residence_permit`, `selfie`\n",
            examples: [
              "additional_proof_of_income",
              "driving_licence",
              "national_identity_card",
              "passport",
              "proof_of_address",
              "proof_of_income",
              "residence_permit",
              "selfie",
            ],
          },
        },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
    "401": {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "A descriptive error message.",
        },
        type: { type: "string", description: "An error type." },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
  },
} as const;
const GetCurrencies = {
  response: {
    "200": {
      type: "array",
      description:
        "A list of supported currencies: both `type=fiat` and `type=crypto`\n",
      items: {
        anyOf: [
          {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Unique identifier for the currency.",
                examples: ["6f424585-8936-4eb1-b01e-443fb306d1f5"],
              },
              createdAt: {
                type: "string",
                description:
                  "Time at which the object was created. Returned as an ISO 8601 string.",
                examples: ["2019-05-17T18:24:45.206Z"],
              },
              updatedAt: {
                type: "string",
                description:
                  "Time at which the object was last updated. Returned as an ISO 8601 string.",
                examples: ["2019-05-17T18:24:45.206Z"],
              },
              type: {
                type: "string",
                enum: ["fiat"],
                description: "Always `fiat`\n\n`fiat`",
                examples: ["fiat"],
              },
              name: {
                type: "string",
                description: "The currency's name.",
                examples: ["Pound Sterling"],
              },
              code: {
                type: "string",
                description: "The currency's code.",
                examples: ["gbp"],
              },
              precision: {
                type: "number",
                description:
                  "The currency's precision (number of digits after decimal point).",
                examples: [2],
              },
              minBuyAmount: {
                type: ["number", "null"],
                description:
                  "Represents the minimum transaction buy amount when using this currency as a base currency.",
                examples: [30],
              },
              maxBuyAmount: {
                type: ["number", "null"],
                description:
                  "Represents the maximum transaction buy amount when using this currency as a base currency.",
                examples: [9000],
              },
              isSellSupported: {
                type: "boolean",
                description: "Whether sales for this currency are supported.",
                examples: [true],
              },
            },
          },
          {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Unique identifier for the currency.",
                examples: ["aaefa32f-161b-42c8-8115-debcbf3d6a2d"],
              },
              createdAt: {
                type: "string",
                description:
                  "Time at which the object was created. Returned as an ISO 8601 string.",
                examples: ["2019-05-17T18:24:45.206Z"],
              },
              updatedAt: {
                type: "string",
                description:
                  "Time at which the object was last updated. Returned as an ISO 8601 string.",
                examples: ["2019-05-17T18:24:45.206Z"],
              },
              type: {
                type: "string",
                enum: ["crypto"],
                description: "Always `crypto`\n\n`crypto`",
                examples: ["crypto"],
              },
              name: {
                type: "string",
                description: "The currency's name.",
                examples: ["USD Coin (ERC-20)"],
              },
              code: {
                type: "string",
                description: "The currency's code.",
                examples: ["usdc"],
              },
              precision: {
                type: "number",
                description:
                  "The currency's precision (number of digits after decimal point).",
                examples: [2],
              },
              minBuyAmount: {
                type: ["number", "null"],
                description:
                  "Represents the minimum amount of cryptocurrency you can buy.",
                examples: [30],
              },
              maxBuyAmount: {
                type: ["number", "null"],
                description:
                  "Represents the maximum amount of cryptocurrency you can buy.",
                examples: [1000],
              },
              minSellAmount: {
                type: ["number", "null"],
                description:
                  "The minimum amount of cryptocurrency you can sell.",
                examples: [15],
              },
              maxSellAmount: {
                type: ["number", "null"],
                description:
                  "The maximum amount of cryptocurrency you can sell.",
                examples: [100000],
              },
              addressRegex: {
                type: "string",
                description:
                  "A regular expression which you can test against your end user's wallet addresses.",
                examples: ["^(0x)[0-9A-Fa-f]{40}$"],
              },
              testnetAddressRegex: {
                type: "string",
                description:
                  "A regular expression which you can test against your end user's testnet wallet addresses.",
                examples: ["^(0x)[0-9A-Fa-f]{40}$"],
              },
              supportsAddressTag: {
                type: "boolean",
                description: "Whether the currency supports address tags.",
                examples: [false],
              },
              addressTagRegex: {
                type: ["string", "null"],
                description:
                  "A regular expression which you can test against a wallet address tag. Defined only if the currency supports address tags.",
              },
              supportsTestMode: {
                type: "boolean",
                description: "Whether the currency supports test mode.",
                examples: [true],
              },
              isSuspended: {
                type: "boolean",
                description:
                  "Whether purchases for this currency are suspended. If the currency is suspended, exchange rates may not be available and it is not possible to create a transaction with this currency.",
                examples: [false],
              },
              isSupportedInUs: {
                type: "boolean",
                description:
                  "Whether purchases for this currency are supported in the US.",
                examples: [true],
              },
              isSellSupported: {
                type: "boolean",
                description: "Whether sales for this currency are supported.",
                examples: [true],
              },
              notAllowedUSStates: {
                type: "array",
                items: {
                  type: "string",
                  enum: [
                    "AL",
                    "AK",
                    "AZ",
                    "AR",
                    "AS",
                    "CA",
                    "CO",
                    "CT",
                    "DC",
                    "DE",
                    "FL",
                    "GA",
                    "GU",
                    "HI",
                    "ID",
                    "IL",
                    "IN",
                    "IA",
                    "KS",
                    "KY",
                    "LA",
                    "MA",
                    "MD",
                    "ME",
                    "MI",
                    "MN",
                    "MO",
                    "MP",
                    "MS",
                    "MT",
                    "NE",
                    "NH",
                    "NV",
                    "NJ",
                    "NM",
                    "NY",
                    "NC",
                    "ND",
                    "OH",
                    "OK",
                    "OR",
                    "PA",
                    "PR",
                    "RI",
                    "SC",
                    "SD",
                    "TN",
                    "TX",
                    "TT",
                    "UT",
                    "VT",
                    "VA",
                    "VI",
                    "WA",
                    "WV",
                    "WI",
                    "WY",
                  ],
                  description:
                    "`AL` `AK` `AZ` `AR` `AS` `CA` `CO` `CT` `DC` `DE` `FL` `GA` `GU` `HI` `ID` `IL` `IN` `IA` `KS` `KY` `LA` `MA` `MD` `ME` `MI` `MN` `MO` `MP` `MS` `MT` `NE` `NH` `NV` `NJ` `NM` `NY` `NC` `ND` `OH` `OK` `OR` `PA` `PR` `RI` `SC` `SD` `TN` `TX` `TT` `UT` `VT` `VA` `VI` `WA` `WV` `WI` `WY`",
                },
                description:
                  "A list with all the US states for this currency that are not supported.",
                examples: ["LA", "VI"],
              },
              notAllowedCountries: {
                type: "array",
                items: { type: "string" },
                description:
                  "A list with all the ISO 3166-1 alpha-2 country codes for this currency that are not supported.",
                examples: ["CA"],
              },
              metadata: {
                type: "object",
                description: "Additional metadata for the currency.",
                properties: {
                  contractAddress: {
                    type: ["string", "null"],
                    description:
                      "Unique contract address where the token smart contract is hosted.",
                    examples: [0],
                  },
                  chainId: {
                    type: ["string", "null"],
                    description:
                      "ID used to identify different EVM compatible chains.",
                    examples: ["1"],
                  },
                  networkCode: {
                    type: "string",
                    description: "Name of the cryptocurrency",
                    examples: ["ethereum"],
                  },
                },
              },
            },
          },
        ],
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
    "401": {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "A descriptive error message.",
        },
        type: { type: "string", description: "An error type." },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
  },
} as const;
const GetCurrencyLimits = {
  metadata: {
    allOf: [
      {
        type: "object",
        properties: {
          currencyCode: {
            type: "string",
            examples: ["eth"],
            $schema: "http://json-schema.org/draft-04/schema#",
            description:
              'The code of the cryptocurrency of interest from <a href="/reference/getcurrencies">the currencies list</a> with `type=crypto`\n',
          },
        },
        required: ["currencyCode"],
      },
      {
        type: "object",
        properties: {
          query: {
            type: "object",
            properties: {
              baseCurrencyCode: {
                type: "string",
                description:
                  'The code of the fiat currency used for the transaction from <a href="/reference/getcurrencies">the currencies list</a> with `type=fiat`',
                examples: ["usd"],
              },
              areFeesIncluded: {
                type: "boolean",
                description:
                  'A boolean indicating whether `minBuyAmount` and `maxBuyAmount` should include extra fees. Defaults to <span class="value">false</span>.',
                examples: [false],
              },
              paymentMethod: {
                type: "string",
                enum: [
                  "ach_bank_transfer",
                  "credit_debit_card",
                  "gbp_bank_transfer",
                  "gbp_open_banking_payment",
                  "pix_instant_payment",
                  "sepa_bank_transfer",
                ],
                description: "The transaction's payment method.",
                examples: ["credit_debit_card"],
              },
            },
            required: ["baseCurrencyCode"],
            $schema: "http://json-schema.org/draft-04/schema#",
          },
        },
        required: ["query"],
      },
    ],
  },
  response: {
    "200": {
      type: "object",
      properties: {
        quoteCurrency: {
          type: "object",
          properties: {
            code: {
              type: "string",
              description: "The code of the quote currency.",
              examples: ["btc"],
            },
            minBuyAmount: {
              type: "number",
              description:
                "The minimum transaction buy amount in quote currency.",
              examples: [0.00056],
            },
            maxBuyAmount: {
              type: "number",
              description:
                "The maximum transaction buy amount in quote currency.",
              examples: [0.20994],
            },
          },
        },
        baseCurrency: {
          type: "object",
          properties: {
            code: {
              type: "string",
              description: "The code of the base currency.",
              examples: ["gbp"],
            },
            minBuyAmount: {
              type: "number",
              description:
                "The minimum transaction buy amount in base currency.",
              examples: [30],
            },
            maxBuyAmount: {
              type: "number",
              description:
                "The maximum transaction buy amount in base currency.",
              examples: [9000],
            },
          },
        },
        paymentMethod: {
          type: "string",
          enum: [
            "ach_bank_transfer",
            "credit_debit_card",
            "gbp_bank_transfer",
            "gbp_open_banking_payment",
            "pix_instant_payment",
            "sepa_bank_transfer",
          ],
          description:
            "The transaction's payment method.\n\n`ach_bank_transfer` `credit_debit_card` `gbp_bank_transfer` `gbp_open_banking_payment` `pix_instant_payment` `sepa_bank_transfer`",
          examples: ["credit_debit_card"],
        },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
    "401": {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "A descriptive error message.",
        },
        type: { type: "string", description: "An error type." },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
  },
} as const;
const GetIpAddress = {
  metadata: {
    allOf: [
      {
        type: "object",
        properties: {
          query: {
            type: "object",
            properties: {
              ipAddress: {
                type: "string",
                description: "The IP address to be checked.",
                examples: ["71.183.124.141"],
              },
            },
            $schema: "http://json-schema.org/draft-04/schema#",
          },
        },
        required: ["query"],
      },
    ],
  },
  response: {
    "200": {
      type: "object",
      properties: {
        alpha2: {
          type: "string",
          description: "The country's ISO 3166-1 alpha-2 code.",
          examples: ["GB"],
        },
        alpha3: {
          type: "string",
          description: "The country's ISO 3166-1 alpha-3 code.",
          examples: ["GBR"],
        },
        country: {
          type: "string",
          description: "The IP address country.",
          examples: ["United Kingdom"],
        },
        state: {
          type: "string",
          description:
            "The IP address state or region or empty if not applicable.",
          examples: [""],
        },
        ipAddress: {
          type: "string",
          description: "The IPv4 or IPv6 address of the caller",
          examples: ["81.152.178.191"],
        },
        isAllowed: {
          type: "boolean",
          description: "Whether residents of this country can use the service.",
          examples: [true],
        },
        isBuyAllowed: {
          type: "boolean",
          description:
            "Whether residents of this country can buy cryptocurrencies.",
          examples: [true],
        },
        isSellAllowed: {
          type: "boolean",
          description:
            "Whether residents of this country can sell cryptocurrencies.",
          examples: [true],
        },
        isNftAllowed: {
          type: "boolean",
          description: "Whether residents of this country can buy NFTs.",
          examples: [true],
        },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
    "401": {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "A descriptive error message.",
        },
        type: { type: "string", description: "An error type." },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
  },
} as const;
const GetNetworkFees = {
  metadata: {
    allOf: [
      {
        type: "object",
        properties: {
          query: {
            type: "object",
            properties: {
              cryptoCurrencies: {
                type: "string",
                description:
                  'The codes of the cryptocurrency codes from <a href="/reference/getcurrencies">the currencies list</a>, separated by commas',
                examples: ["eth,btc"],
              },
              fiatCurrencies: {
                type: "string",
                description:
                  'The codes of the fiat currency codes from <a href="/reference/getcurrencies">the currencies list</a>, separated by commas.',
                examples: ["usd,gbp"],
              },
            },
            required: ["cryptoCurrencies", "fiatCurrencies"],
            $schema: "http://json-schema.org/draft-04/schema#",
          },
        },
        required: ["query"],
      },
    ],
  },
  response: {
    "200": {
      type: "object",
      description:
        "The network fee for cryptocurrency for the `cryptoCurrencies` list in fiat from the `fiatCurrencies` list.\n",
      additionalProperties: {
        type: "object",
        description: "Crypto currency from the `cryptoCurrencies` list.",
        additionalProperties: {
          type: "number",
          description:
            "The network fee for cryptocurrency in the `cryptoCurrencies` list, in fiat in the `fiatCurrencies` list.",
        },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
    "401": {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "A descriptive error message.",
        },
        type: { type: "string", description: "An error type." },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
  },
} as const;
const GetSellQuote = {
  metadata: {
    allOf: [
      {
        type: "object",
        properties: {
          currencyCode: {
            type: "string",
            examples: ["eth"],
            $schema: "http://json-schema.org/draft-04/schema#",
            description:
              'The code of the cryptocurrency from <a href="/reference/getcurrencies">the currencies list</a>',
          },
        },
        required: ["currencyCode"],
      },
      {
        type: "object",
        properties: {
          query: {
            type: "object",
            properties: {
              quoteCurrencyCode: {
                type: "string",
                description:
                  'The code of the fiat currency from <a href="/reference/getcurrencies">the currencies list</a>',
                examples: ["usd"],
              },
              baseCurrencyAmount: {
                type: "number",
                description:
                  "A positive number representing how much crypto the user wants to sell. Up to 5 decimal digits are supported.",
                examples: [3],
              },
              extraFeePercentage: {
                type: "integer",
                description:
                  'A positive integer representing your extra fee percentage for the transaction. The minimum is <span class="value">0</span> and the maximum is <span class="value">10</span>. If you don\'t provide it, we\'ll use the default value set to your account.',
                examples: [1],
              },
              payoutMethod: {
                type: "string",
                enum: [
                  "ach_bank_transfer",
                  "credit_debit_card",
                  "gbp_bank_transfer",
                  "gbp_open_banking_payment",
                  "pix_instant_payment",
                  "sepa_bank_transfer",
                ],
                description: "The transaction's payment method.",
                examples: ["credit_debit_card"],
              },
            },
            $schema: "http://json-schema.org/draft-04/schema#",
          },
        },
        required: ["query"],
      },
    ],
  },
  response: {
    "200": {
      type: "object",
      properties: {
        quoteCurrencyCode: {
          type: "string",
          description: "Fiat currency the customer wants to get.",
          examples: ["eur"],
        },
        quoteCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["6f424585-8936-4eb1-b01e-443fb306d1f5"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["fiat"],
              description: "Always `fiat`\n\n`fiat`",
              examples: ["fiat"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["Pound Sterling"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["gbp"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum transaction buy amount when using this currency as a base currency.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum transaction buy amount when using this currency as a base currency.",
              examples: [9000],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
          },
        },
        baseCurrencyCode: {
          type: "string",
          description: "Crypto currency the customer wants to sell.",
          examples: ["btc"],
        },
        baseCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["aaefa32f-161b-42c8-8115-debcbf3d6a2d"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["crypto"],
              description: "Always `crypto`\n\n`crypto`",
              examples: ["crypto"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["USD Coin (ERC-20)"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["usdc"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum amount of cryptocurrency you can buy.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum amount of cryptocurrency you can buy.",
              examples: [1000],
            },
            minSellAmount: {
              type: ["number", "null"],
              description: "The minimum amount of cryptocurrency you can sell.",
              examples: [15],
            },
            maxSellAmount: {
              type: ["number", "null"],
              description: "The maximum amount of cryptocurrency you can sell.",
              examples: [100000],
            },
            addressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            testnetAddressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's testnet wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            supportsAddressTag: {
              type: "boolean",
              description: "Whether the currency supports address tags.",
              examples: [false],
            },
            addressTagRegex: {
              type: ["string", "null"],
              description:
                "A regular expression which you can test against a wallet address tag. Defined only if the currency supports address tags.",
            },
            supportsTestMode: {
              type: "boolean",
              description: "Whether the currency supports test mode.",
              examples: [true],
            },
            isSuspended: {
              type: "boolean",
              description:
                "Whether purchases for this currency are suspended. If the currency is suspended, exchange rates may not be available and it is not possible to create a transaction with this currency.",
              examples: [false],
            },
            isSupportedInUs: {
              type: "boolean",
              description:
                "Whether purchases for this currency are supported in the US.",
              examples: [true],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
            notAllowedUSStates: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "AS",
                  "CA",
                  "CO",
                  "CT",
                  "DC",
                  "DE",
                  "FL",
                  "GA",
                  "GU",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "MA",
                  "MD",
                  "ME",
                  "MI",
                  "MN",
                  "MO",
                  "MP",
                  "MS",
                  "MT",
                  "NE",
                  "NH",
                  "NV",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "PR",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "TT",
                  "UT",
                  "VT",
                  "VA",
                  "VI",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ],
                description:
                  "`AL` `AK` `AZ` `AR` `AS` `CA` `CO` `CT` `DC` `DE` `FL` `GA` `GU` `HI` `ID` `IL` `IN` `IA` `KS` `KY` `LA` `MA` `MD` `ME` `MI` `MN` `MO` `MP` `MS` `MT` `NE` `NH` `NV` `NJ` `NM` `NY` `NC` `ND` `OH` `OK` `OR` `PA` `PR` `RI` `SC` `SD` `TN` `TX` `TT` `UT` `VT` `VA` `VI` `WA` `WV` `WI` `WY`",
              },
              description:
                "A list with all the US states for this currency that are not supported.",
              examples: ["LA", "VI"],
            },
            notAllowedCountries: {
              type: "array",
              items: { type: "string" },
              description:
                "A list with all the ISO 3166-1 alpha-2 country codes for this currency that are not supported.",
              examples: ["CA"],
            },
            metadata: {
              type: "object",
              description: "Additional metadata for the currency.",
              properties: {
                contractAddress: {
                  type: ["string", "null"],
                  description:
                    "Unique contract address where the token smart contract is hosted.",
                  examples: [0],
                },
                chainId: {
                  type: ["string", "null"],
                  description:
                    "ID used to identify different EVM compatible chains.",
                  examples: ["1"],
                },
                networkCode: {
                  type: "string",
                  description: "Name of the cryptocurrency",
                  examples: ["ethereum"],
                },
              },
            },
          },
        },
        baseCurrencyAmount: {
          type: "number",
          description:
            "A positive number representing how much the customer wants to sell.",
          examples: [0.575],
        },
        quoteCurrencyAmount: {
          type: "number",
          description:
            "A positive number representing the amount of cryptocurrency the customer will receive.",
          examples: [1521.11],
        },
        baseCurrencyPrice: {
          type: "number",
          description: "The price of the crypto the customer wants to sell",
          examples: [45677.965840087985],
        },
        feeAmount: {
          type: "number",
          description:
            "A positive number representing the fee for the transaction.",
          examples: [15.36],
        },
        extraFeeAmount: {
          type: "number",
          description:
            "A positive number representing your extra fee for the transaction.",
          examples: [0],
        },
        payoutMethod: {
          type: "string",
          description:
            "The transaction's payout method. Possible values are `credit_debit_card`, `ach_bank_transfer`, `sepa_bank_transfer`, and `gbp_bank_transfer` .\n\n`ach_bank_transfer` `credit_debit_card` `gbp_bank_transfer` `sepa_bank_transfer`",
          enum: [
            "ach_bank_transfer",
            "credit_debit_card",
            "gbp_bank_transfer",
            "sepa_bank_transfer",
          ],
          examples: ["credit_debit_card"],
        },
        signature: {
          type: ["string", "null"],
          description: "The signature for executing the quote for fixed flow",
          examples: ["really-long-string"],
        },
        expiresIn: {
          type: ["number", "null"],
          description: "The time in seconds until the quote expires.",
          examples: [1800],
        },
        expiresAt: {
          type: ["string", "null"],
          description:
            "Time at which the quote expires. Returned as an ISO 8601 string.",
          examples: ["2024-02-23T00:58:26.577Z"],
        },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
    "401": {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "A descriptive error message.",
        },
        type: { type: "string", description: "An error type." },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
  },
} as const;
const GetSellTransaction = {
  metadata: {
    allOf: [
      {
        type: "object",
        properties: {
          transactionId: {
            type: "string",
            examples: ["dab3bdf4-e6ea-40a2-ad74-87536f9e8a7d"],
            $schema: "http://json-schema.org/draft-04/schema#",
            description: "A valid Sell transaction ID.",
          },
        },
        required: ["transactionId"],
      },
    ],
  },
  response: {
    "200": {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Unique identifier for the object.",
          examples: ["9020fd02-42ac-497f-8b5f-41fdf4dd0b1d"],
        },
        createdAt: {
          type: "string",
          description:
            "Time at which the object was created. Returned as an ISO 8601 string.",
          examples: ["2024-02-23T00:58:26.577Z"],
        },
        updatedAt: {
          type: "string",
          description:
            "Time at which the object was last updated. Returned as an ISO 8601 string.",
          examples: ["2024-02-23T00:58:26.577Z"],
        },
        baseCurrencyAmount: {
          type: "number",
          description:
            "A positive number representing how much the customer wants to sell.",
          examples: [0.575],
        },
        quoteCurrencyAmount: {
          type: "number",
          description:
            "A positive number representing the amount of cryptocurrency the customer will receive. Set when the purchase of cryptocurrency has been executed.",
          examples: [1521.11],
        },
        feeAmount: {
          type: "number",
          description:
            "A positive number representing the fee for the transaction.",
          examples: [15.36],
        },
        extraFeeAmount: {
          type: "number",
          description:
            "A positive number representing your extra fee for the transaction.",
          examples: [0],
        },
        status: {
          type: "string",
          description:
            "The transaction's status.\n\n`waitingForDeposit` `pending` `failed` `completed`",
          enum: ["waitingForDeposit", "pending", "failed", "completed"],
          examples: ["completed"],
        },
        failureReason: {
          type: ["string", "null"],
          description:
            "The transaction's failure reason. Set when transaction's status is failed.",
        },
        refundWalletAddress: {
          type: "string",
          description:
            "A wallet address at which the customer can receive cryptocurrency. In case we cannot process the sale of the customer's cryptocurrency, we will return the cryptocurrency to this wallet address. Might be empty",
          examples: [""],
        },
        depositHash: {
          type: ["string", "null"],
          description:
            "The cryptocurrency transaction identifier representing the transfer from the customer's wallet to MoonPay's wallet. Set when the deposit has been executed and received.",
          examples: [8.377408903480862e76],
        },
        widgetRedirectUrl: {
          type: ["string", "null"],
          description:
            "An optional URL used in a widget implementation. It is passed to us by you in the query parameters, and we include it as a link on the transaction tracker page.",
        },
        payoutMethod: {
          type: "string",
          description:
            "The transaction's payout method.\n\n`ach_bank_transfer` `credit_debit_card` `gbp_bank_transfer` `sepa_bank_transfer`",
          enum: [
            "ach_bank_transfer",
            "credit_debit_card",
            "gbp_bank_transfer",
            "sepa_bank_transfer",
          ],
          examples: ["credit_debit_card"],
        },
        eurRate: {
          type: "number",
          description:
            "The exchange rate between the transaction's base currency and Euro at the time of the transaction.",
          examples: [1],
        },
        usdRate: {
          type: "number",
          description:
            "The exchange rate between the transaction's base currency and US Dollar at the time of the transaction.",
          examples: [1.08193],
        },
        gbpRate: {
          type: "number",
          description:
            "The exchange rate between the transaction's base currency and British Pound at the time of the transaction.",
          examples: [0.85501],
        },
        quoteCurrencyId: {
          type: "string",
          description: "The identifier of the fiat the customer wants to get.",
          examples: ["71435a8d-211c-4664-a59e-2a5361a6c5a7"],
        },
        quoteCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["6f424585-8936-4eb1-b01e-443fb306d1f5"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["fiat"],
              description: "Always `fiat`\n\n`fiat`",
              examples: ["fiat"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["Pound Sterling"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["gbp"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum transaction buy amount when using this currency as a base currency.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum transaction buy amount when using this currency as a base currency.",
              examples: [9000],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
          },
        },
        baseCurrencyId: {
          type: "string",
          description:
            "The identifier of the crypto currency the customer wants to sell.",
          examples: ["8d305f63-1fd7-4e01-a220-8445e591aec4"],
        },
        baseCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["aaefa32f-161b-42c8-8115-debcbf3d6a2d"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["crypto"],
              description: "Always `crypto`\n\n`crypto`",
              examples: ["crypto"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["USD Coin (ERC-20)"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["usdc"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum amount of cryptocurrency you can buy.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum amount of cryptocurrency you can buy.",
              examples: [1000],
            },
            minSellAmount: {
              type: ["number", "null"],
              description: "The minimum amount of cryptocurrency you can sell.",
              examples: [15],
            },
            maxSellAmount: {
              type: ["number", "null"],
              description: "The maximum amount of cryptocurrency you can sell.",
              examples: [100000],
            },
            addressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            testnetAddressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's testnet wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            supportsAddressTag: {
              type: "boolean",
              description: "Whether the currency supports address tags.",
              examples: [false],
            },
            addressTagRegex: {
              type: ["string", "null"],
              description:
                "A regular expression which you can test against a wallet address tag. Defined only if the currency supports address tags.",
            },
            supportsTestMode: {
              type: "boolean",
              description: "Whether the currency supports test mode.",
              examples: [true],
            },
            isSuspended: {
              type: "boolean",
              description:
                "Whether purchases for this currency are suspended. If the currency is suspended, exchange rates may not be available and it is not possible to create a transaction with this currency.",
              examples: [false],
            },
            isSupportedInUs: {
              type: "boolean",
              description:
                "Whether purchases for this currency are supported in the US.",
              examples: [true],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
            notAllowedUSStates: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "AS",
                  "CA",
                  "CO",
                  "CT",
                  "DC",
                  "DE",
                  "FL",
                  "GA",
                  "GU",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "MA",
                  "MD",
                  "ME",
                  "MI",
                  "MN",
                  "MO",
                  "MP",
                  "MS",
                  "MT",
                  "NE",
                  "NH",
                  "NV",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "PR",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "TT",
                  "UT",
                  "VT",
                  "VA",
                  "VI",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ],
                description:
                  "`AL` `AK` `AZ` `AR` `AS` `CA` `CO` `CT` `DC` `DE` `FL` `GA` `GU` `HI` `ID` `IL` `IN` `IA` `KS` `KY` `LA` `MA` `MD` `ME` `MI` `MN` `MO` `MP` `MS` `MT` `NE` `NH` `NV` `NJ` `NM` `NY` `NC` `ND` `OH` `OK` `OR` `PA` `PR` `RI` `SC` `SD` `TN` `TX` `TT` `UT` `VT` `VA` `VI` `WA` `WV` `WI` `WY`",
              },
              description:
                "A list with all the US states for this currency that are not supported.",
              examples: ["LA", "VI"],
            },
            notAllowedCountries: {
              type: "array",
              items: { type: "string" },
              description:
                "A list with all the ISO 3166-1 alpha-2 country codes for this currency that are not supported.",
              examples: ["CA"],
            },
            metadata: {
              type: "object",
              description: "Additional metadata for the currency.",
              properties: {
                contractAddress: {
                  type: ["string", "null"],
                  description:
                    "Unique contract address where the token smart contract is hosted.",
                  examples: [0],
                },
                chainId: {
                  type: ["string", "null"],
                  description:
                    "ID used to identify different EVM compatible chains.",
                  examples: ["1"],
                },
                networkCode: {
                  type: "string",
                  description: "Name of the cryptocurrency",
                  examples: ["ethereum"],
                },
              },
            },
          },
        },
        customerId: {
          type: "string",
          description:
            "The identifier of the customer the transaction is associated with.",
          examples: ["3b97352d-a9c2-4786-afe7-e7d74e0a8ad7"],
        },
        bankAccountId: {
          type: ["string", "null"],
          description:
            "The identifier of the bank account used for this transaction.",
          examples: ["ee0e649f-a072-4cdb-96ce-a1ea393eac1e"],
        },
        externalCustomerId: {
          type: ["string", "null"],
          description:
            "An identifier associated with the customer, provided by you.",
        },
        externalTransactionId: {
          type: ["string", "null"],
          description:
            "An identifier associated with the transaction, provided by you.",
        },
        stages: {
          type: "array",
          description:
            "An array of four objects, each representing one of the four stages of the purchase process",
          items: {
            type: "object",
            properties: {
              stage: {
                type: "string",
                description:
                  "Stage type\n\n`sell_stage_one_verification` `sell_stage_two_waiting_for_deposit` `sell_stage_three_processing` `sell_stage_four_withdrawal`",
                enum: [
                  "sell_stage_one_verification",
                  "sell_stage_two_waiting_for_deposit",
                  "sell_stage_three_processing",
                  "sell_stage_four_withdrawal",
                ],
                examples: ["sell_stage_one_verification"],
              },
              status: {
                type: "string",
                description:
                  "Stage status.\n\n`not_started` `in_progress` `success` `failed`",
                enum: ["not_started", "in_progress", "success", "failed"],
                examples: ["success"],
              },
              failureReason: {
                type: ["string", "null"],
                description:
                  "Possible values are:\n- `refund`: The crypto sent by the customer has been returned to them.\n- `timeout_deposit`: The customer did not send the crypto to MoonPay within 7 days of the transaction creation date.\n- `timeout_kyc_verification`: The customer's identity check timed out.\n- `cancelled`: The sell transaction has been cancelled by MoonPay.\n- `rejected_kyc`: The customer failed to pass the identity check.\n- `error`: General message for a more specific error.\n",
              },
              actions: {
                type: "array",
                description:
                  "Sometimes, the customer is required to take an action or actions to further the purchase process, usually by submitting information at a provided URL. For each action, we pass an object with a type and a url. If no actions are required, this returns an empty array.",
                items: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                      enum: ["complete_deposit", "retry_kyc"],
                      description: "`complete_deposit` `retry_kyc`",
                    },
                    url: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
    "401": {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "A descriptive error message.",
        },
        type: { type: "string", description: "An error type." },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
  },
} as const;
const GetSellTransactionByExternalId = {
  metadata: {
    allOf: [
      {
        type: "object",
        properties: {
          externalTransactionId: {
            type: "string",
            examples: ["bc976ff6-c89d-4c35-9694-ae183758abf5"],
            $schema: "http://json-schema.org/draft-04/schema#",
            description:
              "An identifier associated with the transaction, provided by you.",
          },
        },
        required: ["externalTransactionId"],
      },
    ],
  },
  response: {
    "200": {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Unique identifier for the object.",
          examples: ["9020fd02-42ac-497f-8b5f-41fdf4dd0b1d"],
        },
        createdAt: {
          type: "string",
          description:
            "Time at which the object was created. Returned as an ISO 8601 string.",
          examples: ["2024-02-23T00:58:26.577Z"],
        },
        updatedAt: {
          type: "string",
          description:
            "Time at which the object was last updated. Returned as an ISO 8601 string.",
          examples: ["2024-02-23T00:58:26.577Z"],
        },
        baseCurrencyAmount: {
          type: "number",
          description:
            "A positive number representing how much the customer wants to sell.",
          examples: [0.575],
        },
        quoteCurrencyAmount: {
          type: "number",
          description:
            "A positive number representing the amount of cryptocurrency the customer will receive. Set when the purchase of cryptocurrency has been executed.",
          examples: [1521.11],
        },
        feeAmount: {
          type: "number",
          description:
            "A positive number representing the fee for the transaction.",
          examples: [15.36],
        },
        extraFeeAmount: {
          type: "number",
          description:
            "A positive number representing your extra fee for the transaction.",
          examples: [0],
        },
        status: {
          type: "string",
          description:
            "The transaction's status.\n\n`waitingForDeposit` `pending` `failed` `completed`",
          enum: ["waitingForDeposit", "pending", "failed", "completed"],
          examples: ["completed"],
        },
        failureReason: {
          type: ["string", "null"],
          description:
            "The transaction's failure reason. Set when transaction's status is failed.",
        },
        refundWalletAddress: {
          type: "string",
          description:
            "A wallet address at which the customer can receive cryptocurrency. In case we cannot process the sale of the customer's cryptocurrency, we will return the cryptocurrency to this wallet address. Might be empty",
          examples: [""],
        },
        depositHash: {
          type: ["string", "null"],
          description:
            "The cryptocurrency transaction identifier representing the transfer from the customer's wallet to MoonPay's wallet. Set when the deposit has been executed and received.",
          examples: [8.377408903480862e76],
        },
        widgetRedirectUrl: {
          type: ["string", "null"],
          description:
            "An optional URL used in a widget implementation. It is passed to us by you in the query parameters, and we include it as a link on the transaction tracker page.",
        },
        payoutMethod: {
          type: "string",
          description:
            "The transaction's payout method.\n\n`ach_bank_transfer` `credit_debit_card` `gbp_bank_transfer` `sepa_bank_transfer`",
          enum: [
            "ach_bank_transfer",
            "credit_debit_card",
            "gbp_bank_transfer",
            "sepa_bank_transfer",
          ],
          examples: ["credit_debit_card"],
        },
        eurRate: {
          type: "number",
          description:
            "The exchange rate between the transaction's base currency and Euro at the time of the transaction.",
          examples: [1],
        },
        usdRate: {
          type: "number",
          description:
            "The exchange rate between the transaction's base currency and US Dollar at the time of the transaction.",
          examples: [1.08193],
        },
        gbpRate: {
          type: "number",
          description:
            "The exchange rate between the transaction's base currency and British Pound at the time of the transaction.",
          examples: [0.85501],
        },
        quoteCurrencyId: {
          type: "string",
          description: "The identifier of the fiat the customer wants to get.",
          examples: ["71435a8d-211c-4664-a59e-2a5361a6c5a7"],
        },
        quoteCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["6f424585-8936-4eb1-b01e-443fb306d1f5"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["fiat"],
              description: "Always `fiat`\n\n`fiat`",
              examples: ["fiat"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["Pound Sterling"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["gbp"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum transaction buy amount when using this currency as a base currency.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum transaction buy amount when using this currency as a base currency.",
              examples: [9000],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
          },
        },
        baseCurrencyId: {
          type: "string",
          description:
            "The identifier of the crypto currency the customer wants to sell.",
          examples: ["8d305f63-1fd7-4e01-a220-8445e591aec4"],
        },
        baseCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["aaefa32f-161b-42c8-8115-debcbf3d6a2d"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["crypto"],
              description: "Always `crypto`\n\n`crypto`",
              examples: ["crypto"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["USD Coin (ERC-20)"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["usdc"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum amount of cryptocurrency you can buy.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum amount of cryptocurrency you can buy.",
              examples: [1000],
            },
            minSellAmount: {
              type: ["number", "null"],
              description: "The minimum amount of cryptocurrency you can sell.",
              examples: [15],
            },
            maxSellAmount: {
              type: ["number", "null"],
              description: "The maximum amount of cryptocurrency you can sell.",
              examples: [100000],
            },
            addressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            testnetAddressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's testnet wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            supportsAddressTag: {
              type: "boolean",
              description: "Whether the currency supports address tags.",
              examples: [false],
            },
            addressTagRegex: {
              type: ["string", "null"],
              description:
                "A regular expression which you can test against a wallet address tag. Defined only if the currency supports address tags.",
            },
            supportsTestMode: {
              type: "boolean",
              description: "Whether the currency supports test mode.",
              examples: [true],
            },
            isSuspended: {
              type: "boolean",
              description:
                "Whether purchases for this currency are suspended. If the currency is suspended, exchange rates may not be available and it is not possible to create a transaction with this currency.",
              examples: [false],
            },
            isSupportedInUs: {
              type: "boolean",
              description:
                "Whether purchases for this currency are supported in the US.",
              examples: [true],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
            notAllowedUSStates: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "AS",
                  "CA",
                  "CO",
                  "CT",
                  "DC",
                  "DE",
                  "FL",
                  "GA",
                  "GU",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "MA",
                  "MD",
                  "ME",
                  "MI",
                  "MN",
                  "MO",
                  "MP",
                  "MS",
                  "MT",
                  "NE",
                  "NH",
                  "NV",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "PR",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "TT",
                  "UT",
                  "VT",
                  "VA",
                  "VI",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ],
                description:
                  "`AL` `AK` `AZ` `AR` `AS` `CA` `CO` `CT` `DC` `DE` `FL` `GA` `GU` `HI` `ID` `IL` `IN` `IA` `KS` `KY` `LA` `MA` `MD` `ME` `MI` `MN` `MO` `MP` `MS` `MT` `NE` `NH` `NV` `NJ` `NM` `NY` `NC` `ND` `OH` `OK` `OR` `PA` `PR` `RI` `SC` `SD` `TN` `TX` `TT` `UT` `VT` `VA` `VI` `WA` `WV` `WI` `WY`",
              },
              description:
                "A list with all the US states for this currency that are not supported.",
              examples: ["LA", "VI"],
            },
            notAllowedCountries: {
              type: "array",
              items: { type: "string" },
              description:
                "A list with all the ISO 3166-1 alpha-2 country codes for this currency that are not supported.",
              examples: ["CA"],
            },
            metadata: {
              type: "object",
              description: "Additional metadata for the currency.",
              properties: {
                contractAddress: {
                  type: ["string", "null"],
                  description:
                    "Unique contract address where the token smart contract is hosted.",
                  examples: [0],
                },
                chainId: {
                  type: ["string", "null"],
                  description:
                    "ID used to identify different EVM compatible chains.",
                  examples: ["1"],
                },
                networkCode: {
                  type: "string",
                  description: "Name of the cryptocurrency",
                  examples: ["ethereum"],
                },
              },
            },
          },
        },
        customerId: {
          type: "string",
          description:
            "The identifier of the customer the transaction is associated with.",
          examples: ["3b97352d-a9c2-4786-afe7-e7d74e0a8ad7"],
        },
        bankAccountId: {
          type: ["string", "null"],
          description:
            "The identifier of the bank account used for this transaction.",
          examples: ["ee0e649f-a072-4cdb-96ce-a1ea393eac1e"],
        },
        externalCustomerId: {
          type: ["string", "null"],
          description:
            "An identifier associated with the customer, provided by you.",
        },
        externalTransactionId: {
          type: ["string", "null"],
          description:
            "An identifier associated with the transaction, provided by you.",
        },
        stages: {
          type: "array",
          description:
            "An array of four objects, each representing one of the four stages of the purchase process",
          items: {
            type: "object",
            properties: {
              stage: {
                type: "string",
                description:
                  "Stage type\n\n`sell_stage_one_verification` `sell_stage_two_waiting_for_deposit` `sell_stage_three_processing` `sell_stage_four_withdrawal`",
                enum: [
                  "sell_stage_one_verification",
                  "sell_stage_two_waiting_for_deposit",
                  "sell_stage_three_processing",
                  "sell_stage_four_withdrawal",
                ],
                examples: ["sell_stage_one_verification"],
              },
              status: {
                type: "string",
                description:
                  "Stage status.\n\n`not_started` `in_progress` `success` `failed`",
                enum: ["not_started", "in_progress", "success", "failed"],
                examples: ["success"],
              },
              failureReason: {
                type: ["string", "null"],
                description:
                  "Possible values are:\n- `refund`: The crypto sent by the customer has been returned to them.\n- `timeout_deposit`: The customer did not send the crypto to MoonPay within 7 days of the transaction creation date.\n- `timeout_kyc_verification`: The customer's identity check timed out.\n- `cancelled`: The sell transaction has been cancelled by MoonPay.\n- `rejected_kyc`: The customer failed to pass the identity check.\n- `error`: General message for a more specific error.\n",
              },
              actions: {
                type: "array",
                description:
                  "Sometimes, the customer is required to take an action or actions to further the purchase process, usually by submitting information at a provided URL. For each action, we pass an object with a type and a url. If no actions are required, this returns an empty array.",
                items: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                      enum: ["complete_deposit", "retry_kyc"],
                      description: "`complete_deposit` `retry_kyc`",
                    },
                    url: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
    "401": {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "A descriptive error message.",
        },
        type: { type: "string", description: "An error type." },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
  },
} as const;
const GetSwapPairs = {
  response: {
    "200": {
      type: "array",
      items: {
        type: "object",
        properties: {
          baseCurrencyCode: {
            type: "string",
            description: "The first cryptocurrency code for the pair.",
            examples: ["eth"],
          },
          baseCurrencyNetworkCode: {
            type: "string",
            description: "The first cryptocurrency network code for this pair.",
            examples: ["ethereum"],
          },
          quoteCurrencyCode: {
            type: "string",
            description: "The second cryptocurrency code for this pair.",
            examples: ["btc"],
          },
          quoteCurrencyNetworkCode: {
            type: "string",
            description:
              "The second cryptocurrency network code for this pair.",
            examples: ["bitcoin"],
          },
          minSwapAmount: {
            type: "string",
            description: "The minimum swapable amount.",
            examples: ["0.0205"],
          },
          maxSwapAmount: {
            type: "string",
            description: "The maximum swapable amount.",
            examples: ["3.4079"],
          },
          minSwapAmountQuote: {
            type: "string",
            description:
              "A positive integer representing the amount of `quoteCurrency` the customer will receive when swapping `minSwapAmount` of `baseCurrency`.",
            examples: ["0.00080"],
          },
          maxSwapAmountQuote: {
            type: "string",
            description:
              "A positive integer representing the amount of `quoteCurrency` the customer will receive when swapping `maxSwapAmount` of `baseCurrency`.",
            examples: ["0.19581"],
          },
          isSuspended: {
            type: "boolean",
            description: "Whether swap for this pair is suspended",
            examples: [false],
          },
          pairName: {
            type: "string",
            description: "The name of the cryptocurrency pair.",
            examples: ["eth-btc"],
          },
        },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
    "401": {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "A descriptive error message.",
        },
        type: { type: "string", description: "An error type." },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
  },
} as const;
const GetSwapQuote = {
  metadata: {
    allOf: [
      {
        type: "object",
        properties: {
          PAIR: {
            type: "string",
            examples: ["eth-usdt"],
            $schema: "http://json-schema.org/draft-04/schema#",
            description:
              'A valid swap pair `pairName` from <a href="/reference/getswappairs">the pairs list</a>',
          },
        },
        required: ["PAIR"],
      },
      {
        type: "object",
        properties: {
          query: {
            type: "object",
            properties: {
              baseCurrencyAmount: {
                type: "number",
                description:
                  "A positive number representing how much crypto the user wants to swap.",
                examples: [200],
              },
            },
            required: ["baseCurrencyAmount"],
            $schema: "http://json-schema.org/draft-04/schema#",
          },
        },
        required: ["query"],
      },
      {
        type: "object",
        properties: {
          authorization: {
            type: "string",
            examples: ["Bearer hello.world.token"],
            $schema: "http://json-schema.org/draft-04/schema#",
            description:
              "A valid customer authentication token in the format 'Bearer [auth token]'.",
          },
        },
        required: [],
      },
    ],
  },
  response: {
    "200": {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Unique identifier for the object.",
          examples: ["9b9d4036-bb99-4cb8-a61e-87d0750722d2"],
        },
        expiresAt: {
          type: "string",
          description:
            "Time at which the quote expires. Returned as an ISO 8601 string.",
          examples: ["2024-02-23T00:58:26.577Z"],
        },
        extraFeeAmount: {
          type: "string",
          description:
            "A positive number string representing your extra fee for the transaction. It is added to baseCurrencyAmount, feeAmount and networkFeeAmount when the swap is executed.",
          examples: ["0.0000005"],
        },
        networkFeeAmount: {
          type: "string",
          description:
            "A positive number string representing the network fee for the transaction. It is added to baseCurrencyAmount, feeAmount and extraFeeAmount when the swap is executed.",
          examples: ["0.00039"],
        },
        extraFeeAmountInUSD: {
          type: "string",
          description:
            "A positive number string representing your extra fee for the transaction, in USD. It is added to baseCurrencyAmount, feeAmount and and networkFeeAmount when the swap is executed.",
          examples: ["0"],
        },
        networkFeeAmountInUSD: {
          type: "string",
          description:
            "A positive number string representing the network fee for the transaction, in USD. It is added to baseCurrencyAmount, feeAmount and extraFeeAmount when the swap is executed.",
          examples: ["20.049237585"],
        },
        baseCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["aaefa32f-161b-42c8-8115-debcbf3d6a2d"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["crypto"],
              description: "Always `crypto`\n\n`crypto`",
              examples: ["crypto"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["USD Coin (ERC-20)"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["usdc"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum amount of cryptocurrency you can buy.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum amount of cryptocurrency you can buy.",
              examples: [1000],
            },
            minSellAmount: {
              type: ["number", "null"],
              description: "The minimum amount of cryptocurrency you can sell.",
              examples: [15],
            },
            maxSellAmount: {
              type: ["number", "null"],
              description: "The maximum amount of cryptocurrency you can sell.",
              examples: [100000],
            },
            addressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            testnetAddressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's testnet wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            supportsAddressTag: {
              type: "boolean",
              description: "Whether the currency supports address tags.",
              examples: [false],
            },
            addressTagRegex: {
              type: ["string", "null"],
              description:
                "A regular expression which you can test against a wallet address tag. Defined only if the currency supports address tags.",
            },
            supportsTestMode: {
              type: "boolean",
              description: "Whether the currency supports test mode.",
              examples: [true],
            },
            isSuspended: {
              type: "boolean",
              description:
                "Whether purchases for this currency are suspended. If the currency is suspended, exchange rates may not be available and it is not possible to create a transaction with this currency.",
              examples: [false],
            },
            isSupportedInUs: {
              type: "boolean",
              description:
                "Whether purchases for this currency are supported in the US.",
              examples: [true],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
            notAllowedUSStates: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "AS",
                  "CA",
                  "CO",
                  "CT",
                  "DC",
                  "DE",
                  "FL",
                  "GA",
                  "GU",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "MA",
                  "MD",
                  "ME",
                  "MI",
                  "MN",
                  "MO",
                  "MP",
                  "MS",
                  "MT",
                  "NE",
                  "NH",
                  "NV",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "PR",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "TT",
                  "UT",
                  "VT",
                  "VA",
                  "VI",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ],
                description:
                  "`AL` `AK` `AZ` `AR` `AS` `CA` `CO` `CT` `DC` `DE` `FL` `GA` `GU` `HI` `ID` `IL` `IN` `IA` `KS` `KY` `LA` `MA` `MD` `ME` `MI` `MN` `MO` `MP` `MS` `MT` `NE` `NH` `NV` `NJ` `NM` `NY` `NC` `ND` `OH` `OK` `OR` `PA` `PR` `RI` `SC` `SD` `TN` `TX` `TT` `UT` `VT` `VA` `VI` `WA` `WV` `WI` `WY`",
              },
              description:
                "A list with all the US states for this currency that are not supported.",
              examples: ["LA", "VI"],
            },
            notAllowedCountries: {
              type: "array",
              items: { type: "string" },
              description:
                "A list with all the ISO 3166-1 alpha-2 country codes for this currency that are not supported.",
              examples: ["CA"],
            },
            metadata: {
              type: "object",
              description: "Additional metadata for the currency.",
              properties: {
                contractAddress: {
                  type: ["string", "null"],
                  description:
                    "Unique contract address where the token smart contract is hosted.",
                  examples: [0],
                },
                chainId: {
                  type: ["string", "null"],
                  description:
                    "ID used to identify different EVM compatible chains.",
                  examples: ["1"],
                },
                networkCode: {
                  type: "string",
                  description: "Name of the cryptocurrency",
                  examples: ["ethereum"],
                },
              },
            },
          },
          description:
            "Details about the cryptocurrency the customer wants to swap.",
        },
        quoteCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["aaefa32f-161b-42c8-8115-debcbf3d6a2d"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["crypto"],
              description: "Always `crypto`\n\n`crypto`",
              examples: ["crypto"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["USD Coin (ERC-20)"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["usdc"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum amount of cryptocurrency you can buy.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum amount of cryptocurrency you can buy.",
              examples: [1000],
            },
            minSellAmount: {
              type: ["number", "null"],
              description: "The minimum amount of cryptocurrency you can sell.",
              examples: [15],
            },
            maxSellAmount: {
              type: ["number", "null"],
              description: "The maximum amount of cryptocurrency you can sell.",
              examples: [100000],
            },
            addressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            testnetAddressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's testnet wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            supportsAddressTag: {
              type: "boolean",
              description: "Whether the currency supports address tags.",
              examples: [false],
            },
            addressTagRegex: {
              type: ["string", "null"],
              description:
                "A regular expression which you can test against a wallet address tag. Defined only if the currency supports address tags.",
            },
            supportsTestMode: {
              type: "boolean",
              description: "Whether the currency supports test mode.",
              examples: [true],
            },
            isSuspended: {
              type: "boolean",
              description:
                "Whether purchases for this currency are suspended. If the currency is suspended, exchange rates may not be available and it is not possible to create a transaction with this currency.",
              examples: [false],
            },
            isSupportedInUs: {
              type: "boolean",
              description:
                "Whether purchases for this currency are supported in the US.",
              examples: [true],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
            notAllowedUSStates: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "AS",
                  "CA",
                  "CO",
                  "CT",
                  "DC",
                  "DE",
                  "FL",
                  "GA",
                  "GU",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "MA",
                  "MD",
                  "ME",
                  "MI",
                  "MN",
                  "MO",
                  "MP",
                  "MS",
                  "MT",
                  "NE",
                  "NH",
                  "NV",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "PR",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "TT",
                  "UT",
                  "VT",
                  "VA",
                  "VI",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ],
                description:
                  "`AL` `AK` `AZ` `AR` `AS` `CA` `CO` `CT` `DC` `DE` `FL` `GA` `GU` `HI` `ID` `IL` `IN` `IA` `KS` `KY` `LA` `MA` `MD` `ME` `MI` `MN` `MO` `MP` `MS` `MT` `NE` `NH` `NV` `NJ` `NM` `NY` `NC` `ND` `OH` `OK` `OR` `PA` `PR` `RI` `SC` `SD` `TN` `TX` `TT` `UT` `VT` `VA` `VI` `WA` `WV` `WI` `WY`",
              },
              description:
                "A list with all the US states for this currency that are not supported.",
              examples: ["LA", "VI"],
            },
            notAllowedCountries: {
              type: "array",
              items: { type: "string" },
              description:
                "A list with all the ISO 3166-1 alpha-2 country codes for this currency that are not supported.",
              examples: ["CA"],
            },
            metadata: {
              type: "object",
              description: "Additional metadata for the currency.",
              properties: {
                contractAddress: {
                  type: ["string", "null"],
                  description:
                    "Unique contract address where the token smart contract is hosted.",
                  examples: [0],
                },
                chainId: {
                  type: ["string", "null"],
                  description:
                    "ID used to identify different EVM compatible chains.",
                  examples: ["1"],
                },
                networkCode: {
                  type: "string",
                  description: "Name of the cryptocurrency",
                  examples: ["ethereum"],
                },
              },
            },
          },
          description:
            "Details about the cryptocurrency the customer will receive.",
        },
        pairName: {
          type: "string",
          description: "The name of the cryptocurrency pair.",
          examples: ["eth-btc"],
        },
        baseCurrencyAmount: {
          type: "string",
          description:
            "A positive string number representing how much crypto the user wants to swap.",
          examples: ["1.123"],
        },
        quoteCurrencyAmount: {
          type: "string",
          description:
            "A positive string number representing the amount of cryptocurrency the customer will receive. Set when the purchase of cryptocurrency has been executed.",
          examples: ["0.0564"],
        },
        feeCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["aaefa32f-161b-42c8-8115-debcbf3d6a2d"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["crypto"],
              description: "Always `crypto`\n\n`crypto`",
              examples: ["crypto"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["USD Coin (ERC-20)"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["usdc"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum amount of cryptocurrency you can buy.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum amount of cryptocurrency you can buy.",
              examples: [1000],
            },
            minSellAmount: {
              type: ["number", "null"],
              description: "The minimum amount of cryptocurrency you can sell.",
              examples: [15],
            },
            maxSellAmount: {
              type: ["number", "null"],
              description: "The maximum amount of cryptocurrency you can sell.",
              examples: [100000],
            },
            addressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            testnetAddressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's testnet wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            supportsAddressTag: {
              type: "boolean",
              description: "Whether the currency supports address tags.",
              examples: [false],
            },
            addressTagRegex: {
              type: ["string", "null"],
              description:
                "A regular expression which you can test against a wallet address tag. Defined only if the currency supports address tags.",
            },
            supportsTestMode: {
              type: "boolean",
              description: "Whether the currency supports test mode.",
              examples: [true],
            },
            isSuspended: {
              type: "boolean",
              description:
                "Whether purchases for this currency are suspended. If the currency is suspended, exchange rates may not be available and it is not possible to create a transaction with this currency.",
              examples: [false],
            },
            isSupportedInUs: {
              type: "boolean",
              description:
                "Whether purchases for this currency are supported in the US.",
              examples: [true],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
            notAllowedUSStates: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "AS",
                  "CA",
                  "CO",
                  "CT",
                  "DC",
                  "DE",
                  "FL",
                  "GA",
                  "GU",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "MA",
                  "MD",
                  "ME",
                  "MI",
                  "MN",
                  "MO",
                  "MP",
                  "MS",
                  "MT",
                  "NE",
                  "NH",
                  "NV",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "PR",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "TT",
                  "UT",
                  "VT",
                  "VA",
                  "VI",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ],
                description:
                  "`AL` `AK` `AZ` `AR` `AS` `CA` `CO` `CT` `DC` `DE` `FL` `GA` `GU` `HI` `ID` `IL` `IN` `IA` `KS` `KY` `LA` `MA` `MD` `ME` `MI` `MN` `MO` `MP` `MS` `MT` `NE` `NH` `NV` `NJ` `NM` `NY` `NC` `ND` `OH` `OK` `OR` `PA` `PR` `RI` `SC` `SD` `TN` `TX` `TT` `UT` `VT` `VA` `VI` `WA` `WV` `WI` `WY`",
              },
              description:
                "A list with all the US states for this currency that are not supported.",
              examples: ["LA", "VI"],
            },
            notAllowedCountries: {
              type: "array",
              items: { type: "string" },
              description:
                "A list with all the ISO 3166-1 alpha-2 country codes for this currency that are not supported.",
              examples: ["CA"],
            },
            metadata: {
              type: "object",
              description: "Additional metadata for the currency.",
              properties: {
                contractAddress: {
                  type: ["string", "null"],
                  description:
                    "Unique contract address where the token smart contract is hosted.",
                  examples: [0],
                },
                chainId: {
                  type: ["string", "null"],
                  description:
                    "ID used to identify different EVM compatible chains.",
                  examples: ["1"],
                },
                networkCode: {
                  type: "string",
                  description: "Name of the cryptocurrency",
                  examples: ["ethereum"],
                },
              },
            },
          },
          description: "Fee currency for this quote",
        },
        baseCurrencyPriceInUsd: {
          type: "string",
          description:
            "The price of the crypto the customer wants to swap, in USD.",
          examples: ["2946.441235"],
        },
        quoteCurrencyPriceInUsd: {
          type: "string",
          description:
            "The price of the crypto the customer will receive, in USD.",
          examples: ["51408.3015"],
        },
        liveMode: {
          type: "boolean",
          description: "Whether live mode is enabled for this quote.",
          examples: [true],
        },
        exchangeRate: {
          type: "string",
          description: "The rate provided by the underlying exchange.",
          examples: ["0.05731450269758475"],
        },
        signature: {
          type: "string",
          description: "The signature for executing the quote",
          examples: ["really-long-string"],
        },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
    "401": {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "A descriptive error message.",
        },
        type: { type: "string", description: "An error type." },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
  },
} as const;
const GetSwapRequote = {
  metadata: {
    allOf: [
      {
        type: "object",
        properties: {
          transactionId: {
            type: "string",
            examples: ["779f7a4a-822b-40a1-a929-6d841af2d5d6"],
            $schema: "http://json-schema.org/draft-04/schema#",
            description: "A valid Swap transaction ID.",
          },
        },
        required: ["transactionId"],
      },
      {
        type: "object",
        properties: {
          authorization: {
            type: "string",
            examples: ["***"],
            $schema: "http://json-schema.org/draft-04/schema#",
            description:
              "A valid customer authentication token in the format 'Bearer [auth token]'.",
          },
        },
        required: ["authorization"],
      },
    ],
  },
  response: {
    "200": {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Unique identifier for the object.",
          examples: ["9b9d4036-bb99-4cb8-a61e-87d0750722d2"],
        },
        expiresAt: {
          type: "string",
          description:
            "Time at which the quote expires. Returned as an ISO 8601 string.",
          examples: ["2024-02-23T00:58:26.577Z"],
        },
        extraFeeAmount: {
          type: "string",
          description:
            "A positive number string representing your extra fee for the transaction. It is added to baseCurrencyAmount, feeAmount and networkFeeAmount when the swap is executed.",
          examples: ["0.0000005"],
        },
        networkFeeAmount: {
          type: "string",
          description:
            "A positive number string representing the network fee for the transaction. It is added to baseCurrencyAmount, feeAmount and extraFeeAmount when the swap is executed.",
          examples: ["0.00039"],
        },
        extraFeeAmountInUSD: {
          type: "string",
          description:
            "A positive number string representing your extra fee for the transaction, in USD. It is added to baseCurrencyAmount, feeAmount and and networkFeeAmount when the swap is executed.",
          examples: ["0"],
        },
        networkFeeAmountInUSD: {
          type: "string",
          description:
            "A positive number string representing the network fee for the transaction, in USD. It is added to baseCurrencyAmount, feeAmount and extraFeeAmount when the swap is executed.",
          examples: ["20.049237585"],
        },
        baseCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["aaefa32f-161b-42c8-8115-debcbf3d6a2d"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["crypto"],
              description: "Always `crypto`\n\n`crypto`",
              examples: ["crypto"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["USD Coin (ERC-20)"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["usdc"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum amount of cryptocurrency you can buy.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum amount of cryptocurrency you can buy.",
              examples: [1000],
            },
            minSellAmount: {
              type: ["number", "null"],
              description: "The minimum amount of cryptocurrency you can sell.",
              examples: [15],
            },
            maxSellAmount: {
              type: ["number", "null"],
              description: "The maximum amount of cryptocurrency you can sell.",
              examples: [100000],
            },
            addressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            testnetAddressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's testnet wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            supportsAddressTag: {
              type: "boolean",
              description: "Whether the currency supports address tags.",
              examples: [false],
            },
            addressTagRegex: {
              type: ["string", "null"],
              description:
                "A regular expression which you can test against a wallet address tag. Defined only if the currency supports address tags.",
            },
            supportsTestMode: {
              type: "boolean",
              description: "Whether the currency supports test mode.",
              examples: [true],
            },
            isSuspended: {
              type: "boolean",
              description:
                "Whether purchases for this currency are suspended. If the currency is suspended, exchange rates may not be available and it is not possible to create a transaction with this currency.",
              examples: [false],
            },
            isSupportedInUs: {
              type: "boolean",
              description:
                "Whether purchases for this currency are supported in the US.",
              examples: [true],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
            notAllowedUSStates: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "AS",
                  "CA",
                  "CO",
                  "CT",
                  "DC",
                  "DE",
                  "FL",
                  "GA",
                  "GU",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "MA",
                  "MD",
                  "ME",
                  "MI",
                  "MN",
                  "MO",
                  "MP",
                  "MS",
                  "MT",
                  "NE",
                  "NH",
                  "NV",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "PR",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "TT",
                  "UT",
                  "VT",
                  "VA",
                  "VI",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ],
                description:
                  "`AL` `AK` `AZ` `AR` `AS` `CA` `CO` `CT` `DC` `DE` `FL` `GA` `GU` `HI` `ID` `IL` `IN` `IA` `KS` `KY` `LA` `MA` `MD` `ME` `MI` `MN` `MO` `MP` `MS` `MT` `NE` `NH` `NV` `NJ` `NM` `NY` `NC` `ND` `OH` `OK` `OR` `PA` `PR` `RI` `SC` `SD` `TN` `TX` `TT` `UT` `VT` `VA` `VI` `WA` `WV` `WI` `WY`",
              },
              description:
                "A list with all the US states for this currency that are not supported.",
              examples: ["LA", "VI"],
            },
            notAllowedCountries: {
              type: "array",
              items: { type: "string" },
              description:
                "A list with all the ISO 3166-1 alpha-2 country codes for this currency that are not supported.",
              examples: ["CA"],
            },
            metadata: {
              type: "object",
              description: "Additional metadata for the currency.",
              properties: {
                contractAddress: {
                  type: ["string", "null"],
                  description:
                    "Unique contract address where the token smart contract is hosted.",
                  examples: [0],
                },
                chainId: {
                  type: ["string", "null"],
                  description:
                    "ID used to identify different EVM compatible chains.",
                  examples: ["1"],
                },
                networkCode: {
                  type: "string",
                  description: "Name of the cryptocurrency",
                  examples: ["ethereum"],
                },
              },
            },
          },
          description:
            "Details about the cryptocurrency the customer wants to swap.",
        },
        quoteCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["aaefa32f-161b-42c8-8115-debcbf3d6a2d"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["crypto"],
              description: "Always `crypto`\n\n`crypto`",
              examples: ["crypto"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["USD Coin (ERC-20)"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["usdc"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum amount of cryptocurrency you can buy.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum amount of cryptocurrency you can buy.",
              examples: [1000],
            },
            minSellAmount: {
              type: ["number", "null"],
              description: "The minimum amount of cryptocurrency you can sell.",
              examples: [15],
            },
            maxSellAmount: {
              type: ["number", "null"],
              description: "The maximum amount of cryptocurrency you can sell.",
              examples: [100000],
            },
            addressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            testnetAddressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's testnet wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            supportsAddressTag: {
              type: "boolean",
              description: "Whether the currency supports address tags.",
              examples: [false],
            },
            addressTagRegex: {
              type: ["string", "null"],
              description:
                "A regular expression which you can test against a wallet address tag. Defined only if the currency supports address tags.",
            },
            supportsTestMode: {
              type: "boolean",
              description: "Whether the currency supports test mode.",
              examples: [true],
            },
            isSuspended: {
              type: "boolean",
              description:
                "Whether purchases for this currency are suspended. If the currency is suspended, exchange rates may not be available and it is not possible to create a transaction with this currency.",
              examples: [false],
            },
            isSupportedInUs: {
              type: "boolean",
              description:
                "Whether purchases for this currency are supported in the US.",
              examples: [true],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
            notAllowedUSStates: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "AS",
                  "CA",
                  "CO",
                  "CT",
                  "DC",
                  "DE",
                  "FL",
                  "GA",
                  "GU",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "MA",
                  "MD",
                  "ME",
                  "MI",
                  "MN",
                  "MO",
                  "MP",
                  "MS",
                  "MT",
                  "NE",
                  "NH",
                  "NV",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "PR",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "TT",
                  "UT",
                  "VT",
                  "VA",
                  "VI",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ],
                description:
                  "`AL` `AK` `AZ` `AR` `AS` `CA` `CO` `CT` `DC` `DE` `FL` `GA` `GU` `HI` `ID` `IL` `IN` `IA` `KS` `KY` `LA` `MA` `MD` `ME` `MI` `MN` `MO` `MP` `MS` `MT` `NE` `NH` `NV` `NJ` `NM` `NY` `NC` `ND` `OH` `OK` `OR` `PA` `PR` `RI` `SC` `SD` `TN` `TX` `TT` `UT` `VT` `VA` `VI` `WA` `WV` `WI` `WY`",
              },
              description:
                "A list with all the US states for this currency that are not supported.",
              examples: ["LA", "VI"],
            },
            notAllowedCountries: {
              type: "array",
              items: { type: "string" },
              description:
                "A list with all the ISO 3166-1 alpha-2 country codes for this currency that are not supported.",
              examples: ["CA"],
            },
            metadata: {
              type: "object",
              description: "Additional metadata for the currency.",
              properties: {
                contractAddress: {
                  type: ["string", "null"],
                  description:
                    "Unique contract address where the token smart contract is hosted.",
                  examples: [0],
                },
                chainId: {
                  type: ["string", "null"],
                  description:
                    "ID used to identify different EVM compatible chains.",
                  examples: ["1"],
                },
                networkCode: {
                  type: "string",
                  description: "Name of the cryptocurrency",
                  examples: ["ethereum"],
                },
              },
            },
          },
          description:
            "Details about the cryptocurrency the customer will receive.",
        },
        pairName: {
          type: "string",
          description: "The name of the cryptocurrency pair.",
          examples: ["eth-btc"],
        },
        baseCurrencyAmount: {
          type: "string",
          description:
            "A positive string number representing how much crypto the user wants to swap.",
          examples: ["1.123"],
        },
        quoteCurrencyAmount: {
          type: "string",
          description:
            "A positive string number representing the amount of cryptocurrency the customer will receive. Set when the purchase of cryptocurrency has been executed.",
          examples: ["0.0564"],
        },
        feeCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["aaefa32f-161b-42c8-8115-debcbf3d6a2d"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["crypto"],
              description: "Always `crypto`\n\n`crypto`",
              examples: ["crypto"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["USD Coin (ERC-20)"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["usdc"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum amount of cryptocurrency you can buy.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum amount of cryptocurrency you can buy.",
              examples: [1000],
            },
            minSellAmount: {
              type: ["number", "null"],
              description: "The minimum amount of cryptocurrency you can sell.",
              examples: [15],
            },
            maxSellAmount: {
              type: ["number", "null"],
              description: "The maximum amount of cryptocurrency you can sell.",
              examples: [100000],
            },
            addressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            testnetAddressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's testnet wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            supportsAddressTag: {
              type: "boolean",
              description: "Whether the currency supports address tags.",
              examples: [false],
            },
            addressTagRegex: {
              type: ["string", "null"],
              description:
                "A regular expression which you can test against a wallet address tag. Defined only if the currency supports address tags.",
            },
            supportsTestMode: {
              type: "boolean",
              description: "Whether the currency supports test mode.",
              examples: [true],
            },
            isSuspended: {
              type: "boolean",
              description:
                "Whether purchases for this currency are suspended. If the currency is suspended, exchange rates may not be available and it is not possible to create a transaction with this currency.",
              examples: [false],
            },
            isSupportedInUs: {
              type: "boolean",
              description:
                "Whether purchases for this currency are supported in the US.",
              examples: [true],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
            notAllowedUSStates: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "AS",
                  "CA",
                  "CO",
                  "CT",
                  "DC",
                  "DE",
                  "FL",
                  "GA",
                  "GU",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "MA",
                  "MD",
                  "ME",
                  "MI",
                  "MN",
                  "MO",
                  "MP",
                  "MS",
                  "MT",
                  "NE",
                  "NH",
                  "NV",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "PR",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "TT",
                  "UT",
                  "VT",
                  "VA",
                  "VI",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ],
                description:
                  "`AL` `AK` `AZ` `AR` `AS` `CA` `CO` `CT` `DC` `DE` `FL` `GA` `GU` `HI` `ID` `IL` `IN` `IA` `KS` `KY` `LA` `MA` `MD` `ME` `MI` `MN` `MO` `MP` `MS` `MT` `NE` `NH` `NV` `NJ` `NM` `NY` `NC` `ND` `OH` `OK` `OR` `PA` `PR` `RI` `SC` `SD` `TN` `TX` `TT` `UT` `VT` `VA` `VI` `WA` `WV` `WI` `WY`",
              },
              description:
                "A list with all the US states for this currency that are not supported.",
              examples: ["LA", "VI"],
            },
            notAllowedCountries: {
              type: "array",
              items: { type: "string" },
              description:
                "A list with all the ISO 3166-1 alpha-2 country codes for this currency that are not supported.",
              examples: ["CA"],
            },
            metadata: {
              type: "object",
              description: "Additional metadata for the currency.",
              properties: {
                contractAddress: {
                  type: ["string", "null"],
                  description:
                    "Unique contract address where the token smart contract is hosted.",
                  examples: [0],
                },
                chainId: {
                  type: ["string", "null"],
                  description:
                    "ID used to identify different EVM compatible chains.",
                  examples: ["1"],
                },
                networkCode: {
                  type: "string",
                  description: "Name of the cryptocurrency",
                  examples: ["ethereum"],
                },
              },
            },
          },
          description: "Fee currency for this quote",
        },
        baseCurrencyPriceInUsd: {
          type: "string",
          description:
            "The price of the crypto the customer wants to swap, in USD.",
          examples: ["2946.441235"],
        },
        quoteCurrencyPriceInUsd: {
          type: "string",
          description:
            "The price of the crypto the customer will receive, in USD.",
          examples: ["51408.3015"],
        },
        liveMode: {
          type: "boolean",
          description: "Whether live mode is enabled for this quote.",
          examples: [true],
        },
        exchangeRate: {
          type: "string",
          description: "The rate provided by the underlying exchange.",
          examples: ["0.05731450269758475"],
        },
        signature: {
          type: "string",
          description: "The signature for executing the quote",
          examples: ["really-long-string"],
        },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
    "401": {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "A descriptive error message.",
        },
        type: { type: "string", description: "An error type." },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
  },
} as const;
const GetSwapTransaction = {
  metadata: {
    allOf: [
      {
        type: "object",
        properties: {
          transactionId: {
            type: "string",
            examples: ["bafaf3a5-24b1-4c2f-8d13-da8739722559"],
            $schema: "http://json-schema.org/draft-04/schema#",
            description: "A valid Swap transaction ID.",
          },
        },
        required: ["transactionId"],
      },
      {
        type: "object",
        properties: {
          authorization: {
            type: "string",
            examples: ["Bearer hello.world.token"],
            $schema: "http://json-schema.org/draft-04/schema#",
            description:
              "A valid customer authentication token in the format 'Bearer [auth token]'.",
          },
        },
        required: ["authorization"],
      },
    ],
  },
  response: {
    "200": {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Unique identifier for the object.",
          examples: ["9020fd02-42ac-497f-8b5f-41fdf4dd0b1d"],
        },
        createdAt: {
          type: "string",
          description:
            "Time at which the object was created. Returned as an ISO 8601 string.",
          examples: ["2024-02-23T00:58:26.577Z"],
        },
        updatedAt: {
          type: "string",
          description:
            "Time at which the object was last updated. Returned as an ISO 8601 string.",
          examples: ["2024-02-23T00:58:26.577Z"],
        },
        baseCurrencyAmount: {
          type: "string",
          description:
            "A positive string number representing how much crypto the user wants to swap.",
          examples: ["1.123"],
        },
        quoteCurrencyAmount: {
          type: "string",
          description:
            "A positive string number representing the amount of cryptocurrency the customer will receive.",
          examples: ["0.0564"],
        },
        feeAmount: {
          type: "string",
          description:
            "A positive number representing the fee for the transaction.",
          examples: ["0.0002"],
        },
        quoteCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["aaefa32f-161b-42c8-8115-debcbf3d6a2d"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["crypto"],
              description: "Always `crypto`\n\n`crypto`",
              examples: ["crypto"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["USD Coin (ERC-20)"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["usdc"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum amount of cryptocurrency you can buy.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum amount of cryptocurrency you can buy.",
              examples: [1000],
            },
            minSellAmount: {
              type: ["number", "null"],
              description: "The minimum amount of cryptocurrency you can sell.",
              examples: [15],
            },
            maxSellAmount: {
              type: ["number", "null"],
              description: "The maximum amount of cryptocurrency you can sell.",
              examples: [100000],
            },
            addressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            testnetAddressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's testnet wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            supportsAddressTag: {
              type: "boolean",
              description: "Whether the currency supports address tags.",
              examples: [false],
            },
            addressTagRegex: {
              type: ["string", "null"],
              description:
                "A regular expression which you can test against a wallet address tag. Defined only if the currency supports address tags.",
            },
            supportsTestMode: {
              type: "boolean",
              description: "Whether the currency supports test mode.",
              examples: [true],
            },
            isSuspended: {
              type: "boolean",
              description:
                "Whether purchases for this currency are suspended. If the currency is suspended, exchange rates may not be available and it is not possible to create a transaction with this currency.",
              examples: [false],
            },
            isSupportedInUs: {
              type: "boolean",
              description:
                "Whether purchases for this currency are supported in the US.",
              examples: [true],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
            notAllowedUSStates: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "AS",
                  "CA",
                  "CO",
                  "CT",
                  "DC",
                  "DE",
                  "FL",
                  "GA",
                  "GU",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "MA",
                  "MD",
                  "ME",
                  "MI",
                  "MN",
                  "MO",
                  "MP",
                  "MS",
                  "MT",
                  "NE",
                  "NH",
                  "NV",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "PR",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "TT",
                  "UT",
                  "VT",
                  "VA",
                  "VI",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ],
                description:
                  "`AL` `AK` `AZ` `AR` `AS` `CA` `CO` `CT` `DC` `DE` `FL` `GA` `GU` `HI` `ID` `IL` `IN` `IA` `KS` `KY` `LA` `MA` `MD` `ME` `MI` `MN` `MO` `MP` `MS` `MT` `NE` `NH` `NV` `NJ` `NM` `NY` `NC` `ND` `OH` `OK` `OR` `PA` `PR` `RI` `SC` `SD` `TN` `TX` `TT` `UT` `VT` `VA` `VI` `WA` `WV` `WI` `WY`",
              },
              description:
                "A list with all the US states for this currency that are not supported.",
              examples: ["LA", "VI"],
            },
            notAllowedCountries: {
              type: "array",
              items: { type: "string" },
              description:
                "A list with all the ISO 3166-1 alpha-2 country codes for this currency that are not supported.",
              examples: ["CA"],
            },
            metadata: {
              type: "object",
              description: "Additional metadata for the currency.",
              properties: {
                contractAddress: {
                  type: ["string", "null"],
                  description:
                    "Unique contract address where the token smart contract is hosted.",
                  examples: [0],
                },
                chainId: {
                  type: ["string", "null"],
                  description:
                    "ID used to identify different EVM compatible chains.",
                  examples: ["1"],
                },
                networkCode: {
                  type: "string",
                  description: "Name of the cryptocurrency",
                  examples: ["ethereum"],
                },
              },
            },
          },
          description: "Crypto the customer wants to get.",
        },
        baseCurrency: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the currency.",
              examples: ["aaefa32f-161b-42c8-8115-debcbf3d6a2d"],
            },
            createdAt: {
              type: "string",
              description:
                "Time at which the object was created. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            updatedAt: {
              type: "string",
              description:
                "Time at which the object was last updated. Returned as an ISO 8601 string.",
              examples: ["2019-05-17T18:24:45.206Z"],
            },
            type: {
              type: "string",
              enum: ["crypto"],
              description: "Always `crypto`\n\n`crypto`",
              examples: ["crypto"],
            },
            name: {
              type: "string",
              description: "The currency's name.",
              examples: ["USD Coin (ERC-20)"],
            },
            code: {
              type: "string",
              description: "The currency's code.",
              examples: ["usdc"],
            },
            precision: {
              type: "number",
              description:
                "The currency's precision (number of digits after decimal point).",
              examples: [2],
            },
            minBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the minimum amount of cryptocurrency you can buy.",
              examples: [30],
            },
            maxBuyAmount: {
              type: ["number", "null"],
              description:
                "Represents the maximum amount of cryptocurrency you can buy.",
              examples: [1000],
            },
            minSellAmount: {
              type: ["number", "null"],
              description: "The minimum amount of cryptocurrency you can sell.",
              examples: [15],
            },
            maxSellAmount: {
              type: ["number", "null"],
              description: "The maximum amount of cryptocurrency you can sell.",
              examples: [100000],
            },
            addressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            testnetAddressRegex: {
              type: "string",
              description:
                "A regular expression which you can test against your end user's testnet wallet addresses.",
              examples: ["^(0x)[0-9A-Fa-f]{40}$"],
            },
            supportsAddressTag: {
              type: "boolean",
              description: "Whether the currency supports address tags.",
              examples: [false],
            },
            addressTagRegex: {
              type: ["string", "null"],
              description:
                "A regular expression which you can test against a wallet address tag. Defined only if the currency supports address tags.",
            },
            supportsTestMode: {
              type: "boolean",
              description: "Whether the currency supports test mode.",
              examples: [true],
            },
            isSuspended: {
              type: "boolean",
              description:
                "Whether purchases for this currency are suspended. If the currency is suspended, exchange rates may not be available and it is not possible to create a transaction with this currency.",
              examples: [false],
            },
            isSupportedInUs: {
              type: "boolean",
              description:
                "Whether purchases for this currency are supported in the US.",
              examples: [true],
            },
            isSellSupported: {
              type: "boolean",
              description: "Whether sales for this currency are supported.",
              examples: [true],
            },
            notAllowedUSStates: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "AS",
                  "CA",
                  "CO",
                  "CT",
                  "DC",
                  "DE",
                  "FL",
                  "GA",
                  "GU",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "MA",
                  "MD",
                  "ME",
                  "MI",
                  "MN",
                  "MO",
                  "MP",
                  "MS",
                  "MT",
                  "NE",
                  "NH",
                  "NV",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "PR",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "TT",
                  "UT",
                  "VT",
                  "VA",
                  "VI",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ],
                description:
                  "`AL` `AK` `AZ` `AR` `AS` `CA` `CO` `CT` `DC` `DE` `FL` `GA` `GU` `HI` `ID` `IL` `IN` `IA` `KS` `KY` `LA` `MA` `MD` `ME` `MI` `MN` `MO` `MP` `MS` `MT` `NE` `NH` `NV` `NJ` `NM` `NY` `NC` `ND` `OH` `OK` `OR` `PA` `PR` `RI` `SC` `SD` `TN` `TX` `TT` `UT` `VT` `VA` `VI` `WA` `WV` `WI` `WY`",
              },
              description:
                "A list with all the US states for this currency that are not supported.",
              examples: ["LA", "VI"],
            },
            notAllowedCountries: {
              type: "array",
              items: { type: "string" },
              description:
                "A list with all the ISO 3166-1 alpha-2 country codes for this currency that are not supported.",
              examples: ["CA"],
            },
            metadata: {
              type: "object",
              description: "Additional metadata for the currency.",
              properties: {
                contractAddress: {
                  type: ["string", "null"],
                  description:
                    "Unique contract address where the token smart contract is hosted.",
                  examples: [0],
                },
                chainId: {
                  type: ["string", "null"],
                  description:
                    "ID used to identify different EVM compatible chains.",
                  examples: ["1"],
                },
                networkCode: {
                  type: "string",
                  description: "Name of the cryptocurrency",
                  examples: ["ethereum"],
                },
              },
            },
          },
          description: "Crypto currency the customer wants to swap.",
        },
        customerId: {
          type: "string",
          description:
            "The identifier of the customer the transaction is associated with.",
          examples: ["3b97352d-a9c2-4786-afe7-e7d74e0a8ad7"],
        },
        extraFeeAmount: {
          type: "string",
          description:
            "A positive number string representing your extra fee for the transaction. It is added to baseCurrencyAmount, feeAmount and networkFeeAmount when the swap is executed.",
          examples: ["0.0000005"],
        },
        networkFeeAmount: {
          type: "string",
          description:
            "A positive number string representing the network fee for the transaction. It is added to baseCurrencyAmount, feeAmount and extraFeeAmount when the swap is executed.",
          examples: ["0.00039"],
        },
        status: {
          type: "string",
          description:
            "The transaction's status.\n\n`completed` `failed` `waitingForDepositAddressGeneration` `waitingForDeposit` `executingSwap` `reQuoteRequired` `screeningWalletAddress` `frozen`",
          enum: [
            "completed",
            "failed",
            "waitingForDepositAddressGeneration",
            "waitingForDeposit",
            "executingSwap",
            "reQuoteRequired",
            "screeningWalletAddress",
            "frozen",
          ],
          examples: ["completed"],
        },
        depositWalletAddress: {
          type: "object",
          properties: {
            address: {
              type: "string",
              description:
                "The cryptocurrency wallet address the customer should send the funds to.",
              examples: [8.97807189246089e47],
            },
            tag: { type: ["string", "null"] },
          },
        },
        destinationWalletAddress: {
          type: "object",
          properties: {
            address: {
              type: "string",
              description:
                "The cryptocurrency wallet address the customer will receive the funds to.",
              examples: [8.97807189246089e47],
            },
            tag: { type: ["string", "null"] },
          },
        },
        refundWalletAddress: {
          type: "object",
          properties: {
            address: {
              type: "string",
              description:
                "The cryptocurrency wallet address the customer will receive the refund to.",
              examples: [8.978070966892851e47],
            },
            tag: { type: ["string", "null"] },
          },
        },
        depositHash: {
          type: ["string", "null"],
          description:
            "The cryptocurrency transaction identifier representing the transfer from the customer's wallet to MoonPay's wallet. Set when the deposit has been executed and received.",
          examples: [8.377408903480862e76],
        },
        transactionHash: {
          type: ["string", "null"],
          description:
            "The cryptocurrency transaction identifier representing the transfer from the MoonPay's wallet to the customer's wallet. Set when the deposit has been executed and sent.",
          examples: [8.377408903480862e76],
        },
        refundTransactionHash: {
          type: ["string", "null"],
          description: "Same for transactionHash but a refund.",
          examples: [8.377408903480862e76],
        },
        blockExplorerLinkForDeposit: {
          type: ["string", "null"],
          description: "URL to the block explorer for the deposit transaction.",
          examples: [
            "https://etherscan.io/tx/0xb936743f2956a108203ac1c3d2f0da90a5b990c896fcaab217c1cedf9ee60247",
          ],
        },
        blockExplorerLinkForTransaction: {
          type: ["string", "null"],
          description: "URL to the block explorer for the swap transaction.",
          examples: [
            "https://etherscan.io/tx/0xb936743f2956a108203ac1c3d2f0da90a5b990c896fcaab217c1cedf9ee60247",
          ],
        },
        failureReason: {
          type: ["string", "null"],
          description:
            "If transaction fails, what is the reason.\n\n`customerLimitsExceeded` `depositAmountIncorrect` `depositAmountOutsideLimits` `walletGenerationFailed` `assetSwapFailed` `invalidQuote` `depositNotFound` `refundAddressNotSet` `invalidDepositAmount` `noDepositWithinTimeframe` `invalidTransaction`",
          enum: [
            "customerLimitsExceeded",
            "depositAmountIncorrect",
            "depositAmountOutsideLimits",
            "walletGenerationFailed",
            "assetSwapFailed",
            "invalidQuote",
            "depositNotFound",
            "refundAddressNotSet",
            "invalidDepositAmount",
            "noDepositWithinTimeframe",
            "invalidTransaction",
          ],
        },
        failureReasonMessage: {
          type: ["string", "null"],
          description: "Human-readable message for the failure reason.",
        },
        integratedSwapDepositInfo: {
          type: ["object", "null"],
          properties: {
            depositInitiatedAt: {
              type: "string",
              description:
                "Time at which the deposit was initiated. Returned as an ISO 8601 string.",
              examples: ["2024-02-23T00:58:26.577Z"],
            },
            depositId: { type: "string" },
          },
        },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
    "401": {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "A descriptive error message.",
        },
        type: { type: "string", description: "An error type." },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
  },
} as const;
const RejectSwapRequote = {
  body: {
    properties: {
      signature: {
        type: "string",
        description:
          'Signature from the <a href="/reference/get_v4-swap-transaction-transactionid-requote">GET requote</a> response.',
        examples: ["***"],
      },
      externalTransactionId: {
        type: "string",
        description:
          "A valid Swap transaction ID from your backend. You can use this to associate your transaction with our transaction.",
        examples: ["dc2ddba2-9e81-45e9-a201-e8b6d69b5ad9"],
      },
      walletAddresses: {
        type: "object",
        properties: {
          refundWalletAddress: {
            type: "string",
            description:
              "The address where we will refund the crypto back to, in case the Swap transaction cannot be completed.",
            examples: [7.55070758245981e47],
          },
          refundWalletAddressTag: {
            type: "string",
            description: "The tag for `refundWalletAddress`",
            examples: ["tag"],
          },
        },
        required: ["refundWalletAddress"],
      },
    },
    required: ["signature", "walletAddresses"],
    type: "object",
    $schema: "http://json-schema.org/draft-04/schema#",
  },
  metadata: {
    allOf: [
      {
        type: "object",
        properties: {
          authorization: {
            type: "string",
            examples: ["***"],
            $schema: "http://json-schema.org/draft-04/schema#",
            description:
              "A valid customer authentication token in the format 'Bearer [auth token]'.",
          },
        },
        required: ["authorization"],
      },
    ],
  },
  response: {
    "200": {
      type: "object",
      properties: {
        success: {
          type: "boolean",
          description: "True if the swap requote was successfully rejected.",
          examples: [true],
        },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
    "401": {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "A descriptive error message.",
        },
        type: { type: "string", description: "An error type." },
      },
      $schema: "http://json-schema.org/draft-04/schema#",
    },
  },
} as const;
export {
  ExecuteSwapQuote,
  GetAccount,
  GetBuyQuote,
  GetBuyTransaction,
  GetBuyTransactionByExternalId,
  GetCountries,
  GetCurrencies,
  GetCurrencyLimits,
  GetIpAddress,
  GetNetworkFees,
  GetSellQuote,
  GetSellTransaction,
  GetSellTransactionByExternalId,
  GetSwapPairs,
  GetSwapQuote,
  GetSwapRequote,
  GetSwapTransaction,
  RejectSwapRequote,
};
