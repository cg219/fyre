export enum MetadataType {
  CARD = "card_metadata",
  CRYPTO = "crypto_metadata",
  CASH = "cash_metadata",
  STOCK = "stock_metadata",
  ASSET = "assets",
}

export type AssetSchema = {
  name?: string;
  amount?: number;
  price?: number;
  cost?: number;
  owned: boolean;
  sold: boolean;
  sold_price?: number;
  liquid: boolean;
  spendable: boolean;
  account_id?: number;
  type: string;
};

export type CardSchema = AssetSchema & {
  card_set?: number;
  edition?: number;
  card_number?: string;
  rarity?: string;
  condition?: number;
  error: boolean;
  graded: boolean;
  grading_company?: number;
  grade?: number;
  language?: number;
};

export interface Update {
  readonly metadata_type?: MetadataType;
  metadata?: Update;
}

export interface AssetUpdate extends Update {
  name?: string;
  amount?: number;
  price?: number;
  cost?: number;
  owned?: boolean;
  sold?: boolean;
  sold_price?: number;
  liquid?: boolean;
  spendable?: boolean;
  account_id?: number;
}

export interface CardUpdate extends Update {
  card_set?: number;
  edition?: number;
  card_number?: string;
  rarity?: string;
  condition?: number;
  error?: boolean;
  graded?: boolean;
  grading_company?: number;
  grade?: number;
  language?: number;
}

export type StockSchema = AssetSchema & {
  ticker: string;
  sector: string;
  dividend_payout?: number;
  dividend_frequency?: number;
};

export type CashSchema = AssetSchema & {
  interest_rate?: number;
  interest_frequency?: number;
};

export type CryptoSchema = AssetSchema & {
  blockchain: string;
  symbol: string;
};

export interface DividendPaymentSchema {
  share_amount: number;
  payment: number;
  date: string;
}

export interface InterestPaymentSchema {
  cash_amount: number;
  payment: number;
  date: string;
}

export type ListSchema = {
  name: string;
};

export type SchemaType = {
  id: number;
};

export type ListSchemaMap = ListSchema & SchemaType;
export type AccountSchema = ListSchema & {
  types: string;
};
export type CardConditionSchema = ListSchema;
export type CardLanguageSchema = ListSchema;
export type CardEditionSchema = ListSchema;
export type CardSetSchema = ListSchema;
export type GradingCompanySchema = ListSchema & {
  long_name?: string;
};

export type Asset = AssetSchema & SchemaType;
export type Card = CardSchema & SchemaType;
export type Stock = StockSchema & SchemaType;
export type Cash = CashSchema & SchemaType;
export type Crypto = CryptoSchema & SchemaType;
export type Account = AccountSchema & SchemaType;
export type GradingCompany = GradingCompanySchema & SchemaType;
export type CardCondition = CardConditionSchema & SchemaType;
export type CardLanguage = CardLanguageSchema & SchemaType;
export type CardEdition = CardEditionSchema & SchemaType;
export type CardSet = CardSetSchema & SchemaType;
export type AssetList = {
  accountName: string;
  accountId: number;
  userid?: number;
  assets: AssetType[]
}
export type AssetType = Asset | Card | Stock | Crypto | Cash;

export interface Config {
  DB_PATH: string;
}

export type Dictionary = { [index:string]: any }
