module default {
    abstract type Item {
        required property name -> str {
            constraint exclusive;
        };
    }

    type Account extending Item {
        required property kind -> str {
            constraint one_of('savings', 'checking', 'retirement', 'brokerage', 'digital wallet', 'cards');
        };

        required multi property types -> str {
            constraint one_of('stock', 'cash', 'crypto', 'card');
        };
    }

    type GradingCompany extending Item {
        required property longName -> str
    }

    type Condition extending Item {}
    type Language extending Item {}
    type Edition extending Item {}
    type CardSet extending Item {}

    abstract type Asset {
        required property name -> str;
        required link account -> Account {
            on target delete delete source;
        };
        multi property sold -> tuple<price: float32, amount: float32>;
        index on (.name);
        index on (.account);

        required property amount -> float32 {
            default:= 1.0;
        };

        required property price -> float32 {
            default:= 0.0;
        }

        required property cost -> float32 {
            default:= 0.0;
        };

        required property owned -> bool {
            default:= true;
        };

        required property liquid -> bool {
            default:= true;
        }

        required property spendable -> bool {
            default:= true;
        }
    }

    type Stock extending Asset {
        required property ticker -> str;
        required property sector -> str;
        index on (.ticker);

        required property payout -> float32 {
            default:= 0.0;
        }

        required property frequency -> int16 {
            default:= 4;
        }
    }

    type Card extending Asset {
        property number -> str;
        property rarity -> str;
        required link cardSet -> CardSet;
        required link condition -> Condition;
        required link language -> Language;
        required link edition -> Edition;
        required link company -> GradingCompany;

        required property error -> bool {
            default:= false;
        }

        required property graded -> bool {
            default:= true;
        }

        property grade -> float32 {
            constraint one_of(0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0);
        }
    }

    type Cash extending Asset {
        required property interest -> float32 {
            default:= 0.0;
        };

        required property frequency -> int16 {
            default:= 12;
        };
    }

    type Crypto extending Asset {
        required property symbol -> str;
        required property blockchain -> str;
        index on (.symbol);
    }

    type Payment {
        required property amount -> float32;
        required property payment -> float32;
        required property date -> cal::local_date;
        required property type -> str {
            constraint one_of('Interest', 'Dividend', 'Sale')
        }
        required link asset -> Asset;
    }
}
