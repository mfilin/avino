import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 't_catalog_config',
  timestamps: false,
})
export class TCatalogConfig extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  category: string;

  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  type: string;

  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  source: string;

  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  slug: string;

  @Column({
    type: DataType.NUMBER,
  })
  order: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  get configuration(): object | null {
    const value = this.getDataValue('configuration');
    try {
      return value ? JSON.parse(value) : value;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
