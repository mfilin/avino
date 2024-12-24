import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { Taxons } from './Taxons';

@Scopes(() => ({
  countries: {
    where: { slug: 'country' },
  },
  categories: {
    where: { slug: 'category' },
  },
  brands: {
    where: { slug: 'brand' },
  },
}))
@Table({
  tableName: 'taxonomies',
  timestamps: false,
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
  updatedAt: 'updated_at',
})
export class Taxonomies extends Model {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    primaryKey: true,
  })
  @ForeignKey(() => Taxons)
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  slug: string;

  @Column({
    type: DataType.STRING,
  })
  created_at: string;

  @Column({
    type: DataType.STRING,
  })
  updated_at: string;

  @BelongsTo(() => Taxons)
  taxon: Taxons;
}
