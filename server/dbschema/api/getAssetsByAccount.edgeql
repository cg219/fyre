select Asset {
    name,
    account: {
        name,
        id
    },
    cost,
    liquid,
    owned,
    price,
    sold,
    spendable,
    amount
}
filter
    .account.id = <uuid>$accountId;
