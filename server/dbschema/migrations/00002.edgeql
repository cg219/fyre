CREATE MIGRATION m1zm4rcms3hh6zd6lk2ehsr4em5qznjk5su4z3xftenqnbost7md3q
    ONTO m1c5zdgte526y25pquqicxs5oi24oxbvzimaxmr5xos2vkv6xavcga
{
  ALTER TYPE default::Account {
      CREATE REQUIRED PROPERTY kind -> std::str {
          SET REQUIRED USING ('Savings');
          CREATE CONSTRAINT std::one_of('Savings', 'Checking', 'Retirement', 'Brokerage', 'Digital Wallet');
      };
  };
  ALTER TYPE default::Item {
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Account {
      ALTER PROPERTY types {
          CREATE CONSTRAINT std::one_of('Stock', 'Cash', 'Crypto', 'Card');
      };
  };
};
