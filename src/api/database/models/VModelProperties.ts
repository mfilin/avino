import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'v_model_properties',
  timestamps: false,
})
export class VModelProperties extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  model_id: number;

  @Column({
    type: DataType.STRING,
  })
  slug: string;

  @Column({
    type: DataType.STRING,
  })
  slug_name: string;

  @Column({
    type: DataType.STRING,
  })
  value: string;

  @Column({
    type: DataType.STRING,
  })
  value_slug: string;

  @Column({
    type: DataType.NUMBER,
  })
  sorted: number;
}
