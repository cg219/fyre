import { parse } from "https://deno.land/std@0.167.0/encoding/csv.ts";
import { addCard, addStock, getAll, getIDFromList } from "../api.ts";
import { Account, CardCondition, CardEdition, CardLanguage, CardSchema, GradingCompany, MetadataType, StockSchema } from "./../types.ts";

export async function importCards(url: URL, account?: Account) {
    const response = await fetch(url);
    const csv = await response.text();
    const data = parse(csv, {
        skipFirstRow: true,
        columns: [
            'name', 'price', 'cost', 'amount', 'owned', 'sold', 'sold_price',
            'liquid', 'spendable', 'card_set', 'edition', 'card_number', 'rarity',
            'condition', 'error', 'graded', 'grading_company', 'grade', 'language'
        ]
    });
    const languages: CardLanguage[] = getAll("card_languages");
    const editions: CardEdition[] = getAll("card_editions");
    const conditions: CardCondition[] = getAll("card_conditions");
    const sets: CardEdition[] = getAll("card_sets");
    const companies: GradingCompany[] = getAll("grading_companies");

    data.forEach((row) => {
        const card: CardSchema = {
            name: row.name as string,
            price: row.price as number,
            cost: row.cost as number,
            amount: row.amount as number,
            owned: row.owned as boolean,
            sold: row.sold as boolean,
            sold_price: row.sold_price as number,
            liquid: row.liquid as boolean,
            spendable: row.spendable as boolean,
            card_set: getIDFromList(row.card_set as string, sets),
            edition: getIDFromList(row.edition as string, editions),
            card_number: row.card_number as string,
            rarity: row.rarity as string,
            condition: getIDFromList(row.condition as string, conditions),
            error: row.error as boolean,
            graded: row.graded as boolean,
            grading_company: getIDFromList(row.grading_company as string, companies),
            language: getIDFromList(row.language as string, languages),
            account_id: account!.id,
            type: MetadataType.CARD
        }

        addCard(card);
    })
}

export async function importStocks(url: URL, account?: Account) {
    const response = await fetch(url);
    const csv = await response.text();
    const data = parse(csv, {
        skipFirstRow: true,
        columns: [
            'name', 'price', 'cost', 'amount', 'owned', 'sold', 'sold_price',
            'liquid', 'spendable', 'ticker', 'sector', 'dividend_payout', 'dividend_frequency'
        ]
    });

    data.forEach((row) => {
        const stock: StockSchema = {
            name: row.name as string,
            price: row.price as number,
            cost: row.cost as number,
            amount: row.amount as number,
            owned: row.owned as boolean,
            sold: row.sold as boolean,
            sold_price: row.sold_price as number,
            liquid: row.liquid as boolean,
            spendable: row.spendable as boolean,
            ticker: row.ticker as string,
            sector: row.sector as string,
            dividend_payout: row.dividend_payout as number || 0,
            dividend_frequency: row.dividend_frequency as number || 0,
            account_id: account!.id,
            type: MetadataType.STOCK
        }

        addStock(stock);
    })
}

export default {
    importCards,
    importStocks
}