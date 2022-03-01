import pgPromise, { IDatabase, IInitOptions, IMain } from 'pg-promise';
import { IExtensions, UsersRepository } from './repos';

export type Database = IDatabase<IExtensions> & IExtensions;

const initOptions: IInitOptions<IExtensions> = {
    extend(obj: Database, dc: any) {
        obj.users = new UsersRepository(obj, pgp);
    }
};

// Initializing the library:
const pgp: IMain = pgPromise(initOptions);

const connection: any = {
    host: 'localhost',
    port: 5432,
    database: 'lunktwig',
    user: 'postgres',
    password: 'passwordpassword'
}

// Creating the database instance with extensions:
const db: Database = pgp(connection);

db.users.create();

export { db, pgp };
