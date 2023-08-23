import { kvdb } from "./kv/mod.ts";
import { Account, Card, Cash, Crypto, GradingCompany, ListItem, Payment, Stock } from "./types.ts";

const kv = await Deno.openKv('data/db');

export function closeKv() {
    return kv.close();
}

export function cards() {
    return kvdb<Card>(kv)
        .name('cards')
        .primary('uuid')
        .secondary('name')
        .secondary('account')
        .create()
}

export function stocks() {
    return kvdb<Stock>(kv)
        .name('stocks')
        .primary('uuid')
        .secondary('name')
        .secondary('account')
        .secondary('ticker')
        .create()
}

export function cryptos() {
    return kvdb<Crypto>(kv)
        .name('cryptos')
        .primary('uuid')
        .secondary('name')
        .secondary('account')
        .secondary('symbol')
        .secondary('blockchain')
        .create()
}

export function cash() {
    return kvdb<Cash>(kv)
        .name('cash')
        .primary('uuid')
        .create()
}

export function accounts() {
    return kvdb<Account>(kv)
        .name('accounts')
        .primary('uuid')
        .secondary('name')
        .secondary('kind')
        .create()
}

export function payments() {
    return kvdb<Payment>(kv)
        .name('payments')
        .primary('uuid')
        .secondary('type')
        .secondary('asset')
        .create()
}

export function sets() {
    return kvdb<ListItem>(kv)
        .name('sets')
        .primary('name')
        .create()
}

export function langauges() {
    return kvdb<ListItem>(kv)
        .name('langauges')
        .primary('name')
        .create()
}

export function editions() {
    return kvdb<ListItem>(kv)
        .name('editions')
        .primary('name')
        .create()
}

export function companies() {
    return kvdb<GradingCompany>(kv)
        .name('companies')
        .primary('name')
        .create()
}

export function conditions() {
    return kvdb<ListItem>(kv)
        .name('conditions')
        .primary('name')
        .create()
}
