import { Optional } from 'sequelize'
import { Model, Table, HasMany, Column } from 'sequelize-typescript';
import { LinkModel } from './link.model';


export interface AppUserPayload {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    links?: LinkModel[];
}

export interface AppUserCreationAttributes extends Optional<AppUserPayload, 'id'> {
}


@Table({
    modelName: 'app_user',
    timestamps: true
})
export class AppUserModel extends Model<AppUserPayload, AppUserCreationAttributes> {

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    username: string

    @Column
    email: string

    @HasMany(() => LinkModel, 'userId')
    links?: LinkModel[];
}
