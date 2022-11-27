// import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { join } from "https://deno.land/std@0.163.0/path/mod.ts";
import { init } from "./setup.ts";
import { config, initConfig } from "./config.ts";
import { addCard, getAll, getCard, getIDFromList, update } from "./api.ts";
import { CardSchema, CardLanguage, CardEdition, CardCondition, GradingCompany, MetadataType, CardUpdate, AssetUpdate } from "./types.ts";

if (import.meta.main) {
  initConfig(join('data', 'database.db'));
  init(config().DB_PATH);

  const languages: CardLanguage[] = getAll('card_languages');
  const editions: CardEdition[] = getAll('card_editions');
  const conditions: CardCondition[] = getAll('card_conditions');
  const sets: CardEdition[] = getAll('card_sets');
  const companies: GradingCompany[] = getAll('grading_companies');
  const marnie: CardSchema = {
    name: 'Marnie',
    amount: 1,
    price: 600,
    cost: 0,
    owned: true,
    sold: false,
    liquid: false,
    spendable: false,
    error: false,
    graded: true,
    condition: getIDFromList('Near Mint+', conditions),
    language: getIDFromList('English', languages),
    card_number: '4/100',
    card_set: getIDFromList('Shiny Star V', sets),
    edition: getIDFromList('Unlimited', editions),
    grade: 9.5,
    grading_company: getIDFromList('CGC',companies),
    rarity: 'SR'
  }

  const c = addCard(marnie);

  console.log(getCard(1));

  update(1, {
    price: 400,
    metadata_type: MetadataType.CARD,
    metadata: {
      grade: 9
    } as CardUpdate
  } as AssetUpdate)

  console.log(getCard(1));
}
