CREATE MIGRATION m1bcyeh2bi5upsml4ehnizuzsokgwmqkdmqguyxfrhuug7jrrbudkq
    ONTO m1i6o475x5sgpsm75tdotd7zx5h74xoozol4b6v3y64jsmbu4bquoq
{
  ALTER TYPE default::Asset {
      ALTER PROPERTY amount {
          SET default := 1.0;
      };
  };
};
