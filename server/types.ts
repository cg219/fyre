// import { Asset, Card, Cash, Stock } from "./models.ts";

export type ListItem = {
  name: string;
};

export type GradingCompany = {
  name: string;
  longname: string;
};

export type SchemaType = {
  id: string;
};

export type ListMap = ListItem & SchemaType;

export interface Config {
  DB_PATH: string;
}

export type Dictionary = { [index:string]: any }

export type Account = {
  uuid: string;
  name: string;
  kind: string;
  types: string[];
}

export type Asset = {
  uuid: string;
  name: string;
  account: Account | string;
  sold?: {
    price?: number;
    amount?: number;
  };
  amount: number;
  price: number;
  cost: number;
  owned: boolean;
  liquid: boolean;
  spendable: boolean;
}

export type Stock = Asset & {
  ticker: string;
  sector: string;
  payout: number;
  frequency: number;
}

export type Card = Asset & {
  number?: string;
  rarity?: string;
  cardSet: string;
  condition: string;
  language: string;
  edition: string;
  company: string;
  error: boolean;
  graded: boolean;
  grade?: number;
}

export type Cash = Asset & {
  interest: number;
  frequency: number;
}

export type Crypto = Asset & {
  symbol: string;
  blockchain: string;
}

export type Payment = {
  amount: number;
  payment: number;
  date: number;
  type: string;
  asset: Asset | string
}
