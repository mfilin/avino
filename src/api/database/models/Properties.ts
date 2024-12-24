import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { PropertyValues } from './PropertyValues';

@Table({
  tableName: 'properties',
  timestamps: false,
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
  updatedAt: 'updated_at',
})
export class Properties extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  @ForeignKey(() => PropertyValues)
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  type: string;

  @Column({
    type: DataType.STRING,
  })
  slug: string;

  @Column({
    type: DataType.STRING,
  })
  configuration: string;

  @Column({
    type: DataType.STRING,
  })
  deleted_at: string;

  @Column({
    type: DataType.STRING,
  })
  created_at: string;

  @Column({
    type: DataType.STRING,
  })
  updated_at: string;

  @BelongsTo(() => PropertyValues)
  propertyValue: PropertyValues;
}
