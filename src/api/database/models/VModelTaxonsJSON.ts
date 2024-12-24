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
  tableName: 'v_model_taxons_json',
  timestamps: false,
})
export class VModelTaxonsJSON extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  @ForeignKey(() => Product)
  model_id: number;

  @Column({
    type: DataType.STRING,
  })
  get json(): object {
    const value = this.getDataValue('json');
    try {
      return value ? JSON.parse(value) : value;
    } catch (error) {
      console.error(error);
      console.log({
        model_id: this.getDataValue('model_id'),
        value,
      });
      throw error;
    }
  }

  @BelongsTo(() => Product)
  product: Product;
}
