import { Sequelize } from 'sequelize-typescript';

import { AppUserModel, LinkModel } from './';

export const sequelize = new Sequelize('lunktwig', 'postgres', 'password', {
    dialect: 'postgres',
    port: 5432,
    host: 'localhost',
    models: [AppUserModel, LinkModel],
    repositoryMode: true,
},);
