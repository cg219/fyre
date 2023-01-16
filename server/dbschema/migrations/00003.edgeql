CREATE MIGRATION m1hucbmq5lcngxbqqkss56n7wdjrywfge5w6igjxfuy3ccttdnqjda
    ONTO m1zm4rcms3hh6zd6lk2ehsr4em5qznjk5su4z3xftenqnbost7md3q
{
  ALTER TYPE default::Card {
      ALTER LINK cardSet {
          SET OWNED;
      };
      ALTER LINK condition {
          SET OWNED;
      };
      ALTER LINK edition {
          SET OWNED;
      };
      ALTER LINK language {
          SET OWNED;
      };
  };
  ALTER TYPE default::Asset {
      DROP LINK cardSet;
      DROP LINK condition;
      DROP LINK edition;
      DROP LINK language;
  };
  ALTER TYPE default::Card {
      ALTER LINK cardSet {
          RESET readonly;
          RESET CARDINALITY;
          SET REQUIRED;
          SET TYPE default::CardSet;
      };
  };
  ALTER TYPE default::Card {
      ALTER LINK condition {
          RESET readonly;
          RESET CARDINALITY;
          SET REQUIRED;
          SET TYPE default::Condition;
      };
  };
  ALTER TYPE default::Card {
      ALTER LINK edition {
          RESET readonly;
          RESET CARDINALITY;
          SET REQUIRED;
          SET TYPE default::Edition;
      };
  };
  ALTER TYPE default::Card {
      ALTER LINK language {
          RESET readonly;
          RESET CARDINALITY;
          SET REQUIRED;
          SET TYPE default::Language;
      };
  };
};
