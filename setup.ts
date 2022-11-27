import { DB, SqliteError } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";

export function init(dbPath: string) {
  const db = new DB(dbPath);

  try {
    db.query<[number, number]>(`SELECT * FROM versions`);
    db.close();
  } catch (_e) {
    db.execute(`
      CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS grading_companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        long_name TEXT
      );

      CREATE TABLE IF NOT EXISTS card_conditions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS card_languages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS card_editions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS card_sets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        amount REAL,
        price REAL,
        cost REAL,
        owned INTEGER NOT NULL,
        sold INTEGER NOT NULL,
        sold_price REAL,
        account_id INTEGER,
        liquid INTEGER NOT NULL,
        spendable INTEGER NOT NULL,
        FOREIGN KEY(account_id) REFERENCES accounts(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS stock_metadata (
        asset_id INTEGER PRIMARY KEY,
        ticker TEXT NOT NULL,
        sector TEXT,
        dividend_payout REAL,
        dividend_frequency INTEGER,
        FOREIGN KEY(asset_id) REFERENCES assets(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS card_metadata (
        asset_id INTEGER PRIMARY KEY,
        card_set INTEGER,
        edition INTEGER,
        card_number TEXT,
        rarity TEXT,
        condition INTEGER,
        error INTEGER NOT NULL,
        graded INTEGER NOT NULL,
        grading_company INTEGER,
        grade REAL,
        language INTEGER,
        FOREIGN KEY(asset_id) REFERENCES assets(id) ON DELETE CASCADE,
        FOREIGN KEY(card_set) REFERENCES card_sets(id) ON DELETE CASCADE,
        FOREIGN KEY(edition) REFERENCES card_editions(id) ON DELETE CASCADE,
        FOREIGN KEY(condition) REFERENCES card_conditions(id) ON DELETE CASCADE,
        FOREIGN KEY(grading_company) REFERENCES grading_companies(id) ON DELETE CASCADE,
        FOREIGN KEY(language) REFERENCES card_languages(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS dividend_payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        asset_id INTEGER,
        share_amount REAL,
        payment REAL,
        date TEXT,
        FOREIGN KEY(asset_id) REFERENCES assets(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS interest_payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        asset_id INTEGER,
        cash_amount REAL,
        payment REAL,
        date TEXT,
        FOREIGN KEY(asset_id) REFERENCES assets(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS cash_metadata (
        asset_id INTEGER PRIMARY KEY,
        interest_rate REAL,
        interest_frequency INTEGER,
        FOREIGN KEY(asset_id) REFERENCES assets(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS crypto_metadata (
        asset_id INTEGER PRIMARY KEY,
        symbol TEXT,
        blockchain TEXT,
        FOREIGN KEY(asset_id) REFERENCES assets(id) ON DELETE CASCADE
      );

      INSERT INTO card_conditions (name)
      VALUES
        ('Perfect'),
        ('Pristine'),
        ('Gem Mint'),
        ('Mint'),
        ('Near Mint/Mint'),
        ('Near Mint'),
        ('Near Mint/Mint+'),
        ('Near Mint+'),
        ('Excellent'),
        ('Excellent+'),
        ('Excellent/Near Mint'),
        ('Excellent/Near Mint+');

      INSERT INTO grading_companies (long_name, name)
      VALUES
        ('Professional Sports Authenticator', 'PSA'),
        ('Certified Guaranty Company', 'CGC'),
        ('Beckett Grading Services', 'BGS');

      INSERT INTO card_languages (name)
      VALUES
        ('English'),
        ('Japanese'),
        ('Korean'),
        ('Chinese'),
        ('Italian'),
        ('Indonesian'),
        ('French');

      INSERT INTO card_editions (name)
      VALUES
        ('Unlimited'),
        ('1st Edition'),
        ('Promo'),
        ('Shadowless');

      INSERT INTO card_sets (name)
      VALUES
        ('20th Anniversary CP6'),
        ('All Stars Collection Set B'),
        ('Base Set'),
        ('Base Set 2'),
        ('Battle Styles'),
        ('Best of Games Promos'),
        ('Black Star Promo'),
        ('BW-P Promo'),
        ('Challenge from the Darkness'),
        ('Darkness That Consumes Light'),
        ('Double Blaze'),
        ('Double Burst: Set B'),
        ('Dream League'),
        ('Evolutions'),
        ('Fairy Rise'),
        ('Game Boy Advance'),
        ('Gold, Silver, to a New World'),
        ('GX Ultra Shiny'),
        ('Hearten vs Regigigas Deck Kit'),
        ('Hidden Fates'),
        ('Legendary Heartbeat'),
        ('Legendary Shine Collection'),
        ('Magma v. Aqua 2 Ambitions'),
        ('Mewtwo vs Genesect Deck Kit'),
        ('Mirage’s Mew Deck'),
        ('Movie Promo'),
        ('Neo Destiny'),
        ('Pokekyun Collection'),
        ('Pokemon Center 20th Anniversary'),
        ('Rengeki Master'),
        ('Rising Fist'),
        ('Rocket Gang'),
        ('S-P Promo'),
        ('Shining Darkness'),
        ('Shining Legends'),
        ('Shiny Collection'),
        ('Shiny Star V'),
        ('Sky Legend'),
        ('SM-P Promo'),
        ('Southern Islands'),
        ('Sun & Moon'),
        ('Sword & Shield'),
        ('Tag Bolt'),
        ('Tag Team GX Allstars'),
        ('Team Rocket'),
        ('Vivid Voltage'),
        ('Wild Blaze'),
        ('World Championship Decks'),
        ('XY Blue Shock'),
        ('XY Red Flash'),
        ('XY-P Promo'),
        ('Unknown');

      CREATE TABLE IF NOT EXISTS versions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        version TEXT
      );

      INSERT INTO versions (version)
      VALUES ('0');
    `);

    db.close();
  }
}
