import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ModelPropertyValues } from './ModelPropertyValues';
import { Properties } from './Properties';

@Table({
  tableName: 'property_values',
  timestamps: false,
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
  updatedAt: 'updated_at',
})
export class PropertyValues extends Model {
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
  })
  @ForeignKey(() => ModelPropertyValues)
  id: number;

  @Column({
    type: DataType.NUMBER,
  })
  property_id: number;

  @Column({
    type: DataType.STRING,
  })
  value: string;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.NUMBER,
  })
  priority: number;

  @Column({
    type: DataType.STRING,
  })
  settings: string;

  @Column({
    type: DataType.STRING,
  })
  deleted_at: string;

  @Column({
    type: DataType.STRING,
  })
  created_at: string;

  @Column({
    type: DataType.NUMBER,
  })
  updated_at: string;

  @BelongsTo(() => ModelPropertyValues, { as: 'model_property_values' })
  modelPropertyValues: ModelPropertyValues;

  @HasOne(() => Properties, {
    as: 'properties',
    sourceKey: 'property_id',
    foreignKey: 'id',
  })
  property: Properties;
}
