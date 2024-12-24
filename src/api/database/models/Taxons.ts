import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { ModelTaxons } from './ModelTaxons';
import { Taxonomies } from './Taxonomies';

@Scopes(() => ({
  countries: {
    include: [{ model: Taxonomies, attributes: [] }],
    // https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/#complex-where-clauses-at-the-top-level
    where: { '$t.slug$': 'country' },
  },
  categories: {
    include: [{ model: Taxonomies, attributes: [] }],
    where: { '$t.slug$': 'category' },
  },
  brands: {
    include: [{ model: Taxonomies, attributes: [] }],
    where: { '$t.slug$': 'brand' },
  },
}))
@Table({
  tableName: 'taxons',
  timestamps: false,
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
  updatedAt: 'updated_at',
})
export class Taxons extends Model {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    primaryKey: true,
  })
  @ForeignKey(() => ModelTaxons)
  id: number;

  @Column({
    type: DataType.BIGINT,
  })
  @ForeignKey(() => Taxonomies)
  taxonomy_id: number;

  @Column({
    type: DataType.BIGINT,
  })
  @ForeignKey(() => Taxons)
  parent_id: number;

  @Column({
    type: DataType.BIGINT,
  })
  priority: number;

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
  ext_title: string;

  @Column({
    type: DataType.STRING,
  })
  meta_keywords: string;

  @Column({
    type: DataType.STRING,
  })
  meta_description: string;

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
  site_url: string;

  @Column({
    type: DataType.STRING,
  })
  descr: string;

  @Column({
    type: DataType.STRING,
  })
  name_en: string;

  @Column({
    type: DataType.STRING,
  })
  discount: number;

  @Column({
    type: DataType.STRING,
  })
  tdiscount: number;

  @Column({
    type: DataType.STRING,
  })
  related_props: string;

  @Column({
    type: DataType.STRING,
  })
  related_factory: string;

  @Column({
    type: DataType.STRING,
  })
  example_sku: string;

  @Column({
    type: DataType.STRING,
  })
  example_sku_en: string;

  @Column({
    type: DataType.STRING,
  })
  example_sku_ru: string;

  @Column({
    type: DataType.STRING,
  })
  code: string;

  @Column({
    type: DataType.STRING,
  })
  nn: string;

  @Column({
    type: DataType.NUMBER,
  })
  in_menu: number;

  @Column({
    type: DataType.STRING,
  })
  title_menu: string;

  @Column({
    type: DataType.NUMBER,
  })
  eqbrand: number;

  @BelongsTo(() => ModelTaxons)
  modelTaxons: ModelTaxons;

  @HasOne(() => Taxonomies, { as: 'taxonomies', sourceKey: 'taxonomy_id' })
  taxonomy: Taxonomies;

  @HasOne(() => Taxons, {
    as: 'taxon_parent',
    sourceKey: 'parent_id',
    foreignKey: 'id',
  })
  parentTaxon: Taxons;
}
