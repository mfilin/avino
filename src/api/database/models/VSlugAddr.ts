import { Column, Model, DataType, Table } from 'sequelize-typescript';

@Table({
  tableName: 'v_slug_addr',
  timestamps: false,
})
export class VSlugAddr extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  slug: string;

  @Column({
    type: DataType.STRING,
  })
  get addr(): Array<string> {
    const value = this.getDataValue('addr');
    try {
      return value ? JSON.parse(value) : value;
    } catch (error) {
      console.error(error);
      console.log(this.getDataValue('slug'), value);
      throw error;
    }
  }
}
