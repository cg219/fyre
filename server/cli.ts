import { join, resolve } from "https://deno.land/std@0.170.0/path/mod.ts";
import { Command, ValidationError } from "https://deno.land/x/cliffy@v0.25.6/command/mod.ts";
import { Table } from "https://deno.land/x/cliffy@v0.25.6/table/table.ts";
import { addAccount, getAccountData, getAll, remove, update } from "./api.ts";
import { initConfig } from "./config.ts";
import { Account, AccountUpdate, Asset, AssetList, Dictionary, MetadataType, SchemaType } from "./types.ts";

function transformtoTable(data: SchemaType[] | AssetList) {
    const headers = Object.keys((data as SchemaType[]).at(0) as {}) as string[];
    const formatted = (data as Asset[])
        .map((d: Asset) => {
            return headers.map((h: string) => (d as Dictionary)[h]);
        });

    formatted.unshift(headers);
    return formatted;
}

function listAcounts() {
    const data = getAll('accounts') as Account[];
    return format(data);
}

function accountAssets(id: number) {
    const data = getAccountData(id).assets;
    return format(data);
}

function createAccount(name: string, types: string) {
    if (!name) throw new ValidationError('account creation needs a --name');
    const data = addAccount({ name, types });
    return format(data);
}

function removeAccount(id: number) {
    if (!id) throw new ValidationError('account removal needs a --id');

    remove(id, 'accounts');
    console.log(`account with id: ${id} removed`);
}

function updateAccount(id: number, name: string) {
    if (!id) throw new ValidationError('account removal needs a --id');
    if (!name) throw new ValidationError('account removal needs a name; ac');

    update(id, { name } as AccountUpdate, 'accounts');
    console.log(`account with id: ${id} updated name to ${name}`);
}

function format(data: SchemaType[] | AssetList, formatType = 'cli') {
    if (formatType == 'json') return data;
    if (formatType == 'cli') {
        const formatted = transformtoTable(data);
        return Table.from(formatted).render();
    }
}

const accounts = new Command()
    .option('-i, --id <id:number>', 'account id')
    .option('-n, --name <name:string>', 'account name')
    .option('-t, --type <type:string>', 'account type; "cash", "stock", "crypto", "card"')
    .arguments('<action:string> [data:string]')
    .usage('[options] [method] [methodData]')
    .description('Accounts API')
    .action(({ id, name, type }, method, newName ) => {
        if (method.toLowerCase() == 'list') return listAcounts();
        if (method.toLowerCase() == 'assets') return accountAssets(id!);
        if (method.toLowerCase() == 'remove') return removeAccount(id!);
        if (method.toLowerCase() == 'update') return updateAccount(id!, newName!);
        if (method.toLowerCase() == 'create') {
            let types;

            if (type == 'cash') types = MetadataType.CASH;
            if (type == 'stock') types = MetadataType.STOCK;
            if (type == 'crypto') types = MetadataType.CRYPTO;
            if (type == 'card') types = MetadataType.CARD;
            if (!type) console.warn('No --type set. Defaulting to cash');
            return createAccount(name ?? '', types ?? MetadataType.CASH);
        }

    })

if (import.meta.main) {
    initConfig(resolve(join("data", "database.db")));

    await new Command()
        .name('fyreapi')
        .version('0.1.0')
        .description('API to interact with Fyre')
        .usage('[options] [command]')
        .error((error, command) => {
            if (error instanceof ValidationError) command.showHelp();

            console.error(error);
            Deno.exit(error instanceof ValidationError ? error.exitCode : 1);
        })
        .command('accounts', accounts)
        .parse(Deno.args)
}
