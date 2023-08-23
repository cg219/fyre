import { resolve, toFileUrl, join } from "https://deno.land/std@0.199.0/path/mod.ts";
import { importCards, importStocks } from "./utils/import.ts";
import { addAccount } from "./api.ts";
import { accounts } from "./models.ts";
import { Account } from "./types.ts";

const pokemonURL = new URL(toFileUrl(resolve(join("imported", "pokemon.csv"))));
const investingURL = new URL(toFileUrl(resolve(join("imported", "investing.csv"))));
const rothURL = new URL(toFileUrl(resolve(join("imported", "roth.csv"))));
const sepURL = new URL(toFileUrl(resolve(join("imported", "sep.csv"))));

export default async function init() {
    await addAccount('Pokemon', 'cards', ['card']);
    await addAccount('Fidelity Investing', 'brokerage', ['stock', 'cash']);
    await addAccount('Roth', 'retirement', ['stock', 'cash']);
    await addAccount('Business Investing', 'retirement', ['stock', 'cash']);

    const cardAccount = await accounts().index('name').get('Pokemon') as Account;
    const investingAccount = await accounts().index('name').get('Fidelity Investing') as Account;
    const rothAccount = await accounts().index('name').get('Roth') as Account;
    const sepAccount = await accounts().index('name').get('Business Investing') as Account;

    await importCards(pokemonURL, cardAccount);
    await importStocks(investingURL, investingAccount);
    await importStocks(rothURL, rothAccount);
    await importStocks(sepURL, sepAccount);
}
