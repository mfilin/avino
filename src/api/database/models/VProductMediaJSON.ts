import {
  Column,
  Model,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from './Product';
import { MediaSTD } from '../class/MediaSTD';
import { IProductMedia } from '../../../types/portal/server';

@Table({
  tableName: 'v_product_media_json',
  timestamps: false,
})
export class VProductMediaJSON extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  @ForeignKey(() => Product)
  model_id: number;

  @Column({
    type: DataType.STRING,
  })
  get json(): Record<string, MediaSTD> | null {
    const value = this.getDataValue('json');

    if (!value) {
      return null;
    }

    try {
      const parsed: Array<IProductMedia> = JSON.parse(value);
      const res: Record<string, MediaSTD> = {};
      for (const row of parsed) {
        res[row.file_name] = new MediaSTD(row);
      }
      return res;
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
