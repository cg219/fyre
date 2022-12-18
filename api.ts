import { DB } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";
import { config } from "./config.ts";
import {
  Asset,
  AssetSchema,
  Card,
  CardSchema,
  Cash,
  CashSchema,
  Crypto,
  CryptoSchema,
  ListSchemaMap,
  MetadataType,
  Stock,
  StockSchema,
  Update,
} from "./types.ts";

function addAsset(asset: AssetSchema, db: DB): [number, AssetSchema[]] {
  const {
    name,
    amount,
    price,
    cost,
    owned,
    sold,
    sold_price,
    liquid,
    spendable,
    account_id,
  } = asset;
  const sql =
    `INSERT INTO assets (name, amount, price, cost, owned, sold, sold_price, liquid, spendable, account_id)
        VALUES (:name, :amount, :price, :cost, :owned, :sold, :sold_price, :liquid, :spendable, :account_id)
        RETURNING *;`;
  const results = db.queryEntries<{
    id: number;
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
  }>(sql, {
    name,
    amount,
    price,
    cost,
    owned,
    sold,
    sold_price,
    liquid,
    spendable,
    account_id,
  });

  return [results[0].id, results];
}

function updateData(
  id: number,
  db: DB,
  table: string,
  columns: string[],
  values: (string | number | boolean)[],
  where = "id",
) {
  const sets = columns
    .map((col, index) => `${col}= ${values[index]}`)
    .join(", ");
  const sql = `UPDATE ${table}
        SET ${sets}
        WHERE ${where} = :id;`;
  db.queryEntries(sql, { id });
}

function createUpdate(
  id: number,
  db: DB,
  changes?: Update,
  type: MetadataType = MetadataType.ASSET,
) {
  if (!changes) return;

  const columns: string[] = [];
  const values: (string | number | boolean)[] = [];
  const { metadata, metadata_type, ...assetUpdate } = changes;

  if (assetUpdate) {
    Object.entries(assetUpdate)
      .forEach(([k, v]) => {
        columns.push(k);
        values.push(v as (string | number | boolean));
      });

    updateData(
      id,
      db,
      type,
      columns,
      values,
      type == MetadataType.ASSET ? "id" : "asset_id",
    );
  }

  createUpdate(id, db, metadata, metadata_type);
}

export function update(id: number, changes: Update) {
  const db = new DB(config().DB_PATH);

  createUpdate(id, db, changes);
  db.close();
}

export function remove(id: number) {
  const db = new DB(config().DB_PATH);
  const sql = `DELETE FROM assets
        WHERE id = :id;`;
  db.queryEntries(sql, { id });
  db.close();
}

export function getCard(id: number): Card {
  const db = new DB(config().DB_PATH);
  const sql = `SELECT * FROM assets WHERE id = :id;`;
  const metadataSql =
    `SELECT card_set, edition, card_number, rarity, condition, error, graded, grading_company, grade, language
        FROM card_metadata
        WHERE asset_id = :id;`;
  const [asset] = db.queryEntries<Asset>(sql, { id });
  const [metadata] = db.queryEntries<{
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
  }>(metadataSql, { id });

  return { ...asset, ...metadata, id };
}

export function getStock(id: number): Stock {
  const db = new DB(config().DB_PATH);
  const sql = `SELECT * FROM assets WHERE id = :id;`;
  const metadataSql =
    `SELECT ticker, sector, dividend_payout, dividend_frequency
        FROM stock_metadata
        WHERE asset_id = :id;`;
  const [asset] = db.queryEntries<Asset>(sql, { id });
  const [metadata] = db.queryEntries<
    {
      ticker: string;
      sector: string;
      dividend_payout?: number;
      dividend_frequency?: number;
    }
  >(metadataSql, { id });

  return { ...asset, ...metadata, id };
}

