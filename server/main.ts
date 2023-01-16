import { setup } from "./setup.ts";
import initialInit from "./import_initial_data.ts";

if (import.meta.main) {
  // initConfig(join("data", "database.db"));
  // await setup();
  await initialInit();

  Deno.exit(0);
}
