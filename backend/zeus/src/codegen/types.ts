export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  bigint: { input: any; output: any; }
  float8: { input: any; output: any; }
  timestamp: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** accounts in a wallet */
export type Account = {
  __typename?: 'account';
  /** An object relationship */
  bitcoin?: Maybe<Bitcoin>;
  /** An array relationship */
  centralized_txns: Array<Centralized_Txn>;
  /** An aggregate relationship */
  centralized_txns_aggregate: Centralized_Txn_Aggregate;
  /** An object relationship */
  client: Client;
  /** clientId */
  clientId: Scalars['uuid']['output'];
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  eth?: Maybe<Eth>;
  id: Scalars['uuid']['output'];
  img?: Maybe<Scalars['String']['output']>;
  isMain: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  /** An object relationship */
  sol?: Maybe<Sol>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  wallet: Wallet;
  walletId: Scalars['uuid']['output'];
};


/** accounts in a wallet */
export type AccountCentralized_TxnsArgs = {
  distinct_on?: InputMaybe<Array<Centralized_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Centralized_Txn_Order_By>>;
  where?: InputMaybe<Centralized_Txn_Bool_Exp>;
};


/** accounts in a wallet */
export type AccountCentralized_Txns_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Centralized_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Centralized_Txn_Order_By>>;
  where?: InputMaybe<Centralized_Txn_Bool_Exp>;
};

/** aggregated selection of "account" */
export type Account_Aggregate = {
  __typename?: 'account_aggregate';
  aggregate?: Maybe<Account_Aggregate_Fields>;
  nodes: Array<Account>;
};

export type Account_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Account_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Account_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Account_Aggregate_Bool_Exp_Count>;
};

export type Account_Aggregate_Bool_Exp_Bool_And = {
  arguments: Account_Select_Column_Account_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Account_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Account_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Account_Select_Column_Account_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Account_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Account_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Account_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Account_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "account" */
export type Account_Aggregate_Fields = {
  __typename?: 'account_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Account_Max_Fields>;
  min?: Maybe<Account_Min_Fields>;
};


/** aggregate fields of "account" */
export type Account_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "account" */
export type Account_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Account_Max_Order_By>;
  min?: InputMaybe<Account_Min_Order_By>;
};

/** input type for inserting array relation for remote table "account" */
export type Account_Arr_Rel_Insert_Input = {
  data: Array<Account_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Account_On_Conflict>;
};

/** Boolean expression to filter rows from the table "account". All fields are combined with a logical 'AND'. */
export type Account_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Bool_Exp>>;
  _not?: InputMaybe<Account_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Bool_Exp>>;
  bitcoin?: InputMaybe<Bitcoin_Bool_Exp>;
  centralized_txns?: InputMaybe<Centralized_Txn_Bool_Exp>;
  centralized_txns_aggregate?: InputMaybe<Centralized_Txn_Aggregate_Bool_Exp>;
  client?: InputMaybe<Client_Bool_Exp>;
  clientId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  eth?: InputMaybe<Eth_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  img?: InputMaybe<String_Comparison_Exp>;
  isMain?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  sol?: InputMaybe<Sol_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  wallet?: InputMaybe<Wallet_Bool_Exp>;
  walletId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "account" */
export enum Account_Constraint {
  /** unique or primary key constraint on columns "id" */
  AccountPkey = 'account_pkey'
}

