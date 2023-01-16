import { parse } from "https://deno.land/std@0.167.0/encoding/csv.ts";
import { getIDFromList } from "../api.ts";
import { createClient } from "https://deno.land/x/edgedb@v1.0.2/mod.ts";
import { addCard, addStock, getConditions, getEditions, getGradingCompanies, getLanguages, getSets } from "../dbschema/queries.ts";
import { Account } from "./../dbschema/interfaces.ts";

const client = createClient();

export async function importCards(url: URL, account?: Account) {
    const response = await fetch(url);
    const csv = await response.text();
    const data = parse(csv, {
        skipFirstRow: true,
        columns: [
            'name', 'price', 'cost', 'amount', 'owned', 'sold', 'soldPrice',
            'liquid', 'spendable', 'cardSet', 'edition', 'cardNumber', 'rarity',
            'condition', 'error', 'graded', 'gradingCompany', 'grade', 'language'
        ]
    });
    const languages = await getLanguages(client);
    const editions = await getEditions(client);
    const conditions = await getConditions(client);
    const sets = await getSets(client);
    const companies = await getGradingCompanies(client);

    const cards = data.map((row) => {
        return addCard(client, {
            name: row.name as string,
            price: parseFloat(row.price as string),
            cost: parseFloat(row.cost as string),
            amount: parseFloat(row.amount as string),
            owned: Boolean(row.owned as boolean),
            liquid: Boolean(row.liquid as boolean),
            spendable: Boolean(row.spendable as boolean),
            cardSet: getIDFromList(row.cardSet as string, sets),
            edition: getIDFromList(row.edition as string, editions),
            cardNumber: row.cardNumber as string,
            rarity: row.rarity as string,
            condition: getIDFromList(row.condition as string, conditions),
            error: Boolean(row.error as boolean),
            graded: Boolean(row.graded as boolean),
            grade: parseFloat(row.grade as string),
            company: getIDFromList(row.gradingCompany as string, companies),
            language: getIDFromList(row.language as string, languages),
            account: account!.id as string
        })
    })

    await Promise.all(cards);
}

export async function importStocks(url: URL, account?: Account) {
    const response = await fetch(url);
    const csv = await response.text();
    const data = parse(csv, {
        skipFirstRow: true,
        columns: [
            'name', 'price', 'cost', 'amount', 'owned', 'sold', 'soldPrice',
            'liquid', 'spendable', 'ticker', 'sector', 'dividendPayout', 'dividendFrequency'
        ]
    });

    const stocks = data.map((row) => {
        return addStock(client, {
            name: row.name as string,
            price: parseFloat(row.price as string),
            cost: parseFloat(row.cost as string),
            amount: parseFloat(row.amount as string),
            owned: Boolean(row.owned as boolean),
            liquid: Boolean(row.liquid as boolean),
            spendable: Boolean(row.spendable as boolean),
            ticker: row.ticker as string,
            sector: row.sector as string,
            payout: row.dividendPayout as number || 0,
            frequency: row.dividendFrequency as number || 0,
            account: account!.id as string
        })
    })

    await Promise.all(stocks);
}

export default {
    importCards,
    importStocks
}
