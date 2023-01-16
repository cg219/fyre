CREATE MIGRATION m1ttkzqf3dzyk4v3q4ww5rbqpcls3im4ehnsllmy7fmejybxtmq54a
    ONTO m1hucbmq5lcngxbqqkss56n7wdjrywfge5w6igjxfuy3ccttdnqjda
{
  ALTER TYPE default::Account {
      ALTER PROPERTY kind {
          DROP CONSTRAINT std::one_of('Savings', 'Checking', 'Retirement', 'Brokerage', 'Digital Wallet');
      };
  };
  ALTER TYPE default::Account {
      ALTER PROPERTY kind {
          CREATE CONSTRAINT std::one_of('Savings', 'Checking', 'Retirement', 'Brokerage', 'Digital Wallet', 'Card Collection');
      };
  };
};
