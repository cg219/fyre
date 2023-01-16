import type {Client} from "edgedb";

export async function getAccounts(client: Client): Promise<{
  "id": string;
  "name": string;
  "kind": string;
  "types": [(string), ...(string)[]];
}[]> {
  return client.query(`select Account {
    id,
    name,
    kind,
    types
}
`);
}

export async function getCryptos(client: Client): Promise<{
  "name": string;
  "account": {
    "name": string;
  };
  "price": number;
  "amount": number;
  "owned": boolean;
  "sold": {
    "price": number;
    "amount": number;
  }[];
  "cost": number;
  "symbol": string;
  "blockchain": string;
}[]> {
  return client.query(`select Crypto {
    name,
    account: {
        name
    },
    price,
    amount,
    owned,
    sold,
    cost,
    symbol,
    blockchain
}
`);
}

export async function getAssetsByAccount(client: Client, args: {
  "accountId": string;
}): Promise<{
  "name": string;
  "account": {
    "name": string;
    "id": string;
  };
  "cost": number;
  "liquid": boolean;
  "owned": boolean;
  "price": number;
  "sold": {
    "price": number;
    "amount": number;
  }[];
  "spendable": boolean;
  "amount": number;
}[]> {
  return client.query(`select Asset {
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
`, args);
}

export async function getStocks(client: Client): Promise<{
  "name": string;
  "account": {
    "name": string;
  };
  "price": number;
  "amount": number;
  "owned": boolean;
  "sold": {
    "price": number;
    "amount": number;
  }[];
  "cost": number;
  "payout": number;
  "frequency": number;
  "ticker": string;
  "sector": string;
}[]> {
  return client.query(`select Stock {
    name,
    account: {
        name
    },
    price,
    amount,
    owned,
    sold,
    cost,
    payout,
    frequency,
    ticker,
    sector
}
`);
}

export async function addLanguage(client: Client, args: {
  "name": string;
}): Promise<{
  "id": string;
}> {
  return client.queryRequiredSingle(`insert Language { name:= <str>$name }
`, args);
}

export async function getConditions(client: Client): Promise<{
  "name": string;
  "id": string;
}[]> {
  return client.query(`select Condition {
    name,
    id
}
`);
}

export async function getGradingCompanies(client: Client): Promise<{
  "name": string;
  "longName": string;
  "id": string;
}[]> {
  return client.query(`select GradingCompany {
    name,
    longName,
    id
}
`);
}

export async function getEditions(client: Client): Promise<{
  "name": string;
  "id": string;
}[]> {
  return client.query(`select Edition {
    name,
    id
}
`);
}

export async function getAssets(client: Client): Promise<{
  "name": string;
  "price": number;
  "amount": number;
  "owned": boolean;
}[]> {
  return client.query(`select Asset {
    name,
    price,
    amount,
    owned
}
`);
}

export async function getLanguages(client: Client): Promise<{
  "name": string;
  "id": string;
}[]> {
  return client.query(`select Language {
    name,
    id
}
`);
}

export async function addCondition(client: Client, args: {
  "name": string;
}): Promise<{
  "id": string;
}> {
  return client.queryRequiredSingle(`insert Condition { name:= <str>$name }
`, args);
}

export async function addCard(client: Client, args: {
  "name": string;
  "amount": number;
  "price": number;
  "cost": number;
  "owned": boolean;
  "error": boolean;
  "grade": number;
  "graded": boolean;
  "liquid": boolean;
  "spendable": boolean;
  "cardNumber": string;
  "rarity": string;
  "account": string;
  "cardSet": string;
  "condition": string;
  "language": string;
  "edition": string;
  "company": string;
}): Promise<{
  "name": string;
  "account": {
    "name": string;
    "id": string;
  };
  "price": number;
  "owned": boolean;
  "cardSet": {
    "name": string;
  };
  "edition": {
    "name": string;
  };
  "language": {
    "name": string;
  };
  "condition": {
    "name": string;
  };
  "company": {
    "name": string;
    "longName": string;
  };
  "rarity": string | null;
  "number": string | null;
}> {
  return client.queryRequiredSingle(`select(
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
`, args);
}