export function getCrypto(id: number): Crypto {
  const db = new DB(config().DB_PATH);
  const sql = `SELECT * FROM assets WHERE id = :id;`;
  const metadataSql = `SELECT symbol, blockchain
        FROM crypto_metadata
        WHERE asset_id = :id;`;
  const [asset] = db.queryEntries<Asset>(sql, { id });
  const [metadata] = db.queryEntries<{ blockchain: string; symbol: string }>(
    metadataSql,
    { id },
  );

  return { ...asset, ...metadata, id };
}

export function getCash(id: number): Cash {
  const db = new DB(config().DB_PATH);
  const sql = `SELECT * FROM assets WHERE id = :id;`;
  const metadataSql = `SELECT interest_rate, interest_frequency
        FROM cash_metadata
        WHERE asset_id = :id;`;
  const [asset] = db.queryEntries<Asset>(sql, { id });
  const [metadata] = db.queryEntries<
    { interest_rate: number; interest_frequency: number }
  >(metadataSql, { id });

  return { ...asset, ...metadata, id };
}

export function getIDFromList(
  name: string,
  list: ListSchemaMap[],
): number | undefined {
  const lookup = new Map();

  list.forEach((o) => lookup.set(o.name, o.id));
  return lookup.get(name);
}

export function addCard(asset: CardSchema) {
  const db = new DB(config().DB_PATH);
  const {
    card_set,
    edition,
    card_number,
    rarity,
    condition,
    error,
    graded,
    grading_company,
    grade,
    language,
  } = asset;
  const [asset_id] = addAsset(asset, db);
  const metadataSql =
    `INSERT INTO card_metadata (asset_id, card_set, edition, card_number, rarity, condition, error, graded, grading_company, grade, language)
        VALUES (:asset_id, :card_set, :edition, :card_number, :rarity, :condition, :error, :graded, :grading_company, :grade, :language);`;

  db.queryEntries(metadataSql, {
    card_set,
    edition,
    card_number,
    rarity,
    condition,
    error,
    graded,
    grading_company,
    grade,
    language,
    asset_id,
  });
  db.close();
}

export function addStock(asset: StockSchema) {
  const db = new DB(config().DB_PATH);
  const metadataSql =
    `INSERT INTO stock_metadata (asset_id, ticker, sector, dividend_payout, dividend_frequency)
        VALUES (:asset_id, :ticker, :sector, :dividend_payout, :dividend_frequency);`;
  const { ticker, sector, dividend_payout, dividend_frequency } = asset;
  const [asset_id] = addAsset(asset, db);

  db.queryEntries(metadataSql, {
    ticker,
    sector,
    dividend_payout,
    dividend_frequency,
    asset_id,
  });
  db.close();
}

export function addCrypto(asset: CryptoSchema) {
  const db = new DB(config().DB_PATH);
  const metadataSql = `INSERT INTO stock_metadata (asset_id, symbol, blockchain)
        VALUES (:asset_id, :symbol, :blockchain;`;
  const { symbol, blockchain } = asset;
  const [asset_id] = addAsset(asset, db);

  db.queryEntries(metadataSql, { symbol, blockchain, asset_id });
  db.close();
}

export function addCash(asset: CashSchema) {
  const db = new DB(config().DB_PATH);
  const metadataSql =
    `INSERT INTO stock_metadata (asset_id, interest_rate, interest_frequency)
        VALUES (:asset_id, :interest_rate, :interest_frequency;`;
  const { interest_rate, interest_frequency } = asset;
  const [asset_id] = addAsset(asset, db);

  db.queryEntries(metadataSql, { interest_rate, interest_frequency, asset_id });
  db.close();
}

export function getAll<T>(table: string): T[] {
  const db = new DB(config().DB_PATH);
  const sql = `SELECT * FROM ${table};`;
  const results = db.queryEntries(sql);

  db.close();
  return results as T[];
}

export default {
  addCard,
  addStock,
  addCrypto,
  addCash,
  getAll,
  getCard,
  getCash,
  getStock,
  getCrypto,
  getIDFromList,
  update,
  remove
};
