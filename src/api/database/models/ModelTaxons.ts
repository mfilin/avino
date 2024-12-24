import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Taxons } from './Taxons';
import { Product } from './Product';
import { ModelPropertyValues } from './ModelPropertyValues';

@Table({
  tableName: 'model_taxons',
  timestamps: false,
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
  updatedAt: 'updated_at',
})
export class ModelTaxons extends Model {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    primaryKey: true,
  })
  @ForeignKey(() => Taxons)
  taxon_id: number;

  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  model_type: string;

  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  @ForeignKey(() => Product)
  @ForeignKey(() => ModelPropertyValues)
  model_id: number;

  @Column({
    type: DataType.STRING,
  })
  created_at: string;

  @Column({
    type: DataType.STRING,
  })
  updated_at: string;

  @HasOne(() => Taxons, {
    as: 'taxons',
    sourceKey: 'taxon_id',
    foreignKey: 'id',
  })
  taxon: Taxons;

  @BelongsTo(() => Product)
  product: Product;

  @HasOne(() => ModelPropertyValues, {
    sourceKey: 'model_id',
    foreignKey: 'model_id',
  })
  modelPropertyValues: ModelPropertyValues;
}