/** input type for inserting data into table "account" */
export type Account_Insert_Input = {
  bitcoin?: InputMaybe<Bitcoin_Obj_Rel_Insert_Input>;
  centralized_txns?: InputMaybe<Centralized_Txn_Arr_Rel_Insert_Input>;
  client?: InputMaybe<Client_Obj_Rel_Insert_Input>;
  /** clientId */
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  eth?: InputMaybe<Eth_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  img?: InputMaybe<Scalars['String']['input']>;
  isMain?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sol?: InputMaybe<Sol_Obj_Rel_Insert_Input>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  wallet?: InputMaybe<Wallet_Obj_Rel_Insert_Input>;
  walletId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Account_Max_Fields = {
  __typename?: 'account_max_fields';
  /** clientId */
  clientId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  img?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  walletId?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "account" */
export type Account_Max_Order_By = {
  /** clientId */
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  img?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  walletId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Account_Min_Fields = {
  __typename?: 'account_min_fields';
  /** clientId */
  clientId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  img?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  walletId?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "account" */
export type Account_Min_Order_By = {
  /** clientId */
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  img?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  walletId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "account" */
export type Account_Mutation_Response = {
  __typename?: 'account_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Account>;
};

/** input type for inserting object relation for remote table "account" */
export type Account_Obj_Rel_Insert_Input = {
  data: Account_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Account_On_Conflict>;
};

/** on_conflict condition type for table "account" */
export type Account_On_Conflict = {
  constraint: Account_Constraint;
  update_columns?: Array<Account_Update_Column>;
  where?: InputMaybe<Account_Bool_Exp>;
};

/** Ordering options when selecting data from "account". */
export type Account_Order_By = {
  bitcoin?: InputMaybe<Bitcoin_Order_By>;
  centralized_txns_aggregate?: InputMaybe<Centralized_Txn_Aggregate_Order_By>;
  client?: InputMaybe<Client_Order_By>;
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  eth?: InputMaybe<Eth_Order_By>;
  id?: InputMaybe<Order_By>;
  img?: InputMaybe<Order_By>;
  isMain?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  sol?: InputMaybe<Sol_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  wallet?: InputMaybe<Wallet_Order_By>;
  walletId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: account */
export type Account_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "account" */
export enum Account_Select_Column {
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Img = 'img',
  /** column name */
  IsMain = 'isMain',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  WalletId = 'walletId'
}

/** select "account_aggregate_bool_exp_bool_and_arguments_columns" columns of table "account" */
export enum Account_Select_Column_Account_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsMain = 'isMain'
}

/** select "account_aggregate_bool_exp_bool_or_arguments_columns" columns of table "account" */
export enum Account_Select_Column_Account_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsMain = 'isMain'
}

/** input type for updating data in table "account" */
export type Account_Set_Input = {
  /** clientId */
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  img?: InputMaybe<Scalars['String']['input']>;
  isMain?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  walletId?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "account" */
export type Account_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Stream_Cursor_Value_Input = {
  /** clientId */
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  img?: InputMaybe<Scalars['String']['input']>;
  isMain?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  walletId?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "account" */
export enum Account_Update_Column {
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Img = 'img',
  /** column name */
  IsMain = 'isMain',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  WalletId = 'walletId'
}

export type Account_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Account_Set_Input>;
  /** filter the rows which have to be updated */
  where: Account_Bool_Exp;
};

/** different chain and there address */
export type Address = {
  __typename?: 'address';
  bitcoin?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  client: Client;
  clientId: Scalars['uuid']['output'];
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  eth: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  sol: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  usdc?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "address" */
export type Address_Aggregate = {
  __typename?: 'address_aggregate';
  aggregate?: Maybe<Address_Aggregate_Fields>;
  nodes: Array<Address>;
};

/** aggregate fields of "address" */
export type Address_Aggregate_Fields = {
  __typename?: 'address_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Address_Max_Fields>;
  min?: Maybe<Address_Min_Fields>;
};


/** aggregate fields of "address" */
export type Address_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Address_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** address_book for clients */
export type Address_Book = {
  __typename?: 'address_book';
  chain: Scalars['String']['output'];
  /** An object relationship */
  client: Client;
  clientId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  publicKey: Scalars['String']['output'];
  tag?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['timestamptz']['output'];
};

/** aggregated selection of "address_book" */
export type Address_Book_Aggregate = {
  __typename?: 'address_book_aggregate';
  aggregate?: Maybe<Address_Book_Aggregate_Fields>;
  nodes: Array<Address_Book>;
};

export type Address_Book_Aggregate_Bool_Exp = {
  count?: InputMaybe<Address_Book_Aggregate_Bool_Exp_Count>;
};

export type Address_Book_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Address_Book_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Address_Book_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "address_book" */
export type Address_Book_Aggregate_Fields = {
  __typename?: 'address_book_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Address_Book_Max_Fields>;
  min?: Maybe<Address_Book_Min_Fields>;
};


/** aggregate fields of "address_book" */
export type Address_Book_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Address_Book_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "address_book" */
export type Address_Book_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Address_Book_Max_Order_By>;
  min?: InputMaybe<Address_Book_Min_Order_By>;
};

/** input type for inserting array relation for remote table "address_book" */
export type Address_Book_Arr_Rel_Insert_Input = {
  data: Array<Address_Book_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Address_Book_On_Conflict>;
};

/** Boolean expression to filter rows from the table "address_book". All fields are combined with a logical 'AND'. */
export type Address_Book_Bool_Exp = {
  _and?: InputMaybe<Array<Address_Book_Bool_Exp>>;
  _not?: InputMaybe<Address_Book_Bool_Exp>;
  _or?: InputMaybe<Array<Address_Book_Bool_Exp>>;
  chain?: InputMaybe<String_Comparison_Exp>;
  client?: InputMaybe<Client_Bool_Exp>;
  clientId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  publicKey?: InputMaybe<String_Comparison_Exp>;
  tag?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "address_book" */
export enum Address_Book_Constraint {
  /** unique or primary key constraint on columns "id" */
  AddressBookPkey = 'address_book_pkey'
}

/** input type for inserting data into table "address_book" */
export type Address_Book_Insert_Input = {
  chain?: InputMaybe<Scalars['String']['input']>;
  client?: InputMaybe<Client_Obj_Rel_Insert_Input>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Address_Book_Max_Fields = {
  __typename?: 'address_book_max_fields';
  chain?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  publicKey?: Maybe<Scalars['String']['output']>;
  tag?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "address_book" */
export type Address_Book_Max_Order_By = {
  chain?: InputMaybe<Order_By>;
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  publicKey?: InputMaybe<Order_By>;
  tag?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Address_Book_Min_Fields = {
  __typename?: 'address_book_min_fields';
  chain?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  publicKey?: Maybe<Scalars['String']['output']>;
  tag?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "address_book" */
export type Address_Book_Min_Order_By = {
  chain?: InputMaybe<Order_By>;
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  publicKey?: InputMaybe<Order_By>;
  tag?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "address_book" */
export type Address_Book_Mutation_Response = {
  __typename?: 'address_book_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Address_Book>;
};

/** on_conflict condition type for table "address_book" */
export type Address_Book_On_Conflict = {
  constraint: Address_Book_Constraint;
  update_columns?: Array<Address_Book_Update_Column>;
  where?: InputMaybe<Address_Book_Bool_Exp>;
};

/** Ordering options when selecting data from "address_book". */
export type Address_Book_Order_By = {
  chain?: InputMaybe<Order_By>;
  client?: InputMaybe<Client_Order_By>;
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  publicKey?: InputMaybe<Order_By>;
  tag?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: address_book */
export type Address_Book_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "address_book" */
export enum Address_Book_Select_Column {
  /** column name */
  Chain = 'chain',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  PublicKey = 'publicKey',
  /** column name */
  Tag = 'tag',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "address_book" */
export type Address_Book_Set_Input = {
  chain?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "address_book" */
export type Address_Book_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Address_Book_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Address_Book_Stream_Cursor_Value_Input = {
  chain?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "address_book" */
export enum Address_Book_Update_Column {
  /** column name */
  Chain = 'chain',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  PublicKey = 'publicKey',
  /** column name */
  Tag = 'tag',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Address_Book_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Address_Book_Set_Input>;
  /** filter the rows which have to be updated */
  where: Address_Book_Bool_Exp;
};

/** Boolean expression to filter rows from the table "address". All fields are combined with a logical 'AND'. */
export type Address_Bool_Exp = {
  _and?: InputMaybe<Array<Address_Bool_Exp>>;
  _not?: InputMaybe<Address_Bool_Exp>;
  _or?: InputMaybe<Array<Address_Bool_Exp>>;
  bitcoin?: InputMaybe<String_Comparison_Exp>;
  client?: InputMaybe<Client_Bool_Exp>;
  clientId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  eth?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  sol?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  usdc?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "address" */
export enum Address_Constraint {
  /** unique or primary key constraint on columns "id" */
  AddressIdKey = 'address_id_key',
  /** unique or primary key constraint on columns "id" */
  AddressPkey = 'address_pkey',
  /** unique or primary key constraint on columns "client_id" */
  ChainClientIdKey = 'chain_client_id_key'
}

/** input type for inserting data into table "address" */
export type Address_Insert_Input = {
  bitcoin?: InputMaybe<Scalars['String']['input']>;
  client?: InputMaybe<Client_Obj_Rel_Insert_Input>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  eth?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  sol?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  usdc?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Address_Max_Fields = {
  __typename?: 'address_max_fields';
  bitcoin?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  eth?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  sol?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  usdc?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Address_Min_Fields = {
  __typename?: 'address_min_fields';
  bitcoin?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  eth?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  sol?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  usdc?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "address" */
export type Address_Mutation_Response = {
  __typename?: 'address_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Address>;
};

/** input type for inserting object relation for remote table "address" */
export type Address_Obj_Rel_Insert_Input = {
  data: Address_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Address_On_Conflict>;
};

/** on_conflict condition type for table "address" */
export type Address_On_Conflict = {
  constraint: Address_Constraint;
  update_columns?: Array<Address_Update_Column>;
  where?: InputMaybe<Address_Bool_Exp>;
};

/** Ordering options when selecting data from "address". */
export type Address_Order_By = {
  bitcoin?: InputMaybe<Order_By>;
  client?: InputMaybe<Client_Order_By>;
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  eth?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  sol?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  usdc?: InputMaybe<Order_By>;
};

/** primary key columns input for table: address */
export type Address_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "address" */
export enum Address_Select_Column {
  /** column name */
  Bitcoin = 'bitcoin',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Eth = 'eth',
  /** column name */
  Id = 'id',
  /** column name */
  Sol = 'sol',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Usdc = 'usdc'
}

/** input type for updating data in table "address" */
export type Address_Set_Input = {
  bitcoin?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  eth?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  sol?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  usdc?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "address" */
export type Address_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Address_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Address_Stream_Cursor_Value_Input = {
  bitcoin?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  eth?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  sol?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  usdc?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "address" */
export enum Address_Update_Column {
  /** column name */
  Bitcoin = 'bitcoin',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Eth = 'eth',
  /** column name */
  Id = 'id',
  /** column name */
  Sol = 'sol',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Usdc = 'usdc'
}

export type Address_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Address_Set_Input>;
  /** filter the rows which have to be updated */
  where: Address_Bool_Exp;
};

/** table containing info related to wallet  */
export type Analyze = {
  __typename?: 'analyze';
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  wallet: Wallet;
  walletId: Scalars['uuid']['output'];
};

/** aggregated selection of "analyze" */
export type Analyze_Aggregate = {
  __typename?: 'analyze_aggregate';
  aggregate?: Maybe<Analyze_Aggregate_Fields>;
  nodes: Array<Analyze>;
};

/** aggregate fields of "analyze" */
export type Analyze_Aggregate_Fields = {
  __typename?: 'analyze_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Analyze_Max_Fields>;
  min?: Maybe<Analyze_Min_Fields>;
};


/** aggregate fields of "analyze" */
export type Analyze_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Analyze_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "analyze". All fields are combined with a logical 'AND'. */
export type Analyze_Bool_Exp = {
  _and?: InputMaybe<Array<Analyze_Bool_Exp>>;
  _not?: InputMaybe<Analyze_Bool_Exp>;
  _or?: InputMaybe<Array<Analyze_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  wallet?: InputMaybe<Wallet_Bool_Exp>;
  walletId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "analyze" */
export enum Analyze_Constraint {
  /** unique or primary key constraint on columns "id" */
  AnalyzeIdKey = 'analyze_id_key',
  /** unique or primary key constraint on columns "id", "walletId" */
  AnalyzePkey = 'analyze_pkey',
  /** unique or primary key constraint on columns "walletId" */
  AnalyzeWalletIdKey = 'analyze_walletId_key'
}

/** input type for inserting data into table "analyze" */
export type Analyze_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  wallet?: InputMaybe<Wallet_Obj_Rel_Insert_Input>;
  walletId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Analyze_Max_Fields = {
  __typename?: 'analyze_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  walletId?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Analyze_Min_Fields = {
  __typename?: 'analyze_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  walletId?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "analyze" */
export type Analyze_Mutation_Response = {
  __typename?: 'analyze_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Analyze>;
};

/** input type for inserting object relation for remote table "analyze" */
export type Analyze_Obj_Rel_Insert_Input = {
  data: Analyze_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Analyze_On_Conflict>;
};

/** on_conflict condition type for table "analyze" */
export type Analyze_On_Conflict = {
  constraint: Analyze_Constraint;
  update_columns?: Array<Analyze_Update_Column>;
  where?: InputMaybe<Analyze_Bool_Exp>;
};

/** Ordering options when selecting data from "analyze". */
export type Analyze_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  wallet?: InputMaybe<Wallet_Order_By>;
  walletId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: analyze */
export type Analyze_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
  walletId: Scalars['uuid']['input'];
};

/** select columns of table "analyze" */
export enum Analyze_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WalletId = 'walletId'
}

/** input type for updating data in table "analyze" */
export type Analyze_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  walletId?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "analyze" */
export type Analyze_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Analyze_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Analyze_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  walletId?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "analyze" */
export enum Analyze_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WalletId = 'walletId'
}

export type Analyze_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Analyze_Set_Input>;
  /** filter the rows which have to be updated */
  where: Analyze_Bool_Exp;
};

/** associated token account */
export type Ata = {
  __typename?: 'ata';
  /** An object relationship */
  client: Client;
  clientId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  isMinter: Scalars['Boolean']['output'];
  owner: Scalars['String']['output'];
  pubKey: Scalars['String']['output'];
  token: Scalars['String']['output'];
  /** An object relationship */
  tokenByToken: Token;
  /** An array relationship */
  tokenTxnsByToata: Array<Token_Txn>;
  /** An aggregate relationship */
  tokenTxnsByToata_aggregate: Token_Txn_Aggregate;
  /** An array relationship */
  token_txns: Array<Token_Txn>;
  /** An aggregate relationship */
  token_txns_aggregate: Token_Txn_Aggregate;
  updatedAt: Scalars['timestamptz']['output'];
};


/** associated token account */
export type AtaTokenTxnsByToataArgs = {
  distinct_on?: InputMaybe<Array<Token_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Txn_Order_By>>;
  where?: InputMaybe<Token_Txn_Bool_Exp>;
};


/** associated token account */
export type AtaTokenTxnsByToata_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Txn_Order_By>>;
  where?: InputMaybe<Token_Txn_Bool_Exp>;
};


/** associated token account */
export type AtaToken_TxnsArgs = {
  distinct_on?: InputMaybe<Array<Token_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Txn_Order_By>>;
  where?: InputMaybe<Token_Txn_Bool_Exp>;
};


/** associated token account */
export type AtaToken_Txns_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Txn_Order_By>>;
  where?: InputMaybe<Token_Txn_Bool_Exp>;
};

/** aggregated selection of "ata" */
export type Ata_Aggregate = {
  __typename?: 'ata_aggregate';
  aggregate?: Maybe<Ata_Aggregate_Fields>;
  nodes: Array<Ata>;
};

export type Ata_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Ata_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Ata_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Ata_Aggregate_Bool_Exp_Count>;
};

export type Ata_Aggregate_Bool_Exp_Bool_And = {
  arguments: Ata_Select_Column_Ata_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Ata_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Ata_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Ata_Select_Column_Ata_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Ata_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Ata_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Ata_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Ata_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "ata" */
export type Ata_Aggregate_Fields = {
  __typename?: 'ata_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Ata_Max_Fields>;
  min?: Maybe<Ata_Min_Fields>;
};


/** aggregate fields of "ata" */
export type Ata_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Ata_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "ata" */
export type Ata_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Ata_Max_Order_By>;
  min?: InputMaybe<Ata_Min_Order_By>;
};

/** input type for inserting array relation for remote table "ata" */
export type Ata_Arr_Rel_Insert_Input = {
  data: Array<Ata_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Ata_On_Conflict>;
};

/** Boolean expression to filter rows from the table "ata". All fields are combined with a logical 'AND'. */
export type Ata_Bool_Exp = {
  _and?: InputMaybe<Array<Ata_Bool_Exp>>;
  _not?: InputMaybe<Ata_Bool_Exp>;
  _or?: InputMaybe<Array<Ata_Bool_Exp>>;
  client?: InputMaybe<Client_Bool_Exp>;
  clientId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isMinter?: InputMaybe<Boolean_Comparison_Exp>;
  owner?: InputMaybe<String_Comparison_Exp>;
  pubKey?: InputMaybe<String_Comparison_Exp>;
  token?: InputMaybe<String_Comparison_Exp>;
  tokenByToken?: InputMaybe<Token_Bool_Exp>;
  tokenTxnsByToata?: InputMaybe<Token_Txn_Bool_Exp>;
  tokenTxnsByToata_aggregate?: InputMaybe<Token_Txn_Aggregate_Bool_Exp>;
  token_txns?: InputMaybe<Token_Txn_Bool_Exp>;
  token_txns_aggregate?: InputMaybe<Token_Txn_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "ata" */
export enum Ata_Constraint {
  /** unique or primary key constraint on columns "id" */
  AtaPkey = 'ata_pkey',
  /** unique or primary key constraint on columns "pubKey" */
  AtaPubKeyKey = 'ata_pubKey_key'
}

/** input type for inserting data into table "ata" */
export type Ata_Insert_Input = {
  client?: InputMaybe<Client_Obj_Rel_Insert_Input>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  isMinter?: InputMaybe<Scalars['Boolean']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  pubKey?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  tokenByToken?: InputMaybe<Token_Obj_Rel_Insert_Input>;
  tokenTxnsByToata?: InputMaybe<Token_Txn_Arr_Rel_Insert_Input>;
  token_txns?: InputMaybe<Token_Txn_Arr_Rel_Insert_Input>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Ata_Max_Fields = {
  __typename?: 'ata_max_fields';
  clientId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  owner?: Maybe<Scalars['String']['output']>;
  pubKey?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "ata" */
export type Ata_Max_Order_By = {
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  pubKey?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Ata_Min_Fields = {
  __typename?: 'ata_min_fields';
  clientId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  owner?: Maybe<Scalars['String']['output']>;
  pubKey?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "ata" */
export type Ata_Min_Order_By = {
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  pubKey?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "ata" */
export type Ata_Mutation_Response = {
  __typename?: 'ata_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Ata>;
};

/** input type for inserting object relation for remote table "ata" */
export type Ata_Obj_Rel_Insert_Input = {
  data: Ata_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Ata_On_Conflict>;
};

/** on_conflict condition type for table "ata" */
export type Ata_On_Conflict = {
  constraint: Ata_Constraint;
  update_columns?: Array<Ata_Update_Column>;
  where?: InputMaybe<Ata_Bool_Exp>;
};

/** Ordering options when selecting data from "ata". */
export type Ata_Order_By = {
  client?: InputMaybe<Client_Order_By>;
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isMinter?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  pubKey?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  tokenByToken?: InputMaybe<Token_Order_By>;
  tokenTxnsByToata_aggregate?: InputMaybe<Token_Txn_Aggregate_Order_By>;
  token_txns_aggregate?: InputMaybe<Token_Txn_Aggregate_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: ata */
export type Ata_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "ata" */
export enum Ata_Select_Column {
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  IsMinter = 'isMinter',
  /** column name */
  Owner = 'owner',
  /** column name */
  PubKey = 'pubKey',
  /** column name */
  Token = 'token',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** select "ata_aggregate_bool_exp_bool_and_arguments_columns" columns of table "ata" */
export enum Ata_Select_Column_Ata_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsMinter = 'isMinter'
}

/** select "ata_aggregate_bool_exp_bool_or_arguments_columns" columns of table "ata" */
export enum Ata_Select_Column_Ata_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsMinter = 'isMinter'
}

/** input type for updating data in table "ata" */
export type Ata_Set_Input = {
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  isMinter?: InputMaybe<Scalars['Boolean']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  pubKey?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "ata" */
export type Ata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Ata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Ata_Stream_Cursor_Value_Input = {
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  isMinter?: InputMaybe<Scalars['Boolean']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  pubKey?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "ata" */
export enum Ata_Update_Column {
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  IsMinter = 'isMinter',
  /** column name */
  Owner = 'owner',
  /** column name */
  PubKey = 'pubKey',
  /** column name */
  Token = 'token',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Ata_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Ata_Set_Input>;
  /** filter the rows which have to be updated */
  where: Ata_Bool_Exp;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** bticoin address for client wallets */
export type Bitcoin = {
  __typename?: 'bitcoin';
  /** An object relationship */
  account: Account;
  accountId: Scalars['uuid']['output'];
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  privateKey: Scalars['String']['output'];
  publicKey: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregated selection of "bitcoin" */
export type Bitcoin_Aggregate = {
  __typename?: 'bitcoin_aggregate';
  aggregate?: Maybe<Bitcoin_Aggregate_Fields>;
  nodes: Array<Bitcoin>;
};

/** aggregate fields of "bitcoin" */
export type Bitcoin_Aggregate_Fields = {
  __typename?: 'bitcoin_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Bitcoin_Max_Fields>;
  min?: Maybe<Bitcoin_Min_Fields>;
};


/** aggregate fields of "bitcoin" */
export type Bitcoin_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Bitcoin_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "bitcoin". All fields are combined with a logical 'AND'. */
export type Bitcoin_Bool_Exp = {
  _and?: InputMaybe<Array<Bitcoin_Bool_Exp>>;
  _not?: InputMaybe<Bitcoin_Bool_Exp>;
  _or?: InputMaybe<Array<Bitcoin_Bool_Exp>>;
  account?: InputMaybe<Account_Bool_Exp>;
  accountId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  privateKey?: InputMaybe<String_Comparison_Exp>;
  publicKey?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "bitcoin" */
export enum Bitcoin_Constraint {
  /** unique or primary key constraint on columns "id" */
  BitcoinIdKey = 'bitcoin_id_key',
  /** unique or primary key constraint on columns "publicKey", "id", "accountId" */
  BitcoinPkey = 'bitcoin_pkey',
  /** unique or primary key constraint on columns "privateKey" */
  BitcoinPrivateKeyKey = 'bitcoin_privateKey_key',
  /** unique or primary key constraint on columns "publicKey" */
  BitcoinPublicKeyKey = 'bitcoin_publicKey_key',
  /** unique or primary key constraint on columns "accountId" */
  BitcoinWalletIdKey = 'bitcoin_walletId_key'
}

/** input type for inserting data into table "bitcoin" */
export type Bitcoin_Insert_Input = {
  account?: InputMaybe<Account_Obj_Rel_Insert_Input>;
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  privateKey?: InputMaybe<Scalars['String']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Bitcoin_Max_Fields = {
  __typename?: 'bitcoin_max_fields';
  accountId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  privateKey?: Maybe<Scalars['String']['output']>;
  publicKey?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Bitcoin_Min_Fields = {
  __typename?: 'bitcoin_min_fields';
  accountId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  privateKey?: Maybe<Scalars['String']['output']>;
  publicKey?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "bitcoin" */
export type Bitcoin_Mutation_Response = {
  __typename?: 'bitcoin_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Bitcoin>;
};

/** input type for inserting object relation for remote table "bitcoin" */
export type Bitcoin_Obj_Rel_Insert_Input = {
  data: Bitcoin_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Bitcoin_On_Conflict>;
};

/** on_conflict condition type for table "bitcoin" */
export type Bitcoin_On_Conflict = {
  constraint: Bitcoin_Constraint;
  update_columns?: Array<Bitcoin_Update_Column>;
  where?: InputMaybe<Bitcoin_Bool_Exp>;
};

/** Ordering options when selecting data from "bitcoin". */
export type Bitcoin_Order_By = {
  account?: InputMaybe<Account_Order_By>;
  accountId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  privateKey?: InputMaybe<Order_By>;
  publicKey?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: bitcoin */
export type Bitcoin_Pk_Columns_Input = {
  accountId: Scalars['uuid']['input'];
  id: Scalars['uuid']['input'];
  publicKey: Scalars['String']['input'];
};

/** select columns of table "bitcoin" */
export enum Bitcoin_Select_Column {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  PrivateKey = 'privateKey',
  /** column name */
  PublicKey = 'publicKey',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "bitcoin" */
export type Bitcoin_Set_Input = {
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  privateKey?: InputMaybe<Scalars['String']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "bitcoin" */
export type Bitcoin_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Bitcoin_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Bitcoin_Stream_Cursor_Value_Input = {
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  privateKey?: InputMaybe<Scalars['String']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "bitcoin" */
export enum Bitcoin_Update_Column {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  PrivateKey = 'privateKey',
  /** column name */
  PublicKey = 'publicKey',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Bitcoin_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Bitcoin_Set_Input>;
  /** filter the rows which have to be updated */
  where: Bitcoin_Bool_Exp;
};

/** list off all the centralized transactions */
export type Centralized_Txn = {
  __typename?: 'centralized_txn';
  /** An object relationship */
  account: Account;
  accountId: Scalars['uuid']['output'];
  baseCurrency: Scalars['String']['output'];
  baseCurrencyAmount: Scalars['float8']['output'];
  /** An object relationship */
  client: Client;
  clientId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  cryptoTransactionId: Scalars['String']['output'];
  failedReason?: Maybe<Scalars['String']['output']>;
  feeAmount: Scalars['float8']['output'];
  id: Scalars['uuid']['output'];
  paymentMethod?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  providerTxnId: Scalars['uuid']['output'];
  quoteCurrency: Scalars['String']['output'];
  quoteCurrencyAmount: Scalars['float8']['output'];
  signature?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['timestamptz']['output'];
  walletAddress: Scalars['String']['output'];
};

/** aggregated selection of "centralized_txn" */
export type Centralized_Txn_Aggregate = {
  __typename?: 'centralized_txn_aggregate';
  aggregate?: Maybe<Centralized_Txn_Aggregate_Fields>;
  nodes: Array<Centralized_Txn>;
};

export type Centralized_Txn_Aggregate_Bool_Exp = {
  avg?: InputMaybe<Centralized_Txn_Aggregate_Bool_Exp_Avg>;
  corr?: InputMaybe<Centralized_Txn_Aggregate_Bool_Exp_Corr>;
  count?: InputMaybe<Centralized_Txn_Aggregate_Bool_Exp_Count>;
  covar_samp?: InputMaybe<Centralized_Txn_Aggregate_Bool_Exp_Covar_Samp>;
  max?: InputMaybe<Centralized_Txn_Aggregate_Bool_Exp_Max>;
  min?: InputMaybe<Centralized_Txn_Aggregate_Bool_Exp_Min>;
  stddev_samp?: InputMaybe<Centralized_Txn_Aggregate_Bool_Exp_Stddev_Samp>;
  sum?: InputMaybe<Centralized_Txn_Aggregate_Bool_Exp_Sum>;
  var_samp?: InputMaybe<Centralized_Txn_Aggregate_Bool_Exp_Var_Samp>;
};

export type Centralized_Txn_Aggregate_Bool_Exp_Avg = {
  arguments: Centralized_Txn_Select_Column_Centralized_Txn_Aggregate_Bool_Exp_Avg_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Centralized_Txn_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Centralized_Txn_Aggregate_Bool_Exp_Corr = {
  arguments: Centralized_Txn_Aggregate_Bool_Exp_Corr_Arguments;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Centralized_Txn_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Centralized_Txn_Aggregate_Bool_Exp_Corr_Arguments = {
  X: Centralized_Txn_Select_Column_Centralized_Txn_Aggregate_Bool_Exp_Corr_Arguments_Columns;
  Y: Centralized_Txn_Select_Column_Centralized_Txn_Aggregate_Bool_Exp_Corr_Arguments_Columns;
};

export type Centralized_Txn_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Centralized_Txn_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Centralized_Txn_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

export type Centralized_Txn_Aggregate_Bool_Exp_Covar_Samp = {
  arguments: Centralized_Txn_Aggregate_Bool_Exp_Covar_Samp_Arguments;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Centralized_Txn_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Centralized_Txn_Aggregate_Bool_Exp_Covar_Samp_Arguments = {
  X: Centralized_Txn_Select_Column_Centralized_Txn_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
  Y: Centralized_Txn_Select_Column_Centralized_Txn_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
};

export type Centralized_Txn_Aggregate_Bool_Exp_Max = {
  arguments: Centralized_Txn_Select_Column_Centralized_Txn_Aggregate_Bool_Exp_Max_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Centralized_Txn_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Centralized_Txn_Aggregate_Bool_Exp_Min = {
  arguments: Centralized_Txn_Select_Column_Centralized_Txn_Aggregate_Bool_Exp_Min_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Centralized_Txn_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Centralized_Txn_Aggregate_Bool_Exp_Stddev_Samp = {
  arguments: Centralized_Txn_Select_Column_Centralized_Txn_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Centralized_Txn_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Centralized_Txn_Aggregate_Bool_Exp_Sum = {
  arguments: Centralized_Txn_Select_Column_Centralized_Txn_Aggregate_Bool_Exp_Sum_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Centralized_Txn_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Centralized_Txn_Aggregate_Bool_Exp_Var_Samp = {
  arguments: Centralized_Txn_Select_Column_Centralized_Txn_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Centralized_Txn_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

/** aggregate fields of "centralized_txn" */
export type Centralized_Txn_Aggregate_Fields = {
  __typename?: 'centralized_txn_aggregate_fields';
  avg?: Maybe<Centralized_Txn_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Centralized_Txn_Max_Fields>;
  min?: Maybe<Centralized_Txn_Min_Fields>;
  stddev?: Maybe<Centralized_Txn_Stddev_Fields>;
  stddev_pop?: Maybe<Centralized_Txn_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Centralized_Txn_Stddev_Samp_Fields>;
  sum?: Maybe<Centralized_Txn_Sum_Fields>;
  var_pop?: Maybe<Centralized_Txn_Var_Pop_Fields>;
  var_samp?: Maybe<Centralized_Txn_Var_Samp_Fields>;
  variance?: Maybe<Centralized_Txn_Variance_Fields>;
};


/** aggregate fields of "centralized_txn" */
export type Centralized_Txn_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Centralized_Txn_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "centralized_txn" */
export type Centralized_Txn_Aggregate_Order_By = {
  avg?: InputMaybe<Centralized_Txn_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Centralized_Txn_Max_Order_By>;
  min?: InputMaybe<Centralized_Txn_Min_Order_By>;
  stddev?: InputMaybe<Centralized_Txn_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Centralized_Txn_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Centralized_Txn_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Centralized_Txn_Sum_Order_By>;
  var_pop?: InputMaybe<Centralized_Txn_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Centralized_Txn_Var_Samp_Order_By>;
  variance?: InputMaybe<Centralized_Txn_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "centralized_txn" */
export type Centralized_Txn_Arr_Rel_Insert_Input = {
  data: Array<Centralized_Txn_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Centralized_Txn_On_Conflict>;
};

/** aggregate avg on columns */
export type Centralized_Txn_Avg_Fields = {
  __typename?: 'centralized_txn_avg_fields';
  baseCurrencyAmount?: Maybe<Scalars['Float']['output']>;
  feeAmount?: Maybe<Scalars['Float']['output']>;
  quoteCurrencyAmount?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "centralized_txn" */
export type Centralized_Txn_Avg_Order_By = {
  baseCurrencyAmount?: InputMaybe<Order_By>;
  feeAmount?: InputMaybe<Order_By>;
  quoteCurrencyAmount?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "centralized_txn". All fields are combined with a logical 'AND'. */
export type Centralized_Txn_Bool_Exp = {
  _and?: InputMaybe<Array<Centralized_Txn_Bool_Exp>>;
  _not?: InputMaybe<Centralized_Txn_Bool_Exp>;
  _or?: InputMaybe<Array<Centralized_Txn_Bool_Exp>>;
  account?: InputMaybe<Account_Bool_Exp>;
  accountId?: InputMaybe<Uuid_Comparison_Exp>;
  baseCurrency?: InputMaybe<String_Comparison_Exp>;
  baseCurrencyAmount?: InputMaybe<Float8_Comparison_Exp>;
  client?: InputMaybe<Client_Bool_Exp>;
  clientId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  cryptoTransactionId?: InputMaybe<String_Comparison_Exp>;
  failedReason?: InputMaybe<String_Comparison_Exp>;
  feeAmount?: InputMaybe<Float8_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  paymentMethod?: InputMaybe<String_Comparison_Exp>;
  provider?: InputMaybe<String_Comparison_Exp>;
  providerTxnId?: InputMaybe<Uuid_Comparison_Exp>;
  quoteCurrency?: InputMaybe<String_Comparison_Exp>;
  quoteCurrencyAmount?: InputMaybe<Float8_Comparison_Exp>;
  signature?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  walletAddress?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "centralized_txn" */
export enum Centralized_Txn_Constraint {
  /** unique or primary key constraint on columns "id" */
  CentralizedTxnPkey = 'centralized_txn_pkey'
}

/** input type for incrementing numeric columns in table "centralized_txn" */
export type Centralized_Txn_Inc_Input = {
  baseCurrencyAmount?: InputMaybe<Scalars['float8']['input']>;
  feeAmount?: InputMaybe<Scalars['float8']['input']>;
  quoteCurrencyAmount?: InputMaybe<Scalars['float8']['input']>;
};

/** input type for inserting data into table "centralized_txn" */
export type Centralized_Txn_Insert_Input = {
  account?: InputMaybe<Account_Obj_Rel_Insert_Input>;
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  baseCurrency?: InputMaybe<Scalars['String']['input']>;
  baseCurrencyAmount?: InputMaybe<Scalars['float8']['input']>;
  client?: InputMaybe<Client_Obj_Rel_Insert_Input>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  cryptoTransactionId?: InputMaybe<Scalars['String']['input']>;
  failedReason?: InputMaybe<Scalars['String']['input']>;
  feeAmount?: InputMaybe<Scalars['float8']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  providerTxnId?: InputMaybe<Scalars['uuid']['input']>;
  quoteCurrency?: InputMaybe<Scalars['String']['input']>;
  quoteCurrencyAmount?: InputMaybe<Scalars['float8']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Centralized_Txn_Max_Fields = {
  __typename?: 'centralized_txn_max_fields';
  accountId?: Maybe<Scalars['uuid']['output']>;
  baseCurrency?: Maybe<Scalars['String']['output']>;
  baseCurrencyAmount?: Maybe<Scalars['float8']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  cryptoTransactionId?: Maybe<Scalars['String']['output']>;
  failedReason?: Maybe<Scalars['String']['output']>;
  feeAmount?: Maybe<Scalars['float8']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  paymentMethod?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  providerTxnId?: Maybe<Scalars['uuid']['output']>;
  quoteCurrency?: Maybe<Scalars['String']['output']>;
  quoteCurrencyAmount?: Maybe<Scalars['float8']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  walletAddress?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "centralized_txn" */
export type Centralized_Txn_Max_Order_By = {
  accountId?: InputMaybe<Order_By>;
  baseCurrency?: InputMaybe<Order_By>;
  baseCurrencyAmount?: InputMaybe<Order_By>;
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  cryptoTransactionId?: InputMaybe<Order_By>;
  failedReason?: InputMaybe<Order_By>;
  feeAmount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  paymentMethod?: InputMaybe<Order_By>;
  provider?: InputMaybe<Order_By>;
  providerTxnId?: InputMaybe<Order_By>;
  quoteCurrency?: InputMaybe<Order_By>;
  quoteCurrencyAmount?: InputMaybe<Order_By>;
  signature?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  walletAddress?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Centralized_Txn_Min_Fields = {
  __typename?: 'centralized_txn_min_fields';
  accountId?: Maybe<Scalars['uuid']['output']>;
  baseCurrency?: Maybe<Scalars['String']['output']>;
  baseCurrencyAmount?: Maybe<Scalars['float8']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  cryptoTransactionId?: Maybe<Scalars['String']['output']>;
  failedReason?: Maybe<Scalars['String']['output']>;
  feeAmount?: Maybe<Scalars['float8']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  paymentMethod?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  providerTxnId?: Maybe<Scalars['uuid']['output']>;
  quoteCurrency?: Maybe<Scalars['String']['output']>;
  quoteCurrencyAmount?: Maybe<Scalars['float8']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  walletAddress?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "centralized_txn" */
export type Centralized_Txn_Min_Order_By = {
  accountId?: InputMaybe<Order_By>;
  baseCurrency?: InputMaybe<Order_By>;
  baseCurrencyAmount?: InputMaybe<Order_By>;
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  cryptoTransactionId?: InputMaybe<Order_By>;
  failedReason?: InputMaybe<Order_By>;
  feeAmount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  paymentMethod?: InputMaybe<Order_By>;
  provider?: InputMaybe<Order_By>;
  providerTxnId?: InputMaybe<Order_By>;
  quoteCurrency?: InputMaybe<Order_By>;
  quoteCurrencyAmount?: InputMaybe<Order_By>;
  signature?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  walletAddress?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "centralized_txn" */
export type Centralized_Txn_Mutation_Response = {
  __typename?: 'centralized_txn_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Centralized_Txn>;
};

/** on_conflict condition type for table "centralized_txn" */
export type Centralized_Txn_On_Conflict = {
  constraint: Centralized_Txn_Constraint;
  update_columns?: Array<Centralized_Txn_Update_Column>;
  where?: InputMaybe<Centralized_Txn_Bool_Exp>;
};

/** Ordering options when selecting data from "centralized_txn". */
export type Centralized_Txn_Order_By = {
  account?: InputMaybe<Account_Order_By>;
  accountId?: InputMaybe<Order_By>;
  baseCurrency?: InputMaybe<Order_By>;
  baseCurrencyAmount?: InputMaybe<Order_By>;
  client?: InputMaybe<Client_Order_By>;
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  cryptoTransactionId?: InputMaybe<Order_By>;
  failedReason?: InputMaybe<Order_By>;
  feeAmount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  paymentMethod?: InputMaybe<Order_By>;
  provider?: InputMaybe<Order_By>;
  providerTxnId?: InputMaybe<Order_By>;
  quoteCurrency?: InputMaybe<Order_By>;
  quoteCurrencyAmount?: InputMaybe<Order_By>;
  signature?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  walletAddress?: InputMaybe<Order_By>;
};

/** primary key columns input for table: centralized_txn */
export type Centralized_Txn_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "centralized_txn" */
export enum Centralized_Txn_Select_Column {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  BaseCurrency = 'baseCurrency',
  /** column name */
  BaseCurrencyAmount = 'baseCurrencyAmount',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CryptoTransactionId = 'cryptoTransactionId',
  /** column name */
  FailedReason = 'failedReason',
  /** column name */
  FeeAmount = 'feeAmount',
  /** column name */
  Id = 'id',
  /** column name */
  PaymentMethod = 'paymentMethod',
  /** column name */
  Provider = 'provider',
  /** column name */
  ProviderTxnId = 'providerTxnId',
  /** column name */
  QuoteCurrency = 'quoteCurrency',
  /** column name */
  QuoteCurrencyAmount = 'quoteCurrencyAmount',
  /** column name */
  Signature = 'signature',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  WalletAddress = 'walletAddress'
}

/** select "centralized_txn_aggregate_bool_exp_avg_arguments_columns" columns of table "centralized_txn" */
export enum Centralized_Txn_Select_Column_Centralized_Txn_Aggregate_Bool_Exp_Avg_Arguments_Columns {
  /** column name */
  BaseCurrencyAmount = 'baseCurrencyAmount',
  /** column name */
  FeeAmount = 'feeAmount',
  /** column name */
  QuoteCurrencyAmount = 'quoteCurrencyAmount'
}

/** select "centralized_txn_aggregate_bool_exp_corr_arguments_columns" columns of table "centralized_txn" */
export enum Centralized_Txn_Select_Column_Centralized_Txn_Aggregate_Bool_Exp_Corr_Arguments_Columns {
  /** column name */
  BaseCurrencyAmount = 'baseCurrencyAmount',
  /** column name */
  FeeAmount = 'feeAmount',
  /** column name */
  QuoteCurrencyAmount = 'quoteCurrencyAmount'
}

/** select "centralized_txn_aggregate_bool_exp_covar_samp_arguments_columns" columns of table "centralized_txn" */
export enum Centralized_Txn_Select_Column_Centralized_Txn_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns {
  /** column name */
  BaseCurrencyAmount = 'baseCurrencyAmount',
  /** column name */
  FeeAmount = 'feeAmount',
  /** column name */
  QuoteCurrencyAmount = 'quoteCurrencyAmount'
}

/** select "centralized_txn_aggregate_bool_exp_max_arguments_columns" columns of table "centralized_txn" */
export enum Centralized_Txn_Select_Column_Centralized_Txn_Aggregate_Bool_Exp_Max_Arguments_Columns {
  /** column name */
  BaseCurrencyAmount = 'baseCurrencyAmount',
  /** column name */
  FeeAmount = 'feeAmount',
  /** column name */
  QuoteCurrencyAmount = 'quoteCurrencyAmount'
}

/** select "centralized_txn_aggregate_bool_exp_min_arguments_columns" columns of table "centralized_txn" */
export enum Centralized_Txn_Select_Column_Centralized_Txn_Aggregate_Bool_Exp_Min_Arguments_Columns {
  /** column name */
  BaseCurrencyAmount = 'baseCurrencyAmount',
  /** column name */
  FeeAmount = 'feeAmount',
  /** column name */
  QuoteCurrencyAmount = 'quoteCurrencyAmount'
}

/** select "centralized_txn_aggregate_bool_exp_stddev_samp_arguments_columns" columns of table "centralized_txn" */
export enum Centralized_Txn_Select_Column_Centralized_Txn_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns {
  /** column name */
  BaseCurrencyAmount = 'baseCurrencyAmount',
  /** column name */
  FeeAmount = 'feeAmount',
  /** column name */
  QuoteCurrencyAmount = 'quoteCurrencyAmount'
}

/** select "centralized_txn_aggregate_bool_exp_sum_arguments_columns" columns of table "centralized_txn" */
export enum Centralized_Txn_Select_Column_Centralized_Txn_Aggregate_Bool_Exp_Sum_Arguments_Columns {
  /** column name */
  BaseCurrencyAmount = 'baseCurrencyAmount',
  /** column name */
  FeeAmount = 'feeAmount',
  /** column name */
  QuoteCurrencyAmount = 'quoteCurrencyAmount'
}

/** select "centralized_txn_aggregate_bool_exp_var_samp_arguments_columns" columns of table "centralized_txn" */
export enum Centralized_Txn_Select_Column_Centralized_Txn_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns {
  /** column name */
  BaseCurrencyAmount = 'baseCurrencyAmount',
  /** column name */
  FeeAmount = 'feeAmount',
  /** column name */
  QuoteCurrencyAmount = 'quoteCurrencyAmount'
}

/** input type for updating data in table "centralized_txn" */
export type Centralized_Txn_Set_Input = {
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  baseCurrency?: InputMaybe<Scalars['String']['input']>;
  baseCurrencyAmount?: InputMaybe<Scalars['float8']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  cryptoTransactionId?: InputMaybe<Scalars['String']['input']>;
  failedReason?: InputMaybe<Scalars['String']['input']>;
  feeAmount?: InputMaybe<Scalars['float8']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  providerTxnId?: InputMaybe<Scalars['uuid']['input']>;
  quoteCurrency?: InputMaybe<Scalars['String']['input']>;
  quoteCurrencyAmount?: InputMaybe<Scalars['float8']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Centralized_Txn_Stddev_Fields = {
  __typename?: 'centralized_txn_stddev_fields';
  baseCurrencyAmount?: Maybe<Scalars['Float']['output']>;
  feeAmount?: Maybe<Scalars['Float']['output']>;
  quoteCurrencyAmount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "centralized_txn" */
export type Centralized_Txn_Stddev_Order_By = {
  baseCurrencyAmount?: InputMaybe<Order_By>;
  feeAmount?: InputMaybe<Order_By>;
  quoteCurrencyAmount?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Centralized_Txn_Stddev_Pop_Fields = {
  __typename?: 'centralized_txn_stddev_pop_fields';
  baseCurrencyAmount?: Maybe<Scalars['Float']['output']>;
  feeAmount?: Maybe<Scalars['Float']['output']>;
  quoteCurrencyAmount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "centralized_txn" */
export type Centralized_Txn_Stddev_Pop_Order_By = {
  baseCurrencyAmount?: InputMaybe<Order_By>;
  feeAmount?: InputMaybe<Order_By>;
  quoteCurrencyAmount?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Centralized_Txn_Stddev_Samp_Fields = {
  __typename?: 'centralized_txn_stddev_samp_fields';
  baseCurrencyAmount?: Maybe<Scalars['Float']['output']>;
  feeAmount?: Maybe<Scalars['Float']['output']>;
  quoteCurrencyAmount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "centralized_txn" */
export type Centralized_Txn_Stddev_Samp_Order_By = {
  baseCurrencyAmount?: InputMaybe<Order_By>;
  feeAmount?: InputMaybe<Order_By>;
  quoteCurrencyAmount?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "centralized_txn" */
export type Centralized_Txn_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Centralized_Txn_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Centralized_Txn_Stream_Cursor_Value_Input = {
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  baseCurrency?: InputMaybe<Scalars['String']['input']>;
  baseCurrencyAmount?: InputMaybe<Scalars['float8']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  cryptoTransactionId?: InputMaybe<Scalars['String']['input']>;
  failedReason?: InputMaybe<Scalars['String']['input']>;
  feeAmount?: InputMaybe<Scalars['float8']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  providerTxnId?: InputMaybe<Scalars['uuid']['input']>;
  quoteCurrency?: InputMaybe<Scalars['String']['input']>;
  quoteCurrencyAmount?: InputMaybe<Scalars['float8']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Centralized_Txn_Sum_Fields = {
  __typename?: 'centralized_txn_sum_fields';
  baseCurrencyAmount?: Maybe<Scalars['float8']['output']>;
  feeAmount?: Maybe<Scalars['float8']['output']>;
  quoteCurrencyAmount?: Maybe<Scalars['float8']['output']>;
};

/** order by sum() on columns of table "centralized_txn" */
export type Centralized_Txn_Sum_Order_By = {
  baseCurrencyAmount?: InputMaybe<Order_By>;
  feeAmount?: InputMaybe<Order_By>;
  quoteCurrencyAmount?: InputMaybe<Order_By>;
};

/** update columns of table "centralized_txn" */
export enum Centralized_Txn_Update_Column {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  BaseCurrency = 'baseCurrency',
  /** column name */
  BaseCurrencyAmount = 'baseCurrencyAmount',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CryptoTransactionId = 'cryptoTransactionId',
  /** column name */
  FailedReason = 'failedReason',
  /** column name */
  FeeAmount = 'feeAmount',
  /** column name */
  Id = 'id',
  /** column name */
  PaymentMethod = 'paymentMethod',
  /** column name */
  Provider = 'provider',
  /** column name */
  ProviderTxnId = 'providerTxnId',
  /** column name */
  QuoteCurrency = 'quoteCurrency',
  /** column name */
  QuoteCurrencyAmount = 'quoteCurrencyAmount',
  /** column name */
  Signature = 'signature',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  WalletAddress = 'walletAddress'
}

export type Centralized_Txn_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Centralized_Txn_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Centralized_Txn_Set_Input>;
  /** filter the rows which have to be updated */
  where: Centralized_Txn_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Centralized_Txn_Var_Pop_Fields = {
  __typename?: 'centralized_txn_var_pop_fields';
  baseCurrencyAmount?: Maybe<Scalars['Float']['output']>;
  feeAmount?: Maybe<Scalars['Float']['output']>;
  quoteCurrencyAmount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "centralized_txn" */
export type Centralized_Txn_Var_Pop_Order_By = {
  baseCurrencyAmount?: InputMaybe<Order_By>;
  feeAmount?: InputMaybe<Order_By>;
  quoteCurrencyAmount?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Centralized_Txn_Var_Samp_Fields = {
  __typename?: 'centralized_txn_var_samp_fields';
  baseCurrencyAmount?: Maybe<Scalars['Float']['output']>;
  feeAmount?: Maybe<Scalars['Float']['output']>;
  quoteCurrencyAmount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "centralized_txn" */
export type Centralized_Txn_Var_Samp_Order_By = {
  baseCurrencyAmount?: InputMaybe<Order_By>;
  feeAmount?: InputMaybe<Order_By>;
  quoteCurrencyAmount?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Centralized_Txn_Variance_Fields = {
  __typename?: 'centralized_txn_variance_fields';
  baseCurrencyAmount?: Maybe<Scalars['Float']['output']>;
  feeAmount?: Maybe<Scalars['Float']['output']>;
  quoteCurrencyAmount?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "centralized_txn" */
export type Centralized_Txn_Variance_Order_By = {
  baseCurrencyAmount?: InputMaybe<Order_By>;
  feeAmount?: InputMaybe<Order_By>;
  quoteCurrencyAmount?: InputMaybe<Order_By>;
};

/** chat messages for clients */
export type Chat = {
  __typename?: 'chat';
  /** An object relationship */
  client: Client;
  /** An object relationship */
  friendship: Friendship;
  friendshipId: Scalars['uuid']['output'];
  id: Scalars['uuid']['output'];
  message: Scalars['String']['output'];
  sendAt: Scalars['timestamptz']['output'];
  senderId: Scalars['uuid']['output'];
  updatedAt: Scalars['timestamptz']['output'];
};

/** aggregated selection of "chat" */
export type Chat_Aggregate = {
  __typename?: 'chat_aggregate';
  aggregate?: Maybe<Chat_Aggregate_Fields>;
  nodes: Array<Chat>;
};

export type Chat_Aggregate_Bool_Exp = {
  count?: InputMaybe<Chat_Aggregate_Bool_Exp_Count>;
};

export type Chat_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Chat_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Chat_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "chat" */
export type Chat_Aggregate_Fields = {
  __typename?: 'chat_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Chat_Max_Fields>;
  min?: Maybe<Chat_Min_Fields>;
};


/** aggregate fields of "chat" */
export type Chat_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Chat_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "chat" */
export type Chat_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Chat_Max_Order_By>;
  min?: InputMaybe<Chat_Min_Order_By>;
};

/** input type for inserting array relation for remote table "chat" */
export type Chat_Arr_Rel_Insert_Input = {
  data: Array<Chat_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Chat_On_Conflict>;
};

/** Boolean expression to filter rows from the table "chat". All fields are combined with a logical 'AND'. */
export type Chat_Bool_Exp = {
  _and?: InputMaybe<Array<Chat_Bool_Exp>>;
  _not?: InputMaybe<Chat_Bool_Exp>;
  _or?: InputMaybe<Array<Chat_Bool_Exp>>;
  client?: InputMaybe<Client_Bool_Exp>;
  friendship?: InputMaybe<Friendship_Bool_Exp>;
  friendshipId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  message?: InputMaybe<String_Comparison_Exp>;
  sendAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  senderId?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "chat" */
export enum Chat_Constraint {
  /** unique or primary key constraint on columns "id" */
  ChatPkey = 'chat_pkey'
}

/** input type for inserting data into table "chat" */
export type Chat_Insert_Input = {
  client?: InputMaybe<Client_Obj_Rel_Insert_Input>;
  friendship?: InputMaybe<Friendship_Obj_Rel_Insert_Input>;
  friendshipId?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  sendAt?: InputMaybe<Scalars['timestamptz']['input']>;
  senderId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Chat_Max_Fields = {
  __typename?: 'chat_max_fields';
  friendshipId?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  sendAt?: Maybe<Scalars['timestamptz']['output']>;
  senderId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "chat" */
export type Chat_Max_Order_By = {
  friendshipId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  sendAt?: InputMaybe<Order_By>;
  senderId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Chat_Min_Fields = {
  __typename?: 'chat_min_fields';
  friendshipId?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  sendAt?: Maybe<Scalars['timestamptz']['output']>;
  senderId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "chat" */
export type Chat_Min_Order_By = {
  friendshipId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  sendAt?: InputMaybe<Order_By>;
  senderId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "chat" */
export type Chat_Mutation_Response = {
  __typename?: 'chat_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Chat>;
};

/** on_conflict condition type for table "chat" */
export type Chat_On_Conflict = {
  constraint: Chat_Constraint;
  update_columns?: Array<Chat_Update_Column>;
  where?: InputMaybe<Chat_Bool_Exp>;
};

/** Ordering options when selecting data from "chat". */
export type Chat_Order_By = {
  client?: InputMaybe<Client_Order_By>;
  friendship?: InputMaybe<Friendship_Order_By>;
  friendshipId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  sendAt?: InputMaybe<Order_By>;
  senderId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: chat */
export type Chat_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "chat" */
export enum Chat_Select_Column {
  /** column name */
  FriendshipId = 'friendshipId',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  SendAt = 'sendAt',
  /** column name */
  SenderId = 'senderId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "chat" */
export type Chat_Set_Input = {
  friendshipId?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  sendAt?: InputMaybe<Scalars['timestamptz']['input']>;
  senderId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "chat" */
export type Chat_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Chat_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Chat_Stream_Cursor_Value_Input = {
  friendshipId?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  sendAt?: InputMaybe<Scalars['timestamptz']['input']>;
  senderId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "chat" */
export enum Chat_Update_Column {
  /** column name */
  FriendshipId = 'friendshipId',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  SendAt = 'sendAt',
  /** column name */
  SenderId = 'senderId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Chat_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Chat_Set_Input>;
  /** filter the rows which have to be updated */
  where: Chat_Bool_Exp;
};

/** subscriber for paybox */
export type Client = {
  __typename?: 'client';
  /** An array relationship */
  accounts: Array<Account>;
  /** An aggregate relationship */
  accounts_aggregate: Account_Aggregate;
  /** An object relationship */
  address?: Maybe<Address>;
  /** An array relationship */
  address_books: Array<Address_Book>;
  /** An aggregate relationship */
  address_books_aggregate: Address_Book_Aggregate;
  /** An array relationship */
  ata: Array<Ata>;
  /** An aggregate relationship */
  ata_aggregate: Ata_Aggregate;
  /** An array relationship */
  centralized_txns: Array<Centralized_Txn>;
  /** An aggregate relationship */
  centralized_txns_aggregate: Centralized_Txn_Aggregate;
  /** An array relationship */
  chats: Array<Chat>;
  /** An aggregate relationship */
  chats_aggregate: Chat_Aggregate;
  /** An object relationship */
  client_setting?: Maybe<Client_Settings>;
  /** An object relationship */
  connection?: Maybe<Connections>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  email: Scalars['String']['output'];
  firstname?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  friendships: Array<Friendship>;
  /** An array relationship */
  friendshipsByClientid2: Array<Friendship>;
  /** An aggregate relationship */
  friendshipsByClientid2_aggregate: Friendship_Aggregate;
  /** An aggregate relationship */
  friendships_aggregate: Friendship_Aggregate;
  id: Scalars['uuid']['output'];
  lastname?: Maybe<Scalars['String']['output']>;
  mobile?: Maybe<Scalars['bigint']['output']>;
  /** An array relationship */
  notification_subscriptions: Array<Notification_Subscription>;
  /** An aggregate relationship */
  notification_subscriptions_aggregate: Notification_Subscription_Aggregate;
  /** An array relationship */
  notifications: Array<Notification>;
  /** An aggregate relationship */
  notifications_aggregate: Notification_Aggregate;
  password: Scalars['String']['output'];
  /** An array relationship */
  token_txns: Array<Token_Txn>;
  /** An aggregate relationship */
  token_txns_aggregate: Token_Txn_Aggregate;
  /** An array relationship */
  tokens: Array<Token>;
  /** An aggregate relationship */
  tokens_aggregate: Token_Aggregate;
  /** An array relationship */
  transactions: Array<Transactions>;
  /** An aggregate relationship */
  transactions_aggregate: Transactions_Aggregate;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  username: Scalars['String']['output'];
  valid: Scalars['Boolean']['output'];
  /** An array relationship */
  wallets: Array<Wallet>;
  /** An aggregate relationship */
  wallets_aggregate: Wallet_Aggregate;
};


/** subscriber for paybox */
export type ClientAccountsArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientAddress_BooksArgs = {
  distinct_on?: InputMaybe<Array<Address_Book_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Book_Order_By>>;
  where?: InputMaybe<Address_Book_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientAddress_Books_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Address_Book_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Book_Order_By>>;
  where?: InputMaybe<Address_Book_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientAtaArgs = {
  distinct_on?: InputMaybe<Array<Ata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ata_Order_By>>;
  where?: InputMaybe<Ata_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientAta_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ata_Order_By>>;
  where?: InputMaybe<Ata_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientCentralized_TxnsArgs = {
  distinct_on?: InputMaybe<Array<Centralized_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Centralized_Txn_Order_By>>;
  where?: InputMaybe<Centralized_Txn_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientCentralized_Txns_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Centralized_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Centralized_Txn_Order_By>>;
  where?: InputMaybe<Centralized_Txn_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientChatsArgs = {
  distinct_on?: InputMaybe<Array<Chat_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Order_By>>;
  where?: InputMaybe<Chat_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientChats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chat_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Order_By>>;
  where?: InputMaybe<Chat_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientFriendshipsArgs = {
  distinct_on?: InputMaybe<Array<Friendship_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Friendship_Order_By>>;
  where?: InputMaybe<Friendship_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientFriendshipsByClientid2Args = {
  distinct_on?: InputMaybe<Array<Friendship_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Friendship_Order_By>>;
  where?: InputMaybe<Friendship_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientFriendshipsByClientid2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Friendship_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Friendship_Order_By>>;
  where?: InputMaybe<Friendship_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientFriendships_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Friendship_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Friendship_Order_By>>;
  where?: InputMaybe<Friendship_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientNotification_SubscriptionsArgs = {
  distinct_on?: InputMaybe<Array<Notification_Subscription_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notification_Subscription_Order_By>>;
  where?: InputMaybe<Notification_Subscription_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientNotification_Subscriptions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Notification_Subscription_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notification_Subscription_Order_By>>;
  where?: InputMaybe<Notification_Subscription_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientNotificationsArgs = {
  distinct_on?: InputMaybe<Array<Notification_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notification_Order_By>>;
  where?: InputMaybe<Notification_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientNotifications_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Notification_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notification_Order_By>>;
  where?: InputMaybe<Notification_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientToken_TxnsArgs = {
  distinct_on?: InputMaybe<Array<Token_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Txn_Order_By>>;
  where?: InputMaybe<Token_Txn_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientToken_Txns_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Txn_Order_By>>;
  where?: InputMaybe<Token_Txn_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientTokensArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientTransactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientWalletsArgs = {
  distinct_on?: InputMaybe<Array<Wallet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallet_Order_By>>;
  where?: InputMaybe<Wallet_Bool_Exp>;
};


/** subscriber for paybox */
export type ClientWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wallet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallet_Order_By>>;
  where?: InputMaybe<Wallet_Bool_Exp>;
};

/** aggregated selection of "client" */
export type Client_Aggregate = {
  __typename?: 'client_aggregate';
  aggregate?: Maybe<Client_Aggregate_Fields>;
  nodes: Array<Client>;
};

/** aggregate fields of "client" */
export type Client_Aggregate_Fields = {
  __typename?: 'client_aggregate_fields';
  avg?: Maybe<Client_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Client_Max_Fields>;
  min?: Maybe<Client_Min_Fields>;
  stddev?: Maybe<Client_Stddev_Fields>;
  stddev_pop?: Maybe<Client_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Client_Stddev_Samp_Fields>;
  sum?: Maybe<Client_Sum_Fields>;
  var_pop?: Maybe<Client_Var_Pop_Fields>;
  var_samp?: Maybe<Client_Var_Samp_Fields>;
  variance?: Maybe<Client_Variance_Fields>;
};


/** aggregate fields of "client" */
export type Client_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Client_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Client_Avg_Fields = {
  __typename?: 'client_avg_fields';
  mobile?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "client". All fields are combined with a logical 'AND'. */
export type Client_Bool_Exp = {
  _and?: InputMaybe<Array<Client_Bool_Exp>>;
  _not?: InputMaybe<Client_Bool_Exp>;
  _or?: InputMaybe<Array<Client_Bool_Exp>>;
  accounts?: InputMaybe<Account_Bool_Exp>;
  accounts_aggregate?: InputMaybe<Account_Aggregate_Bool_Exp>;
  address?: InputMaybe<Address_Bool_Exp>;
  address_books?: InputMaybe<Address_Book_Bool_Exp>;
  address_books_aggregate?: InputMaybe<Address_Book_Aggregate_Bool_Exp>;
  ata?: InputMaybe<Ata_Bool_Exp>;
  ata_aggregate?: InputMaybe<Ata_Aggregate_Bool_Exp>;
  centralized_txns?: InputMaybe<Centralized_Txn_Bool_Exp>;
  centralized_txns_aggregate?: InputMaybe<Centralized_Txn_Aggregate_Bool_Exp>;
  chats?: InputMaybe<Chat_Bool_Exp>;
  chats_aggregate?: InputMaybe<Chat_Aggregate_Bool_Exp>;
  client_setting?: InputMaybe<Client_Settings_Bool_Exp>;
  connection?: InputMaybe<Connections_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  firstname?: InputMaybe<String_Comparison_Exp>;
  friendships?: InputMaybe<Friendship_Bool_Exp>;
  friendshipsByClientid2?: InputMaybe<Friendship_Bool_Exp>;
  friendshipsByClientid2_aggregate?: InputMaybe<Friendship_Aggregate_Bool_Exp>;
  friendships_aggregate?: InputMaybe<Friendship_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  lastname?: InputMaybe<String_Comparison_Exp>;
  mobile?: InputMaybe<Bigint_Comparison_Exp>;
  notification_subscriptions?: InputMaybe<Notification_Subscription_Bool_Exp>;
  notification_subscriptions_aggregate?: InputMaybe<Notification_Subscription_Aggregate_Bool_Exp>;
  notifications?: InputMaybe<Notification_Bool_Exp>;
  notifications_aggregate?: InputMaybe<Notification_Aggregate_Bool_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  token_txns?: InputMaybe<Token_Txn_Bool_Exp>;
  token_txns_aggregate?: InputMaybe<Token_Txn_Aggregate_Bool_Exp>;
  tokens?: InputMaybe<Token_Bool_Exp>;
  tokens_aggregate?: InputMaybe<Token_Aggregate_Bool_Exp>;
  transactions?: InputMaybe<Transactions_Bool_Exp>;
  transactions_aggregate?: InputMaybe<Transactions_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
  valid?: InputMaybe<Boolean_Comparison_Exp>;
  wallets?: InputMaybe<Wallet_Bool_Exp>;
  wallets_aggregate?: InputMaybe<Wallet_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "client" */
export enum Client_Constraint {
  /** unique or primary key constraint on columns "email" */
  ClientEmailKey = 'client_email_key',
  /** unique or primary key constraint on columns "id" */
  ClientPkey = 'client_pkey',
  /** unique or primary key constraint on columns "username" */
  ClientUsernameKey = 'client_username_key'
}

/** input type for incrementing numeric columns in table "client" */
export type Client_Inc_Input = {
  mobile?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "client" */
export type Client_Insert_Input = {
  accounts?: InputMaybe<Account_Arr_Rel_Insert_Input>;
  address?: InputMaybe<Address_Obj_Rel_Insert_Input>;
  address_books?: InputMaybe<Address_Book_Arr_Rel_Insert_Input>;
  ata?: InputMaybe<Ata_Arr_Rel_Insert_Input>;
  centralized_txns?: InputMaybe<Centralized_Txn_Arr_Rel_Insert_Input>;
  chats?: InputMaybe<Chat_Arr_Rel_Insert_Input>;
  client_setting?: InputMaybe<Client_Settings_Obj_Rel_Insert_Input>;
  connection?: InputMaybe<Connections_Obj_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  friendships?: InputMaybe<Friendship_Arr_Rel_Insert_Input>;
  friendshipsByClientid2?: InputMaybe<Friendship_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['bigint']['input']>;
  notification_subscriptions?: InputMaybe<Notification_Subscription_Arr_Rel_Insert_Input>;
  notifications?: InputMaybe<Notification_Arr_Rel_Insert_Input>;
  password?: InputMaybe<Scalars['String']['input']>;
  token_txns?: InputMaybe<Token_Txn_Arr_Rel_Insert_Input>;
  tokens?: InputMaybe<Token_Arr_Rel_Insert_Input>;
  transactions?: InputMaybe<Transactions_Arr_Rel_Insert_Input>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  valid?: InputMaybe<Scalars['Boolean']['input']>;
  wallets?: InputMaybe<Wallet_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Client_Max_Fields = {
  __typename?: 'client_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  mobile?: Maybe<Scalars['bigint']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Client_Min_Fields = {
  __typename?: 'client_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  mobile?: Maybe<Scalars['bigint']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "client" */
export type Client_Mutation_Response = {
  __typename?: 'client_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Client>;
};

/** input type for inserting object relation for remote table "client" */
export type Client_Obj_Rel_Insert_Input = {
  data: Client_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Client_On_Conflict>;
};

/** on_conflict condition type for table "client" */
export type Client_On_Conflict = {
  constraint: Client_Constraint;
  update_columns?: Array<Client_Update_Column>;
  where?: InputMaybe<Client_Bool_Exp>;
};

/** Ordering options when selecting data from "client". */
export type Client_Order_By = {
  accounts_aggregate?: InputMaybe<Account_Aggregate_Order_By>;
  address?: InputMaybe<Address_Order_By>;
  address_books_aggregate?: InputMaybe<Address_Book_Aggregate_Order_By>;
  ata_aggregate?: InputMaybe<Ata_Aggregate_Order_By>;
  centralized_txns_aggregate?: InputMaybe<Centralized_Txn_Aggregate_Order_By>;
  chats_aggregate?: InputMaybe<Chat_Aggregate_Order_By>;
  client_setting?: InputMaybe<Client_Settings_Order_By>;
  connection?: InputMaybe<Connections_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  firstname?: InputMaybe<Order_By>;
  friendshipsByClientid2_aggregate?: InputMaybe<Friendship_Aggregate_Order_By>;
  friendships_aggregate?: InputMaybe<Friendship_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  lastname?: InputMaybe<Order_By>;
  mobile?: InputMaybe<Order_By>;
  notification_subscriptions_aggregate?: InputMaybe<Notification_Subscription_Aggregate_Order_By>;
  notifications_aggregate?: InputMaybe<Notification_Aggregate_Order_By>;
  password?: InputMaybe<Order_By>;
  token_txns_aggregate?: InputMaybe<Token_Txn_Aggregate_Order_By>;
  tokens_aggregate?: InputMaybe<Token_Aggregate_Order_By>;
  transactions_aggregate?: InputMaybe<Transactions_Aggregate_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
  valid?: InputMaybe<Order_By>;
  wallets_aggregate?: InputMaybe<Wallet_Aggregate_Order_By>;
};

/** primary key columns input for table: client */
export type Client_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "client" */
export enum Client_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  Firstname = 'firstname',
  /** column name */
  Id = 'id',
  /** column name */
  Lastname = 'lastname',
  /** column name */
  Mobile = 'mobile',
  /** column name */
  Password = 'password',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Username = 'username',
  /** column name */
  Valid = 'valid'
}

/** input type for updating data in table "client" */
export type Client_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['bigint']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  valid?: InputMaybe<Scalars['Boolean']['input']>;
};

/** settings for client */
export type Client_Settings = {
  __typename?: 'client_settings';
  btcExp: Scalars['String']['output'];
  btcNet: Scalars['String']['output'];
  /** An object relationship */
  client: Client;
  clientId: Scalars['uuid']['output'];
  /** An object relationship */
  connection?: Maybe<Connections>;
  createdAt: Scalars['timestamptz']['output'];
  ethExp: Scalars['String']['output'];
  ethNet: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  locale: Scalars['String']['output'];
  preferedExplorer: Scalars['String']['output'];
  preferedWallet: Scalars['String']['output'];
  solExp: Scalars['String']['output'];
  solNet: Scalars['String']['output'];
  testmode: Scalars['Boolean']['output'];
  updatedAt: Scalars['timestamptz']['output'];
};

/** aggregated selection of "client_settings" */
export type Client_Settings_Aggregate = {
  __typename?: 'client_settings_aggregate';
  aggregate?: Maybe<Client_Settings_Aggregate_Fields>;
  nodes: Array<Client_Settings>;
};

/** aggregate fields of "client_settings" */
export type Client_Settings_Aggregate_Fields = {
  __typename?: 'client_settings_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Client_Settings_Max_Fields>;
  min?: Maybe<Client_Settings_Min_Fields>;
};


/** aggregate fields of "client_settings" */
export type Client_Settings_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Client_Settings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "client_settings". All fields are combined with a logical 'AND'. */
export type Client_Settings_Bool_Exp = {
  _and?: InputMaybe<Array<Client_Settings_Bool_Exp>>;
  _not?: InputMaybe<Client_Settings_Bool_Exp>;
  _or?: InputMaybe<Array<Client_Settings_Bool_Exp>>;
  btcExp?: InputMaybe<String_Comparison_Exp>;
  btcNet?: InputMaybe<String_Comparison_Exp>;
  client?: InputMaybe<Client_Bool_Exp>;
  clientId?: InputMaybe<Uuid_Comparison_Exp>;
  connection?: InputMaybe<Connections_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  ethExp?: InputMaybe<String_Comparison_Exp>;
  ethNet?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  locale?: InputMaybe<String_Comparison_Exp>;
  preferedExplorer?: InputMaybe<String_Comparison_Exp>;
  preferedWallet?: InputMaybe<String_Comparison_Exp>;
  solExp?: InputMaybe<String_Comparison_Exp>;
  solNet?: InputMaybe<String_Comparison_Exp>;
  testmode?: InputMaybe<Boolean_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "client_settings" */
export enum Client_Settings_Constraint {
  /** unique or primary key constraint on columns "client_id" */
  ClientSettingsClientIdKey = 'client_settings_client_id_key',
  /** unique or primary key constraint on columns "id" */
  ClientSettingsPkey = 'client_settings_pkey'
}

/** input type for inserting data into table "client_settings" */
export type Client_Settings_Insert_Input = {
  btcExp?: InputMaybe<Scalars['String']['input']>;
  btcNet?: InputMaybe<Scalars['String']['input']>;
  client?: InputMaybe<Client_Obj_Rel_Insert_Input>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  connection?: InputMaybe<Connections_Obj_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  ethExp?: InputMaybe<Scalars['String']['input']>;
  ethNet?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preferedExplorer?: InputMaybe<Scalars['String']['input']>;
  preferedWallet?: InputMaybe<Scalars['String']['input']>;
  solExp?: InputMaybe<Scalars['String']['input']>;
  solNet?: InputMaybe<Scalars['String']['input']>;
  testmode?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Client_Settings_Max_Fields = {
  __typename?: 'client_settings_max_fields';
  btcExp?: Maybe<Scalars['String']['output']>;
  btcNet?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  ethExp?: Maybe<Scalars['String']['output']>;
  ethNet?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  preferedExplorer?: Maybe<Scalars['String']['output']>;
  preferedWallet?: Maybe<Scalars['String']['output']>;
  solExp?: Maybe<Scalars['String']['output']>;
  solNet?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Client_Settings_Min_Fields = {
  __typename?: 'client_settings_min_fields';
  btcExp?: Maybe<Scalars['String']['output']>;
  btcNet?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  ethExp?: Maybe<Scalars['String']['output']>;
  ethNet?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  preferedExplorer?: Maybe<Scalars['String']['output']>;
  preferedWallet?: Maybe<Scalars['String']['output']>;
  solExp?: Maybe<Scalars['String']['output']>;
  solNet?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "client_settings" */
export type Client_Settings_Mutation_Response = {
  __typename?: 'client_settings_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Client_Settings>;
};

/** input type for inserting object relation for remote table "client_settings" */
export type Client_Settings_Obj_Rel_Insert_Input = {
  data: Client_Settings_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Client_Settings_On_Conflict>;
};

/** on_conflict condition type for table "client_settings" */
export type Client_Settings_On_Conflict = {
  constraint: Client_Settings_Constraint;
  update_columns?: Array<Client_Settings_Update_Column>;
  where?: InputMaybe<Client_Settings_Bool_Exp>;
};

/** Ordering options when selecting data from "client_settings". */
export type Client_Settings_Order_By = {
  btcExp?: InputMaybe<Order_By>;
  btcNet?: InputMaybe<Order_By>;
  client?: InputMaybe<Client_Order_By>;
  clientId?: InputMaybe<Order_By>;
  connection?: InputMaybe<Connections_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  ethExp?: InputMaybe<Order_By>;
  ethNet?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  locale?: InputMaybe<Order_By>;
  preferedExplorer?: InputMaybe<Order_By>;
  preferedWallet?: InputMaybe<Order_By>;
  solExp?: InputMaybe<Order_By>;
  solNet?: InputMaybe<Order_By>;
  testmode?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: client_settings */
export type Client_Settings_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "client_settings" */
export enum Client_Settings_Select_Column {
  /** column name */
  BtcExp = 'btcExp',
  /** column name */
  BtcNet = 'btcNet',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  EthExp = 'ethExp',
  /** column name */
  EthNet = 'ethNet',
  /** column name */
  Id = 'id',
  /** column name */
  Locale = 'locale',
  /** column name */
  PreferedExplorer = 'preferedExplorer',
  /** column name */
  PreferedWallet = 'preferedWallet',
  /** column name */
  SolExp = 'solExp',
  /** column name */
  SolNet = 'solNet',
  /** column name */
  Testmode = 'testmode',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "client_settings" */
export type Client_Settings_Set_Input = {
  btcExp?: InputMaybe<Scalars['String']['input']>;
  btcNet?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  ethExp?: InputMaybe<Scalars['String']['input']>;
  ethNet?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preferedExplorer?: InputMaybe<Scalars['String']['input']>;
  preferedWallet?: InputMaybe<Scalars['String']['input']>;
  solExp?: InputMaybe<Scalars['String']['input']>;
  solNet?: InputMaybe<Scalars['String']['input']>;
  testmode?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "client_settings" */
export type Client_Settings_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Client_Settings_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Client_Settings_Stream_Cursor_Value_Input = {
  btcExp?: InputMaybe<Scalars['String']['input']>;
  btcNet?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  ethExp?: InputMaybe<Scalars['String']['input']>;
  ethNet?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preferedExplorer?: InputMaybe<Scalars['String']['input']>;
  preferedWallet?: InputMaybe<Scalars['String']['input']>;
  solExp?: InputMaybe<Scalars['String']['input']>;
  solNet?: InputMaybe<Scalars['String']['input']>;
  testmode?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "client_settings" */
export enum Client_Settings_Update_Column {
  /** column name */
  BtcExp = 'btcExp',
  /** column name */
  BtcNet = 'btcNet',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  EthExp = 'ethExp',
  /** column name */
  EthNet = 'ethNet',
  /** column name */
  Id = 'id',
  /** column name */
  Locale = 'locale',
  /** column name */
  PreferedExplorer = 'preferedExplorer',
  /** column name */
  PreferedWallet = 'preferedWallet',
  /** column name */
  SolExp = 'solExp',
  /** column name */
  SolNet = 'solNet',
  /** column name */
  Testmode = 'testmode',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Client_Settings_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Client_Settings_Set_Input>;
  /** filter the rows which have to be updated */
  where: Client_Settings_Bool_Exp;
};

/** aggregate stddev on columns */
export type Client_Stddev_Fields = {
  __typename?: 'client_stddev_fields';
  mobile?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Client_Stddev_Pop_Fields = {
  __typename?: 'client_stddev_pop_fields';
  mobile?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Client_Stddev_Samp_Fields = {
  __typename?: 'client_stddev_samp_fields';
  mobile?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "client" */
export type Client_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Client_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Client_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['bigint']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  valid?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate sum on columns */
export type Client_Sum_Fields = {
  __typename?: 'client_sum_fields';
  mobile?: Maybe<Scalars['bigint']['output']>;
};

/** update columns of table "client" */
export enum Client_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  Firstname = 'firstname',
  /** column name */
  Id = 'id',
  /** column name */
  Lastname = 'lastname',
  /** column name */
  Mobile = 'mobile',
  /** column name */
  Password = 'password',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Username = 'username',
  /** column name */
  Valid = 'valid'
}

export type Client_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Client_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Client_Set_Input>;
  /** filter the rows which have to be updated */
  where: Client_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Client_Var_Pop_Fields = {
  __typename?: 'client_var_pop_fields';
  mobile?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Client_Var_Samp_Fields = {
  __typename?: 'client_var_samp_fields';
  mobile?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Client_Variance_Fields = {
  __typename?: 'client_variance_fields';
  mobile?: Maybe<Scalars['Float']['output']>;
};

/** blockchains connections metadata */
export type Connections = {
  __typename?: 'connections';
  btcNetwork: Scalars['String']['output'];
  /** An object relationship */
  client: Client;
  clientId: Scalars['uuid']['output'];
  clientSettingsId: Scalars['uuid']['output'];
  /** An object relationship */
  client_setting: Client_Settings;
  createdAt: Scalars['timestamptz']['output'];
  ethNetwork: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  solNetwork: Scalars['String']['output'];
  updatedAt: Scalars['timestamptz']['output'];
};

/** aggregated selection of "connections" */
export type Connections_Aggregate = {
  __typename?: 'connections_aggregate';
  aggregate?: Maybe<Connections_Aggregate_Fields>;
  nodes: Array<Connections>;
};

/** aggregate fields of "connections" */
export type Connections_Aggregate_Fields = {
  __typename?: 'connections_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Connections_Max_Fields>;
  min?: Maybe<Connections_Min_Fields>;
};


/** aggregate fields of "connections" */
export type Connections_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Connections_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "connections". All fields are combined with a logical 'AND'. */
export type Connections_Bool_Exp = {
  _and?: InputMaybe<Array<Connections_Bool_Exp>>;
  _not?: InputMaybe<Connections_Bool_Exp>;
  _or?: InputMaybe<Array<Connections_Bool_Exp>>;
  btcNetwork?: InputMaybe<String_Comparison_Exp>;
  client?: InputMaybe<Client_Bool_Exp>;
  clientId?: InputMaybe<Uuid_Comparison_Exp>;
  clientSettingsId?: InputMaybe<Uuid_Comparison_Exp>;
  client_setting?: InputMaybe<Client_Settings_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  ethNetwork?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  solNetwork?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "connections" */
export enum Connections_Constraint {
  /** unique or primary key constraint on columns "client_id" */
  ConnectionsClientIdKey = 'connections_client_id_key',
  /** unique or primary key constraint on columns "client_settings_id" */
  ConnectionsClientSettingsIdKey = 'connections_client_settings_id_key',
  /** unique or primary key constraint on columns "id" */
  ConnectionsPkey = 'connections_pkey'
}

/** input type for inserting data into table "connections" */
export type Connections_Insert_Input = {
  btcNetwork?: InputMaybe<Scalars['String']['input']>;
  client?: InputMaybe<Client_Obj_Rel_Insert_Input>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  clientSettingsId?: InputMaybe<Scalars['uuid']['input']>;
  client_setting?: InputMaybe<Client_Settings_Obj_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  ethNetwork?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  solNetwork?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Connections_Max_Fields = {
  __typename?: 'connections_max_fields';
  btcNetwork?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  clientSettingsId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  ethNetwork?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  solNetwork?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Connections_Min_Fields = {
  __typename?: 'connections_min_fields';
  btcNetwork?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  clientSettingsId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  ethNetwork?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  solNetwork?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "connections" */
export type Connections_Mutation_Response = {
  __typename?: 'connections_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Connections>;
};

/** input type for inserting object relation for remote table "connections" */
export type Connections_Obj_Rel_Insert_Input = {
  data: Connections_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Connections_On_Conflict>;
};

/** on_conflict condition type for table "connections" */
export type Connections_On_Conflict = {
  constraint: Connections_Constraint;
  update_columns?: Array<Connections_Update_Column>;
  where?: InputMaybe<Connections_Bool_Exp>;
};

/** Ordering options when selecting data from "connections". */
export type Connections_Order_By = {
  btcNetwork?: InputMaybe<Order_By>;
  client?: InputMaybe<Client_Order_By>;
  clientId?: InputMaybe<Order_By>;
  clientSettingsId?: InputMaybe<Order_By>;
  client_setting?: InputMaybe<Client_Settings_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  ethNetwork?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  solNetwork?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: connections */
export type Connections_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "connections" */
export enum Connections_Select_Column {
  /** column name */
  BtcNetwork = 'btcNetwork',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  ClientSettingsId = 'clientSettingsId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  EthNetwork = 'ethNetwork',
  /** column name */
  Id = 'id',
  /** column name */
  SolNetwork = 'solNetwork',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "connections" */
export type Connections_Set_Input = {
  btcNetwork?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  clientSettingsId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  ethNetwork?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  solNetwork?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "connections" */
export type Connections_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Connections_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Connections_Stream_Cursor_Value_Input = {
  btcNetwork?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  clientSettingsId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  ethNetwork?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  solNetwork?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "connections" */
export enum Connections_Update_Column {
  /** column name */
  BtcNetwork = 'btcNetwork',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  ClientSettingsId = 'clientSettingsId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  EthNetwork = 'ethNetwork',
  /** column name */
  Id = 'id',
  /** column name */
  SolNetwork = 'solNetwork',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Connections_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Connections_Set_Input>;
  /** filter the rows which have to be updated */
  where: Connections_Bool_Exp;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** eth address and token for client wallets */
export type Eth = {
  __typename?: 'eth';
  /** An object relationship */
  account: Account;
  accountId: Scalars['uuid']['output'];
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  privateKey: Scalars['String']['output'];
  publicKey: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregated selection of "eth" */
export type Eth_Aggregate = {
  __typename?: 'eth_aggregate';
  aggregate?: Maybe<Eth_Aggregate_Fields>;
  nodes: Array<Eth>;
};

/** aggregate fields of "eth" */
export type Eth_Aggregate_Fields = {
  __typename?: 'eth_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Eth_Max_Fields>;
  min?: Maybe<Eth_Min_Fields>;
};


/** aggregate fields of "eth" */
export type Eth_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Eth_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "eth". All fields are combined with a logical 'AND'. */
export type Eth_Bool_Exp = {
  _and?: InputMaybe<Array<Eth_Bool_Exp>>;
  _not?: InputMaybe<Eth_Bool_Exp>;
  _or?: InputMaybe<Array<Eth_Bool_Exp>>;
  account?: InputMaybe<Account_Bool_Exp>;
  accountId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  privateKey?: InputMaybe<String_Comparison_Exp>;
  publicKey?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "eth" */
export enum Eth_Constraint {
  /** unique or primary key constraint on columns "id" */
  EthPkey = 'eth_pkey',
  /** unique or primary key constraint on columns "privateKey" */
  EthPrivateKeyKey = 'eth_privateKey_key',
  /** unique or primary key constraint on columns "publicKey" */
  EthPublicKeyKey = 'eth_publicKey_key',
  /** unique or primary key constraint on columns "accountId" */
  EthWalletIdKey = 'eth_walletId_key'
}

/** input type for inserting data into table "eth" */
export type Eth_Insert_Input = {
  account?: InputMaybe<Account_Obj_Rel_Insert_Input>;
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  privateKey?: InputMaybe<Scalars['String']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Eth_Max_Fields = {
  __typename?: 'eth_max_fields';
  accountId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  privateKey?: Maybe<Scalars['String']['output']>;
  publicKey?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Eth_Min_Fields = {
  __typename?: 'eth_min_fields';
  accountId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  privateKey?: Maybe<Scalars['String']['output']>;
  publicKey?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "eth" */
export type Eth_Mutation_Response = {
  __typename?: 'eth_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Eth>;
};

/** input type for inserting object relation for remote table "eth" */
export type Eth_Obj_Rel_Insert_Input = {
  data: Eth_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Eth_On_Conflict>;
};

/** on_conflict condition type for table "eth" */
export type Eth_On_Conflict = {
  constraint: Eth_Constraint;
  update_columns?: Array<Eth_Update_Column>;
  where?: InputMaybe<Eth_Bool_Exp>;
};

/** Ordering options when selecting data from "eth". */
export type Eth_Order_By = {
  account?: InputMaybe<Account_Order_By>;
  accountId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  privateKey?: InputMaybe<Order_By>;
  publicKey?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: eth */
export type Eth_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "eth" */
export enum Eth_Select_Column {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  PrivateKey = 'privateKey',
  /** column name */
  PublicKey = 'publicKey',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "eth" */
export type Eth_Set_Input = {
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  privateKey?: InputMaybe<Scalars['String']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "eth" */
export type Eth_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Eth_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Eth_Stream_Cursor_Value_Input = {
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  privateKey?: InputMaybe<Scalars['String']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "eth" */
export enum Eth_Update_Column {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  PrivateKey = 'privateKey',
  /** column name */
  PublicKey = 'publicKey',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Eth_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Eth_Set_Input>;
  /** filter the rows which have to be updated */
  where: Eth_Bool_Exp;
};

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['float8']['input']>;
  _gt?: InputMaybe<Scalars['float8']['input']>;
  _gte?: InputMaybe<Scalars['float8']['input']>;
  _in?: InputMaybe<Array<Scalars['float8']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['float8']['input']>;
  _lte?: InputMaybe<Scalars['float8']['input']>;
  _neq?: InputMaybe<Scalars['float8']['input']>;
  _nin?: InputMaybe<Array<Scalars['float8']['input']>>;
};

/** rooms table for clients */
export type Friendship = {
  __typename?: 'friendship';
  /** An array relationship */
  chats: Array<Chat>;
  /** An aggregate relationship */
  chats_aggregate: Chat_Aggregate;
  /** An object relationship */
  client1: Client;
  /** An object relationship */
  client2: Client;
  clientId1: Scalars['uuid']['output'];
  clientId2: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['timestamptz']['output'];
};


/** rooms table for clients */
export type FriendshipChatsArgs = {
  distinct_on?: InputMaybe<Array<Chat_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Order_By>>;
  where?: InputMaybe<Chat_Bool_Exp>;
};


/** rooms table for clients */
export type FriendshipChats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chat_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Order_By>>;
  where?: InputMaybe<Chat_Bool_Exp>;
};

/** aggregated selection of "friendship" */
export type Friendship_Aggregate = {
  __typename?: 'friendship_aggregate';
  aggregate?: Maybe<Friendship_Aggregate_Fields>;
  nodes: Array<Friendship>;
};

export type Friendship_Aggregate_Bool_Exp = {
  count?: InputMaybe<Friendship_Aggregate_Bool_Exp_Count>;
};

export type Friendship_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Friendship_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Friendship_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "friendship" */
export type Friendship_Aggregate_Fields = {
  __typename?: 'friendship_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Friendship_Max_Fields>;
  min?: Maybe<Friendship_Min_Fields>;
};


/** aggregate fields of "friendship" */
export type Friendship_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Friendship_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "friendship" */
export type Friendship_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Friendship_Max_Order_By>;
  min?: InputMaybe<Friendship_Min_Order_By>;
};

/** input type for inserting array relation for remote table "friendship" */
export type Friendship_Arr_Rel_Insert_Input = {
  data: Array<Friendship_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Friendship_On_Conflict>;
};

/** Boolean expression to filter rows from the table "friendship". All fields are combined with a logical 'AND'. */
export type Friendship_Bool_Exp = {
  _and?: InputMaybe<Array<Friendship_Bool_Exp>>;
  _not?: InputMaybe<Friendship_Bool_Exp>;
  _or?: InputMaybe<Array<Friendship_Bool_Exp>>;
  chats?: InputMaybe<Chat_Bool_Exp>;
  chats_aggregate?: InputMaybe<Chat_Aggregate_Bool_Exp>;
  client1?: InputMaybe<Client_Bool_Exp>;
  client2?: InputMaybe<Client_Bool_Exp>;
  clientId1?: InputMaybe<Uuid_Comparison_Exp>;
  clientId2?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "friendship" */
export enum Friendship_Constraint {
  /** unique or primary key constraint on columns "id" */
  FriendshipsPkey = 'friendships_pkey'
}

/** input type for inserting data into table "friendship" */
export type Friendship_Insert_Input = {
  chats?: InputMaybe<Chat_Arr_Rel_Insert_Input>;
  client1?: InputMaybe<Client_Obj_Rel_Insert_Input>;
  client2?: InputMaybe<Client_Obj_Rel_Insert_Input>;
  clientId1?: InputMaybe<Scalars['uuid']['input']>;
  clientId2?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Friendship_Max_Fields = {
  __typename?: 'friendship_max_fields';
  clientId1?: Maybe<Scalars['uuid']['output']>;
  clientId2?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "friendship" */
export type Friendship_Max_Order_By = {
  clientId1?: InputMaybe<Order_By>;
  clientId2?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Friendship_Min_Fields = {
  __typename?: 'friendship_min_fields';
  clientId1?: Maybe<Scalars['uuid']['output']>;
  clientId2?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "friendship" */
export type Friendship_Min_Order_By = {
  clientId1?: InputMaybe<Order_By>;
  clientId2?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "friendship" */
export type Friendship_Mutation_Response = {
  __typename?: 'friendship_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Friendship>;
};

/** input type for inserting object relation for remote table "friendship" */
export type Friendship_Obj_Rel_Insert_Input = {
  data: Friendship_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Friendship_On_Conflict>;
};

/** on_conflict condition type for table "friendship" */
export type Friendship_On_Conflict = {
  constraint: Friendship_Constraint;
  update_columns?: Array<Friendship_Update_Column>;
  where?: InputMaybe<Friendship_Bool_Exp>;
};

/** Ordering options when selecting data from "friendship". */
export type Friendship_Order_By = {
  chats_aggregate?: InputMaybe<Chat_Aggregate_Order_By>;
  client1?: InputMaybe<Client_Order_By>;
  client2?: InputMaybe<Client_Order_By>;
  clientId1?: InputMaybe<Order_By>;
  clientId2?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: friendship */
export type Friendship_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "friendship" */
export enum Friendship_Select_Column {
  /** column name */
  ClientId1 = 'clientId1',
  /** column name */
  ClientId2 = 'clientId2',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "friendship" */
export type Friendship_Set_Input = {
  clientId1?: InputMaybe<Scalars['uuid']['input']>;
  clientId2?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "friendship" */
export type Friendship_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Friendship_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Friendship_Stream_Cursor_Value_Input = {
  clientId1?: InputMaybe<Scalars['uuid']['input']>;
  clientId2?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "friendship" */
export enum Friendship_Update_Column {
  /** column name */
  ClientId1 = 'clientId1',
  /** column name */
  ClientId2 = 'clientId2',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Friendship_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Friendship_Set_Input>;
  /** filter the rows which have to be updated */
  where: Friendship_Bool_Exp;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "account" */
  delete_account?: Maybe<Account_Mutation_Response>;
  /** delete single row from the table: "account" */
  delete_account_by_pk?: Maybe<Account>;
  /** delete data from the table: "address" */
  delete_address?: Maybe<Address_Mutation_Response>;
  /** delete data from the table: "address_book" */
  delete_address_book?: Maybe<Address_Book_Mutation_Response>;
  /** delete single row from the table: "address_book" */
  delete_address_book_by_pk?: Maybe<Address_Book>;
  /** delete single row from the table: "address" */
  delete_address_by_pk?: Maybe<Address>;
  /** delete data from the table: "analyze" */
  delete_analyze?: Maybe<Analyze_Mutation_Response>;
  /** delete single row from the table: "analyze" */
  delete_analyze_by_pk?: Maybe<Analyze>;
  /** delete data from the table: "ata" */
  delete_ata?: Maybe<Ata_Mutation_Response>;
  /** delete single row from the table: "ata" */
  delete_ata_by_pk?: Maybe<Ata>;
  /** delete data from the table: "bitcoin" */
  delete_bitcoin?: Maybe<Bitcoin_Mutation_Response>;
  /** delete single row from the table: "bitcoin" */
  delete_bitcoin_by_pk?: Maybe<Bitcoin>;
  /** delete data from the table: "centralized_txn" */
  delete_centralized_txn?: Maybe<Centralized_Txn_Mutation_Response>;
  /** delete single row from the table: "centralized_txn" */
  delete_centralized_txn_by_pk?: Maybe<Centralized_Txn>;
  /** delete data from the table: "chat" */
  delete_chat?: Maybe<Chat_Mutation_Response>;
  /** delete single row from the table: "chat" */
  delete_chat_by_pk?: Maybe<Chat>;
  /** delete data from the table: "client" */
  delete_client?: Maybe<Client_Mutation_Response>;
  /** delete single row from the table: "client" */
  delete_client_by_pk?: Maybe<Client>;
  /** delete data from the table: "client_settings" */
  delete_client_settings?: Maybe<Client_Settings_Mutation_Response>;
  /** delete single row from the table: "client_settings" */
  delete_client_settings_by_pk?: Maybe<Client_Settings>;
  /** delete data from the table: "connections" */
  delete_connections?: Maybe<Connections_Mutation_Response>;
  /** delete single row from the table: "connections" */
  delete_connections_by_pk?: Maybe<Connections>;
  /** delete data from the table: "eth" */
  delete_eth?: Maybe<Eth_Mutation_Response>;
  /** delete single row from the table: "eth" */
  delete_eth_by_pk?: Maybe<Eth>;
  /** delete data from the table: "friendship" */
  delete_friendship?: Maybe<Friendship_Mutation_Response>;
  /** delete single row from the table: "friendship" */
  delete_friendship_by_pk?: Maybe<Friendship>;
  /** delete data from the table: "news_letter" */
  delete_news_letter?: Maybe<News_Letter_Mutation_Response>;
  /** delete single row from the table: "news_letter" */
  delete_news_letter_by_pk?: Maybe<News_Letter>;
  /** delete data from the table: "notif_to_subs" */
  delete_notif_to_subs?: Maybe<Notif_To_Subs_Mutation_Response>;
  /** delete single row from the table: "notif_to_subs" */
  delete_notif_to_subs_by_pk?: Maybe<Notif_To_Subs>;
  /** delete data from the table: "notification" */
  delete_notification?: Maybe<Notification_Mutation_Response>;
  /** delete single row from the table: "notification" */
  delete_notification_by_pk?: Maybe<Notification>;
  /** delete data from the table: "notification_subscription" */
  delete_notification_subscription?: Maybe<Notification_Subscription_Mutation_Response>;
  /** delete single row from the table: "notification_subscription" */
  delete_notification_subscription_by_pk?: Maybe<Notification_Subscription>;
  /** delete data from the table: "sol" */
  delete_sol?: Maybe<Sol_Mutation_Response>;
  /** delete single row from the table: "sol" */
  delete_sol_by_pk?: Maybe<Sol>;
  /** delete data from the table: "token" */
  delete_token?: Maybe<Token_Mutation_Response>;
  /** delete single row from the table: "token" */
  delete_token_by_pk?: Maybe<Token>;
  /** delete data from the table: "token_txn" */
  delete_token_txn?: Maybe<Token_Txn_Mutation_Response>;
  /** delete single row from the table: "token_txn" */
  delete_token_txn_by_pk?: Maybe<Token_Txn>;
  /** delete data from the table: "transactions" */
  delete_transactions?: Maybe<Transactions_Mutation_Response>;
  /** delete single row from the table: "transactions" */
  delete_transactions_by_pk?: Maybe<Transactions>;
  /** delete data from the table: "wallet" */
  delete_wallet?: Maybe<Wallet_Mutation_Response>;
  /** delete single row from the table: "wallet" */
  delete_wallet_by_pk?: Maybe<Wallet>;
  /** insert data into the table: "account" */
  insert_account?: Maybe<Account_Mutation_Response>;
  /** insert a single row into the table: "account" */
  insert_account_one?: Maybe<Account>;
  /** insert data into the table: "address" */
  insert_address?: Maybe<Address_Mutation_Response>;
  /** insert data into the table: "address_book" */
  insert_address_book?: Maybe<Address_Book_Mutation_Response>;
  /** insert a single row into the table: "address_book" */
  insert_address_book_one?: Maybe<Address_Book>;
  /** insert a single row into the table: "address" */
  insert_address_one?: Maybe<Address>;
  /** insert data into the table: "analyze" */
  insert_analyze?: Maybe<Analyze_Mutation_Response>;
  /** insert a single row into the table: "analyze" */
  insert_analyze_one?: Maybe<Analyze>;
  /** insert data into the table: "ata" */
  insert_ata?: Maybe<Ata_Mutation_Response>;
  /** insert a single row into the table: "ata" */
  insert_ata_one?: Maybe<Ata>;
  /** insert data into the table: "bitcoin" */
  insert_bitcoin?: Maybe<Bitcoin_Mutation_Response>;
  /** insert a single row into the table: "bitcoin" */
  insert_bitcoin_one?: Maybe<Bitcoin>;
  /** insert data into the table: "centralized_txn" */
  insert_centralized_txn?: Maybe<Centralized_Txn_Mutation_Response>;
  /** insert a single row into the table: "centralized_txn" */
  insert_centralized_txn_one?: Maybe<Centralized_Txn>;
  /** insert data into the table: "chat" */
  insert_chat?: Maybe<Chat_Mutation_Response>;
  /** insert a single row into the table: "chat" */
  insert_chat_one?: Maybe<Chat>;
  /** insert data into the table: "client" */
  insert_client?: Maybe<Client_Mutation_Response>;
  /** insert a single row into the table: "client" */
  insert_client_one?: Maybe<Client>;
  /** insert data into the table: "client_settings" */
  insert_client_settings?: Maybe<Client_Settings_Mutation_Response>;
  /** insert a single row into the table: "client_settings" */
  insert_client_settings_one?: Maybe<Client_Settings>;
  /** insert data into the table: "connections" */
  insert_connections?: Maybe<Connections_Mutation_Response>;
  /** insert a single row into the table: "connections" */
  insert_connections_one?: Maybe<Connections>;
  /** insert data into the table: "eth" */
  insert_eth?: Maybe<Eth_Mutation_Response>;
  /** insert a single row into the table: "eth" */
  insert_eth_one?: Maybe<Eth>;
  /** insert data into the table: "friendship" */
  insert_friendship?: Maybe<Friendship_Mutation_Response>;
  /** insert a single row into the table: "friendship" */
  insert_friendship_one?: Maybe<Friendship>;
  /** insert data into the table: "news_letter" */
  insert_news_letter?: Maybe<News_Letter_Mutation_Response>;
  /** insert a single row into the table: "news_letter" */
  insert_news_letter_one?: Maybe<News_Letter>;
  /** insert data into the table: "notif_to_subs" */
  insert_notif_to_subs?: Maybe<Notif_To_Subs_Mutation_Response>;
  /** insert a single row into the table: "notif_to_subs" */
  insert_notif_to_subs_one?: Maybe<Notif_To_Subs>;
  /** insert data into the table: "notification" */
  insert_notification?: Maybe<Notification_Mutation_Response>;
  /** insert a single row into the table: "notification" */
  insert_notification_one?: Maybe<Notification>;
  /** insert data into the table: "notification_subscription" */
  insert_notification_subscription?: Maybe<Notification_Subscription_Mutation_Response>;
  /** insert a single row into the table: "notification_subscription" */
  insert_notification_subscription_one?: Maybe<Notification_Subscription>;
  /** insert data into the table: "sol" */
  insert_sol?: Maybe<Sol_Mutation_Response>;
  /** insert a single row into the table: "sol" */
  insert_sol_one?: Maybe<Sol>;
  /** insert data into the table: "token" */
  insert_token?: Maybe<Token_Mutation_Response>;
  /** insert a single row into the table: "token" */
  insert_token_one?: Maybe<Token>;
  /** insert data into the table: "token_txn" */
  insert_token_txn?: Maybe<Token_Txn_Mutation_Response>;
  /** insert a single row into the table: "token_txn" */
  insert_token_txn_one?: Maybe<Token_Txn>;
  /** insert data into the table: "transactions" */
  insert_transactions?: Maybe<Transactions_Mutation_Response>;
  /** insert a single row into the table: "transactions" */
  insert_transactions_one?: Maybe<Transactions>;
  /** insert data into the table: "wallet" */
  insert_wallet?: Maybe<Wallet_Mutation_Response>;
  /** insert a single row into the table: "wallet" */
  insert_wallet_one?: Maybe<Wallet>;
  /** update data of the table: "account" */
  update_account?: Maybe<Account_Mutation_Response>;
  /** update single row of the table: "account" */
  update_account_by_pk?: Maybe<Account>;
  /** update multiples rows of table: "account" */
  update_account_many?: Maybe<Array<Maybe<Account_Mutation_Response>>>;
  /** update data of the table: "address" */
  update_address?: Maybe<Address_Mutation_Response>;
  /** update data of the table: "address_book" */
  update_address_book?: Maybe<Address_Book_Mutation_Response>;
  /** update single row of the table: "address_book" */
  update_address_book_by_pk?: Maybe<Address_Book>;
  /** update multiples rows of table: "address_book" */
  update_address_book_many?: Maybe<Array<Maybe<Address_Book_Mutation_Response>>>;
  /** update single row of the table: "address" */
  update_address_by_pk?: Maybe<Address>;
  /** update multiples rows of table: "address" */
  update_address_many?: Maybe<Array<Maybe<Address_Mutation_Response>>>;
  /** update data of the table: "analyze" */
  update_analyze?: Maybe<Analyze_Mutation_Response>;
  /** update single row of the table: "analyze" */
  update_analyze_by_pk?: Maybe<Analyze>;
  /** update multiples rows of table: "analyze" */
  update_analyze_many?: Maybe<Array<Maybe<Analyze_Mutation_Response>>>;
  /** update data of the table: "ata" */
  update_ata?: Maybe<Ata_Mutation_Response>;
  /** update single row of the table: "ata" */
  update_ata_by_pk?: Maybe<Ata>;
  /** update multiples rows of table: "ata" */
  update_ata_many?: Maybe<Array<Maybe<Ata_Mutation_Response>>>;
  /** update data of the table: "bitcoin" */
  update_bitcoin?: Maybe<Bitcoin_Mutation_Response>;
  /** update single row of the table: "bitcoin" */
  update_bitcoin_by_pk?: Maybe<Bitcoin>;
  /** update multiples rows of table: "bitcoin" */
  update_bitcoin_many?: Maybe<Array<Maybe<Bitcoin_Mutation_Response>>>;
  /** update data of the table: "centralized_txn" */
  update_centralized_txn?: Maybe<Centralized_Txn_Mutation_Response>;
  /** update single row of the table: "centralized_txn" */
  update_centralized_txn_by_pk?: Maybe<Centralized_Txn>;
  /** update multiples rows of table: "centralized_txn" */
  update_centralized_txn_many?: Maybe<Array<Maybe<Centralized_Txn_Mutation_Response>>>;
  /** update data of the table: "chat" */
  update_chat?: Maybe<Chat_Mutation_Response>;
  /** update single row of the table: "chat" */
  update_chat_by_pk?: Maybe<Chat>;
  /** update multiples rows of table: "chat" */
  update_chat_many?: Maybe<Array<Maybe<Chat_Mutation_Response>>>;
  /** update data of the table: "client" */
  update_client?: Maybe<Client_Mutation_Response>;
  /** update single row of the table: "client" */
  update_client_by_pk?: Maybe<Client>;
  /** update multiples rows of table: "client" */
  update_client_many?: Maybe<Array<Maybe<Client_Mutation_Response>>>;
  /** update data of the table: "client_settings" */
  update_client_settings?: Maybe<Client_Settings_Mutation_Response>;
  /** update single row of the table: "client_settings" */
  update_client_settings_by_pk?: Maybe<Client_Settings>;
  /** update multiples rows of table: "client_settings" */
  update_client_settings_many?: Maybe<Array<Maybe<Client_Settings_Mutation_Response>>>;
  /** update data of the table: "connections" */
  update_connections?: Maybe<Connections_Mutation_Response>;
  /** update single row of the table: "connections" */
  update_connections_by_pk?: Maybe<Connections>;
  /** update multiples rows of table: "connections" */
  update_connections_many?: Maybe<Array<Maybe<Connections_Mutation_Response>>>;
  /** update data of the table: "eth" */
  update_eth?: Maybe<Eth_Mutation_Response>;
  /** update single row of the table: "eth" */
  update_eth_by_pk?: Maybe<Eth>;
  /** update multiples rows of table: "eth" */
  update_eth_many?: Maybe<Array<Maybe<Eth_Mutation_Response>>>;
  /** update data of the table: "friendship" */
  update_friendship?: Maybe<Friendship_Mutation_Response>;
  /** update single row of the table: "friendship" */
  update_friendship_by_pk?: Maybe<Friendship>;
  /** update multiples rows of table: "friendship" */
  update_friendship_many?: Maybe<Array<Maybe<Friendship_Mutation_Response>>>;
  /** update data of the table: "news_letter" */
  update_news_letter?: Maybe<News_Letter_Mutation_Response>;
  /** update single row of the table: "news_letter" */
  update_news_letter_by_pk?: Maybe<News_Letter>;
  /** update multiples rows of table: "news_letter" */
  update_news_letter_many?: Maybe<Array<Maybe<News_Letter_Mutation_Response>>>;
  /** update data of the table: "notif_to_subs" */
  update_notif_to_subs?: Maybe<Notif_To_Subs_Mutation_Response>;
  /** update single row of the table: "notif_to_subs" */
  update_notif_to_subs_by_pk?: Maybe<Notif_To_Subs>;
  /** update multiples rows of table: "notif_to_subs" */
  update_notif_to_subs_many?: Maybe<Array<Maybe<Notif_To_Subs_Mutation_Response>>>;
  /** update data of the table: "notification" */
  update_notification?: Maybe<Notification_Mutation_Response>;
  /** update single row of the table: "notification" */
  update_notification_by_pk?: Maybe<Notification>;
  /** update multiples rows of table: "notification" */
  update_notification_many?: Maybe<Array<Maybe<Notification_Mutation_Response>>>;
  /** update data of the table: "notification_subscription" */
  update_notification_subscription?: Maybe<Notification_Subscription_Mutation_Response>;
  /** update single row of the table: "notification_subscription" */
  update_notification_subscription_by_pk?: Maybe<Notification_Subscription>;
  /** update multiples rows of table: "notification_subscription" */
  update_notification_subscription_many?: Maybe<Array<Maybe<Notification_Subscription_Mutation_Response>>>;
  /** update data of the table: "sol" */
  update_sol?: Maybe<Sol_Mutation_Response>;
  /** update single row of the table: "sol" */
  update_sol_by_pk?: Maybe<Sol>;
  /** update multiples rows of table: "sol" */
  update_sol_many?: Maybe<Array<Maybe<Sol_Mutation_Response>>>;
  /** update data of the table: "token" */
  update_token?: Maybe<Token_Mutation_Response>;
  /** update single row of the table: "token" */
  update_token_by_pk?: Maybe<Token>;
  /** update multiples rows of table: "token" */
  update_token_many?: Maybe<Array<Maybe<Token_Mutation_Response>>>;
  /** update data of the table: "token_txn" */
  update_token_txn?: Maybe<Token_Txn_Mutation_Response>;
  /** update single row of the table: "token_txn" */
  update_token_txn_by_pk?: Maybe<Token_Txn>;
  /** update multiples rows of table: "token_txn" */
  update_token_txn_many?: Maybe<Array<Maybe<Token_Txn_Mutation_Response>>>;
  /** update data of the table: "transactions" */
  update_transactions?: Maybe<Transactions_Mutation_Response>;
  /** update single row of the table: "transactions" */
  update_transactions_by_pk?: Maybe<Transactions>;
  /** update multiples rows of table: "transactions" */
  update_transactions_many?: Maybe<Array<Maybe<Transactions_Mutation_Response>>>;
  /** update data of the table: "wallet" */
  update_wallet?: Maybe<Wallet_Mutation_Response>;
  /** update single row of the table: "wallet" */
  update_wallet_by_pk?: Maybe<Wallet>;
  /** update multiples rows of table: "wallet" */
  update_wallet_many?: Maybe<Array<Maybe<Wallet_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_AccountArgs = {
  where: Account_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Account_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_AddressArgs = {
  where: Address_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Address_BookArgs = {
  where: Address_Book_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Address_Book_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Address_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_AnalyzeArgs = {
  where: Analyze_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Analyze_By_PkArgs = {
  id: Scalars['uuid']['input'];
  walletId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_AtaArgs = {
  where: Ata_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Ata_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_BitcoinArgs = {
  where: Bitcoin_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Bitcoin_By_PkArgs = {
  accountId: Scalars['uuid']['input'];
  id: Scalars['uuid']['input'];
  publicKey: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Centralized_TxnArgs = {
  where: Centralized_Txn_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Centralized_Txn_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ChatArgs = {
  where: Chat_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Chat_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ClientArgs = {
  where: Client_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Client_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Client_SettingsArgs = {
  where: Client_Settings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Client_Settings_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ConnectionsArgs = {
  where: Connections_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Connections_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_EthArgs = {
  where: Eth_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Eth_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_FriendshipArgs = {
  where: Friendship_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Friendship_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_News_LetterArgs = {
  where: News_Letter_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_News_Letter_By_PkArgs = {
  email: Scalars['String']['input'];
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Notif_To_SubsArgs = {
  where: Notif_To_Subs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Notif_To_Subs_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_NotificationArgs = {
  where: Notification_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Notification_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Notification_SubscriptionArgs = {
  where: Notification_Subscription_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Notification_Subscription_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_SolArgs = {
  where: Sol_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Sol_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_TokenArgs = {
  where: Token_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Token_By_PkArgs = {
  id: Scalars['uuid']['input'];
  pubKey: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Token_TxnArgs = {
  where: Token_Txn_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Token_Txn_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_TransactionsArgs = {
  where: Transactions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Transactions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_WalletArgs = {
  where: Wallet_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Wallet_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootInsert_AccountArgs = {
  objects: Array<Account_Insert_Input>;
  on_conflict?: InputMaybe<Account_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Account_OneArgs = {
  object: Account_Insert_Input;
  on_conflict?: InputMaybe<Account_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AddressArgs = {
  objects: Array<Address_Insert_Input>;
  on_conflict?: InputMaybe<Address_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Address_BookArgs = {
  objects: Array<Address_Book_Insert_Input>;
  on_conflict?: InputMaybe<Address_Book_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Address_Book_OneArgs = {
  object: Address_Book_Insert_Input;
  on_conflict?: InputMaybe<Address_Book_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Address_OneArgs = {
  object: Address_Insert_Input;
  on_conflict?: InputMaybe<Address_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AnalyzeArgs = {
  objects: Array<Analyze_Insert_Input>;
  on_conflict?: InputMaybe<Analyze_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Analyze_OneArgs = {
  object: Analyze_Insert_Input;
  on_conflict?: InputMaybe<Analyze_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AtaArgs = {
  objects: Array<Ata_Insert_Input>;
  on_conflict?: InputMaybe<Ata_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ata_OneArgs = {
  object: Ata_Insert_Input;
  on_conflict?: InputMaybe<Ata_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BitcoinArgs = {
  objects: Array<Bitcoin_Insert_Input>;
  on_conflict?: InputMaybe<Bitcoin_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Bitcoin_OneArgs = {
  object: Bitcoin_Insert_Input;
  on_conflict?: InputMaybe<Bitcoin_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Centralized_TxnArgs = {
  objects: Array<Centralized_Txn_Insert_Input>;
  on_conflict?: InputMaybe<Centralized_Txn_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Centralized_Txn_OneArgs = {
  object: Centralized_Txn_Insert_Input;
  on_conflict?: InputMaybe<Centralized_Txn_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ChatArgs = {
  objects: Array<Chat_Insert_Input>;
  on_conflict?: InputMaybe<Chat_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Chat_OneArgs = {
  object: Chat_Insert_Input;
  on_conflict?: InputMaybe<Chat_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ClientArgs = {
  objects: Array<Client_Insert_Input>;
  on_conflict?: InputMaybe<Client_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Client_OneArgs = {
  object: Client_Insert_Input;
  on_conflict?: InputMaybe<Client_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Client_SettingsArgs = {
  objects: Array<Client_Settings_Insert_Input>;
  on_conflict?: InputMaybe<Client_Settings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Client_Settings_OneArgs = {
  object: Client_Settings_Insert_Input;
  on_conflict?: InputMaybe<Client_Settings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ConnectionsArgs = {
  objects: Array<Connections_Insert_Input>;
  on_conflict?: InputMaybe<Connections_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Connections_OneArgs = {
  object: Connections_Insert_Input;
  on_conflict?: InputMaybe<Connections_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_EthArgs = {
  objects: Array<Eth_Insert_Input>;
  on_conflict?: InputMaybe<Eth_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Eth_OneArgs = {
  object: Eth_Insert_Input;
  on_conflict?: InputMaybe<Eth_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_FriendshipArgs = {
  objects: Array<Friendship_Insert_Input>;
  on_conflict?: InputMaybe<Friendship_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Friendship_OneArgs = {
  object: Friendship_Insert_Input;
  on_conflict?: InputMaybe<Friendship_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_News_LetterArgs = {
  objects: Array<News_Letter_Insert_Input>;
  on_conflict?: InputMaybe<News_Letter_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_News_Letter_OneArgs = {
  object: News_Letter_Insert_Input;
  on_conflict?: InputMaybe<News_Letter_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Notif_To_SubsArgs = {
  objects: Array<Notif_To_Subs_Insert_Input>;
  on_conflict?: InputMaybe<Notif_To_Subs_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Notif_To_Subs_OneArgs = {
  object: Notif_To_Subs_Insert_Input;
  on_conflict?: InputMaybe<Notif_To_Subs_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_NotificationArgs = {
  objects: Array<Notification_Insert_Input>;
  on_conflict?: InputMaybe<Notification_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Notification_OneArgs = {
  object: Notification_Insert_Input;
  on_conflict?: InputMaybe<Notification_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Notification_SubscriptionArgs = {
  objects: Array<Notification_Subscription_Insert_Input>;
  on_conflict?: InputMaybe<Notification_Subscription_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Notification_Subscription_OneArgs = {
  object: Notification_Subscription_Insert_Input;
  on_conflict?: InputMaybe<Notification_Subscription_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SolArgs = {
  objects: Array<Sol_Insert_Input>;
  on_conflict?: InputMaybe<Sol_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Sol_OneArgs = {
  object: Sol_Insert_Input;
  on_conflict?: InputMaybe<Sol_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TokenArgs = {
  objects: Array<Token_Insert_Input>;
  on_conflict?: InputMaybe<Token_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Token_OneArgs = {
  object: Token_Insert_Input;
  on_conflict?: InputMaybe<Token_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Token_TxnArgs = {
  objects: Array<Token_Txn_Insert_Input>;
  on_conflict?: InputMaybe<Token_Txn_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Token_Txn_OneArgs = {
  object: Token_Txn_Insert_Input;
  on_conflict?: InputMaybe<Token_Txn_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TransactionsArgs = {
  objects: Array<Transactions_Insert_Input>;
  on_conflict?: InputMaybe<Transactions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Transactions_OneArgs = {
  object: Transactions_Insert_Input;
  on_conflict?: InputMaybe<Transactions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_WalletArgs = {
  objects: Array<Wallet_Insert_Input>;
  on_conflict?: InputMaybe<Wallet_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Wallet_OneArgs = {
  object: Wallet_Insert_Input;
  on_conflict?: InputMaybe<Wallet_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_AccountArgs = {
  _set?: InputMaybe<Account_Set_Input>;
  where: Account_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Account_By_PkArgs = {
  _set?: InputMaybe<Account_Set_Input>;
  pk_columns: Account_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Account_ManyArgs = {
  updates: Array<Account_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AddressArgs = {
  _set?: InputMaybe<Address_Set_Input>;
  where: Address_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Address_BookArgs = {
  _set?: InputMaybe<Address_Book_Set_Input>;
  where: Address_Book_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Address_Book_By_PkArgs = {
  _set?: InputMaybe<Address_Book_Set_Input>;
  pk_columns: Address_Book_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Address_Book_ManyArgs = {
  updates: Array<Address_Book_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Address_By_PkArgs = {
  _set?: InputMaybe<Address_Set_Input>;
  pk_columns: Address_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Address_ManyArgs = {
  updates: Array<Address_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AnalyzeArgs = {
  _set?: InputMaybe<Analyze_Set_Input>;
  where: Analyze_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Analyze_By_PkArgs = {
  _set?: InputMaybe<Analyze_Set_Input>;
  pk_columns: Analyze_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Analyze_ManyArgs = {
  updates: Array<Analyze_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AtaArgs = {
  _set?: InputMaybe<Ata_Set_Input>;
  where: Ata_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Ata_By_PkArgs = {
  _set?: InputMaybe<Ata_Set_Input>;
  pk_columns: Ata_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Ata_ManyArgs = {
  updates: Array<Ata_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_BitcoinArgs = {
  _set?: InputMaybe<Bitcoin_Set_Input>;
  where: Bitcoin_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Bitcoin_By_PkArgs = {
  _set?: InputMaybe<Bitcoin_Set_Input>;
  pk_columns: Bitcoin_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Bitcoin_ManyArgs = {
  updates: Array<Bitcoin_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Centralized_TxnArgs = {
  _inc?: InputMaybe<Centralized_Txn_Inc_Input>;
  _set?: InputMaybe<Centralized_Txn_Set_Input>;
  where: Centralized_Txn_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Centralized_Txn_By_PkArgs = {
  _inc?: InputMaybe<Centralized_Txn_Inc_Input>;
  _set?: InputMaybe<Centralized_Txn_Set_Input>;
  pk_columns: Centralized_Txn_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Centralized_Txn_ManyArgs = {
  updates: Array<Centralized_Txn_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ChatArgs = {
  _set?: InputMaybe<Chat_Set_Input>;
  where: Chat_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Chat_By_PkArgs = {
  _set?: InputMaybe<Chat_Set_Input>;
  pk_columns: Chat_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Chat_ManyArgs = {
  updates: Array<Chat_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ClientArgs = {
  _inc?: InputMaybe<Client_Inc_Input>;
  _set?: InputMaybe<Client_Set_Input>;
  where: Client_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Client_By_PkArgs = {
  _inc?: InputMaybe<Client_Inc_Input>;
  _set?: InputMaybe<Client_Set_Input>;
  pk_columns: Client_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Client_ManyArgs = {
  updates: Array<Client_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Client_SettingsArgs = {
  _set?: InputMaybe<Client_Settings_Set_Input>;
  where: Client_Settings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Client_Settings_By_PkArgs = {
  _set?: InputMaybe<Client_Settings_Set_Input>;
  pk_columns: Client_Settings_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Client_Settings_ManyArgs = {
  updates: Array<Client_Settings_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ConnectionsArgs = {
  _set?: InputMaybe<Connections_Set_Input>;
  where: Connections_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Connections_By_PkArgs = {
  _set?: InputMaybe<Connections_Set_Input>;
  pk_columns: Connections_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Connections_ManyArgs = {
  updates: Array<Connections_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_EthArgs = {
  _set?: InputMaybe<Eth_Set_Input>;
  where: Eth_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Eth_By_PkArgs = {
  _set?: InputMaybe<Eth_Set_Input>;
  pk_columns: Eth_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Eth_ManyArgs = {
  updates: Array<Eth_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_FriendshipArgs = {
  _set?: InputMaybe<Friendship_Set_Input>;
  where: Friendship_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Friendship_By_PkArgs = {
  _set?: InputMaybe<Friendship_Set_Input>;
  pk_columns: Friendship_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Friendship_ManyArgs = {
  updates: Array<Friendship_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_News_LetterArgs = {
  _set?: InputMaybe<News_Letter_Set_Input>;
  where: News_Letter_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_News_Letter_By_PkArgs = {
  _set?: InputMaybe<News_Letter_Set_Input>;
  pk_columns: News_Letter_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_News_Letter_ManyArgs = {
  updates: Array<News_Letter_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Notif_To_SubsArgs = {
  _set?: InputMaybe<Notif_To_Subs_Set_Input>;
  where: Notif_To_Subs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Notif_To_Subs_By_PkArgs = {
  _set?: InputMaybe<Notif_To_Subs_Set_Input>;
  pk_columns: Notif_To_Subs_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Notif_To_Subs_ManyArgs = {
  updates: Array<Notif_To_Subs_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_NotificationArgs = {
  _set?: InputMaybe<Notification_Set_Input>;
  where: Notification_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Notification_By_PkArgs = {
  _set?: InputMaybe<Notification_Set_Input>;
  pk_columns: Notification_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Notification_ManyArgs = {
  updates: Array<Notification_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Notification_SubscriptionArgs = {
  _set?: InputMaybe<Notification_Subscription_Set_Input>;
  where: Notification_Subscription_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Notification_Subscription_By_PkArgs = {
  _set?: InputMaybe<Notification_Subscription_Set_Input>;
  pk_columns: Notification_Subscription_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Notification_Subscription_ManyArgs = {
  updates: Array<Notification_Subscription_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_SolArgs = {
  _set?: InputMaybe<Sol_Set_Input>;
  where: Sol_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Sol_By_PkArgs = {
  _set?: InputMaybe<Sol_Set_Input>;
  pk_columns: Sol_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Sol_ManyArgs = {
  updates: Array<Sol_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TokenArgs = {
  _set?: InputMaybe<Token_Set_Input>;
  where: Token_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Token_By_PkArgs = {
  _set?: InputMaybe<Token_Set_Input>;
  pk_columns: Token_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Token_ManyArgs = {
  updates: Array<Token_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Token_TxnArgs = {
  _inc?: InputMaybe<Token_Txn_Inc_Input>;
  _set?: InputMaybe<Token_Txn_Set_Input>;
  where: Token_Txn_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Token_Txn_By_PkArgs = {
  _inc?: InputMaybe<Token_Txn_Inc_Input>;
  _set?: InputMaybe<Token_Txn_Set_Input>;
  pk_columns: Token_Txn_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Token_Txn_ManyArgs = {
  updates: Array<Token_Txn_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TransactionsArgs = {
  _inc?: InputMaybe<Transactions_Inc_Input>;
  _set?: InputMaybe<Transactions_Set_Input>;
  where: Transactions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Transactions_By_PkArgs = {
  _inc?: InputMaybe<Transactions_Inc_Input>;
  _set?: InputMaybe<Transactions_Set_Input>;
  pk_columns: Transactions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Transactions_ManyArgs = {
  updates: Array<Transactions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_WalletArgs = {
  _set?: InputMaybe<Wallet_Set_Input>;
  where: Wallet_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Wallet_By_PkArgs = {
  _set?: InputMaybe<Wallet_Set_Input>;
  pk_columns: Wallet_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Wallet_ManyArgs = {
  updates: Array<Wallet_Updates>;
};

/** info related to news letter subscribers */
export type News_Letter = {
  __typename?: 'news_letter';
  created_at: Scalars['timestamptz']['output'];
  email: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "news_letter" */
export type News_Letter_Aggregate = {
  __typename?: 'news_letter_aggregate';
  aggregate?: Maybe<News_Letter_Aggregate_Fields>;
  nodes: Array<News_Letter>;
};

/** aggregate fields of "news_letter" */
export type News_Letter_Aggregate_Fields = {
  __typename?: 'news_letter_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<News_Letter_Max_Fields>;
  min?: Maybe<News_Letter_Min_Fields>;
};


/** aggregate fields of "news_letter" */
export type News_Letter_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<News_Letter_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "news_letter". All fields are combined with a logical 'AND'. */
export type News_Letter_Bool_Exp = {
  _and?: InputMaybe<Array<News_Letter_Bool_Exp>>;
  _not?: InputMaybe<News_Letter_Bool_Exp>;
  _or?: InputMaybe<Array<News_Letter_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "news_letter" */
export enum News_Letter_Constraint {
  /** unique or primary key constraint on columns "email" */
  NewsLetterEmailKey = 'news_letter_email_key',
  /** unique or primary key constraint on columns "id" */
  NewsLetterIdKey = 'news_letter_id_key',
  /** unique or primary key constraint on columns "email", "id" */
  NewsLetterPkey = 'news_letter_pkey'
}

/** input type for inserting data into table "news_letter" */
export type News_Letter_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type News_Letter_Max_Fields = {
  __typename?: 'news_letter_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type News_Letter_Min_Fields = {
  __typename?: 'news_letter_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "news_letter" */
export type News_Letter_Mutation_Response = {
  __typename?: 'news_letter_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<News_Letter>;
};

/** on_conflict condition type for table "news_letter" */
export type News_Letter_On_Conflict = {
  constraint: News_Letter_Constraint;
  update_columns?: Array<News_Letter_Update_Column>;
  where?: InputMaybe<News_Letter_Bool_Exp>;
};

/** Ordering options when selecting data from "news_letter". */
export type News_Letter_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: news_letter */
export type News_Letter_Pk_Columns_Input = {
  email: Scalars['String']['input'];
  id: Scalars['uuid']['input'];
};

/** select columns of table "news_letter" */
export enum News_Letter_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "news_letter" */
export type News_Letter_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "news_letter" */
export type News_Letter_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: News_Letter_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type News_Letter_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "news_letter" */
export enum News_Letter_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type News_Letter_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<News_Letter_Set_Input>;
  /** filter the rows which have to be updated */
  where: News_Letter_Bool_Exp;
};

/** join between noitfication subs and notifcation  */
export type Notif_To_Subs = {
  __typename?: 'notif_to_subs';
  createdAt: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  notifSubsId: Scalars['uuid']['output'];
  /** An object relationship */
  notification: Notification;
  notificationId: Scalars['uuid']['output'];
  /** An object relationship */
  notification_subscription: Notification_Subscription;
  updatedAt: Scalars['timestamptz']['output'];
};

/** aggregated selection of "notif_to_subs" */
export type Notif_To_Subs_Aggregate = {
  __typename?: 'notif_to_subs_aggregate';
  aggregate?: Maybe<Notif_To_Subs_Aggregate_Fields>;
  nodes: Array<Notif_To_Subs>;
};

export type Notif_To_Subs_Aggregate_Bool_Exp = {
  count?: InputMaybe<Notif_To_Subs_Aggregate_Bool_Exp_Count>;
};

export type Notif_To_Subs_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Notif_To_Subs_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Notif_To_Subs_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "notif_to_subs" */
export type Notif_To_Subs_Aggregate_Fields = {
  __typename?: 'notif_to_subs_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Notif_To_Subs_Max_Fields>;
  min?: Maybe<Notif_To_Subs_Min_Fields>;
};


/** aggregate fields of "notif_to_subs" */
export type Notif_To_Subs_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Notif_To_Subs_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "notif_to_subs" */
export type Notif_To_Subs_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Notif_To_Subs_Max_Order_By>;
  min?: InputMaybe<Notif_To_Subs_Min_Order_By>;
};

/** input type for inserting array relation for remote table "notif_to_subs" */
export type Notif_To_Subs_Arr_Rel_Insert_Input = {
  data: Array<Notif_To_Subs_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Notif_To_Subs_On_Conflict>;
};

/** Boolean expression to filter rows from the table "notif_to_subs". All fields are combined with a logical 'AND'. */
export type Notif_To_Subs_Bool_Exp = {
  _and?: InputMaybe<Array<Notif_To_Subs_Bool_Exp>>;
  _not?: InputMaybe<Notif_To_Subs_Bool_Exp>;
  _or?: InputMaybe<Array<Notif_To_Subs_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  notifSubsId?: InputMaybe<Uuid_Comparison_Exp>;
  notification?: InputMaybe<Notification_Bool_Exp>;
  notificationId?: InputMaybe<Uuid_Comparison_Exp>;
  notification_subscription?: InputMaybe<Notification_Subscription_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "notif_to_subs" */
export enum Notif_To_Subs_Constraint {
  /** unique or primary key constraint on columns "id" */
  NotifToSubsPkey = 'notif_to_subs_pkey'
}

/** input type for inserting data into table "notif_to_subs" */
export type Notif_To_Subs_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  notifSubsId?: InputMaybe<Scalars['uuid']['input']>;
  notification?: InputMaybe<Notification_Obj_Rel_Insert_Input>;
  notificationId?: InputMaybe<Scalars['uuid']['input']>;
  notification_subscription?: InputMaybe<Notification_Subscription_Obj_Rel_Insert_Input>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Notif_To_Subs_Max_Fields = {
  __typename?: 'notif_to_subs_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  notifSubsId?: Maybe<Scalars['uuid']['output']>;
  notificationId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "notif_to_subs" */
export type Notif_To_Subs_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  notifSubsId?: InputMaybe<Order_By>;
  notificationId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Notif_To_Subs_Min_Fields = {
  __typename?: 'notif_to_subs_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  notifSubsId?: Maybe<Scalars['uuid']['output']>;
  notificationId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "notif_to_subs" */
export type Notif_To_Subs_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  notifSubsId?: InputMaybe<Order_By>;
  notificationId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "notif_to_subs" */
export type Notif_To_Subs_Mutation_Response = {
  __typename?: 'notif_to_subs_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Notif_To_Subs>;
};

/** on_conflict condition type for table "notif_to_subs" */
export type Notif_To_Subs_On_Conflict = {
  constraint: Notif_To_Subs_Constraint;
  update_columns?: Array<Notif_To_Subs_Update_Column>;
  where?: InputMaybe<Notif_To_Subs_Bool_Exp>;
};

/** Ordering options when selecting data from "notif_to_subs". */
export type Notif_To_Subs_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  notifSubsId?: InputMaybe<Order_By>;
  notification?: InputMaybe<Notification_Order_By>;
  notificationId?: InputMaybe<Order_By>;
  notification_subscription?: InputMaybe<Notification_Subscription_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: notif_to_subs */
export type Notif_To_Subs_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "notif_to_subs" */
export enum Notif_To_Subs_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  NotifSubsId = 'notifSubsId',
  /** column name */
  NotificationId = 'notificationId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "notif_to_subs" */
export type Notif_To_Subs_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  notifSubsId?: InputMaybe<Scalars['uuid']['input']>;
  notificationId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "notif_to_subs" */
export type Notif_To_Subs_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Notif_To_Subs_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Notif_To_Subs_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  notifSubsId?: InputMaybe<Scalars['uuid']['input']>;
  notificationId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "notif_to_subs" */
export enum Notif_To_Subs_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  NotifSubsId = 'notifSubsId',
  /** column name */
  NotificationId = 'notificationId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Notif_To_Subs_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Notif_To_Subs_Set_Input>;
  /** filter the rows which have to be updated */
  where: Notif_To_Subs_Bool_Exp;
};

/** notification table for clients */
export type Notification = {
  __typename?: 'notification';
  body: Scalars['String']['output'];
  /** An object relationship */
  client: Client;
  clientId: Scalars['uuid']['output'];
  id: Scalars['uuid']['output'];
  image?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  notif_to_subs: Array<Notif_To_Subs>;
  /** An aggregate relationship */
  notif_to_subs_aggregate: Notif_To_Subs_Aggregate;
  tag: Scalars['String']['output'];
  timestamp: Scalars['timestamp']['output'];
  title: Scalars['String']['output'];
  topic: Scalars['String']['output'];
  updatedAt: Scalars['timestamptz']['output'];
  viewed: Scalars['Boolean']['output'];
};


/** notification table for clients */
export type NotificationNotif_To_SubsArgs = {
  distinct_on?: InputMaybe<Array<Notif_To_Subs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notif_To_Subs_Order_By>>;
  where?: InputMaybe<Notif_To_Subs_Bool_Exp>;
};


/** notification table for clients */
export type NotificationNotif_To_Subs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Notif_To_Subs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notif_To_Subs_Order_By>>;
  where?: InputMaybe<Notif_To_Subs_Bool_Exp>;
};

/** aggregated selection of "notification" */
export type Notification_Aggregate = {
  __typename?: 'notification_aggregate';
  aggregate?: Maybe<Notification_Aggregate_Fields>;
  nodes: Array<Notification>;
};

export type Notification_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Notification_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Notification_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Notification_Aggregate_Bool_Exp_Count>;
};

export type Notification_Aggregate_Bool_Exp_Bool_And = {
  arguments: Notification_Select_Column_Notification_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Notification_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Notification_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Notification_Select_Column_Notification_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Notification_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Notification_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Notification_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Notification_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "notification" */
export type Notification_Aggregate_Fields = {
  __typename?: 'notification_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Notification_Max_Fields>;
  min?: Maybe<Notification_Min_Fields>;
};


/** aggregate fields of "notification" */
export type Notification_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Notification_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "notification" */
export type Notification_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Notification_Max_Order_By>;
  min?: InputMaybe<Notification_Min_Order_By>;
};

/** input type for inserting array relation for remote table "notification" */
export type Notification_Arr_Rel_Insert_Input = {
  data: Array<Notification_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Notification_On_Conflict>;
};

/** Boolean expression to filter rows from the table "notification". All fields are combined with a logical 'AND'. */
export type Notification_Bool_Exp = {
  _and?: InputMaybe<Array<Notification_Bool_Exp>>;
  _not?: InputMaybe<Notification_Bool_Exp>;
  _or?: InputMaybe<Array<Notification_Bool_Exp>>;
  body?: InputMaybe<String_Comparison_Exp>;
  client?: InputMaybe<Client_Bool_Exp>;
  clientId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  notif_to_subs?: InputMaybe<Notif_To_Subs_Bool_Exp>;
  notif_to_subs_aggregate?: InputMaybe<Notif_To_Subs_Aggregate_Bool_Exp>;
  tag?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  topic?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  viewed?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "notification" */
export enum Notification_Constraint {
  /** unique or primary key constraint on columns "id" */
  NotificationPkey = 'notification_pkey'
}

/** input type for inserting data into table "notification" */
export type Notification_Insert_Input = {
  body?: InputMaybe<Scalars['String']['input']>;
  client?: InputMaybe<Client_Obj_Rel_Insert_Input>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  notif_to_subs?: InputMaybe<Notif_To_Subs_Arr_Rel_Insert_Input>;
  tag?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  viewed?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate max on columns */
export type Notification_Max_Fields = {
  __typename?: 'notification_max_fields';
  body?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  tag?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamp']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  topic?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "notification" */
export type Notification_Max_Order_By = {
  body?: InputMaybe<Order_By>;
  clientId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  tag?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  topic?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Notification_Min_Fields = {
  __typename?: 'notification_min_fields';
  body?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  tag?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamp']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  topic?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "notification" */
export type Notification_Min_Order_By = {
  body?: InputMaybe<Order_By>;
  clientId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  tag?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  topic?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "notification" */
export type Notification_Mutation_Response = {
  __typename?: 'notification_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Notification>;
};

/** input type for inserting object relation for remote table "notification" */
export type Notification_Obj_Rel_Insert_Input = {
  data: Notification_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Notification_On_Conflict>;
};

/** on_conflict condition type for table "notification" */
export type Notification_On_Conflict = {
  constraint: Notification_Constraint;
  update_columns?: Array<Notification_Update_Column>;
  where?: InputMaybe<Notification_Bool_Exp>;
};

/** Ordering options when selecting data from "notification". */
export type Notification_Order_By = {
  body?: InputMaybe<Order_By>;
  client?: InputMaybe<Client_Order_By>;
  clientId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  notif_to_subs_aggregate?: InputMaybe<Notif_To_Subs_Aggregate_Order_By>;
  tag?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  topic?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  viewed?: InputMaybe<Order_By>;
};

/** primary key columns input for table: notification */
export type Notification_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "notification" */
export enum Notification_Select_Column {
  /** column name */
  Body = 'body',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Tag = 'tag',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  Title = 'title',
  /** column name */
  Topic = 'topic',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Viewed = 'viewed'
}

/** select "notification_aggregate_bool_exp_bool_and_arguments_columns" columns of table "notification" */
export enum Notification_Select_Column_Notification_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Viewed = 'viewed'
}

/** select "notification_aggregate_bool_exp_bool_or_arguments_columns" columns of table "notification" */
export enum Notification_Select_Column_Notification_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Viewed = 'viewed'
}

/** input type for updating data in table "notification" */
export type Notification_Set_Input = {
  body?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  viewed?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Streaming cursor of the table "notification" */
export type Notification_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Notification_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Notification_Stream_Cursor_Value_Input = {
  body?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  viewed?: InputMaybe<Scalars['Boolean']['input']>;
};

/** notification subscriptions metadata for client */
export type Notification_Subscription = {
  __typename?: 'notification_subscription';
  auth: Scalars['String']['output'];
  /** An object relationship */
  client: Client;
  clientId: Scalars['uuid']['output'];
  endpoint: Scalars['String']['output'];
  expirationTime?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  /** An array relationship */
  notif_to_subs: Array<Notif_To_Subs>;
  /** An aggregate relationship */
  notif_to_subs_aggregate: Notif_To_Subs_Aggregate;
  p256dh: Scalars['String']['output'];
  updatedAt: Scalars['timestamptz']['output'];
};


/** notification subscriptions metadata for client */
export type Notification_SubscriptionNotif_To_SubsArgs = {
  distinct_on?: InputMaybe<Array<Notif_To_Subs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notif_To_Subs_Order_By>>;
  where?: InputMaybe<Notif_To_Subs_Bool_Exp>;
};


/** notification subscriptions metadata for client */
export type Notification_SubscriptionNotif_To_Subs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Notif_To_Subs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notif_To_Subs_Order_By>>;
  where?: InputMaybe<Notif_To_Subs_Bool_Exp>;
};

/** aggregated selection of "notification_subscription" */
export type Notification_Subscription_Aggregate = {
  __typename?: 'notification_subscription_aggregate';
  aggregate?: Maybe<Notification_Subscription_Aggregate_Fields>;
  nodes: Array<Notification_Subscription>;
};

export type Notification_Subscription_Aggregate_Bool_Exp = {
  count?: InputMaybe<Notification_Subscription_Aggregate_Bool_Exp_Count>;
};

export type Notification_Subscription_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Notification_Subscription_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Notification_Subscription_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "notification_subscription" */
export type Notification_Subscription_Aggregate_Fields = {
  __typename?: 'notification_subscription_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Notification_Subscription_Max_Fields>;
  min?: Maybe<Notification_Subscription_Min_Fields>;
};


/** aggregate fields of "notification_subscription" */
export type Notification_Subscription_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Notification_Subscription_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "notification_subscription" */
export type Notification_Subscription_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Notification_Subscription_Max_Order_By>;
  min?: InputMaybe<Notification_Subscription_Min_Order_By>;
};

/** input type for inserting array relation for remote table "notification_subscription" */
export type Notification_Subscription_Arr_Rel_Insert_Input = {
  data: Array<Notification_Subscription_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Notification_Subscription_On_Conflict>;
};

/** Boolean expression to filter rows from the table "notification_subscription". All fields are combined with a logical 'AND'. */
export type Notification_Subscription_Bool_Exp = {
  _and?: InputMaybe<Array<Notification_Subscription_Bool_Exp>>;
  _not?: InputMaybe<Notification_Subscription_Bool_Exp>;
  _or?: InputMaybe<Array<Notification_Subscription_Bool_Exp>>;
  auth?: InputMaybe<String_Comparison_Exp>;
  client?: InputMaybe<Client_Bool_Exp>;
  clientId?: InputMaybe<Uuid_Comparison_Exp>;
  endpoint?: InputMaybe<String_Comparison_Exp>;
  expirationTime?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  notif_to_subs?: InputMaybe<Notif_To_Subs_Bool_Exp>;
  notif_to_subs_aggregate?: InputMaybe<Notif_To_Subs_Aggregate_Bool_Exp>;
  p256dh?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "notification_subscription" */
export enum Notification_Subscription_Constraint {
  /** unique or primary key constraint on columns "endpoint" */
  NotificationSubscriptionEndpointKey = 'notification_subscription_endpoint_key',
  /** unique or primary key constraint on columns "id" */
  NotificationSubscriptionPkey = 'notification_subscription_pkey'
}

/** input type for inserting data into table "notification_subscription" */
export type Notification_Subscription_Insert_Input = {
  auth?: InputMaybe<Scalars['String']['input']>;
  client?: InputMaybe<Client_Obj_Rel_Insert_Input>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  endpoint?: InputMaybe<Scalars['String']['input']>;
  expirationTime?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  notif_to_subs?: InputMaybe<Notif_To_Subs_Arr_Rel_Insert_Input>;
  p256dh?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Notification_Subscription_Max_Fields = {
  __typename?: 'notification_subscription_max_fields';
  auth?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  endpoint?: Maybe<Scalars['String']['output']>;
  expirationTime?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  p256dh?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "notification_subscription" */
export type Notification_Subscription_Max_Order_By = {
  auth?: InputMaybe<Order_By>;
  clientId?: InputMaybe<Order_By>;
  endpoint?: InputMaybe<Order_By>;
  expirationTime?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  p256dh?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Notification_Subscription_Min_Fields = {
  __typename?: 'notification_subscription_min_fields';
  auth?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  endpoint?: Maybe<Scalars['String']['output']>;
  expirationTime?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  p256dh?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "notification_subscription" */
export type Notification_Subscription_Min_Order_By = {
  auth?: InputMaybe<Order_By>;
  clientId?: InputMaybe<Order_By>;
  endpoint?: InputMaybe<Order_By>;
  expirationTime?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  p256dh?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "notification_subscription" */
export type Notification_Subscription_Mutation_Response = {
  __typename?: 'notification_subscription_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Notification_Subscription>;
};

/** input type for inserting object relation for remote table "notification_subscription" */
export type Notification_Subscription_Obj_Rel_Insert_Input = {
  data: Notification_Subscription_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Notification_Subscription_On_Conflict>;
};

/** on_conflict condition type for table "notification_subscription" */
export type Notification_Subscription_On_Conflict = {
  constraint: Notification_Subscription_Constraint;
  update_columns?: Array<Notification_Subscription_Update_Column>;
  where?: InputMaybe<Notification_Subscription_Bool_Exp>;
};

/** Ordering options when selecting data from "notification_subscription". */
export type Notification_Subscription_Order_By = {
  auth?: InputMaybe<Order_By>;
  client?: InputMaybe<Client_Order_By>;
  clientId?: InputMaybe<Order_By>;
  endpoint?: InputMaybe<Order_By>;
  expirationTime?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  notif_to_subs_aggregate?: InputMaybe<Notif_To_Subs_Aggregate_Order_By>;
  p256dh?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: notification_subscription */
export type Notification_Subscription_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "notification_subscription" */
export enum Notification_Subscription_Select_Column {
  /** column name */
  Auth = 'auth',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  Endpoint = 'endpoint',
  /** column name */
  ExpirationTime = 'expirationTime',
  /** column name */
  Id = 'id',
  /** column name */
  P256dh = 'p256dh',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "notification_subscription" */
export type Notification_Subscription_Set_Input = {
  auth?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  endpoint?: InputMaybe<Scalars['String']['input']>;
  expirationTime?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  p256dh?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "notification_subscription" */
export type Notification_Subscription_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Notification_Subscription_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Notification_Subscription_Stream_Cursor_Value_Input = {
  auth?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  endpoint?: InputMaybe<Scalars['String']['input']>;
  expirationTime?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  p256dh?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "notification_subscription" */
export enum Notification_Subscription_Update_Column {
  /** column name */
  Auth = 'auth',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  Endpoint = 'endpoint',
  /** column name */
  ExpirationTime = 'expirationTime',
  /** column name */
  Id = 'id',
  /** column name */
  P256dh = 'p256dh',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Notification_Subscription_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Notification_Subscription_Set_Input>;
  /** filter the rows which have to be updated */
  where: Notification_Subscription_Bool_Exp;
};

/** update columns of table "notification" */
export enum Notification_Update_Column {
  /** column name */
  Body = 'body',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Tag = 'tag',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  Title = 'title',
  /** column name */
  Topic = 'topic',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Viewed = 'viewed'
}

export type Notification_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Notification_Set_Input>;
  /** filter the rows which have to be updated */
  where: Notification_Bool_Exp;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "account" */
  account: Array<Account>;
  /** fetch aggregated fields from the table: "account" */
  account_aggregate: Account_Aggregate;
  /** fetch data from the table: "account" using primary key columns */
  account_by_pk?: Maybe<Account>;
  /** fetch data from the table: "address" */
  address: Array<Address>;
  /** fetch aggregated fields from the table: "address" */
  address_aggregate: Address_Aggregate;
  /** fetch data from the table: "address_book" */
  address_book: Array<Address_Book>;
  /** fetch aggregated fields from the table: "address_book" */
  address_book_aggregate: Address_Book_Aggregate;
  /** fetch data from the table: "address_book" using primary key columns */
  address_book_by_pk?: Maybe<Address_Book>;
  /** fetch data from the table: "address" using primary key columns */
  address_by_pk?: Maybe<Address>;
  /** fetch data from the table: "analyze" */
  analyze: Array<Analyze>;
  /** fetch aggregated fields from the table: "analyze" */
  analyze_aggregate: Analyze_Aggregate;
  /** fetch data from the table: "analyze" using primary key columns */
  analyze_by_pk?: Maybe<Analyze>;
  /** An array relationship */
  ata: Array<Ata>;
  /** An aggregate relationship */
  ata_aggregate: Ata_Aggregate;
  /** fetch data from the table: "ata" using primary key columns */
  ata_by_pk?: Maybe<Ata>;
  /** fetch data from the table: "bitcoin" */
  bitcoin: Array<Bitcoin>;
  /** fetch aggregated fields from the table: "bitcoin" */
  bitcoin_aggregate: Bitcoin_Aggregate;
  /** fetch data from the table: "bitcoin" using primary key columns */
  bitcoin_by_pk?: Maybe<Bitcoin>;
  /** fetch data from the table: "centralized_txn" */
  centralized_txn: Array<Centralized_Txn>;
  /** fetch aggregated fields from the table: "centralized_txn" */
  centralized_txn_aggregate: Centralized_Txn_Aggregate;
  /** fetch data from the table: "centralized_txn" using primary key columns */
  centralized_txn_by_pk?: Maybe<Centralized_Txn>;
  /** fetch data from the table: "chat" */
  chat: Array<Chat>;
  /** fetch aggregated fields from the table: "chat" */
  chat_aggregate: Chat_Aggregate;
  /** fetch data from the table: "chat" using primary key columns */
  chat_by_pk?: Maybe<Chat>;
  /** fetch data from the table: "client" */
  client: Array<Client>;
  /** fetch aggregated fields from the table: "client" */
  client_aggregate: Client_Aggregate;
  /** fetch data from the table: "client" using primary key columns */
  client_by_pk?: Maybe<Client>;
  /** fetch data from the table: "client_settings" */
  client_settings: Array<Client_Settings>;
  /** fetch aggregated fields from the table: "client_settings" */
  client_settings_aggregate: Client_Settings_Aggregate;
  /** fetch data from the table: "client_settings" using primary key columns */
  client_settings_by_pk?: Maybe<Client_Settings>;
  /** fetch data from the table: "connections" */
  connections: Array<Connections>;
  /** fetch aggregated fields from the table: "connections" */
  connections_aggregate: Connections_Aggregate;
  /** fetch data from the table: "connections" using primary key columns */
  connections_by_pk?: Maybe<Connections>;
  /** fetch data from the table: "eth" */
  eth: Array<Eth>;
  /** fetch aggregated fields from the table: "eth" */
  eth_aggregate: Eth_Aggregate;
  /** fetch data from the table: "eth" using primary key columns */
  eth_by_pk?: Maybe<Eth>;
  /** fetch data from the table: "friendship" */
  friendship: Array<Friendship>;
  /** fetch aggregated fields from the table: "friendship" */
  friendship_aggregate: Friendship_Aggregate;
  /** fetch data from the table: "friendship" using primary key columns */
  friendship_by_pk?: Maybe<Friendship>;
  /** fetch data from the table: "news_letter" */
  news_letter: Array<News_Letter>;
  /** fetch aggregated fields from the table: "news_letter" */
  news_letter_aggregate: News_Letter_Aggregate;
  /** fetch data from the table: "news_letter" using primary key columns */
  news_letter_by_pk?: Maybe<News_Letter>;
  /** An array relationship */
  notif_to_subs: Array<Notif_To_Subs>;
  /** An aggregate relationship */
  notif_to_subs_aggregate: Notif_To_Subs_Aggregate;
  /** fetch data from the table: "notif_to_subs" using primary key columns */
  notif_to_subs_by_pk?: Maybe<Notif_To_Subs>;
  /** fetch data from the table: "notification" */
  notification: Array<Notification>;
  /** fetch aggregated fields from the table: "notification" */
  notification_aggregate: Notification_Aggregate;
  /** fetch data from the table: "notification" using primary key columns */
  notification_by_pk?: Maybe<Notification>;
  /** fetch data from the table: "notification_subscription" */
  notification_subscription: Array<Notification_Subscription>;
  /** fetch aggregated fields from the table: "notification_subscription" */
  notification_subscription_aggregate: Notification_Subscription_Aggregate;
  /** fetch data from the table: "notification_subscription" using primary key columns */
  notification_subscription_by_pk?: Maybe<Notification_Subscription>;
  /** fetch data from the table: "sol" */
  sol: Array<Sol>;
  /** fetch aggregated fields from the table: "sol" */
  sol_aggregate: Sol_Aggregate;
  /** fetch data from the table: "sol" using primary key columns */
  sol_by_pk?: Maybe<Sol>;
  /** fetch data from the table: "token" */
  token: Array<Token>;
  /** fetch aggregated fields from the table: "token" */
  token_aggregate: Token_Aggregate;
  /** fetch data from the table: "token" using primary key columns */
  token_by_pk?: Maybe<Token>;
  /** fetch data from the table: "token_txn" */
  token_txn: Array<Token_Txn>;
  /** fetch aggregated fields from the table: "token_txn" */
  token_txn_aggregate: Token_Txn_Aggregate;
  /** fetch data from the table: "token_txn" using primary key columns */
  token_txn_by_pk?: Maybe<Token_Txn>;
  /** An array relationship */
  transactions: Array<Transactions>;
  /** An aggregate relationship */
  transactions_aggregate: Transactions_Aggregate;
  /** fetch data from the table: "transactions" using primary key columns */
  transactions_by_pk?: Maybe<Transactions>;
  /** fetch data from the table: "wallet" */
  wallet: Array<Wallet>;
  /** fetch aggregated fields from the table: "wallet" */
  wallet_aggregate: Wallet_Aggregate;
  /** fetch data from the table: "wallet" using primary key columns */
  wallet_by_pk?: Maybe<Wallet>;
};


export type Query_RootAccountArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Query_RootAccount_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Query_RootAccount_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootAddressArgs = {
  distinct_on?: InputMaybe<Array<Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Order_By>>;
  where?: InputMaybe<Address_Bool_Exp>;
};


export type Query_RootAddress_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Order_By>>;
  where?: InputMaybe<Address_Bool_Exp>;
};


export type Query_RootAddress_BookArgs = {
  distinct_on?: InputMaybe<Array<Address_Book_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Book_Order_By>>;
  where?: InputMaybe<Address_Book_Bool_Exp>;
};


export type Query_RootAddress_Book_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Address_Book_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Book_Order_By>>;
  where?: InputMaybe<Address_Book_Bool_Exp>;
};


export type Query_RootAddress_Book_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootAddress_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootAnalyzeArgs = {
  distinct_on?: InputMaybe<Array<Analyze_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Analyze_Order_By>>;
  where?: InputMaybe<Analyze_Bool_Exp>;
};


export type Query_RootAnalyze_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Analyze_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Analyze_Order_By>>;
  where?: InputMaybe<Analyze_Bool_Exp>;
};


export type Query_RootAnalyze_By_PkArgs = {
  id: Scalars['uuid']['input'];
  walletId: Scalars['uuid']['input'];
};


export type Query_RootAtaArgs = {
  distinct_on?: InputMaybe<Array<Ata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ata_Order_By>>;
  where?: InputMaybe<Ata_Bool_Exp>;
};


export type Query_RootAta_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ata_Order_By>>;
  where?: InputMaybe<Ata_Bool_Exp>;
};


export type Query_RootAta_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootBitcoinArgs = {
  distinct_on?: InputMaybe<Array<Bitcoin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Bitcoin_Order_By>>;
  where?: InputMaybe<Bitcoin_Bool_Exp>;
};


export type Query_RootBitcoin_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Bitcoin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Bitcoin_Order_By>>;
  where?: InputMaybe<Bitcoin_Bool_Exp>;
};


export type Query_RootBitcoin_By_PkArgs = {
  accountId: Scalars['uuid']['input'];
  id: Scalars['uuid']['input'];
  publicKey: Scalars['String']['input'];
};


export type Query_RootCentralized_TxnArgs = {
  distinct_on?: InputMaybe<Array<Centralized_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Centralized_Txn_Order_By>>;
  where?: InputMaybe<Centralized_Txn_Bool_Exp>;
};


export type Query_RootCentralized_Txn_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Centralized_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Centralized_Txn_Order_By>>;
  where?: InputMaybe<Centralized_Txn_Bool_Exp>;
};


export type Query_RootCentralized_Txn_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootChatArgs = {
  distinct_on?: InputMaybe<Array<Chat_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Order_By>>;
  where?: InputMaybe<Chat_Bool_Exp>;
};


export type Query_RootChat_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chat_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Order_By>>;
  where?: InputMaybe<Chat_Bool_Exp>;
};


export type Query_RootChat_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootClientArgs = {
  distinct_on?: InputMaybe<Array<Client_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Client_Order_By>>;
  where?: InputMaybe<Client_Bool_Exp>;
};


export type Query_RootClient_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Client_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Client_Order_By>>;
  where?: InputMaybe<Client_Bool_Exp>;
};


export type Query_RootClient_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootClient_SettingsArgs = {
  distinct_on?: InputMaybe<Array<Client_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Client_Settings_Order_By>>;
  where?: InputMaybe<Client_Settings_Bool_Exp>;
};


export type Query_RootClient_Settings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Client_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Client_Settings_Order_By>>;
  where?: InputMaybe<Client_Settings_Bool_Exp>;
};


export type Query_RootClient_Settings_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootConnectionsArgs = {
  distinct_on?: InputMaybe<Array<Connections_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Connections_Order_By>>;
  where?: InputMaybe<Connections_Bool_Exp>;
};


export type Query_RootConnections_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Connections_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Connections_Order_By>>;
  where?: InputMaybe<Connections_Bool_Exp>;
};


export type Query_RootConnections_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootEthArgs = {
  distinct_on?: InputMaybe<Array<Eth_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Eth_Order_By>>;
  where?: InputMaybe<Eth_Bool_Exp>;
};


export type Query_RootEth_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Eth_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Eth_Order_By>>;
  where?: InputMaybe<Eth_Bool_Exp>;
};


export type Query_RootEth_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootFriendshipArgs = {
  distinct_on?: InputMaybe<Array<Friendship_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Friendship_Order_By>>;
  where?: InputMaybe<Friendship_Bool_Exp>;
};


export type Query_RootFriendship_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Friendship_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Friendship_Order_By>>;
  where?: InputMaybe<Friendship_Bool_Exp>;
};


export type Query_RootFriendship_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootNews_LetterArgs = {
  distinct_on?: InputMaybe<Array<News_Letter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<News_Letter_Order_By>>;
  where?: InputMaybe<News_Letter_Bool_Exp>;
};


export type Query_RootNews_Letter_AggregateArgs = {
  distinct_on?: InputMaybe<Array<News_Letter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<News_Letter_Order_By>>;
  where?: InputMaybe<News_Letter_Bool_Exp>;
};


export type Query_RootNews_Letter_By_PkArgs = {
  email: Scalars['String']['input'];
  id: Scalars['uuid']['input'];
};


export type Query_RootNotif_To_SubsArgs = {
  distinct_on?: InputMaybe<Array<Notif_To_Subs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notif_To_Subs_Order_By>>;
  where?: InputMaybe<Notif_To_Subs_Bool_Exp>;
};


export type Query_RootNotif_To_Subs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Notif_To_Subs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notif_To_Subs_Order_By>>;
  where?: InputMaybe<Notif_To_Subs_Bool_Exp>;
};


export type Query_RootNotif_To_Subs_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootNotificationArgs = {
  distinct_on?: InputMaybe<Array<Notification_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notification_Order_By>>;
  where?: InputMaybe<Notification_Bool_Exp>;
};


export type Query_RootNotification_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Notification_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notification_Order_By>>;
  where?: InputMaybe<Notification_Bool_Exp>;
};


export type Query_RootNotification_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootNotification_SubscriptionArgs = {
  distinct_on?: InputMaybe<Array<Notification_Subscription_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notification_Subscription_Order_By>>;
  where?: InputMaybe<Notification_Subscription_Bool_Exp>;
};


export type Query_RootNotification_Subscription_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Notification_Subscription_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notification_Subscription_Order_By>>;
  where?: InputMaybe<Notification_Subscription_Bool_Exp>;
};


export type Query_RootNotification_Subscription_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootSolArgs = {
  distinct_on?: InputMaybe<Array<Sol_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sol_Order_By>>;
  where?: InputMaybe<Sol_Bool_Exp>;
};


export type Query_RootSol_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sol_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sol_Order_By>>;
  where?: InputMaybe<Sol_Bool_Exp>;
};


export type Query_RootSol_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTokenArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};


export type Query_RootToken_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};


export type Query_RootToken_By_PkArgs = {
  id: Scalars['uuid']['input'];
  pubKey: Scalars['String']['input'];
};


export type Query_RootToken_TxnArgs = {
  distinct_on?: InputMaybe<Array<Token_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Txn_Order_By>>;
  where?: InputMaybe<Token_Txn_Bool_Exp>;
};


export type Query_RootToken_Txn_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Txn_Order_By>>;
  where?: InputMaybe<Token_Txn_Bool_Exp>;
};


export type Query_RootToken_Txn_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Query_RootTransactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Query_RootTransactions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootWalletArgs = {
  distinct_on?: InputMaybe<Array<Wallet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallet_Order_By>>;
  where?: InputMaybe<Wallet_Bool_Exp>;
};


export type Query_RootWallet_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wallet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallet_Order_By>>;
  where?: InputMaybe<Wallet_Bool_Exp>;
};


export type Query_RootWallet_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** solana address for client wallets */
export type Sol = {
  __typename?: 'sol';
  /** An object relationship */
  account: Account;
  accountId: Scalars['uuid']['output'];
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  privateKey: Scalars['String']['output'];
  publicKey: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregated selection of "sol" */
export type Sol_Aggregate = {
  __typename?: 'sol_aggregate';
  aggregate?: Maybe<Sol_Aggregate_Fields>;
  nodes: Array<Sol>;
};

/** aggregate fields of "sol" */
export type Sol_Aggregate_Fields = {
  __typename?: 'sol_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Sol_Max_Fields>;
  min?: Maybe<Sol_Min_Fields>;
};


/** aggregate fields of "sol" */
export type Sol_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Sol_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "sol". All fields are combined with a logical 'AND'. */
export type Sol_Bool_Exp = {
  _and?: InputMaybe<Array<Sol_Bool_Exp>>;
  _not?: InputMaybe<Sol_Bool_Exp>;
  _or?: InputMaybe<Array<Sol_Bool_Exp>>;
  account?: InputMaybe<Account_Bool_Exp>;
  accountId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  privateKey?: InputMaybe<String_Comparison_Exp>;
  publicKey?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "sol" */
export enum Sol_Constraint {
  /** unique or primary key constraint on columns "accountId" */
  SolAccountIdKey = 'sol_accountId_key',
  /** unique or primary key constraint on columns "id" */
  SolIdKey = 'sol_id_key',
  /** unique or primary key constraint on columns "id" */
  SolPkey = 'sol_pkey',
  /** unique or primary key constraint on columns "privateKey" */
  SolPrivateKeyKey = 'sol_privateKey_key',
  /** unique or primary key constraint on columns "publicKey" */
  SolPublicKeyKey = 'sol_publicKey_key'
}

/** input type for inserting data into table "sol" */
export type Sol_Insert_Input = {
  account?: InputMaybe<Account_Obj_Rel_Insert_Input>;
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  privateKey?: InputMaybe<Scalars['String']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Sol_Max_Fields = {
  __typename?: 'sol_max_fields';
  accountId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  privateKey?: Maybe<Scalars['String']['output']>;
  publicKey?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Sol_Min_Fields = {
  __typename?: 'sol_min_fields';
  accountId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  privateKey?: Maybe<Scalars['String']['output']>;
  publicKey?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "sol" */
export type Sol_Mutation_Response = {
  __typename?: 'sol_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Sol>;
};

/** input type for inserting object relation for remote table "sol" */
export type Sol_Obj_Rel_Insert_Input = {
  data: Sol_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Sol_On_Conflict>;
};

/** on_conflict condition type for table "sol" */
export type Sol_On_Conflict = {
  constraint: Sol_Constraint;
  update_columns?: Array<Sol_Update_Column>;
  where?: InputMaybe<Sol_Bool_Exp>;
};

/** Ordering options when selecting data from "sol". */
export type Sol_Order_By = {
  account?: InputMaybe<Account_Order_By>;
  accountId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  privateKey?: InputMaybe<Order_By>;
  publicKey?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: sol */
export type Sol_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "sol" */
export enum Sol_Select_Column {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  PrivateKey = 'privateKey',
  /** column name */
  PublicKey = 'publicKey',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "sol" */
export type Sol_Set_Input = {
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  privateKey?: InputMaybe<Scalars['String']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "sol" */
export type Sol_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Sol_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Sol_Stream_Cursor_Value_Input = {
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  privateKey?: InputMaybe<Scalars['String']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "sol" */
export enum Sol_Update_Column {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  PrivateKey = 'privateKey',
  /** column name */
  PublicKey = 'publicKey',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Sol_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Sol_Set_Input>;
  /** filter the rows which have to be updated */
  where: Sol_Bool_Exp;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "account" */
  account: Array<Account>;
  /** fetch aggregated fields from the table: "account" */
  account_aggregate: Account_Aggregate;
  /** fetch data from the table: "account" using primary key columns */
  account_by_pk?: Maybe<Account>;
  /** fetch data from the table in a streaming manner: "account" */
  account_stream: Array<Account>;
  /** fetch data from the table: "address" */
  address: Array<Address>;
  /** fetch aggregated fields from the table: "address" */
  address_aggregate: Address_Aggregate;
  /** fetch data from the table: "address_book" */
  address_book: Array<Address_Book>;
  /** fetch aggregated fields from the table: "address_book" */
  address_book_aggregate: Address_Book_Aggregate;
  /** fetch data from the table: "address_book" using primary key columns */
  address_book_by_pk?: Maybe<Address_Book>;
  /** fetch data from the table in a streaming manner: "address_book" */
  address_book_stream: Array<Address_Book>;
  /** fetch data from the table: "address" using primary key columns */
  address_by_pk?: Maybe<Address>;
  /** fetch data from the table in a streaming manner: "address" */
  address_stream: Array<Address>;
  /** fetch data from the table: "analyze" */
  analyze: Array<Analyze>;
  /** fetch aggregated fields from the table: "analyze" */
  analyze_aggregate: Analyze_Aggregate;
  /** fetch data from the table: "analyze" using primary key columns */
  analyze_by_pk?: Maybe<Analyze>;
  /** fetch data from the table in a streaming manner: "analyze" */
  analyze_stream: Array<Analyze>;
  /** An array relationship */
  ata: Array<Ata>;
  /** An aggregate relationship */
  ata_aggregate: Ata_Aggregate;
  /** fetch data from the table: "ata" using primary key columns */
  ata_by_pk?: Maybe<Ata>;
  /** fetch data from the table in a streaming manner: "ata" */
  ata_stream: Array<Ata>;
  /** fetch data from the table: "bitcoin" */
  bitcoin: Array<Bitcoin>;
  /** fetch aggregated fields from the table: "bitcoin" */
  bitcoin_aggregate: Bitcoin_Aggregate;
  /** fetch data from the table: "bitcoin" using primary key columns */
  bitcoin_by_pk?: Maybe<Bitcoin>;
  /** fetch data from the table in a streaming manner: "bitcoin" */
  bitcoin_stream: Array<Bitcoin>;
  /** fetch data from the table: "centralized_txn" */
  centralized_txn: Array<Centralized_Txn>;
  /** fetch aggregated fields from the table: "centralized_txn" */
  centralized_txn_aggregate: Centralized_Txn_Aggregate;
  /** fetch data from the table: "centralized_txn" using primary key columns */
  centralized_txn_by_pk?: Maybe<Centralized_Txn>;
  /** fetch data from the table in a streaming manner: "centralized_txn" */
  centralized_txn_stream: Array<Centralized_Txn>;
  /** fetch data from the table: "chat" */
  chat: Array<Chat>;
  /** fetch aggregated fields from the table: "chat" */
  chat_aggregate: Chat_Aggregate;
  /** fetch data from the table: "chat" using primary key columns */
  chat_by_pk?: Maybe<Chat>;
  /** fetch data from the table in a streaming manner: "chat" */
  chat_stream: Array<Chat>;
  /** fetch data from the table: "client" */
  client: Array<Client>;
  /** fetch aggregated fields from the table: "client" */
  client_aggregate: Client_Aggregate;
  /** fetch data from the table: "client" using primary key columns */
  client_by_pk?: Maybe<Client>;
  /** fetch data from the table: "client_settings" */
  client_settings: Array<Client_Settings>;
  /** fetch aggregated fields from the table: "client_settings" */
  client_settings_aggregate: Client_Settings_Aggregate;
  /** fetch data from the table: "client_settings" using primary key columns */
  client_settings_by_pk?: Maybe<Client_Settings>;
  /** fetch data from the table in a streaming manner: "client_settings" */
  client_settings_stream: Array<Client_Settings>;
  /** fetch data from the table in a streaming manner: "client" */
  client_stream: Array<Client>;
  /** fetch data from the table: "connections" */
  connections: Array<Connections>;
  /** fetch aggregated fields from the table: "connections" */
  connections_aggregate: Connections_Aggregate;
  /** fetch data from the table: "connections" using primary key columns */
  connections_by_pk?: Maybe<Connections>;
  /** fetch data from the table in a streaming manner: "connections" */
  connections_stream: Array<Connections>;
  /** fetch data from the table: "eth" */
  eth: Array<Eth>;
  /** fetch aggregated fields from the table: "eth" */
  eth_aggregate: Eth_Aggregate;
  /** fetch data from the table: "eth" using primary key columns */
  eth_by_pk?: Maybe<Eth>;
  /** fetch data from the table in a streaming manner: "eth" */
  eth_stream: Array<Eth>;
  /** fetch data from the table: "friendship" */
  friendship: Array<Friendship>;
  /** fetch aggregated fields from the table: "friendship" */
  friendship_aggregate: Friendship_Aggregate;
  /** fetch data from the table: "friendship" using primary key columns */
  friendship_by_pk?: Maybe<Friendship>;
  /** fetch data from the table in a streaming manner: "friendship" */
  friendship_stream: Array<Friendship>;
  /** fetch data from the table: "news_letter" */
  news_letter: Array<News_Letter>;
  /** fetch aggregated fields from the table: "news_letter" */
  news_letter_aggregate: News_Letter_Aggregate;
  /** fetch data from the table: "news_letter" using primary key columns */
  news_letter_by_pk?: Maybe<News_Letter>;
  /** fetch data from the table in a streaming manner: "news_letter" */
  news_letter_stream: Array<News_Letter>;
  /** An array relationship */
  notif_to_subs: Array<Notif_To_Subs>;
  /** An aggregate relationship */
  notif_to_subs_aggregate: Notif_To_Subs_Aggregate;
  /** fetch data from the table: "notif_to_subs" using primary key columns */
  notif_to_subs_by_pk?: Maybe<Notif_To_Subs>;
  /** fetch data from the table in a streaming manner: "notif_to_subs" */
  notif_to_subs_stream: Array<Notif_To_Subs>;
  /** fetch data from the table: "notification" */
  notification: Array<Notification>;
  /** fetch aggregated fields from the table: "notification" */
  notification_aggregate: Notification_Aggregate;
  /** fetch data from the table: "notification" using primary key columns */
  notification_by_pk?: Maybe<Notification>;
  /** fetch data from the table in a streaming manner: "notification" */
  notification_stream: Array<Notification>;
  /** fetch data from the table: "notification_subscription" */
  notification_subscription: Array<Notification_Subscription>;
  /** fetch aggregated fields from the table: "notification_subscription" */
  notification_subscription_aggregate: Notification_Subscription_Aggregate;
  /** fetch data from the table: "notification_subscription" using primary key columns */
  notification_subscription_by_pk?: Maybe<Notification_Subscription>;
  /** fetch data from the table in a streaming manner: "notification_subscription" */
  notification_subscription_stream: Array<Notification_Subscription>;
  /** fetch data from the table: "sol" */
  sol: Array<Sol>;
  /** fetch aggregated fields from the table: "sol" */
  sol_aggregate: Sol_Aggregate;
  /** fetch data from the table: "sol" using primary key columns */
  sol_by_pk?: Maybe<Sol>;
  /** fetch data from the table in a streaming manner: "sol" */
  sol_stream: Array<Sol>;
  /** fetch data from the table: "token" */
  token: Array<Token>;
  /** fetch aggregated fields from the table: "token" */
  token_aggregate: Token_Aggregate;
  /** fetch data from the table: "token" using primary key columns */
  token_by_pk?: Maybe<Token>;
  /** fetch data from the table in a streaming manner: "token" */
  token_stream: Array<Token>;
  /** fetch data from the table: "token_txn" */
  token_txn: Array<Token_Txn>;
  /** fetch aggregated fields from the table: "token_txn" */
  token_txn_aggregate: Token_Txn_Aggregate;
  /** fetch data from the table: "token_txn" using primary key columns */
  token_txn_by_pk?: Maybe<Token_Txn>;
  /** fetch data from the table in a streaming manner: "token_txn" */
  token_txn_stream: Array<Token_Txn>;
  /** An array relationship */
  transactions: Array<Transactions>;
  /** An aggregate relationship */
  transactions_aggregate: Transactions_Aggregate;
  /** fetch data from the table: "transactions" using primary key columns */
  transactions_by_pk?: Maybe<Transactions>;
  /** fetch data from the table in a streaming manner: "transactions" */
  transactions_stream: Array<Transactions>;
  /** fetch data from the table: "wallet" */
  wallet: Array<Wallet>;
  /** fetch aggregated fields from the table: "wallet" */
  wallet_aggregate: Wallet_Aggregate;
  /** fetch data from the table: "wallet" using primary key columns */
  wallet_by_pk?: Maybe<Wallet>;
  /** fetch data from the table in a streaming manner: "wallet" */
  wallet_stream: Array<Wallet>;
};


export type Subscription_RootAccountArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Subscription_RootAccount_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Subscription_RootAccount_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootAccount_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Subscription_RootAddressArgs = {
  distinct_on?: InputMaybe<Array<Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Order_By>>;
  where?: InputMaybe<Address_Bool_Exp>;
};


export type Subscription_RootAddress_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Order_By>>;
  where?: InputMaybe<Address_Bool_Exp>;
};


export type Subscription_RootAddress_BookArgs = {
  distinct_on?: InputMaybe<Array<Address_Book_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Book_Order_By>>;
  where?: InputMaybe<Address_Book_Bool_Exp>;
};


export type Subscription_RootAddress_Book_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Address_Book_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Book_Order_By>>;
  where?: InputMaybe<Address_Book_Bool_Exp>;
};


export type Subscription_RootAddress_Book_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootAddress_Book_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Address_Book_Stream_Cursor_Input>>;
  where?: InputMaybe<Address_Book_Bool_Exp>;
};


export type Subscription_RootAddress_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootAddress_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Address_Stream_Cursor_Input>>;
  where?: InputMaybe<Address_Bool_Exp>;
};


export type Subscription_RootAnalyzeArgs = {
  distinct_on?: InputMaybe<Array<Analyze_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Analyze_Order_By>>;
  where?: InputMaybe<Analyze_Bool_Exp>;
};


export type Subscription_RootAnalyze_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Analyze_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Analyze_Order_By>>;
  where?: InputMaybe<Analyze_Bool_Exp>;
};


export type Subscription_RootAnalyze_By_PkArgs = {
  id: Scalars['uuid']['input'];
  walletId: Scalars['uuid']['input'];
};


export type Subscription_RootAnalyze_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Analyze_Stream_Cursor_Input>>;
  where?: InputMaybe<Analyze_Bool_Exp>;
};


export type Subscription_RootAtaArgs = {
  distinct_on?: InputMaybe<Array<Ata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ata_Order_By>>;
  where?: InputMaybe<Ata_Bool_Exp>;
};


export type Subscription_RootAta_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ata_Order_By>>;
  where?: InputMaybe<Ata_Bool_Exp>;
};


export type Subscription_RootAta_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootAta_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Ata_Stream_Cursor_Input>>;
  where?: InputMaybe<Ata_Bool_Exp>;
};


export type Subscription_RootBitcoinArgs = {
  distinct_on?: InputMaybe<Array<Bitcoin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Bitcoin_Order_By>>;
  where?: InputMaybe<Bitcoin_Bool_Exp>;
};


export type Subscription_RootBitcoin_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Bitcoin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Bitcoin_Order_By>>;
  where?: InputMaybe<Bitcoin_Bool_Exp>;
};


export type Subscription_RootBitcoin_By_PkArgs = {
  accountId: Scalars['uuid']['input'];
  id: Scalars['uuid']['input'];
  publicKey: Scalars['String']['input'];
};


export type Subscription_RootBitcoin_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Bitcoin_Stream_Cursor_Input>>;
  where?: InputMaybe<Bitcoin_Bool_Exp>;
};


export type Subscription_RootCentralized_TxnArgs = {
  distinct_on?: InputMaybe<Array<Centralized_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Centralized_Txn_Order_By>>;
  where?: InputMaybe<Centralized_Txn_Bool_Exp>;
};


export type Subscription_RootCentralized_Txn_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Centralized_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Centralized_Txn_Order_By>>;
  where?: InputMaybe<Centralized_Txn_Bool_Exp>;
};


export type Subscription_RootCentralized_Txn_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootCentralized_Txn_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Centralized_Txn_Stream_Cursor_Input>>;
  where?: InputMaybe<Centralized_Txn_Bool_Exp>;
};


export type Subscription_RootChatArgs = {
  distinct_on?: InputMaybe<Array<Chat_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Order_By>>;
  where?: InputMaybe<Chat_Bool_Exp>;
};


export type Subscription_RootChat_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chat_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Order_By>>;
  where?: InputMaybe<Chat_Bool_Exp>;
};


export type Subscription_RootChat_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootChat_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Chat_Stream_Cursor_Input>>;
  where?: InputMaybe<Chat_Bool_Exp>;
};


export type Subscription_RootClientArgs = {
  distinct_on?: InputMaybe<Array<Client_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Client_Order_By>>;
  where?: InputMaybe<Client_Bool_Exp>;
};


export type Subscription_RootClient_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Client_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Client_Order_By>>;
  where?: InputMaybe<Client_Bool_Exp>;
};


export type Subscription_RootClient_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootClient_SettingsArgs = {
  distinct_on?: InputMaybe<Array<Client_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Client_Settings_Order_By>>;
  where?: InputMaybe<Client_Settings_Bool_Exp>;
};


export type Subscription_RootClient_Settings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Client_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Client_Settings_Order_By>>;
  where?: InputMaybe<Client_Settings_Bool_Exp>;
};


export type Subscription_RootClient_Settings_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootClient_Settings_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Client_Settings_Stream_Cursor_Input>>;
  where?: InputMaybe<Client_Settings_Bool_Exp>;
};


export type Subscription_RootClient_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Client_Stream_Cursor_Input>>;
  where?: InputMaybe<Client_Bool_Exp>;
};


export type Subscription_RootConnectionsArgs = {
  distinct_on?: InputMaybe<Array<Connections_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Connections_Order_By>>;
  where?: InputMaybe<Connections_Bool_Exp>;
};


export type Subscription_RootConnections_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Connections_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Connections_Order_By>>;
  where?: InputMaybe<Connections_Bool_Exp>;
};


export type Subscription_RootConnections_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootConnections_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Connections_Stream_Cursor_Input>>;
  where?: InputMaybe<Connections_Bool_Exp>;
};


export type Subscription_RootEthArgs = {
  distinct_on?: InputMaybe<Array<Eth_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Eth_Order_By>>;
  where?: InputMaybe<Eth_Bool_Exp>;
};


export type Subscription_RootEth_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Eth_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Eth_Order_By>>;
  where?: InputMaybe<Eth_Bool_Exp>;
};


export type Subscription_RootEth_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootEth_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Eth_Stream_Cursor_Input>>;
  where?: InputMaybe<Eth_Bool_Exp>;
};


export type Subscription_RootFriendshipArgs = {
  distinct_on?: InputMaybe<Array<Friendship_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Friendship_Order_By>>;
  where?: InputMaybe<Friendship_Bool_Exp>;
};


export type Subscription_RootFriendship_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Friendship_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Friendship_Order_By>>;
  where?: InputMaybe<Friendship_Bool_Exp>;
};


export type Subscription_RootFriendship_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootFriendship_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Friendship_Stream_Cursor_Input>>;
  where?: InputMaybe<Friendship_Bool_Exp>;
};


export type Subscription_RootNews_LetterArgs = {
  distinct_on?: InputMaybe<Array<News_Letter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<News_Letter_Order_By>>;
  where?: InputMaybe<News_Letter_Bool_Exp>;
};


export type Subscription_RootNews_Letter_AggregateArgs = {
  distinct_on?: InputMaybe<Array<News_Letter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<News_Letter_Order_By>>;
  where?: InputMaybe<News_Letter_Bool_Exp>;
};


export type Subscription_RootNews_Letter_By_PkArgs = {
  email: Scalars['String']['input'];
  id: Scalars['uuid']['input'];
};


export type Subscription_RootNews_Letter_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<News_Letter_Stream_Cursor_Input>>;
  where?: InputMaybe<News_Letter_Bool_Exp>;
};


export type Subscription_RootNotif_To_SubsArgs = {
  distinct_on?: InputMaybe<Array<Notif_To_Subs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notif_To_Subs_Order_By>>;
  where?: InputMaybe<Notif_To_Subs_Bool_Exp>;
};


export type Subscription_RootNotif_To_Subs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Notif_To_Subs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notif_To_Subs_Order_By>>;
  where?: InputMaybe<Notif_To_Subs_Bool_Exp>;
};


export type Subscription_RootNotif_To_Subs_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootNotif_To_Subs_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Notif_To_Subs_Stream_Cursor_Input>>;
  where?: InputMaybe<Notif_To_Subs_Bool_Exp>;
};


export type Subscription_RootNotificationArgs = {
  distinct_on?: InputMaybe<Array<Notification_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notification_Order_By>>;
  where?: InputMaybe<Notification_Bool_Exp>;
};


export type Subscription_RootNotification_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Notification_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notification_Order_By>>;
  where?: InputMaybe<Notification_Bool_Exp>;
};


export type Subscription_RootNotification_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootNotification_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Notification_Stream_Cursor_Input>>;
  where?: InputMaybe<Notification_Bool_Exp>;
};


export type Subscription_RootNotification_SubscriptionArgs = {
  distinct_on?: InputMaybe<Array<Notification_Subscription_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notification_Subscription_Order_By>>;
  where?: InputMaybe<Notification_Subscription_Bool_Exp>;
};


export type Subscription_RootNotification_Subscription_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Notification_Subscription_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Notification_Subscription_Order_By>>;
  where?: InputMaybe<Notification_Subscription_Bool_Exp>;
};


export type Subscription_RootNotification_Subscription_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootNotification_Subscription_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Notification_Subscription_Stream_Cursor_Input>>;
  where?: InputMaybe<Notification_Subscription_Bool_Exp>;
};


export type Subscription_RootSolArgs = {
  distinct_on?: InputMaybe<Array<Sol_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sol_Order_By>>;
  where?: InputMaybe<Sol_Bool_Exp>;
};


export type Subscription_RootSol_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sol_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sol_Order_By>>;
  where?: InputMaybe<Sol_Bool_Exp>;
};


export type Subscription_RootSol_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootSol_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Sol_Stream_Cursor_Input>>;
  where?: InputMaybe<Sol_Bool_Exp>;
};


export type Subscription_RootTokenArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};


export type Subscription_RootToken_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};


export type Subscription_RootToken_By_PkArgs = {
  id: Scalars['uuid']['input'];
  pubKey: Scalars['String']['input'];
};


export type Subscription_RootToken_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Token_Stream_Cursor_Input>>;
  where?: InputMaybe<Token_Bool_Exp>;
};


export type Subscription_RootToken_TxnArgs = {
  distinct_on?: InputMaybe<Array<Token_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Txn_Order_By>>;
  where?: InputMaybe<Token_Txn_Bool_Exp>;
};


export type Subscription_RootToken_Txn_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Txn_Order_By>>;
  where?: InputMaybe<Token_Txn_Bool_Exp>;
};


export type Subscription_RootToken_Txn_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootToken_Txn_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Token_Txn_Stream_Cursor_Input>>;
  where?: InputMaybe<Token_Txn_Bool_Exp>;
};


export type Subscription_RootTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Subscription_RootTransactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Subscription_RootTransactions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootTransactions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Transactions_Stream_Cursor_Input>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Subscription_RootWalletArgs = {
  distinct_on?: InputMaybe<Array<Wallet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallet_Order_By>>;
  where?: InputMaybe<Wallet_Bool_Exp>;
};


export type Subscription_RootWallet_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wallet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallet_Order_By>>;
  where?: InputMaybe<Wallet_Bool_Exp>;
};


export type Subscription_RootWallet_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootWallet_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Wallet_Stream_Cursor_Input>>;
  where?: InputMaybe<Wallet_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** table storing all the mint token infos */
export type Token = {
  __typename?: 'token';
  /** An array relationship */
  ata: Array<Ata>;
  /** An aggregate relationship */
  ata_aggregate: Ata_Aggregate;
  authority: Scalars['String']['output'];
  /** An object relationship */
  client: Client;
  clientId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  description: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  network: Scalars['String']['output'];
  privateKey: Scalars['String']['output'];
  pubKey: Scalars['String']['output'];
  /** An array relationship */
  token_txns: Array<Token_Txn>;
  /** An aggregate relationship */
  token_txns_aggregate: Token_Txn_Aggregate;
  updatedAt: Scalars['timestamptz']['output'];
};


/** table storing all the mint token infos */
export type TokenAtaArgs = {
  distinct_on?: InputMaybe<Array<Ata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ata_Order_By>>;
  where?: InputMaybe<Ata_Bool_Exp>;
};


/** table storing all the mint token infos */
export type TokenAta_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ata_Order_By>>;
  where?: InputMaybe<Ata_Bool_Exp>;
};


/** table storing all the mint token infos */
export type TokenToken_TxnsArgs = {
  distinct_on?: InputMaybe<Array<Token_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Txn_Order_By>>;
  where?: InputMaybe<Token_Txn_Bool_Exp>;
};


/** table storing all the mint token infos */
export type TokenToken_Txns_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Txn_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Txn_Order_By>>;
  where?: InputMaybe<Token_Txn_Bool_Exp>;
};

/** aggregated selection of "token" */
export type Token_Aggregate = {
  __typename?: 'token_aggregate';
  aggregate?: Maybe<Token_Aggregate_Fields>;
  nodes: Array<Token>;
};

export type Token_Aggregate_Bool_Exp = {
  count?: InputMaybe<Token_Aggregate_Bool_Exp_Count>;
};

export type Token_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Token_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Token_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "token" */
export type Token_Aggregate_Fields = {
  __typename?: 'token_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Token_Max_Fields>;
  min?: Maybe<Token_Min_Fields>;
};


/** aggregate fields of "token" */
export type Token_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Token_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "token" */
export type Token_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Token_Max_Order_By>;
  min?: InputMaybe<Token_Min_Order_By>;
};

/** input type for inserting array relation for remote table "token" */
export type Token_Arr_Rel_Insert_Input = {
  data: Array<Token_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Token_On_Conflict>;
};

/** Boolean expression to filter rows from the table "token". All fields are combined with a logical 'AND'. */
export type Token_Bool_Exp = {
  _and?: InputMaybe<Array<Token_Bool_Exp>>;
  _not?: InputMaybe<Token_Bool_Exp>;
  _or?: InputMaybe<Array<Token_Bool_Exp>>;
  ata?: InputMaybe<Ata_Bool_Exp>;
  ata_aggregate?: InputMaybe<Ata_Aggregate_Bool_Exp>;
  authority?: InputMaybe<String_Comparison_Exp>;
  client?: InputMaybe<Client_Bool_Exp>;
  clientId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  network?: InputMaybe<String_Comparison_Exp>;
  privateKey?: InputMaybe<String_Comparison_Exp>;
  pubKey?: InputMaybe<String_Comparison_Exp>;
  token_txns?: InputMaybe<Token_Txn_Bool_Exp>;
  token_txns_aggregate?: InputMaybe<Token_Txn_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "token" */
export enum Token_Constraint {
  /** unique or primary key constraint on columns "authority" */
  MintTokensAuthorityKey = 'mint_tokens_authority_key',
  /** unique or primary key constraint on columns "id", "pubKey" */
  MintTokensPkey = 'mint_tokens_pkey',
  /** unique or primary key constraint on columns "privateKey" */
  MintTokensPrivateKeyKey = 'mint_tokens_privateKey_key',
  /** unique or primary key constraint on columns "pubKey" */
  MintTokensPubKeyKey = 'mint_tokens_pubKey_key'
}

/** input type for inserting data into table "token" */
export type Token_Insert_Input = {
  ata?: InputMaybe<Ata_Arr_Rel_Insert_Input>;
  authority?: InputMaybe<Scalars['String']['input']>;
  client?: InputMaybe<Client_Obj_Rel_Insert_Input>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  network?: InputMaybe<Scalars['String']['input']>;
  privateKey?: InputMaybe<Scalars['String']['input']>;
  pubKey?: InputMaybe<Scalars['String']['input']>;
  token_txns?: InputMaybe<Token_Txn_Arr_Rel_Insert_Input>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Token_Max_Fields = {
  __typename?: 'token_max_fields';
  authority?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  network?: Maybe<Scalars['String']['output']>;
  privateKey?: Maybe<Scalars['String']['output']>;
  pubKey?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "token" */
export type Token_Max_Order_By = {
  authority?: InputMaybe<Order_By>;
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  network?: InputMaybe<Order_By>;
  privateKey?: InputMaybe<Order_By>;
  pubKey?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Token_Min_Fields = {
  __typename?: 'token_min_fields';
  authority?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  network?: Maybe<Scalars['String']['output']>;
  privateKey?: Maybe<Scalars['String']['output']>;
  pubKey?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "token" */
export type Token_Min_Order_By = {
  authority?: InputMaybe<Order_By>;
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  network?: InputMaybe<Order_By>;
  privateKey?: InputMaybe<Order_By>;
  pubKey?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "token" */
export type Token_Mutation_Response = {
  __typename?: 'token_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Token>;
};

/** input type for inserting object relation for remote table "token" */
export type Token_Obj_Rel_Insert_Input = {
  data: Token_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Token_On_Conflict>;
};

/** on_conflict condition type for table "token" */
export type Token_On_Conflict = {
  constraint: Token_Constraint;
  update_columns?: Array<Token_Update_Column>;
  where?: InputMaybe<Token_Bool_Exp>;
};

/** Ordering options when selecting data from "token". */
export type Token_Order_By = {
  ata_aggregate?: InputMaybe<Ata_Aggregate_Order_By>;
  authority?: InputMaybe<Order_By>;
  client?: InputMaybe<Client_Order_By>;
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  network?: InputMaybe<Order_By>;
  privateKey?: InputMaybe<Order_By>;
  pubKey?: InputMaybe<Order_By>;
  token_txns_aggregate?: InputMaybe<Token_Txn_Aggregate_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: token */
export type Token_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
  pubKey: Scalars['String']['input'];
};

/** select columns of table "token" */
export enum Token_Select_Column {
  /** column name */
  Authority = 'authority',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Network = 'network',
  /** column name */
  PrivateKey = 'privateKey',
  /** column name */
  PubKey = 'pubKey',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "token" */
export type Token_Set_Input = {
  authority?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  network?: InputMaybe<Scalars['String']['input']>;
  privateKey?: InputMaybe<Scalars['String']['input']>;
  pubKey?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "token" */
export type Token_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Token_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Token_Stream_Cursor_Value_Input = {
  authority?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  network?: InputMaybe<Scalars['String']['input']>;
  privateKey?: InputMaybe<Scalars['String']['input']>;
  pubKey?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** all the token transactions */
export type Token_Txn = {
  __typename?: 'token_txn';
  amount: Scalars['float8']['output'];
  blockHash: Scalars['String']['output'];
  clientId: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  fee: Scalars['float8']['output'];
  fromAta: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  isMint: Scalars['Boolean']['output'];
  network: Scalars['String']['output'];
  slot: Scalars['bigint']['output'];
  status: Scalars['String']['output'];
  time: Scalars['timestamptz']['output'];
  toAta: Scalars['String']['output'];
  token: Scalars['String']['output'];
  /** An object relationship */
  token_txn_to_client: Client;
  /** An object relationship */
  token_txn_to_token: Token;
  /** An object relationship */
  txn_fromAta_to_ata: Ata;
  /** An object relationship */
  txn_toAta_to_ata: Ata;
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "token_txn" */
export type Token_Txn_Aggregate = {
  __typename?: 'token_txn_aggregate';
  aggregate?: Maybe<Token_Txn_Aggregate_Fields>;
  nodes: Array<Token_Txn>;
};

export type Token_Txn_Aggregate_Bool_Exp = {
  avg?: InputMaybe<Token_Txn_Aggregate_Bool_Exp_Avg>;
  bool_and?: InputMaybe<Token_Txn_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Token_Txn_Aggregate_Bool_Exp_Bool_Or>;
  corr?: InputMaybe<Token_Txn_Aggregate_Bool_Exp_Corr>;
  count?: InputMaybe<Token_Txn_Aggregate_Bool_Exp_Count>;
  covar_samp?: InputMaybe<Token_Txn_Aggregate_Bool_Exp_Covar_Samp>;
  max?: InputMaybe<Token_Txn_Aggregate_Bool_Exp_Max>;
  min?: InputMaybe<Token_Txn_Aggregate_Bool_Exp_Min>;
  stddev_samp?: InputMaybe<Token_Txn_Aggregate_Bool_Exp_Stddev_Samp>;
  sum?: InputMaybe<Token_Txn_Aggregate_Bool_Exp_Sum>;
  var_samp?: InputMaybe<Token_Txn_Aggregate_Bool_Exp_Var_Samp>;
};

export type Token_Txn_Aggregate_Bool_Exp_Avg = {
  arguments: Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Avg_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Token_Txn_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Token_Txn_Aggregate_Bool_Exp_Bool_And = {
  arguments: Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Token_Txn_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Token_Txn_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Token_Txn_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Token_Txn_Aggregate_Bool_Exp_Corr = {
  arguments: Token_Txn_Aggregate_Bool_Exp_Corr_Arguments;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Token_Txn_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Token_Txn_Aggregate_Bool_Exp_Corr_Arguments = {
  X: Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Corr_Arguments_Columns;
  Y: Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Corr_Arguments_Columns;
};

export type Token_Txn_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Token_Txn_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Token_Txn_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

export type Token_Txn_Aggregate_Bool_Exp_Covar_Samp = {
  arguments: Token_Txn_Aggregate_Bool_Exp_Covar_Samp_Arguments;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Token_Txn_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Token_Txn_Aggregate_Bool_Exp_Covar_Samp_Arguments = {
  X: Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
  Y: Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
};

export type Token_Txn_Aggregate_Bool_Exp_Max = {
  arguments: Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Max_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Token_Txn_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Token_Txn_Aggregate_Bool_Exp_Min = {
  arguments: Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Min_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Token_Txn_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Token_Txn_Aggregate_Bool_Exp_Stddev_Samp = {
  arguments: Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Token_Txn_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Token_Txn_Aggregate_Bool_Exp_Sum = {
  arguments: Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Sum_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Token_Txn_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Token_Txn_Aggregate_Bool_Exp_Var_Samp = {
  arguments: Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Token_Txn_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

/** aggregate fields of "token_txn" */
export type Token_Txn_Aggregate_Fields = {
  __typename?: 'token_txn_aggregate_fields';
  avg?: Maybe<Token_Txn_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Token_Txn_Max_Fields>;
  min?: Maybe<Token_Txn_Min_Fields>;
  stddev?: Maybe<Token_Txn_Stddev_Fields>;
  stddev_pop?: Maybe<Token_Txn_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Token_Txn_Stddev_Samp_Fields>;
  sum?: Maybe<Token_Txn_Sum_Fields>;
  var_pop?: Maybe<Token_Txn_Var_Pop_Fields>;
  var_samp?: Maybe<Token_Txn_Var_Samp_Fields>;
  variance?: Maybe<Token_Txn_Variance_Fields>;
};


/** aggregate fields of "token_txn" */
export type Token_Txn_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Token_Txn_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "token_txn" */
export type Token_Txn_Aggregate_Order_By = {
  avg?: InputMaybe<Token_Txn_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Token_Txn_Max_Order_By>;
  min?: InputMaybe<Token_Txn_Min_Order_By>;
  stddev?: InputMaybe<Token_Txn_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Token_Txn_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Token_Txn_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Token_Txn_Sum_Order_By>;
  var_pop?: InputMaybe<Token_Txn_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Token_Txn_Var_Samp_Order_By>;
  variance?: InputMaybe<Token_Txn_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "token_txn" */
export type Token_Txn_Arr_Rel_Insert_Input = {
  data: Array<Token_Txn_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Token_Txn_On_Conflict>;
};

/** aggregate avg on columns */
export type Token_Txn_Avg_Fields = {
  __typename?: 'token_txn_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  slot?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "token_txn" */
export type Token_Txn_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "token_txn". All fields are combined with a logical 'AND'. */
export type Token_Txn_Bool_Exp = {
  _and?: InputMaybe<Array<Token_Txn_Bool_Exp>>;
  _not?: InputMaybe<Token_Txn_Bool_Exp>;
  _or?: InputMaybe<Array<Token_Txn_Bool_Exp>>;
  amount?: InputMaybe<Float8_Comparison_Exp>;
  blockHash?: InputMaybe<String_Comparison_Exp>;
  clientId?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  fee?: InputMaybe<Float8_Comparison_Exp>;
  fromAta?: InputMaybe<String_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isMint?: InputMaybe<Boolean_Comparison_Exp>;
  network?: InputMaybe<String_Comparison_Exp>;
  slot?: InputMaybe<Bigint_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  time?: InputMaybe<Timestamptz_Comparison_Exp>;
  toAta?: InputMaybe<String_Comparison_Exp>;
  token?: InputMaybe<String_Comparison_Exp>;
  token_txn_to_client?: InputMaybe<Client_Bool_Exp>;
  token_txn_to_token?: InputMaybe<Token_Bool_Exp>;
  txn_fromAta_to_ata?: InputMaybe<Ata_Bool_Exp>;
  txn_toAta_to_ata?: InputMaybe<Ata_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "token_txn" */
export enum Token_Txn_Constraint {
  /** unique or primary key constraint on columns "id" */
  TokenTxnPkey = 'token_txn_pkey'
}

/** input type for incrementing numeric columns in table "token_txn" */
export type Token_Txn_Inc_Input = {
  amount?: InputMaybe<Scalars['float8']['input']>;
  fee?: InputMaybe<Scalars['float8']['input']>;
  slot?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "token_txn" */
export type Token_Txn_Insert_Input = {
  amount?: InputMaybe<Scalars['float8']['input']>;
  blockHash?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  fee?: InputMaybe<Scalars['float8']['input']>;
  fromAta?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  isMint?: InputMaybe<Scalars['Boolean']['input']>;
  network?: InputMaybe<Scalars['String']['input']>;
  slot?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['timestamptz']['input']>;
  toAta?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_txn_to_client?: InputMaybe<Client_Obj_Rel_Insert_Input>;
  token_txn_to_token?: InputMaybe<Token_Obj_Rel_Insert_Input>;
  txn_fromAta_to_ata?: InputMaybe<Ata_Obj_Rel_Insert_Input>;
  txn_toAta_to_ata?: InputMaybe<Ata_Obj_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Token_Txn_Max_Fields = {
  __typename?: 'token_txn_max_fields';
  amount?: Maybe<Scalars['float8']['output']>;
  blockHash?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  fee?: Maybe<Scalars['float8']['output']>;
  fromAta?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  network?: Maybe<Scalars['String']['output']>;
  slot?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['timestamptz']['output']>;
  toAta?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "token_txn" */
export type Token_Txn_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  blockHash?: InputMaybe<Order_By>;
  clientId?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  fromAta?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  network?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  toAta?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Token_Txn_Min_Fields = {
  __typename?: 'token_txn_min_fields';
  amount?: Maybe<Scalars['float8']['output']>;
  blockHash?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  fee?: Maybe<Scalars['float8']['output']>;
  fromAta?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  network?: Maybe<Scalars['String']['output']>;
  slot?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['timestamptz']['output']>;
  toAta?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "token_txn" */
export type Token_Txn_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  blockHash?: InputMaybe<Order_By>;
  clientId?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  fromAta?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  network?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  toAta?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "token_txn" */
export type Token_Txn_Mutation_Response = {
  __typename?: 'token_txn_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Token_Txn>;
};

/** on_conflict condition type for table "token_txn" */
export type Token_Txn_On_Conflict = {
  constraint: Token_Txn_Constraint;
  update_columns?: Array<Token_Txn_Update_Column>;
  where?: InputMaybe<Token_Txn_Bool_Exp>;
};

/** Ordering options when selecting data from "token_txn". */
export type Token_Txn_Order_By = {
  amount?: InputMaybe<Order_By>;
  blockHash?: InputMaybe<Order_By>;
  clientId?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  fromAta?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isMint?: InputMaybe<Order_By>;
  network?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  toAta?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  token_txn_to_client?: InputMaybe<Client_Order_By>;
  token_txn_to_token?: InputMaybe<Token_Order_By>;
  txn_fromAta_to_ata?: InputMaybe<Ata_Order_By>;
  txn_toAta_to_ata?: InputMaybe<Ata_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: token_txn */
export type Token_Txn_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "token_txn" */
export enum Token_Txn_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  BlockHash = 'blockHash',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Fee = 'fee',
  /** column name */
  FromAta = 'fromAta',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  IsMint = 'isMint',
  /** column name */
  Network = 'network',
  /** column name */
  Slot = 'slot',
  /** column name */
  Status = 'status',
  /** column name */
  Time = 'time',
  /** column name */
  ToAta = 'toAta',
  /** column name */
  Token = 'token',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** select "token_txn_aggregate_bool_exp_avg_arguments_columns" columns of table "token_txn" */
export enum Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Avg_Arguments_Columns {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee'
}

/** select "token_txn_aggregate_bool_exp_bool_and_arguments_columns" columns of table "token_txn" */
export enum Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsMint = 'isMint'
}

/** select "token_txn_aggregate_bool_exp_bool_or_arguments_columns" columns of table "token_txn" */
export enum Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsMint = 'isMint'
}

/** select "token_txn_aggregate_bool_exp_corr_arguments_columns" columns of table "token_txn" */
export enum Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Corr_Arguments_Columns {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee'
}

/** select "token_txn_aggregate_bool_exp_covar_samp_arguments_columns" columns of table "token_txn" */
export enum Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee'
}

/** select "token_txn_aggregate_bool_exp_max_arguments_columns" columns of table "token_txn" */
export enum Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Max_Arguments_Columns {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee'
}

/** select "token_txn_aggregate_bool_exp_min_arguments_columns" columns of table "token_txn" */
export enum Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Min_Arguments_Columns {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee'
}

/** select "token_txn_aggregate_bool_exp_stddev_samp_arguments_columns" columns of table "token_txn" */
export enum Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee'
}

/** select "token_txn_aggregate_bool_exp_sum_arguments_columns" columns of table "token_txn" */
export enum Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Sum_Arguments_Columns {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee'
}

/** select "token_txn_aggregate_bool_exp_var_samp_arguments_columns" columns of table "token_txn" */
export enum Token_Txn_Select_Column_Token_Txn_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee'
}

/** input type for updating data in table "token_txn" */
export type Token_Txn_Set_Input = {
  amount?: InputMaybe<Scalars['float8']['input']>;
  blockHash?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  fee?: InputMaybe<Scalars['float8']['input']>;
  fromAta?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  isMint?: InputMaybe<Scalars['Boolean']['input']>;
  network?: InputMaybe<Scalars['String']['input']>;
  slot?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['timestamptz']['input']>;
  toAta?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Token_Txn_Stddev_Fields = {
  __typename?: 'token_txn_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  slot?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "token_txn" */
export type Token_Txn_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Token_Txn_Stddev_Pop_Fields = {
  __typename?: 'token_txn_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  slot?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "token_txn" */
export type Token_Txn_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Token_Txn_Stddev_Samp_Fields = {
  __typename?: 'token_txn_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  slot?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "token_txn" */
export type Token_Txn_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "token_txn" */
export type Token_Txn_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Token_Txn_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Token_Txn_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['float8']['input']>;
  blockHash?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  fee?: InputMaybe<Scalars['float8']['input']>;
  fromAta?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  isMint?: InputMaybe<Scalars['Boolean']['input']>;
  network?: InputMaybe<Scalars['String']['input']>;
  slot?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['timestamptz']['input']>;
  toAta?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Token_Txn_Sum_Fields = {
  __typename?: 'token_txn_sum_fields';
  amount?: Maybe<Scalars['float8']['output']>;
  fee?: Maybe<Scalars['float8']['output']>;
  slot?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "token_txn" */
export type Token_Txn_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
};

/** update columns of table "token_txn" */
export enum Token_Txn_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  BlockHash = 'blockHash',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Fee = 'fee',
  /** column name */
  FromAta = 'fromAta',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  IsMint = 'isMint',
  /** column name */
  Network = 'network',
  /** column name */
  Slot = 'slot',
  /** column name */
  Status = 'status',
  /** column name */
  Time = 'time',
  /** column name */
  ToAta = 'toAta',
  /** column name */
  Token = 'token',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Token_Txn_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Token_Txn_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Token_Txn_Set_Input>;
  /** filter the rows which have to be updated */
  where: Token_Txn_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Token_Txn_Var_Pop_Fields = {
  __typename?: 'token_txn_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  slot?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "token_txn" */
export type Token_Txn_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Token_Txn_Var_Samp_Fields = {
  __typename?: 'token_txn_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  slot?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "token_txn" */
export type Token_Txn_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Token_Txn_Variance_Fields = {
  __typename?: 'token_txn_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  slot?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "token_txn" */
export type Token_Txn_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
};

/** update columns of table "token" */
export enum Token_Update_Column {
  /** column name */
  Authority = 'authority',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Network = 'network',
  /** column name */
  PrivateKey = 'privateKey',
  /** column name */
  PubKey = 'pubKey',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Token_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Token_Set_Input>;
  /** filter the rows which have to be updated */
  where: Token_Bool_Exp;
};

/** transactions table  */
export type Transactions = {
  __typename?: 'transactions';
  amount: Scalars['float8']['output'];
  blockHash: Scalars['String']['output'];
  chainId?: Maybe<Scalars['bigint']['output']>;
  /** An object relationship */
  client: Client;
  clientId: Scalars['uuid']['output'];
  cluster?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  fee: Scalars['float8']['output'];
  from: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  network: Scalars['String']['output'];
  nonce?: Maybe<Scalars['bigint']['output']>;
  slot?: Maybe<Scalars['bigint']['output']>;
  status: Scalars['String']['output'];
  time: Scalars['timestamptz']['output'];
  to: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregated selection of "transactions" */
export type Transactions_Aggregate = {
  __typename?: 'transactions_aggregate';
  aggregate?: Maybe<Transactions_Aggregate_Fields>;
  nodes: Array<Transactions>;
};

export type Transactions_Aggregate_Bool_Exp = {
  avg?: InputMaybe<Transactions_Aggregate_Bool_Exp_Avg>;
  corr?: InputMaybe<Transactions_Aggregate_Bool_Exp_Corr>;
  count?: InputMaybe<Transactions_Aggregate_Bool_Exp_Count>;
  covar_samp?: InputMaybe<Transactions_Aggregate_Bool_Exp_Covar_Samp>;
  max?: InputMaybe<Transactions_Aggregate_Bool_Exp_Max>;
  min?: InputMaybe<Transactions_Aggregate_Bool_Exp_Min>;
  stddev_samp?: InputMaybe<Transactions_Aggregate_Bool_Exp_Stddev_Samp>;
  sum?: InputMaybe<Transactions_Aggregate_Bool_Exp_Sum>;
  var_samp?: InputMaybe<Transactions_Aggregate_Bool_Exp_Var_Samp>;
};

export type Transactions_Aggregate_Bool_Exp_Avg = {
  arguments: Transactions_Select_Column_Transactions_Aggregate_Bool_Exp_Avg_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Transactions_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Transactions_Aggregate_Bool_Exp_Corr = {
  arguments: Transactions_Aggregate_Bool_Exp_Corr_Arguments;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Transactions_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Transactions_Aggregate_Bool_Exp_Corr_Arguments = {
  X: Transactions_Select_Column_Transactions_Aggregate_Bool_Exp_Corr_Arguments_Columns;
  Y: Transactions_Select_Column_Transactions_Aggregate_Bool_Exp_Corr_Arguments_Columns;
};

export type Transactions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Transactions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Transactions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

export type Transactions_Aggregate_Bool_Exp_Covar_Samp = {
  arguments: Transactions_Aggregate_Bool_Exp_Covar_Samp_Arguments;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Transactions_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Transactions_Aggregate_Bool_Exp_Covar_Samp_Arguments = {
  X: Transactions_Select_Column_Transactions_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
  Y: Transactions_Select_Column_Transactions_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
};

export type Transactions_Aggregate_Bool_Exp_Max = {
  arguments: Transactions_Select_Column_Transactions_Aggregate_Bool_Exp_Max_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Transactions_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Transactions_Aggregate_Bool_Exp_Min = {
  arguments: Transactions_Select_Column_Transactions_Aggregate_Bool_Exp_Min_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Transactions_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Transactions_Aggregate_Bool_Exp_Stddev_Samp = {
  arguments: Transactions_Select_Column_Transactions_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Transactions_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Transactions_Aggregate_Bool_Exp_Sum = {
  arguments: Transactions_Select_Column_Transactions_Aggregate_Bool_Exp_Sum_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Transactions_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Transactions_Aggregate_Bool_Exp_Var_Samp = {
  arguments: Transactions_Select_Column_Transactions_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Transactions_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

/** aggregate fields of "transactions" */
export type Transactions_Aggregate_Fields = {
  __typename?: 'transactions_aggregate_fields';
  avg?: Maybe<Transactions_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Transactions_Max_Fields>;
  min?: Maybe<Transactions_Min_Fields>;
  stddev?: Maybe<Transactions_Stddev_Fields>;
  stddev_pop?: Maybe<Transactions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Transactions_Stddev_Samp_Fields>;
  sum?: Maybe<Transactions_Sum_Fields>;
  var_pop?: Maybe<Transactions_Var_Pop_Fields>;
  var_samp?: Maybe<Transactions_Var_Samp_Fields>;
  variance?: Maybe<Transactions_Variance_Fields>;
};


/** aggregate fields of "transactions" */
export type Transactions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Transactions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "transactions" */
export type Transactions_Aggregate_Order_By = {
  avg?: InputMaybe<Transactions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Transactions_Max_Order_By>;
  min?: InputMaybe<Transactions_Min_Order_By>;
  stddev?: InputMaybe<Transactions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Transactions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Transactions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Transactions_Sum_Order_By>;
  var_pop?: InputMaybe<Transactions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Transactions_Var_Samp_Order_By>;
  variance?: InputMaybe<Transactions_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "transactions" */
export type Transactions_Arr_Rel_Insert_Input = {
  data: Array<Transactions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Transactions_On_Conflict>;
};

/** aggregate avg on columns */
export type Transactions_Avg_Fields = {
  __typename?: 'transactions_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  slot?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "transactions" */
export type Transactions_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "transactions". All fields are combined with a logical 'AND'. */
export type Transactions_Bool_Exp = {
  _and?: InputMaybe<Array<Transactions_Bool_Exp>>;
  _not?: InputMaybe<Transactions_Bool_Exp>;
  _or?: InputMaybe<Array<Transactions_Bool_Exp>>;
  amount?: InputMaybe<Float8_Comparison_Exp>;
  blockHash?: InputMaybe<String_Comparison_Exp>;
  chainId?: InputMaybe<Bigint_Comparison_Exp>;
  client?: InputMaybe<Client_Bool_Exp>;
  clientId?: InputMaybe<Uuid_Comparison_Exp>;
  cluster?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  fee?: InputMaybe<Float8_Comparison_Exp>;
  from?: InputMaybe<String_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  network?: InputMaybe<String_Comparison_Exp>;
  nonce?: InputMaybe<Bigint_Comparison_Exp>;
  slot?: InputMaybe<Bigint_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  time?: InputMaybe<Timestamptz_Comparison_Exp>;
  to?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "transactions" */
export enum Transactions_Constraint {
  /** unique or primary key constraint on columns "hash" */
  TransactionsHashKey = 'transactions_hash_key',
  /** unique or primary key constraint on columns "id" */
  TransactionsPkey = 'transactions_pkey'
}

/** input type for incrementing numeric columns in table "transactions" */
export type Transactions_Inc_Input = {
  amount?: InputMaybe<Scalars['float8']['input']>;
  chainId?: InputMaybe<Scalars['bigint']['input']>;
  fee?: InputMaybe<Scalars['float8']['input']>;
  nonce?: InputMaybe<Scalars['bigint']['input']>;
  slot?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "transactions" */
export type Transactions_Insert_Input = {
  amount?: InputMaybe<Scalars['float8']['input']>;
  blockHash?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['bigint']['input']>;
  client?: InputMaybe<Client_Obj_Rel_Insert_Input>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  cluster?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  fee?: InputMaybe<Scalars['float8']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  network?: InputMaybe<Scalars['String']['input']>;
  nonce?: InputMaybe<Scalars['bigint']['input']>;
  slot?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['timestamptz']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Transactions_Max_Fields = {
  __typename?: 'transactions_max_fields';
  amount?: Maybe<Scalars['float8']['output']>;
  blockHash?: Maybe<Scalars['String']['output']>;
  chainId?: Maybe<Scalars['bigint']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  cluster?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  fee?: Maybe<Scalars['float8']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  network?: Maybe<Scalars['String']['output']>;
  nonce?: Maybe<Scalars['bigint']['output']>;
  slot?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['timestamptz']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "transactions" */
export type Transactions_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  blockHash?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  clientId?: InputMaybe<Order_By>;
  cluster?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  network?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Transactions_Min_Fields = {
  __typename?: 'transactions_min_fields';
  amount?: Maybe<Scalars['float8']['output']>;
  blockHash?: Maybe<Scalars['String']['output']>;
  chainId?: Maybe<Scalars['bigint']['output']>;
  clientId?: Maybe<Scalars['uuid']['output']>;
  cluster?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  fee?: Maybe<Scalars['float8']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  network?: Maybe<Scalars['String']['output']>;
  nonce?: Maybe<Scalars['bigint']['output']>;
  slot?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['timestamptz']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "transactions" */
export type Transactions_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  blockHash?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  clientId?: InputMaybe<Order_By>;
  cluster?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  network?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "transactions" */
export type Transactions_Mutation_Response = {
  __typename?: 'transactions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Transactions>;
};

/** on_conflict condition type for table "transactions" */
export type Transactions_On_Conflict = {
  constraint: Transactions_Constraint;
  update_columns?: Array<Transactions_Update_Column>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};

/** Ordering options when selecting data from "transactions". */
export type Transactions_Order_By = {
  amount?: InputMaybe<Order_By>;
  blockHash?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  client?: InputMaybe<Client_Order_By>;
  clientId?: InputMaybe<Order_By>;
  cluster?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  network?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: transactions */
export type Transactions_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "transactions" */
export enum Transactions_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  BlockHash = 'blockHash',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  Cluster = 'cluster',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Fee = 'fee',
  /** column name */
  From = 'from',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  Network = 'network',
  /** column name */
  Nonce = 'nonce',
  /** column name */
  Slot = 'slot',
  /** column name */
  Status = 'status',
  /** column name */
  Time = 'time',
  /** column name */
  To = 'to',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** select "transactions_aggregate_bool_exp_avg_arguments_columns" columns of table "transactions" */
export enum Transactions_Select_Column_Transactions_Aggregate_Bool_Exp_Avg_Arguments_Columns {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee'
}

/** select "transactions_aggregate_bool_exp_corr_arguments_columns" columns of table "transactions" */
export enum Transactions_Select_Column_Transactions_Aggregate_Bool_Exp_Corr_Arguments_Columns {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee'
}

/** select "transactions_aggregate_bool_exp_covar_samp_arguments_columns" columns of table "transactions" */
export enum Transactions_Select_Column_Transactions_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee'
}

/** select "transactions_aggregate_bool_exp_max_arguments_columns" columns of table "transactions" */
export enum Transactions_Select_Column_Transactions_Aggregate_Bool_Exp_Max_Arguments_Columns {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee'
}

/** select "transactions_aggregate_bool_exp_min_arguments_columns" columns of table "transactions" */
export enum Transactions_Select_Column_Transactions_Aggregate_Bool_Exp_Min_Arguments_Columns {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee'
}

/** select "transactions_aggregate_bool_exp_stddev_samp_arguments_columns" columns of table "transactions" */
export enum Transactions_Select_Column_Transactions_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee'
}

/** select "transactions_aggregate_bool_exp_sum_arguments_columns" columns of table "transactions" */
export enum Transactions_Select_Column_Transactions_Aggregate_Bool_Exp_Sum_Arguments_Columns {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee'
}

/** select "transactions_aggregate_bool_exp_var_samp_arguments_columns" columns of table "transactions" */
export enum Transactions_Select_Column_Transactions_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns {
  /** column name */
  Amount = 'amount',
  /** column name */
  Fee = 'fee'
}

/** input type for updating data in table "transactions" */
export type Transactions_Set_Input = {
  amount?: InputMaybe<Scalars['float8']['input']>;
  blockHash?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['bigint']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  cluster?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  fee?: InputMaybe<Scalars['float8']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  network?: InputMaybe<Scalars['String']['input']>;
  nonce?: InputMaybe<Scalars['bigint']['input']>;
  slot?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['timestamptz']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Transactions_Stddev_Fields = {
  __typename?: 'transactions_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  slot?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "transactions" */
export type Transactions_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Transactions_Stddev_Pop_Fields = {
  __typename?: 'transactions_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  slot?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "transactions" */
export type Transactions_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Transactions_Stddev_Samp_Fields = {
  __typename?: 'transactions_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  slot?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "transactions" */
export type Transactions_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "transactions" */
export type Transactions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Transactions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Transactions_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['float8']['input']>;
  blockHash?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['bigint']['input']>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  cluster?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  fee?: InputMaybe<Scalars['float8']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  network?: InputMaybe<Scalars['String']['input']>;
  nonce?: InputMaybe<Scalars['bigint']['input']>;
  slot?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['timestamptz']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Transactions_Sum_Fields = {
  __typename?: 'transactions_sum_fields';
  amount?: Maybe<Scalars['float8']['output']>;
  chainId?: Maybe<Scalars['bigint']['output']>;
  fee?: Maybe<Scalars['float8']['output']>;
  nonce?: Maybe<Scalars['bigint']['output']>;
  slot?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "transactions" */
export type Transactions_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
};

/** update columns of table "transactions" */
export enum Transactions_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  BlockHash = 'blockHash',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  ClientId = 'clientId',
  /** column name */
  Cluster = 'cluster',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Fee = 'fee',
  /** column name */
  From = 'from',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  Network = 'network',
  /** column name */
  Nonce = 'nonce',
  /** column name */
  Slot = 'slot',
  /** column name */
  Status = 'status',
  /** column name */
  Time = 'time',
  /** column name */
  To = 'to',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Transactions_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Transactions_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Transactions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Transactions_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Transactions_Var_Pop_Fields = {
  __typename?: 'transactions_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  slot?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "transactions" */
export type Transactions_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Transactions_Var_Samp_Fields = {
  __typename?: 'transactions_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  slot?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "transactions" */
export type Transactions_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Transactions_Variance_Fields = {
  __typename?: 'transactions_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  chainId?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  slot?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "transactions" */
export type Transactions_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

/** wallets info for clients */
export type Wallet = {
  __typename?: 'wallet';
  /** An array relationship */
  accounts: Array<Account>;
  /** An aggregate relationship */
  accounts_aggregate: Account_Aggregate;
  /** An object relationship */
  analyze?: Maybe<Analyze>;
  /** An object relationship */
  client: Client;
  clientId: Scalars['uuid']['output'];
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  secretPhase: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};


/** wallets info for clients */
export type WalletAccountsArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


/** wallets info for clients */
export type WalletAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};

/** aggregated selection of "wallet" */
export type Wallet_Aggregate = {
  __typename?: 'wallet_aggregate';
  aggregate?: Maybe<Wallet_Aggregate_Fields>;
  nodes: Array<Wallet>;
};

export type Wallet_Aggregate_Bool_Exp = {
  count?: InputMaybe<Wallet_Aggregate_Bool_Exp_Count>;
};

export type Wallet_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Wallet_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Wallet_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "wallet" */
export type Wallet_Aggregate_Fields = {
  __typename?: 'wallet_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Wallet_Max_Fields>;
  min?: Maybe<Wallet_Min_Fields>;
};


/** aggregate fields of "wallet" */
export type Wallet_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Wallet_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "wallet" */
export type Wallet_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Wallet_Max_Order_By>;
  min?: InputMaybe<Wallet_Min_Order_By>;
};

/** input type for inserting array relation for remote table "wallet" */
export type Wallet_Arr_Rel_Insert_Input = {
  data: Array<Wallet_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Wallet_On_Conflict>;
};

/** Boolean expression to filter rows from the table "wallet". All fields are combined with a logical 'AND'. */
export type Wallet_Bool_Exp = {
  _and?: InputMaybe<Array<Wallet_Bool_Exp>>;
  _not?: InputMaybe<Wallet_Bool_Exp>;
  _or?: InputMaybe<Array<Wallet_Bool_Exp>>;
  accounts?: InputMaybe<Account_Bool_Exp>;
  accounts_aggregate?: InputMaybe<Account_Aggregate_Bool_Exp>;
  analyze?: InputMaybe<Analyze_Bool_Exp>;
  client?: InputMaybe<Client_Bool_Exp>;
  clientId?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  secretPhase?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "wallet" */
export enum Wallet_Constraint {
  /** unique or primary key constraint on columns "id" */
  WalletIdKey = 'wallet_id_key',
  /** unique or primary key constraint on columns "id" */
  WalletPkey = 'wallet_pkey',
  /** unique or primary key constraint on columns "secretPhase" */
  WalletSecretPhaseKey = 'wallet_secretPhase_key'
}

/** input type for inserting data into table "wallet" */
export type Wallet_Insert_Input = {
  accounts?: InputMaybe<Account_Arr_Rel_Insert_Input>;
  analyze?: InputMaybe<Analyze_Obj_Rel_Insert_Input>;
  client?: InputMaybe<Client_Obj_Rel_Insert_Input>;
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  secretPhase?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Wallet_Max_Fields = {
  __typename?: 'wallet_max_fields';
  clientId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  secretPhase?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "wallet" */
export type Wallet_Max_Order_By = {
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  secretPhase?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Wallet_Min_Fields = {
  __typename?: 'wallet_min_fields';
  clientId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  secretPhase?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "wallet" */
export type Wallet_Min_Order_By = {
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  secretPhase?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "wallet" */
export type Wallet_Mutation_Response = {
  __typename?: 'wallet_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Wallet>;
};

/** input type for inserting object relation for remote table "wallet" */
export type Wallet_Obj_Rel_Insert_Input = {
  data: Wallet_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Wallet_On_Conflict>;
};

/** on_conflict condition type for table "wallet" */
export type Wallet_On_Conflict = {
  constraint: Wallet_Constraint;
  update_columns?: Array<Wallet_Update_Column>;
  where?: InputMaybe<Wallet_Bool_Exp>;
};

/** Ordering options when selecting data from "wallet". */
export type Wallet_Order_By = {
  accounts_aggregate?: InputMaybe<Account_Aggregate_Order_By>;
  analyze?: InputMaybe<Analyze_Order_By>;
  client?: InputMaybe<Client_Order_By>;
  clientId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  secretPhase?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: wallet */
export type Wallet_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "wallet" */
export enum Wallet_Select_Column {
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  SecretPhase = 'secretPhase',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "wallet" */
export type Wallet_Set_Input = {
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  secretPhase?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "wallet" */
export type Wallet_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Wallet_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Wallet_Stream_Cursor_Value_Input = {
  clientId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  secretPhase?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "wallet" */
export enum Wallet_Update_Column {
  /** column name */
  ClientId = 'clientId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  SecretPhase = 'secretPhase',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Wallet_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Wallet_Set_Input>;
  /** filter the rows which have to be updated */
  where: Wallet_Bool_Exp;
};
