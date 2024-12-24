import { Column, Model, DataType, Table } from 'sequelize-typescript';

@Table({
  tableName: 'v_taxons_tree',
  timestamps: false,
})
export class VTaxonsTree extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  slug: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  taxonomy: string;

  @Column({
    type: DataType.STRING,
  })
  get ids(): Array<number> {
    const value = this.getDataValue('ids');
    try {
      return value ? JSON.parse(value) : value;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Column({
    type: DataType.STRING,
  })
  get child_slugs(): Array<string> {
    const value = this.getDataValue('child_slugs');
    try {
      return value ? JSON.parse(value) : value;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Column({
    type: DataType.STRING,
  })
  get child_taxonomies(): Array<string> {
    const value = this.getDataValue('child_taxonomies');
    try {
      return value ? JSON.parse(value) : value;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Column({
    type: DataType.STRING,
  })
  get child_names(): Array<string> {
    const value = this.getDataValue('child_names');
    try {
      return value ? JSON.parse(value) : value;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
