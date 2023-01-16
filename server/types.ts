// import { Asset, Card, Cash, Stock } from "./models.ts";

export type ListSchema = {
  name: string;
};

export type SchemaType = {
  id: string;
};

export type ListSchemaMap = ListSchema & SchemaType;

export interface Config {
  DB_PATH: string;
}

export type Dictionary = { [index:string]: any }
