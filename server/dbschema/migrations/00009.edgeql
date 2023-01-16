CREATE MIGRATION m1mqtmah7vazhgbckyc2umbjpjwz2zqs6au3ft7scngjnhef3y6ama
    ONTO m1bcyeh2bi5upsml4ehnizuzsokgwmqkdmqguyxfrhuug7jrrbudkq
{
  ALTER TYPE default::Asset {
      ALTER LINK account {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE INDEX ON (.account);
      CREATE INDEX ON (.name);
  };
  ALTER TYPE default::Crypto {
      CREATE INDEX ON (.symbol);
  };
  ALTER TYPE default::Stock {
      CREATE INDEX ON (.ticker);
  };
};
