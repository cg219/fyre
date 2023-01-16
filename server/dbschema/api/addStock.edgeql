select(
    insert Stock {
        name:= <str>$name,
        amount:= <float32>$amount,
        price:= <float32>$price,
        cost:= <float32>$cost,
        owned:= <bool>$owned,
        liquid:= <bool>$liquid,
        spendable:= <bool>$spendable,
        ticker:= <str>$ticker,
        sector:= <str>$sector,
        payout:= <float32>$payout,
        frequency:= <int16>$frequency,
        account:= (
            select Account
            filter
                .id = <uuid>$account
        ),
    }
) {
    name,
    account: {
        name,
        id
    },
    price,
    owned,
    ticker,
    sector
}
