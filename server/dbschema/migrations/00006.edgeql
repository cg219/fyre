CREATE MIGRATION m1amhagurfakyn66fyra2ln2hsuzpwtxqtp2y6gipuw5at7hll223a
    ONTO m1qtwo5lyogtz5fx4qkenr5xd2pq5mmvz42saqjsdntoc4sjohceka
{
  ALTER TYPE default::Card {
      CREATE REQUIRED LINK company -> default::GradingCompany {
          SET REQUIRED USING (SELECT
              default::GradingCompany 
          LIMIT
              1
          );
      };
  };
};
