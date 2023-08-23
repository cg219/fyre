import { companies, conditions, editions, langauges, sets } from "./models.ts";

export async function setup() {
  const conditionList = ['Perfect','Pristine','Gem Mint','Mint','Near Mint/Mint','Near Mint', 'Near Mint/Mint+','Near Mint+','Excellent','Excellent+','Excellent/Near Mint','Excellent/Near Mint+'];
  const companyList = [['Professional Sports Authenticator', 'PSA'], ['Certified Guaranty Company', 'CGC'], ['Beckett Grading Services', 'BGS']];
  const languageList = ['English', 'Japanese', 'Korean', 'Chinese', 'Italian', 'Indonesian', 'French'];
  const editionList = ['Unlimited', '1st Edition', 'Promo', 'Shadowless'];
  const setList = ['10th Movie Commemoration', '20th Anniversary CP6', 'All Stars Collection Set B', 'Base Set', 'Base Set 2', 'Battle Styles', 'Best of Games Promos', 'Black Star Promo', 'BW-P Promo', 'Challenge from the Darkness', 'Darkness That Consumes Light', 'Double Blaze', 'Double Burst: Set B', 'Dream League', 'Evolutions', 'Fairy Rise', 'Game Boy Advance', 'Gold, Silver, to a New World', 'GX Ultra Shiny', 'Hearten vs Regigigas Deck Kit', 'Hidden Fates', 'Legendary Heartbeat', 'Legendary Shine Collection', 'Magma v. Aqua 2 Ambitions', 'Mewtwo vs Genesect Deck Kit', 'Mirage’s Mew Deck', 'Movie Promo', 'Neo Destiny', 'Pokekyun Collection', 'Pokemon Center 20th Anniversary', 'Rengeki Master', 'Rising Fist', 'Rocket Gang', 'S-P Promo', 'Shining Darkness', 'Shining Legends', 'Shiny Collection', 'Shiny Star V', 'Sky Legend', 'SM-P Promo', 'Southern Islands', 'Sun & Moon', 'Sword & Shield', 'Tag Bolt', 'Tag Team GX Allstars', 'Team Rocket', 'Vivid Voltage', 'Wild Blaze', 'World Championship Decks', 'XY Blue Shock', 'XY Red Flash', 'XY-P Promo', 'Unknown'];

  await Promise.all(conditionList.map((name) => conditions().save({ name })));
  await Promise.all(companyList.map(([longname, name]) => companies().save({ name, longname })));
  await Promise.all(languageList.map((name) => langauges().save({ name })));
  await Promise.all(editionList.map((name) => editions().save({ name })));
  await Promise.all(setList.map((name) => sets().save({ name })));
}
