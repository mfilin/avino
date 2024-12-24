import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Product } from './Product';
import { PropertyValues } from './PropertyValues';
import { ModelTaxons } from './ModelTaxons';

@Table({
  tableName: 'model_property_values',
  timestamps: false,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
})
export class ModelPropertyValues extends Model {
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  property_value_id: number;

  @Column({
    type: DataType.STRING,
  })
  model_type: string;

  @PrimaryKey
  @Column({
    type: DataType.NUMBER,
  })
  @ForeignKey(() => Product)
  @ForeignKey(() => ModelTaxons)
  model_id: number;

  @Column({
    type: DataType.STRING,
  })
  created_at: string;

  @Column({
    type: DataType.STRING,
  })
  updated_at: string;

  @Column({
    type: DataType.NUMBER,
  })
  sorted: number;

  @BelongsTo(() => Product)
  product: Product;

  @HasOne(() => PropertyValues, { as: 'property_values' })
  propertyValues: PropertyValues[];

  @HasMany(() => ModelTaxons, {
    as: 'model_property_values',
    sourceKey: 'model_id',
    foreignKey: 'model_id',
  })
  modelTaxons: ModelTaxons;

  @Column({
    type: DataType.VIRTUAL,
  })
  get properties() {
    const properties = this.dataValues.propertyValues?.map(
      (pv: PropertyValues) => {
        const { value, title, settings, property } = pv.dataValues;
        return {
          tag: value,
          hint: title,
          value,
          name: property?.name,
          slug: property?.slug,
          type: property?.type,
          settings,
        };
      },
    );

    return properties;
  }
}
