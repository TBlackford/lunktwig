import { IQueryFileOptions, QueryFile } from 'pg-promise';
import { join as joinPath } from 'path';

export const users = {
    create: sql('users/create.sql'),
    empty: sql('users/empty.sql'),
    init: sql('users/init.sql'),
    drop: sql('users/drop.sql'),
    add: sql('users/add.sql')
};

function sql(file: string): QueryFile {

    const fullPath: string = joinPath(__dirname, file); // generating full path;

    const options: IQueryFileOptions = {

        // minifying the SQL is always advised;
        // see also option 'compress' in the API;
        minify: true

        // See also property 'params' for two-step template formatting
    };

    const qf: QueryFile = new QueryFile(fullPath, options);

    if (qf.error) {
        // Something is wrong with our query file :(
        // Testing all files through queries can be cumbersome,
        // so we also report it here, while loading the module:
        // tslint:disable-next-line:no-console
        console.error(qf.error);
    }

    return qf;
}

