import { Optional } from 'sequelize'
import { Model, Table, ForeignKey, Column } from 'sequelize-typescript';
import { AppUserModel } from './user.model';

import { LinkPayload } from '@common/models';


export interface LinkAttributes extends Optional<LinkPayload, 'id'> {
}


@Table({
    modelName: 'link',
    timestamps: true
})
export class LinkModel extends Model<LinkPayload, LinkAttributes> {
    @Column
    url: string;

    @Column
    text: string;

    @Column
    isActive: boolean;

    @Column
    position: string;

    @ForeignKey(() => AppUserModel)
    @Column
    userId: number
}
