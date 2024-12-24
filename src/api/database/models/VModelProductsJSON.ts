import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ProductGroup } from '../class/ProductGroup';
import util from 'node:util';

@Table({
  tableName: 'v_products_json',
  timestamps: false,
})
export class VProductsJSON extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  json: string;

  @Column({
    type: DataType.VIRTUAL,
  })
  get product(): ProductGroup {
    const value = this.getDataValue('json');
    try {
      const res = JSON.parse(value);
      return new ProductGroup(this.getDataValue('name'), res);
    } catch (error) {
      console.error(error);
      console.log(util.inspect(value, { depth: null, colors: true }));
    }

    return new ProductGroup();
  }
}
