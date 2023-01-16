select(
    insert Card {
        name:= <str>$name,
        amount:= <float32>$amount,
        price:= <float32>$price,
        cost:= <float32>$cost,
        owned:= <bool>$owned,
        error:= <bool>$error,
        grade:= <float32>$grade,
        graded:= <bool>$graded,
        liquid:= <bool>$liquid,
        spendable:= <bool>$spendable,
        number:= <str>$cardNumber,
        rarity:= <str>$rarity,
        account:= (
            select Account
            filter
                .id = <uuid>$account
        ),
        cardSet:= (
            select CardSet
            filter
                .id = <uuid>$cardSet
        ),
        condition:=  (
            select Condition
            filter
                .id = <uuid>$condition
        ),
        language:=  (
            select Language
            filter
                .id = <uuid>$language
        ),
        edition:=  (
            select Edition
            filter
                .id = <uuid>$edition
        ),
        company:=  (
            select GradingCompany
            filter
                .id = <uuid>$company
        )
    }
) {
    name,
    account: {
        name,
        id
    },
    price,
    owned,
    cardSet: {
        name
    },
    edition: {
        name
    },
    language: {
        name
    },
    condition: {
        name
    },
    company: {
        name,
        longName
    },
    rarity,
    number
}
