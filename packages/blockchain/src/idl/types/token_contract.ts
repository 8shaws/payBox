export type TokenContract = {
  version: "0.1.0";
  name: "token_contract";
  instructions: [
    {
      name: "mintToken";
      accounts: [
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: true;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
      ];
    },
    {
      name: "transferToken";
      accounts: [
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "from";
          isMut: true;
          isSigner: false;
        },
        {
          name: "to";
          isMut: true;
          isSigner: false;
        },
        {
          name: "fromAuthority";
          isMut: false;
          isSigner: true;
        },
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
      ];
    },
  ];
  metadata: {
    address: "7RjRQh8mzuoZL9KtsE8a5dzciDZRxHkGxnxWMeKhxTk4";
  };
};

export const IDL: TokenContract = {
  version: "0.1.0",
  name: "token_contract",
  instructions: [
    {
      name: "mintToken",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "transferToken",
      accounts: [
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "from",
          isMut: true,
          isSigner: false,
        },
        {
          name: "to",
          isMut: true,
          isSigner: false,
        },
        {
          name: "fromAuthority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
  ],
  metadata: {
    address: "7RjRQh8mzuoZL9KtsE8a5dzciDZRxHkGxnxWMeKhxTk4",
  },
};
