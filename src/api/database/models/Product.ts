import util from 'node:util';
import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { ModelPropertyValues } from './ModelPropertyValues';
import { ModelTaxons } from './ModelTaxons';
import { PropertyValues } from './PropertyValues';
import { Properties } from './Properties';
import { Taxons } from './Taxons';
import { Taxonomies } from './Taxonomies';
import { VModelTaxonsJSON } from './VModelTaxonsJSON';
import { VModelPropertiesJSON } from './VModelPropertiesJSON';
import {
  IProductJSONPropertiesDescriptior,
  type TProductProperties,
} from '../../../types/portal/server';
import { VProductMediaJSON } from './VProductMediaJSON';
import { Media } from './Media';
import { MediaSTD } from '../class/MediaSTD';

@Table({
  tableName: 'products',
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
  updatedAt: 'updated_at',
})
export class Product extends Model {
  static fullModel = [
    {
      model: ModelPropertyValues,
      attributes: ['sorted', 'model_type'],
      include: [
        {
          model: PropertyValues,
          attributes: ['title', 'value', 'priority', 'settings'],
          include: [{ model: Properties }],
        },
      ],
    },
    {
      model: ModelTaxons,
      include: [
        {
          model: Taxons,
          attributes: ['name', 'slug', 'name_en', 'code'],
          include: [Taxonomies],
        },
      ],
      attributes: ['model_type'],
    },
  ];

  static asJson = [
    {
      model: VModelTaxonsJSON,
    },
    {
      model: VModelPropertiesJSON,
    },
    {
      model: VProductMediaJSON,
    },
  ];

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    primaryKey: true,
  })
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
  sku: string;

  @Column({
    type: DataType.STRING,
  })
  sku2: string;

  @Column({
    type: DataType.STRING,
  })
  sku3: string;

  @Column({
    type: DataType.NUMBER,
  })
  price: number;

  @Column({
    type: DataType.STRING,
  })
  excerpt: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  state: string;

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
    type: DataType.DATE,
  })
  deleted_at: string;

  @Column({
    type: DataType.DATE,
  })
  created_at: string;

  @Column({
    type: DataType.DATE,
  })
  updated_at: string;

  @Column({
    type: DataType.NUMBER,
  })
  units_sold: number;

  @Column({
    type: DataType.STRING,
  })
  last_sale_at: string;

  @Column({
    type: DataType.NUMBER,
  })
  stock: number;

  @Column({
    type: DataType.NUMBER,
  })
  rf_price: number;

  @Column({
    type: DataType.NUMBER,
  })
  rf_manager: number;

  @Column({
    type: DataType.STRING,
  })
  name_en: string;

  @Column({
    type: DataType.STRING,
  })
  name_ru: string;

  @Column({
    type: DataType.NUMBER,
  })
  bpl: number;

  @Column({
    type: DataType.NUMBER,
  })
  discount: number;

  @Column({
    type: DataType.NUMBER,
  })
  dprice: number;

  @Column({
    type: DataType.NUMBER,
  })
  promo_pr: number;

  @Column({
    type: DataType.STRING,
  })
  promo_do: string;

  @Column({
    type: DataType.NUMBER,
  })
  in_stock: number;

  @Column({
    type: DataType.NUMBER,
  })
  is_new: number;

  @Column({
    type: DataType.NUMBER,
  })
  is_hit: number;

  @Column({
    type: DataType.NUMBER,
  })
  is_quanted: number;

  @Column({
    type: DataType.STRING,
  })
  color_text: string;

  @Column({
    type: DataType.STRING,
  })
  smack_text: string;

  @Column({
    type: DataType.STRING,
  })
  aroma_text: string;

  @Column({
    type: DataType.STRING,
  })
  food_text: string;

  @Column({
    type: DataType.STRING,
  })
  postav: string;

  @Column({
    type: DataType.STRING,
  })
  names: string;

  @Column({
    type: DataType.NUMBER,
  })
  reqcounter: number;

  @Column({
    type: DataType.NUMBER,
  })
  guid: number;

  @Column({
    type: DataType.STRING,
  })
  brand_price: string;

  @Column({
    type: DataType.STRING,
  })
  factory_price: string;

  @Column({
    type: DataType.VIRTUAL,
  })
  get productProperties() {
    const properties: object[] = [];

    this.dataValues.modelPropertyValues?.forEach((mpv: ModelPropertyValues) => {
      /*console.log('==========================\n\n');
      console.log(mpv.properties);
      console.log('\n\n==========================');*/
      properties.push.apply(properties, mpv.properties);
    });

    return properties;
  }

  @HasMany(() => ModelPropertyValues, 'model_id')
  modelPropertyValues: ModelPropertyValues[];

  @HasMany(() => ModelTaxons, 'model_id')
  modelTaxons: ModelTaxons[];

  @HasMany(() => Media, 'model_id')
  modelMedia: Media[];

  @HasOne(() => VModelTaxonsJSON, { sourceKey: 'id', foreignKey: 'model_id' })
  get taxons(): TProductProperties {
    return this.getDataValue('taxons');
  }

  set taxons(value: unknown) {
    const tvalue: IProductJSONPropertiesDescriptior =
      value as IProductJSONPropertiesDescriptior;
    if (!value) {
      console.error('taxons not defined for model', this.getDataValue('id'));
      console.log('dataValues: ', this.dataValues);
    } else if (!tvalue?.json) {
      console.error('taxons json not defined for model:', tvalue?.model_id);
    }
    this.setDataValue('taxons', tvalue?.json);
  }

  @HasOne(() => VProductMediaJSON, { sourceKey: 'id', foreignKey: 'model_id' })
  get media(): Record<string, MediaSTD> {
    return this.getDataValue('media');
  }

  set media(value: unknown) {
    this.setDataValue('media', (value as VProductMediaJSON)?.json);
  }

  @HasOne(() => VModelPropertiesJSON, {
    sourceKey: 'id',
    foreignKey: 'model_id',
  })
  get properties(): TProductProperties {
    return this.getDataValue('properties');
  }

  set properties(value: unknown) {
    const tvalue: IProductJSONPropertiesDescriptior =
      value as IProductJSONPropertiesDescriptior;
    if (!value) {
      console.error(
        'properties not defined for model',
        this.getDataValue('id'),
      );
    }
    if (!tvalue?.json) {
      console.error('properties json not defined for model:', tvalue.model_id);
    }

    this.setDataValue('properties', tvalue?.json);
  }
}
