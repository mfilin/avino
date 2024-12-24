import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from './Product';

@Table({
  tableName: 'media',
  timestamps: false,
})
export class Media extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  model_type: string;

  @Column({
    type: DataType.NUMBER,
  })
  @ForeignKey(() => Product)
  model_id: number;

  @Column({
    type: DataType.STRING,
  })
  collection_name: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  file_name: string;

  @Column({
    type: DataType.STRING,
  })
  mime_type: string;

  @Column({
    type: DataType.STRING,
  })
  disk: string;

  @Column({
    type: DataType.NUMBER,
  })
  size: number;

  @Column({
    type: DataType.STRING,
  })
  manipulations: string;

  @Column({
    type: DataType.STRING,
  })
  custom_properties: string;

  @Column({
    type: DataType.STRING,
  })
  responsive_images: string;

  @Column({
    type: DataType.NUMBER,
  })
  order_column: number;

  @Column({
    type: DataType.STRING,
  })
  created_at: string;

  @Column({
    type: DataType.STRING,
  })
  updated_at: string;

  @Column({
    type: DataType.STRING,
  })
  uuid: string;

  @Column({
    type: DataType.STRING,
  })
  conversions_disk: string;

  @Column({
    type: DataType.STRING,
  })
  generated_conversions: string;

  @BelongsTo(() => Product)
  product: Product;
}
