import { ListSchemaMap } from "./types.ts";

export function getIDFromList(name: string, list: ListSchemaMap[]): string {
  const lookup = new Map();

  list.forEach((o) => lookup.set(o.name, o.id));
  return lookup.get(name);
}
