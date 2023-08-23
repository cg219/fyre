/// <reference lib="deno.unstable" />

import { accounts } from "./models.ts";

export async function addAccount(name: string, kind: string, types: string[]) {
  await accounts().save({ uuid: crypto.randomUUID(), name, kind, types })
}
