import { Column, Model, DataType, Table } from 'sequelize-typescript';

@Table({
  tableName: 'v_model_taxons',
  timestamps: false,
})
export class VModelTaxons extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  taxon_id: number;

  @Column({
    type: DataType.STRING,
  })
  title_menu: string;

  @Column({
    type: DataType.NUMBER,
  })
  model_id: number;

  @Column({
    type: DataType.STRING,
  })
  taxonomy_slug: string;

  @Column({
    type: DataType.STRING,
  })
  taxonomy_name: string;

  @Column({
    type: DataType.STRING,
  })
  taxon_name: string;

  @Column({
    type: DataType.STRING,
  })
  taxon_slug: string;

  @Column({
    type: DataType.NUMBER,
  })
  parent_id: number;
}
