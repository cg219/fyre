import initialInit from "./import_initial_data.ts";
import { closeKv } from "./models.ts";

if (import.meta.main) {
  // await initialInit();
  await closeKv();

  Deno.exit(0);
}
