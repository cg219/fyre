import { resolve, toFileUrl, join } from "https://deno.land/std@0.165.0/path/mod.ts";
import { addAccount } from "./dbschema/queries.ts";
import { importCards, importStocks } from "./utils/import.ts";
import { createClient } from "https://deno.land/x/edgedb@v1.0.2/mod.ts";

const pokemonURL = new URL(toFileUrl(resolve(join("..", "imported", "pokemon.csv"))));
const investingURL = new URL(toFileUrl(resolve(join("..", "imported", "investing.csv"))));
const rothURL = new URL(toFileUrl(resolve(join("..", "imported", "roth.csv"))));
const sepURL = new URL(toFileUrl(resolve(join("..", "imported", "sep.csv"))));

export default async function init() {
    const client = createClient();

    const cardAccount = await addAccount(client, { name: 'Pokemon', kind: 'cards', types: ['card'] });
    const investingAccount = await addAccount(client, { name: 'Fidelity Investing', kind: 'brokerage', types: ['stock', 'cash'] });
    const rothAccount = await addAccount(client, { name: 'Roth', kind: 'retirement', types: ['stock', 'cash'] });
    const sepAccount = await addAccount(client, { name: 'Business Investing', kind: 'retirement', types: ['stock', 'cash'] });

    await importCards(pokemonURL, cardAccount);
    await importStocks(investingURL, investingAccount);
    await importStocks(rothURL, rothAccount);
    await importStocks(sepURL, sepAccount);
}