export async function addAccount(client: Client, args: {
  "name": string;
  "kind": string;
  "types": string[];
}): Promise<{
  "name": string;
  "id": string;
  "types": [(string), ...(string)[]];
  "kind": string;
}> {
  return client.queryRequiredSingle(`select (
    insert Account { name:= <str>$name, kind:= <str>$kind, types:= array_unpack(<array<str>>$types) }
) {
    name,
    id,
    types,
    kind
}
`, args);
}

export async function addEdition(client: Client, args: {
  "name": string;
}): Promise<{
  "id": string;
}> {
  return client.queryRequiredSingle(`insert Edition { name:= <str>$name }
`, args);
}

export async function deleteAccount(client: Client, args: {
  "accountId": string;
}): Promise<{
  "id": string;
} | null> {
  return client.querySingle(`delete Account
filter .id = <uuid>$accountId;
`, args);
}

export async function addStock(client: Client, args: {
  "name": string;
  "amount": number;
  "price": number;
  "cost": number;
  "owned": boolean;
  "liquid": boolean;
  "spendable": boolean;
  "ticker": string;
  "sector": string;
  "payout": number;
  "frequency": number;
  "account": string;
}): Promise<{
  "name": string;
  "account": {
    "name": string;
    "id": string;
  };
  "price": number;
  "owned": boolean;
  "ticker": string;
  "sector": string;
}> {
  return client.queryRequiredSingle(`select(
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
`, args);
}

export async function addCardSet(client: Client, args: {
  "name": string;
}): Promise<{
  "id": string;
}> {
  return client.queryRequiredSingle(`insert CardSet { name:= <str>$name }
`, args);
}

export async function getCash(client: Client): Promise<{
  "name": string;
  "account": {
    "name": string;
  };
  "price": number;
  "amount": number;
  "owned": boolean;
  "sold": {
    "price": number;
    "amount": number;
  }[];
  "cost": number;
  "interest": number;
  "frequency": number;
}[]> {
  return client.query(`select Cash {
    name,
    account: {
        name
    },
    price,
    amount,
    owned,
    sold,
    cost,
    interest,
    frequency
}
`);
}

export async function getSets(client: Client): Promise<{
  "name": string;
  "id": string;
}[]> {
  return client.query(`select CardSet {
    name,
    id
}
`);
}

export async function updateAccountName(client: Client, args: {
  "accountId": string;
  "name": string;
}): Promise<{
  "id": string;
} | null> {
  return client.querySingle(`update Account
filter .id = <uuid>$accountId
set { name := <str>$name }
`, args);
}

export async function addGradingCompany(client: Client, args: {
  "name": string;
  "longName": string;
}): Promise<{
  "id": string;
}> {
  return client.queryRequiredSingle(`insert GradingCompany { name:= <str>$name, longName:= <str>$longName }
`, args);
}

export async function getCards(client: Client): Promise<{
  "name": string;
  "account": {
    "name": string;
  };
  "price": number;
  "amount": number;
  "owned": boolean;
  "sold": {
    "price": number;
    "amount": number;
  }[];
  "cost": number;
  "cardSet": {
    "name": string;
  };
  "edition": {
    "name": string;
  };
  "language": {
    "name": string;
  };
  "company": {
    "name": string;
  };
  "condition": {
    "name": string;
  };
  "error": boolean;
  "graded": boolean;
  "grade": number | null;
}[]> {
  return client.query(`select Card {
    name,
    account: {
        name
    },
    price,
    amount,
    owned,
    sold,
    cost,
    cardSet: {
        name
    },
    edition: {
        name
    },
    language: {
        name
    },
    company: {
        name
    },
    condition: {
        name
    },
    error,
    graded,
    grade
}
`);
}