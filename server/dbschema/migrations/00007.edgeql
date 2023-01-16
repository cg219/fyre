CREATE MIGRATION m1i6o475x5sgpsm75tdotd7zx5h74xoozol4b6v3y64jsmbu4bquoq
    ONTO m1amhagurfakyn66fyra2ln2hsuzpwtxqtp2y6gipuw5at7hll223a
{
  ALTER TYPE default::Asset {
      ALTER PROPERTY amount {
          SET default := 1;
      };
  };
};
