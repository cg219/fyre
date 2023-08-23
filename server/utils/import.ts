import { parse } from "https://deno.land/std@0.199.0/csv/mod.ts";
import { Account } from "../types.ts";
import { cards, stocks } from "../models.ts";

export async function importCards(url: URL, account: Account) {
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

    const promises = data.map((row) => {
        return cards().save({
            uuid: crypto.randomUUID(),
            name: row.name as string,
            price: parseFloat(row.price as string),
            cost: parseFloat(row.cost as string),
            amount: parseFloat(row.amount as string),
            owned: row.owned == 'TRUE' ? true : false,
            liquid: row.liquid == 'TRUE' ? true : false,
            spendable: row.spendable == 'TRUE' ? true : false,
            cardSet: row.cardSet as string,
            edition: row.edition as string,
            number: row.cardNumber as string,
            rarity: row.rarity as string,
            condition: row.condition as string,
            error: row.error  == 'TRUE' ? true : false,
            graded: row.graded  == 'TRUE' ? true : false,
            grade: parseFloat(row.grade as string),
            company: row.gradingCompany as string,
            language: row.language as string,
            account: account.uuid
        });
    })

    await Promise.all(promises);
}

export async function importStocks(url: URL, account: Account) {
    const response = await fetch(url);
    const csv = await response.text();
    const data = parse(csv, {
        skipFirstRow: true,
        columns: [
            'name', 'price', 'cost', 'amount', 'owned', 'sold', 'soldPrice',
            'liquid', 'spendable', 'ticker', 'sector', 'dividendPayout', 'dividendFrequency'
        ]
    });

    const promises = data.map((row) => {
        return stocks().save({
            uuid: crypto.randomUUID(),
            name: row.name as string,
            price: parseFloat(row.price as string),
            cost: parseFloat(row.cost as string),
            amount: parseFloat(row.amount as string),
            owned: row.owned == 'TRUE' ? true : false,
            liquid: row.liquid == 'TRUE' ? true : false,
            spendable: row.spendable == 'TRUE' ? true : false,
            ticker: row.ticker as string,
            sector: row.sector as string,
            payout: parseFloat(row.dividendPayout) || 0,
            frequency: parseFloat(row.dividendFrequency) || 0,
            account: account.uuid as string
        });
    })

    await Promise.all(promises);
}

export default {
    importCards,
    importStocks
}
