import { resolve, toFileUrl, join } from "https://deno.land/std@0.165.0/path/mod.ts";
import { importCards, importStocks } from "./utils/import.ts";

const pokemonURL = new URL(toFileUrl(resolve(join("imported", "pokemon.csv"))));
const investingURL = new URL(toFileUrl(resolve(join("imported", "investing.csv"))));
const rothURL = new URL(toFileUrl(resolve(join("imported", "roth.csv"))));
const sepURL = new URL(toFileUrl(resolve(join("imported", "sep.csv"))));

export default async function init() {
    await importCards(pokemonURL);
    await importStocks(investingURL);
    await importStocks(rothURL);
    await importStocks(sepURL);
}
