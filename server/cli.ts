import { join, resolve } from "https://deno.land/std@0.170.0/path/mod.ts";
import { Command, ValidationError, HelpCommand } from "https://deno.land/x/cliffy@v0.25.6/command/mod.ts";
import { Table } from "https://deno.land/x/cliffy@v0.25.6/table/table.ts";
import { initConfig } from "./config.ts";
import { addAccount, deleteAccount, getAccounts, getAssets, getAssetsByAccount, updateAccountName } from "./dbschema/queries.ts";
import { Dictionary } from "./types.ts";
import { createClient } from "https://deno.land/x/edgedb@v1.0.2/mod.ts";
import { Account, Asset } from "./dbschema/interfaces.ts";

const client = createClient();

function transformtoTable<T>(data: T[]) {
    const headers = Object.keys((data as T[]).at(0) as {}) as string[];
    const formatted = (data as T[])
        .map((d: T) => {
            return headers.map((h: string) => (d as Dictionary)[h]);
        });

    formatted.unshift(headers);
    return formatted;
}

// ACCOUNTS

async function listAccounts() {
    const data = await getAccounts(client);
    return format(data);
}

async function accountAssets(id: string) {
    const data = await getAssetsByAccount(client, { accountId: id });
    return format(data as Asset[]);
}

async function createAccount(name: string, types: string[], kind: string) {
    const { id } = await addAccount(client, { name, kind, types });
    console.log(`account created with id: ${id}`);
    await listAccounts();
}

async function removeAccount(id: string) {
    await deleteAccount(client, { accountId: id});
    console.log(`account with id: ${id} removed`);
}

async function updateAccount(id: string, name: string) {
    await updateAccountName(client, { name, accountId: id });

    console.log(`account with id: ${id} updated name to ${name}`);
    await listAccounts();
}

// ASSETS

async function listAssets() {
    const data = await getAssets(client);
    return format(data as Asset[]);
}

// function accountAssets(id: number) {
//     const data = getAccountData(id).assets;
//     return format(data);
// }

// function createAccount(name: string, types: string) {
//     if (!name) throw new ValidationError('account creation needs a --name');
//     const data = addAccount({ name, types });
//     return format(data);
// }

// function removeAccount(id: number) {
//     if (!id) throw new ValidationError('account removal needs a --id');

//     remove(id, 'accounts');
//     console.log(`account with id: ${id} removed`);
// }

// function updateAccount(id: number, name: string) {
//     if (!id) throw new ValidationError('account removal needs a --id');
//     if (!name) throw new ValidationError('account removal needs a name; ac');

//     update(id, { name } as AccountUpdate, 'accounts');
//     console.log(`account with id: ${id} updated name to ${name}`);
// }

function format(data: (Asset | Account)[], formatType = 'cli') {
    if (formatType == 'json') return data;
    if (formatType == 'cli') {
        const formatted = transformtoTable(data);
        return Table.from(formatted).render();
    }
}

const accounts = new Command()
    .option('-i, --id <id:string>', 'account id')
    .option('-n, --name <name:string>', 'account name')
    .option('-t, --type <type:string[]>', 'account type; "cash", "stock", "crypto", "card". Comma seperated for multiple types', { default: 'cash' })
    .option('-k, --kind <kind:string>', 'kind of account; "savings", "checking", "retirement", "brokerage", "digital wallet", "cards"', { default: 'savings' })
    .arguments('<method:string> [data:string]')
    .usage('[options] [method] [methodData]')
    .description('Accounts API')
    .action(async ({ id, name, type, kind }, method ) => {
        if (method.toLowerCase() == 'list') return await listAccounts();
        if (method.toLowerCase() == 'assets') {
            if (!id) throw new ValidationError('account assets needs a --id');
            return await accountAssets(id);
        }
        if (method.toLowerCase() == 'remove') {
            if (!id) throw new ValidationError('account removal needs a --id');
            return await removeAccount(id);
        }
        if (method.toLowerCase() == 'update') {
            if (!id) throw new ValidationError('account update needs a --id');
            if (!name) throw new ValidationError('account update needs a --name;');
            return updateAccount(id, name);
        }
        if (method.toLowerCase() == 'create') {
            if (!name) throw new ValidationError('account creation needs a --name');
            return createAccount(name, type as string[], kind);
        }
    });

const assets = new Command()
    .option('-i, --id <id:number>', 'asset_id')
    .option('-a, --account <account:number>', 'account_id')
    .option('-t, --type <type:string>', 'account type; "cash", "stock", "crypto", "card"')
    .arguments('<method:string> [data:string')
    .usage('[options] [method] [methodData]')
    .description('Assets API')
    .action(({ id, account, type }, method, newName ) => {
        if (method.toLowerCase() == 'list') return listAssets();
        // if (method.toLowerCase() == 'assets') return accountAssets(id!);
        // if (method.toLowerCase() == 'remove') return removeAccount(id!);
        // if (method.toLowerCase() == 'update') return updateAccount(id!, newName!);
        // if (method.toLowerCase() == 'create') {
        //     let types;

        //     if (type == 'cash') types = MetadataType.CASH;
        //     if (type == 'stock') types = MetadataType.STOCK;
        //     if (type == 'crypto') types = MetadataType.CRYPTO;
        //     if (type == 'card') types = MetadataType.CARD;
        //     if (!type) console.warn('No --type set. Defaulting to cash');
        //     return createAccount(name ?? '', types ?? MetadataType.CASH);
        // }
    });

if (import.meta.main) {
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
        .command('assets', assets)
        .parse(Deno.args)
}
