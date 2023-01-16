CREATE MIGRATION m1c5zdgte526y25pquqicxs5oi24oxbvzimaxmr5xos2vkv6xavcga
    ONTO initial
{
  CREATE FUTURE nonrecursive_access_policies;
  CREATE ABSTRACT TYPE default::Item {
      CREATE REQUIRED PROPERTY name -> std::str;
  };
  CREATE TYPE default::Account EXTENDING default::Item {
      CREATE REQUIRED MULTI PROPERTY types -> std::str;
  };
  CREATE TYPE default::CardSet EXTENDING default::Item;
  CREATE TYPE default::Condition EXTENDING default::Item;
  CREATE TYPE default::Edition EXTENDING default::Item;
  CREATE TYPE default::Language EXTENDING default::Item;
  CREATE ABSTRACT TYPE default::Asset {
      CREATE REQUIRED LINK account -> default::Account;
      CREATE REQUIRED LINK cardSet -> default::CardSet;
      CREATE REQUIRED LINK condition -> default::Condition;
      CREATE REQUIRED LINK edition -> default::Edition;
      CREATE REQUIRED LINK language -> default::Language;
      CREATE REQUIRED PROPERTY amount -> std::float32 {
          SET default := 1.0;
      };
      CREATE REQUIRED PROPERTY cost -> std::float32 {
          SET default := 0.0;
      };
      CREATE REQUIRED PROPERTY liquid -> std::bool {
          SET default := true;
      };
      CREATE REQUIRED PROPERTY name -> std::str;
      CREATE REQUIRED PROPERTY owned -> std::bool {
          SET default := true;
      };
      CREATE REQUIRED PROPERTY price -> std::float32 {
          SET default := 0.0;
      };
      CREATE MULTI PROPERTY sold -> tuple<price: std::float32, amount: std::float32>;
      CREATE REQUIRED PROPERTY spendable -> std::bool {
          SET default := true;
      };
  };
  CREATE TYPE default::Cash EXTENDING default::Asset {
      CREATE REQUIRED PROPERTY frequency -> std::int16 {
          SET default := 12;
      };
      CREATE REQUIRED PROPERTY interest -> std::float32 {
          SET default := 0.0;
      };
  };
  CREATE TYPE default::Crypto EXTENDING default::Asset {
      CREATE REQUIRED PROPERTY blockchain -> std::str;
      CREATE REQUIRED PROPERTY symbol -> std::str;
  };
  CREATE TYPE default::Stock EXTENDING default::Asset {
      CREATE REQUIRED PROPERTY frequency -> std::int16 {
          SET default := 4;
      };
      CREATE REQUIRED PROPERTY payout -> std::float32 {
          SET default := 0.0;
      };
      CREATE REQUIRED PROPERTY sector -> std::str;
      CREATE REQUIRED PROPERTY ticker -> std::str;
  };
  CREATE TYPE default::Card EXTENDING default::Asset {
      CREATE REQUIRED PROPERTY error -> std::bool {
          SET default := false;
      };
      CREATE PROPERTY grade -> std::float32 {
          CREATE CONSTRAINT std::one_of(0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0);
      };
      CREATE REQUIRED PROPERTY graded -> std::bool {
          SET default := true;
      };
      CREATE PROPERTY number -> std::str;
      CREATE PROPERTY rarity -> std::str;
  };
  CREATE TYPE default::Payment {
      CREATE REQUIRED LINK asset -> default::Asset;
      CREATE REQUIRED PROPERTY amount -> std::float32;
      CREATE REQUIRED PROPERTY date -> cal::local_date;
      CREATE REQUIRED PROPERTY payment -> std::float32;
      CREATE REQUIRED PROPERTY type -> std::str {
          CREATE CONSTRAINT std::one_of('Interest', 'Dividend', 'Sale');
      };
  };
  CREATE TYPE default::GradingCompany EXTENDING default::Item {
      CREATE REQUIRED PROPERTY longName -> std::str;
  };
};
