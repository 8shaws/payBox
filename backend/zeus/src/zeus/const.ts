/* eslint-disable */

export const AllTypesProps: Record<string, any> = {
  Int_comparison_exp: {},
  String_comparison_exp: {},
  address_aggregate_fields: {
    count: {
      columns: "address_select_column",
    },
  },
  address_bool_exp: {
    _and: "address_bool_exp",
    _not: "address_bool_exp",
    _or: "address_bool_exp",
    bitcoin: "String_comparison_exp",
    client: "client_bool_exp",
    client_id: "uuid_comparison_exp",
    eth: "String_comparison_exp",
    id: "uuid_comparison_exp",
    sol: "String_comparison_exp",
    usdc: "String_comparison_exp",
  },
  address_constraint: "enum" as const,
  address_insert_input: {
    client: "client_obj_rel_insert_input",
    client_id: "uuid",
    id: "uuid",
  },
  address_obj_rel_insert_input: {
    data: "address_insert_input",
    on_conflict: "address_on_conflict",
  },
  address_on_conflict: {
    constraint: "address_constraint",
    update_columns: "address_update_column",
    where: "address_bool_exp",
  },
  address_order_by: {
    bitcoin: "order_by",
    client: "client_order_by",
    client_id: "order_by",
    eth: "order_by",
    id: "order_by",
    sol: "order_by",
    usdc: "order_by",
  },
  address_pk_columns_input: {
    id: "uuid",
  },
  address_select_column: "enum" as const,
  address_set_input: {
    client_id: "uuid",
    id: "uuid",
  },
  address_stream_cursor_input: {
    initial_value: "address_stream_cursor_value_input",
    ordering: "cursor_ordering",
  },
  address_stream_cursor_value_input: {
    client_id: "uuid",
    id: "uuid",
  },
  address_update_column: "enum" as const,
  address_updates: {
    _set: "address_set_input",
    where: "address_bool_exp",
  },
  bigint: `scalar.bigint` as const,
  bigint_comparison_exp: {
    _eq: "bigint",
    _gt: "bigint",
    _gte: "bigint",
    _in: "bigint",
    _lt: "bigint",
    _lte: "bigint",
    _neq: "bigint",
    _nin: "bigint",
  },
  client: {
    transactions: {
      distinct_on: "transactions_select_column",
      order_by: "transactions_order_by",
      where: "transactions_bool_exp",
    },
    transactions_aggregate: {
      distinct_on: "transactions_select_column",
      order_by: "transactions_order_by",
      where: "transactions_bool_exp",
    },
  },
  client_aggregate_fields: {
    count: {
      columns: "client_select_column",
    },
  },
  client_bool_exp: {
    _and: "client_bool_exp",
    _not: "client_bool_exp",
    _or: "client_bool_exp",
    address: "address_bool_exp",
    email: "String_comparison_exp",
    firstname: "String_comparison_exp",
    id: "uuid_comparison_exp",
    lastname: "String_comparison_exp",
    mobile: "bigint_comparison_exp",
    password: "String_comparison_exp",
    transactions: "transactions_bool_exp",
    transactions_aggregate: "transactions_aggregate_bool_exp",
    username: "String_comparison_exp",
  },
  client_constraint: "enum" as const,
  client_inc_input: {
    mobile: "bigint",
  },
  client_insert_input: {
    address: "address_obj_rel_insert_input",
    id: "uuid",
    mobile: "bigint",
    transactions: "transactions_arr_rel_insert_input",
  },
  client_obj_rel_insert_input: {
    data: "client_insert_input",
    on_conflict: "client_on_conflict",
  },
  client_on_conflict: {
    constraint: "client_constraint",
    update_columns: "client_update_column",
    where: "client_bool_exp",
  },
  client_order_by: {
    address: "address_order_by",
    email: "order_by",
    firstname: "order_by",
    id: "order_by",
    lastname: "order_by",
    mobile: "order_by",
    password: "order_by",
    transactions_aggregate: "transactions_aggregate_order_by",
    username: "order_by",
  },
  client_pk_columns_input: {
    id: "uuid",
  },
  client_select_column: "enum" as const,
  client_set_input: {
    id: "uuid",
    mobile: "bigint",
  },
  client_stream_cursor_input: {
    initial_value: "client_stream_cursor_value_input",
    ordering: "cursor_ordering",
  },
  client_stream_cursor_value_input: {
    id: "uuid",
    mobile: "bigint",
  },
  client_update_column: "enum" as const,
  client_updates: {
    _inc: "client_inc_input",
    _set: "client_set_input",
    where: "client_bool_exp",
  },
  cursor_ordering: "enum" as const,
  date: `scalar.date` as const,
  date_comparison_exp: {
    _eq: "date",
    _gt: "date",
    _gte: "date",
    _in: "date",
    _lt: "date",
    _lte: "date",
    _neq: "date",
    _nin: "date",
  },
  float8: `scalar.float8` as const,
  float8_comparison_exp: {
    _eq: "float8",
    _gt: "float8",
    _gte: "float8",
    _in: "float8",
    _lt: "float8",
    _lte: "float8",
    _neq: "float8",
    _nin: "float8",
  },
  jsonb: `scalar.jsonb` as const,
  jsonb_cast_exp: {
    String: "String_comparison_exp",
  },
  jsonb_comparison_exp: {
    _cast: "jsonb_cast_exp",
    _contained_in: "jsonb",
    _contains: "jsonb",
    _eq: "jsonb",
    _gt: "jsonb",
    _gte: "jsonb",
    _in: "jsonb",
    _lt: "jsonb",
    _lte: "jsonb",
    _neq: "jsonb",
    _nin: "jsonb",
  },
  mutation_root: {
    delete_address: {
      where: "address_bool_exp",
    },
    delete_address_by_pk: {
      id: "uuid",
    },
    delete_client: {
      where: "client_bool_exp",
    },
    delete_client_by_pk: {
      id: "uuid",
    },
    delete_transactions: {
      where: "transactions_bool_exp",
    },
    delete_transactions_by_pk: {
      id: "uuid",
    },
    insert_address: {
      objects: "address_insert_input",
      on_conflict: "address_on_conflict",
    },
    insert_address_one: {
      object: "address_insert_input",
      on_conflict: "address_on_conflict",
    },
    insert_client: {
      objects: "client_insert_input",
      on_conflict: "client_on_conflict",
    },
    insert_client_one: {
      object: "client_insert_input",
      on_conflict: "client_on_conflict",
    },
    insert_transactions: {
      objects: "transactions_insert_input",
      on_conflict: "transactions_on_conflict",
    },
    insert_transactions_one: {
      object: "transactions_insert_input",
      on_conflict: "transactions_on_conflict",
    },
    update_address: {
      _set: "address_set_input",
      where: "address_bool_exp",
    },
    update_address_by_pk: {
      _set: "address_set_input",
      pk_columns: "address_pk_columns_input",
    },
    update_address_many: {
      updates: "address_updates",
    },
    update_client: {
      _inc: "client_inc_input",
      _set: "client_set_input",
      where: "client_bool_exp",
    },
    update_client_by_pk: {
      _inc: "client_inc_input",
      _set: "client_set_input",
      pk_columns: "client_pk_columns_input",
    },
    update_client_many: {
      updates: "client_updates",
    },
    update_transactions: {
      _append: "transactions_append_input",
      _delete_at_path: "transactions_delete_at_path_input",
      _delete_elem: "transactions_delete_elem_input",
      _delete_key: "transactions_delete_key_input",
      _inc: "transactions_inc_input",
      _prepend: "transactions_prepend_input",
      _set: "transactions_set_input",
      where: "transactions_bool_exp",
    },
    update_transactions_by_pk: {
      _append: "transactions_append_input",
      _delete_at_path: "transactions_delete_at_path_input",
      _delete_elem: "transactions_delete_elem_input",
      _delete_key: "transactions_delete_key_input",
      _inc: "transactions_inc_input",
      _prepend: "transactions_prepend_input",
      _set: "transactions_set_input",
      pk_columns: "transactions_pk_columns_input",
    },
    update_transactions_many: {
      updates: "transactions_updates",
    },
  },
  order_by: "enum" as const,
  query_root: {
    address: {
      distinct_on: "address_select_column",
      order_by: "address_order_by",
      where: "address_bool_exp",
    },
    address_aggregate: {
      distinct_on: "address_select_column",
      order_by: "address_order_by",
      where: "address_bool_exp",
    },
    address_by_pk: {
      id: "uuid",
    },
    client: {
      distinct_on: "client_select_column",
      order_by: "client_order_by",
      where: "client_bool_exp",
    },
    client_aggregate: {
      distinct_on: "client_select_column",
      order_by: "client_order_by",
      where: "client_bool_exp",
    },
    client_by_pk: {
      id: "uuid",
    },
    transactions: {
      distinct_on: "transactions_select_column",
      order_by: "transactions_order_by",
      where: "transactions_bool_exp",
    },
    transactions_aggregate: {
      distinct_on: "transactions_select_column",
      order_by: "transactions_order_by",
      where: "transactions_bool_exp",
    },
    transactions_by_pk: {
      id: "uuid",
    },
  },
  subscription_root: {
    address: {
      distinct_on: "address_select_column",
      order_by: "address_order_by",
      where: "address_bool_exp",
    },
    address_aggregate: {
      distinct_on: "address_select_column",
      order_by: "address_order_by",
      where: "address_bool_exp",
    },
    address_by_pk: {
      id: "uuid",
    },
    address_stream: {
      cursor: "address_stream_cursor_input",
      where: "address_bool_exp",
    },
    client: {
      distinct_on: "client_select_column",
      order_by: "client_order_by",
      where: "client_bool_exp",
    },
    client_aggregate: {
      distinct_on: "client_select_column",
      order_by: "client_order_by",
      where: "client_bool_exp",
    },
    client_by_pk: {
      id: "uuid",
    },
    client_stream: {
      cursor: "client_stream_cursor_input",
      where: "client_bool_exp",
    },
    transactions: {
      distinct_on: "transactions_select_column",
      order_by: "transactions_order_by",
      where: "transactions_bool_exp",
    },
    transactions_aggregate: {
      distinct_on: "transactions_select_column",
      order_by: "transactions_order_by",
      where: "transactions_bool_exp",
    },
    transactions_by_pk: {
      id: "uuid",
    },
    transactions_stream: {
      cursor: "transactions_stream_cursor_input",
      where: "transactions_bool_exp",
    },
  },
  transactions: {
    post_balances: {},
    pre_balances: {},
    signature: {},
  },
  transactions_aggregate_bool_exp: {
    avg: "transactions_aggregate_bool_exp_avg",
    corr: "transactions_aggregate_bool_exp_corr",
    count: "transactions_aggregate_bool_exp_count",
    covar_samp: "transactions_aggregate_bool_exp_covar_samp",
    max: "transactions_aggregate_bool_exp_max",
    min: "transactions_aggregate_bool_exp_min",
    stddev_samp: "transactions_aggregate_bool_exp_stddev_samp",
    sum: "transactions_aggregate_bool_exp_sum",
    var_samp: "transactions_aggregate_bool_exp_var_samp",
  },
  transactions_aggregate_bool_exp_avg: {
    arguments:
      "transactions_select_column_transactions_aggregate_bool_exp_avg_arguments_columns",
    filter: "transactions_bool_exp",
    predicate: "float8_comparison_exp",
  },
  transactions_aggregate_bool_exp_corr: {
    arguments: "transactions_aggregate_bool_exp_corr_arguments",
    filter: "transactions_bool_exp",
    predicate: "float8_comparison_exp",
  },
  transactions_aggregate_bool_exp_corr_arguments: {
    X: "transactions_select_column_transactions_aggregate_bool_exp_corr_arguments_columns",
    Y: "transactions_select_column_transactions_aggregate_bool_exp_corr_arguments_columns",
  },
  transactions_aggregate_bool_exp_count: {
    arguments: "transactions_select_column",
    filter: "transactions_bool_exp",
    predicate: "Int_comparison_exp",
  },
  transactions_aggregate_bool_exp_covar_samp: {
    arguments: "transactions_aggregate_bool_exp_covar_samp_arguments",
    filter: "transactions_bool_exp",
    predicate: "float8_comparison_exp",
  },
  transactions_aggregate_bool_exp_covar_samp_arguments: {
    X: "transactions_select_column_transactions_aggregate_bool_exp_covar_samp_arguments_columns",
    Y: "transactions_select_column_transactions_aggregate_bool_exp_covar_samp_arguments_columns",
  },
  transactions_aggregate_bool_exp_max: {
    arguments:
      "transactions_select_column_transactions_aggregate_bool_exp_max_arguments_columns",
    filter: "transactions_bool_exp",
    predicate: "float8_comparison_exp",
  },
  transactions_aggregate_bool_exp_min: {
    arguments:
      "transactions_select_column_transactions_aggregate_bool_exp_min_arguments_columns",
    filter: "transactions_bool_exp",
    predicate: "float8_comparison_exp",
  },
  transactions_aggregate_bool_exp_stddev_samp: {
    arguments:
      "transactions_select_column_transactions_aggregate_bool_exp_stddev_samp_arguments_columns",
    filter: "transactions_bool_exp",
    predicate: "float8_comparison_exp",
  },
  transactions_aggregate_bool_exp_sum: {
    arguments:
      "transactions_select_column_transactions_aggregate_bool_exp_sum_arguments_columns",
    filter: "transactions_bool_exp",
    predicate: "float8_comparison_exp",
  },
  transactions_aggregate_bool_exp_var_samp: {
    arguments:
      "transactions_select_column_transactions_aggregate_bool_exp_var_samp_arguments_columns",
    filter: "transactions_bool_exp",
    predicate: "float8_comparison_exp",
  },
  transactions_aggregate_fields: {
    count: {
      columns: "transactions_select_column",
    },
  },
  transactions_aggregate_order_by: {
    avg: "transactions_avg_order_by",
    count: "order_by",
    max: "transactions_max_order_by",
    min: "transactions_min_order_by",
    stddev: "transactions_stddev_order_by",
    stddev_pop: "transactions_stddev_pop_order_by",
    stddev_samp: "transactions_stddev_samp_order_by",
    sum: "transactions_sum_order_by",
    var_pop: "transactions_var_pop_order_by",
    var_samp: "transactions_var_samp_order_by",
    variance: "transactions_variance_order_by",
  },
  transactions_append_input: {
    post_balances: "jsonb",
    pre_balances: "jsonb",
    signature: "jsonb",
  },
  transactions_arr_rel_insert_input: {
    data: "transactions_insert_input",
    on_conflict: "transactions_on_conflict",
  },
  transactions_avg_order_by: {
    amount: "order_by",
    block_time: "order_by",
    fee: "order_by",
    slot: "order_by",
  },
  transactions_bool_exp: {
    _and: "transactions_bool_exp",
    _not: "transactions_bool_exp",
    _or: "transactions_bool_exp",
    amount: "float8_comparison_exp",
    block_time: "bigint_comparison_exp",
    client: "client_bool_exp",
    client_id: "uuid_comparison_exp",
    date: "date_comparison_exp",
    fee: "float8_comparison_exp",
    from: "String_comparison_exp",
    id: "uuid_comparison_exp",
    network: "String_comparison_exp",
    post_balances: "jsonb_comparison_exp",
    pre_balances: "jsonb_comparison_exp",
    recent_blockhash: "String_comparison_exp",
    signature: "jsonb_comparison_exp",
    slot: "bigint_comparison_exp",
    to: "String_comparison_exp",
  },
  transactions_constraint: "enum" as const,
  transactions_delete_at_path_input: {},
  transactions_delete_elem_input: {},
  transactions_delete_key_input: {},
  transactions_inc_input: {
    amount: "float8",
    block_time: "bigint",
    fee: "float8",
    slot: "bigint",
  },
  transactions_insert_input: {
    amount: "float8",
    block_time: "bigint",
    client: "client_obj_rel_insert_input",
    client_id: "uuid",
    date: "date",
    fee: "float8",
    id: "uuid",
    post_balances: "jsonb",
    pre_balances: "jsonb",
    signature: "jsonb",
    slot: "bigint",
  },
  transactions_max_order_by: {
    amount: "order_by",
    block_time: "order_by",
    client_id: "order_by",
    date: "order_by",
    fee: "order_by",
    from: "order_by",
    id: "order_by",
    network: "order_by",
    recent_blockhash: "order_by",
    slot: "order_by",
    to: "order_by",
  },
  transactions_min_order_by: {
    amount: "order_by",
    block_time: "order_by",
    client_id: "order_by",
    date: "order_by",
    fee: "order_by",
    from: "order_by",
    id: "order_by",
    network: "order_by",
    recent_blockhash: "order_by",
    slot: "order_by",
    to: "order_by",
  },
  transactions_on_conflict: {
    constraint: "transactions_constraint",
    update_columns: "transactions_update_column",
    where: "transactions_bool_exp",
  },
  transactions_order_by: {
    amount: "order_by",
    block_time: "order_by",
    client: "client_order_by",
    client_id: "order_by",
    date: "order_by",
    fee: "order_by",
    from: "order_by",
    id: "order_by",
    network: "order_by",
    post_balances: "order_by",
    pre_balances: "order_by",
    recent_blockhash: "order_by",
    signature: "order_by",
    slot: "order_by",
    to: "order_by",
  },
  transactions_pk_columns_input: {
    id: "uuid",
  },
  transactions_prepend_input: {
    post_balances: "jsonb",
    pre_balances: "jsonb",
    signature: "jsonb",
  },
  transactions_select_column: "enum" as const,
  transactions_select_column_transactions_aggregate_bool_exp_avg_arguments_columns:
    "enum" as const,
  transactions_select_column_transactions_aggregate_bool_exp_corr_arguments_columns:
    "enum" as const,
  transactions_select_column_transactions_aggregate_bool_exp_covar_samp_arguments_columns:
    "enum" as const,
  transactions_select_column_transactions_aggregate_bool_exp_max_arguments_columns:
    "enum" as const,
  transactions_select_column_transactions_aggregate_bool_exp_min_arguments_columns:
    "enum" as const,
  transactions_select_column_transactions_aggregate_bool_exp_stddev_samp_arguments_columns:
    "enum" as const,
  transactions_select_column_transactions_aggregate_bool_exp_sum_arguments_columns:
    "enum" as const,
  transactions_select_column_transactions_aggregate_bool_exp_var_samp_arguments_columns:
    "enum" as const,
  transactions_set_input: {
    amount: "float8",
    block_time: "bigint",
    client_id: "uuid",
    date: "date",
    fee: "float8",
    id: "uuid",
    post_balances: "jsonb",
    pre_balances: "jsonb",
    signature: "jsonb",
    slot: "bigint",
  },
  transactions_stddev_order_by: {
    amount: "order_by",
    block_time: "order_by",
    fee: "order_by",
    slot: "order_by",
  },
  transactions_stddev_pop_order_by: {
    amount: "order_by",
    block_time: "order_by",
    fee: "order_by",
    slot: "order_by",
  },
  transactions_stddev_samp_order_by: {
    amount: "order_by",
    block_time: "order_by",
    fee: "order_by",
    slot: "order_by",
  },
  transactions_stream_cursor_input: {
    initial_value: "transactions_stream_cursor_value_input",
    ordering: "cursor_ordering",
  },
  transactions_stream_cursor_value_input: {
    amount: "float8",
    block_time: "bigint",
    client_id: "uuid",
    date: "date",
    fee: "float8",
    id: "uuid",
    post_balances: "jsonb",
    pre_balances: "jsonb",
    signature: "jsonb",
    slot: "bigint",
  },
  transactions_sum_order_by: {
    amount: "order_by",
    block_time: "order_by",
    fee: "order_by",
    slot: "order_by",
  },
  transactions_update_column: "enum" as const,
  transactions_updates: {
    _append: "transactions_append_input",
    _delete_at_path: "transactions_delete_at_path_input",
    _delete_elem: "transactions_delete_elem_input",
    _delete_key: "transactions_delete_key_input",
    _inc: "transactions_inc_input",
    _prepend: "transactions_prepend_input",
    _set: "transactions_set_input",
    where: "transactions_bool_exp",
  },
  transactions_var_pop_order_by: {
    amount: "order_by",
    block_time: "order_by",
    fee: "order_by",
    slot: "order_by",
  },
  transactions_var_samp_order_by: {
    amount: "order_by",
    block_time: "order_by",
    fee: "order_by",
    slot: "order_by",
  },
  transactions_variance_order_by: {
    amount: "order_by",
    block_time: "order_by",
    fee: "order_by",
    slot: "order_by",
  },
  uuid: `scalar.uuid` as const,
  uuid_comparison_exp: {
    _eq: "uuid",
    _gt: "uuid",
    _gte: "uuid",
    _in: "uuid",
    _lt: "uuid",
    _lte: "uuid",
    _neq: "uuid",
    _nin: "uuid",
  },
};

