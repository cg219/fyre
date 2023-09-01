/// <reference lib="deno.unstable" />

import { accounts } from "./models.ts";
import { Account } from "./types.ts";

export async function addAccount(name: string, kind: string, types: string[]): Promise<Account> {
  const uuid = crypto.randomUUID();

  await accounts().save({ uuid, name, kind, types });
  return { uuid, name, kind, types };
}
