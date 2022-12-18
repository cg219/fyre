// import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { join, resolve, toFileUrl } from "https://deno.land/std@0.165.0/path/mod.ts";
import { init } from "./setup.ts";
import initialInit from "./import_initial_data.ts";
import { config, initConfig } from "./config.ts";
import { addCard, getAll, getCard, getIDFromList, remove, update } from "./api.ts";
import {
  AssetUpdate,
  CardCondition,
  CardEdition,
  CardLanguage,
  CardSchema,
  CardUpdate,
  GradingCompany,
  MetadataType,
} from "./types.ts";
import { importCards, importStocks } from "./utils/import.ts";

if (import.meta.main) {
  initConfig(join("data", "database.db"));
  init(config().DB_PATH);
  // await initialInit();


  // console.log(getCard(1));

  // update(1, {
  //   price: 400,
  //   metadata_type: MetadataType.CARD,
  //   metadata: {
  //     grade: 9,
  //   } as CardUpdate,
  // } as AssetUpdate);

  // remove(1);
}