export const ReturnTypes: Record<string, any> = {
  cached: {
    ttl: "Int",
    refresh: "Boolean",
  },
  address: {
    bitcoin: "String",
    client: "client",
    client_id: "uuid",
    eth: "String",
    id: "uuid",
    sol: "String",
    usdc: "String",
  },
  address_aggregate: {
    aggregate: "address_aggregate_fields",
    nodes: "address",
  },
  address_aggregate_fields: {
    count: "Int",
    max: "address_max_fields",
    min: "address_min_fields",
  },
  address_max_fields: {
    bitcoin: "String",
    client_id: "uuid",
    eth: "String",
    id: "uuid",
    sol: "String",
    usdc: "String",
  },
  address_min_fields: {
    bitcoin: "String",
    client_id: "uuid",
    eth: "String",
    id: "uuid",
    sol: "String",
    usdc: "String",
  },
  address_mutation_response: {
    affected_rows: "Int",
    returning: "address",
  },
  bigint: `scalar.bigint` as const,
  client: {
    address: "address",
    email: "String",
    firstname: "String",
    id: "uuid",
    lastname: "String",
    mobile: "bigint",
    password: "String",
    transactions: "transactions",
    transactions_aggregate: "transactions_aggregate",
    username: "String",
  },
  client_aggregate: {
    aggregate: "client_aggregate_fields",
    nodes: "client",
  },
  client_aggregate_fields: {
    avg: "client_avg_fields",
    count: "Int",
    max: "client_max_fields",
    min: "client_min_fields",
    stddev: "client_stddev_fields",
    stddev_pop: "client_stddev_pop_fields",
    stddev_samp: "client_stddev_samp_fields",
    sum: "client_sum_fields",
    var_pop: "client_var_pop_fields",
    var_samp: "client_var_samp_fields",
    variance: "client_variance_fields",
  },
  client_avg_fields: {
    mobile: "Float",
  },
  client_max_fields: {
    email: "String",
    firstname: "String",
    id: "uuid",
    lastname: "String",
    mobile: "bigint",
    password: "String",
    username: "String",
  },
  client_min_fields: {
    email: "String",
    firstname: "String",
    id: "uuid",
    lastname: "String",
    mobile: "bigint",
    password: "String",
    username: "String",
  },
  client_mutation_response: {
    affected_rows: "Int",
    returning: "client",
  },
  client_stddev_fields: {
    mobile: "Float",
  },
  client_stddev_pop_fields: {
    mobile: "Float",
  },
  client_stddev_samp_fields: {
    mobile: "Float",
  },
  client_sum_fields: {
    mobile: "bigint",
  },
  client_var_pop_fields: {
    mobile: "Float",
  },
  client_var_samp_fields: {
    mobile: "Float",
  },
  client_variance_fields: {
    mobile: "Float",
  },
  date: `scalar.date` as const,
  float8: `scalar.float8` as const,
  jsonb: `scalar.jsonb` as const,
  mutation_root: {
    delete_address: "address_mutation_response",
    delete_address_by_pk: "address",
    delete_client: "client_mutation_response",
    delete_client_by_pk: "client",
    delete_transactions: "transactions_mutation_response",
    delete_transactions_by_pk: "transactions",
    insert_address: "address_mutation_response",
    insert_address_one: "address",
    insert_client: "client_mutation_response",
    insert_client_one: "client",
    insert_transactions: "transactions_mutation_response",
    insert_transactions_one: "transactions",
    update_address: "address_mutation_response",
    update_address_by_pk: "address",
    update_address_many: "address_mutation_response",
    update_client: "client_mutation_response",
    update_client_by_pk: "client",
    update_client_many: "client_mutation_response",
    update_transactions: "transactions_mutation_response",
    update_transactions_by_pk: "transactions",
    update_transactions_many: "transactions_mutation_response",
  },
  query_root: {
    address: "address",
    address_aggregate: "address_aggregate",
    address_by_pk: "address",
    client: "client",
    client_aggregate: "client_aggregate",
    client_by_pk: "client",
    transactions: "transactions",
    transactions_aggregate: "transactions_aggregate",
    transactions_by_pk: "transactions",
  },
  subscription_root: {
    address: "address",
    address_aggregate: "address_aggregate",
    address_by_pk: "address",
    address_stream: "address",
    client: "client",
    client_aggregate: "client_aggregate",
    client_by_pk: "client",
    client_stream: "client",
    transactions: "transactions",
    transactions_aggregate: "transactions_aggregate",
    transactions_by_pk: "transactions",
    transactions_stream: "transactions",
  },
  transactions: {
    amount: "float8",
    block_time: "bigint",
    client: "client",
    client_id: "uuid",
    date: "date",
    fee: "float8",
    from: "String",
    id: "uuid",
    network: "String",
    post_balances: "jsonb",
    pre_balances: "jsonb",
    recent_blockhash: "String",
    signature: "jsonb",
    slot: "bigint",
    to: "String",
  },
  transactions_aggregate: {
    aggregate: "transactions_aggregate_fields",
    nodes: "transactions",
  },
  transactions_aggregate_fields: {
    avg: "transactions_avg_fields",
    count: "Int",
    max: "transactions_max_fields",
    min: "transactions_min_fields",
    stddev: "transactions_stddev_fields",
    stddev_pop: "transactions_stddev_pop_fields",
    stddev_samp: "transactions_stddev_samp_fields",
    sum: "transactions_sum_fields",
    var_pop: "transactions_var_pop_fields",
    var_samp: "transactions_var_samp_fields",
    variance: "transactions_variance_fields",
  },
  transactions_avg_fields: {
    amount: "Float",
    block_time: "Float",
    fee: "Float",
    slot: "Float",
  },
  transactions_max_fields: {
    amount: "float8",
    block_time: "bigint",
    client_id: "uuid",
    date: "date",
    fee: "float8",
    from: "String",
    id: "uuid",
    network: "String",
    recent_blockhash: "String",
    slot: "bigint",
    to: "String",
  },
  transactions_min_fields: {
    amount: "float8",
    block_time: "bigint",
    client_id: "uuid",
    date: "date",
    fee: "float8",
    from: "String",
    id: "uuid",
    network: "String",
    recent_blockhash: "String",
    slot: "bigint",
    to: "String",
  },
  transactions_mutation_response: {
    affected_rows: "Int",
    returning: "transactions",
  },
  transactions_stddev_fields: {
    amount: "Float",
    block_time: "Float",
    fee: "Float",
    slot: "Float",
  },
  transactions_stddev_pop_fields: {
    amount: "Float",
    block_time: "Float",
    fee: "Float",
    slot: "Float",
  },
  transactions_stddev_samp_fields: {
    amount: "Float",
    block_time: "Float",
    fee: "Float",
    slot: "Float",
  },
  transactions_sum_fields: {
    amount: "float8",
    block_time: "bigint",
    fee: "float8",
    slot: "bigint",
  },
  transactions_var_pop_fields: {
    amount: "Float",
    block_time: "Float",
    fee: "Float",
    slot: "Float",
  },
  transactions_var_samp_fields: {
    amount: "Float",
    block_time: "Float",
    fee: "Float",
    slot: "Float",
  },
  transactions_variance_fields: {
    amount: "Float",
    block_time: "Float",
    fee: "Float",
    slot: "Float",
  },
  uuid: `scalar.uuid` as const,
};

export const Ops = {
  query: "query_root" as const,
  mutation: "mutation_root" as const,
  subscription: "subscription_root" as const,
};
