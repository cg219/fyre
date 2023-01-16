CREATE MIGRATION m1qtwo5lyogtz5fx4qkenr5xd2pq5mmvz42saqjsdntoc4sjohceka
    ONTO m1ttkzqf3dzyk4v3q4ww5rbqpcls3im4ehnsllmy7fmejybxtmq54a
{
  ALTER TYPE default::Account {
      ALTER PROPERTY kind {
          CREATE CONSTRAINT std::one_of('savings', 'checking', 'retirement', 'brokerage', 'digital wallet', 'cards');
      };
  };
  ALTER TYPE default::Account {
      ALTER PROPERTY kind {
          DROP CONSTRAINT std::one_of('Savings', 'Checking', 'Retirement', 'Brokerage', 'Digital Wallet', 'Card Collection');
      };
  };
  ALTER TYPE default::Account {
      ALTER PROPERTY types {
          CREATE CONSTRAINT std::one_of('stock', 'cash', 'crypto', 'card');
      };
  };
  ALTER TYPE default::Account {
      ALTER PROPERTY types {
          DROP CONSTRAINT std::one_of('Stock', 'Cash', 'Crypto', 'Card');
      };
  };
};
