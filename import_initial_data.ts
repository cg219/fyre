import { resolve, toFileUrl, join } from "https://deno.land/std@0.165.0/path/mod.ts";
import { addAccount } from "./api.ts";
import { Account, MetadataType } from "./types.ts";
import { importCards, importStocks } from "./utils/import.ts";

const pokemonURL = new URL(toFileUrl(resolve(join("imported", "pokemon.csv"))));
const investingURL = new URL(toFileUrl(resolve(join("imported", "investing.csv"))));
const rothURL = new URL(toFileUrl(resolve(join("imported", "roth.csv"))));
const sepURL = new URL(toFileUrl(resolve(join("imported", "sep.csv"))));

export default async function init() {
    const [cardAccount] = addAccount({ name: 'Card Collection', types: [MetadataType.CARD].join('|') });
    const [investingAccount] = addAccount({ name: 'Investiong', types: [MetadataType.STOCK].join('|') });
    const [rothAccount] = addAccount({ name: 'Roth', types: [MetadataType.STOCK].join('|') });
    const [sepAccount] = addAccount({ name: 'Sep', types: [MetadataType.STOCK].join('|') });

    await importCards(pokemonURL, cardAccount as Account);
    await importStocks(investingURL, investingAccount as Account);
    await importStocks(rothURL, rothAccount as Account);
    await importStocks(sepURL, sepAccount as Account);
}
