import { createClient } from "https://deno.land/x/edgedb@v1.0.2/mod.ts";
import { addCardSet, addCondition, addEdition, addGradingCompany, addLanguage } from './dbschema/queries.ts';

export async function setup() {
  const client = createClient();

  const conditions = ['Perfect','Pristine','Gem Mint','Mint','Near Mint/Mint','Near Mint', 'Near Mint/Mint+','Near Mint+','Excellent','Excellent+','Excellent/Near Mint','Excellent/Near Mint+'];
  const companies = [['Professional Sports Authenticator', 'PSA'], ['Certified Guaranty Company', 'CGC'], ['Beckett Grading Services', 'BGS']];
  const languages = ['English', 'Japanese', 'Korean', 'Chinese', 'Italian', 'Indonesian', 'French'];
  const editions = ['Unlimited', '1st Edition', 'Promo', 'Shadowless'];
  const sets = ['10th Movie Commemoration', '20th Anniversary CP6', 'All Stars Collection Set B', 'Base Set', 'Base Set 2', 'Battle Styles', 'Best of Games Promos', 'Black Star Promo', 'BW-P Promo', 'Challenge from the Darkness', 'Darkness That Consumes Light', 'Double Blaze', 'Double Burst: Set B', 'Dream League', 'Evolutions', 'Fairy Rise', 'Game Boy Advance', 'Gold, Silver, to a New World', 'GX Ultra Shiny', 'Hearten vs Regigigas Deck Kit', 'Hidden Fates', 'Legendary Heartbeat', 'Legendary Shine Collection', 'Magma v. Aqua 2 Ambitions', 'Mewtwo vs Genesect Deck Kit', 'Mirage’s Mew Deck', 'Movie Promo', 'Neo Destiny', 'Pokekyun Collection', 'Pokemon Center 20th Anniversary', 'Rengeki Master', 'Rising Fist', 'Rocket Gang', 'S-P Promo', 'Shining Darkness', 'Shining Legends', 'Shiny Collection', 'Shiny Star V', 'Sky Legend', 'SM-P Promo', 'Southern Islands', 'Sun & Moon', 'Sword & Shield', 'Tag Bolt', 'Tag Team GX Allstars', 'Team Rocket', 'Vivid Voltage', 'Wild Blaze', 'World Championship Decks', 'XY Blue Shock', 'XY Red Flash', 'XY-P Promo', 'Unknown'];

  await Promise.all(conditions.map((name) => addCondition(client, { name }) ));
  await Promise.all(companies.map(([longName, name]) => addGradingCompany(client, { name, longName }) ));
  await Promise.all(languages.map((name) => addLanguage(client, { name }) ));
  await Promise.all(editions.map((name) => addEdition(client, { name }) ));
  await Promise.all(sets.map((name) => addCardSet(client, { name }) ));
}
