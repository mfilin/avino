import util from 'node:util';
import { Product } from '../models/Product';
import { TCatalogType } from '../../../types/portal/server';
import { MediaSTD } from './MediaSTD';

export class PopularProduct {
  id: number;
  name: string;
  subtitle: string;
  slug: string;
  price: number;
  media: string[];

  constructor(category: TCatalogType, product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.price = Number(product.price);
    this.media = Object.values(product.media || {}).map((media: MediaSTD) => {
      return `${media.id}/${media.file_name}`;
    });

    const pval = product.properties.pval?.[0];
    const strength = product.properties.strength?.[0];

    // When different categories will have different subtitle, you can do it
    // in lines below
    switch (category) {
      // case 'wine-all':
      // case 'spirits':
      // case 'mixology':
      // case 'cognac-all':
      // case 'champagne-and-sparkling-wines':
      // case 'whisky':
      // case 'vodka-all':
      default:
        this.subtitle = `${product.taxons.country?.value}, ${pval?.value} л, ${strength?.value}`;
    }
  }
}
