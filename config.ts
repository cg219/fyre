import { Config } from "./types.ts";

let DB_PATH: string;
let initialized = false;

export function initConfig(dbpath: string) {
  DB_PATH = dbpath;
  initialized = true;
}

export function config(): Config {
  if (!initialized) throw Error(`Initialize config with 'initConfig()'`);

  const cfg = new Map();

  cfg.set("DB_PATH", DB_PATH);

  return Object.fromEntries(cfg);
}
