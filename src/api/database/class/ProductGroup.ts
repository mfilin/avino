import { ProductSTD } from './ProductSTD';
import { MediaSTD } from './MediaSTD';
import { IProductMedia, IProductPropItem } from '../../../types/portal/server';
import util from 'node:util';

export class ProductGroup {
  constructor(name?: string, products?: object[]) {
    this.name = name;
    const newProducts: ProductSTD[] = [];
    for (const product of products) {
      const productSTD = new ProductSTD();

      for (const entry of Object.entries(product)) {
        const [key, value] = entry;
        productSTD[key] = value;
      }

      productSTD.media = this.getMedia((product as { media: string }).media);
      productSTD.taxons = this.getTaxons(
        (product as { taxons: string }).taxons,
      );
      productSTD.properties = this.getProperties(
        (product as { properties: string }).properties,
      );
      newProducts.push(productSTD);
    }
    this.products = newProducts;
  }

  name: string;
  products: ProductSTD[];

  private getMedia(json: string): MediaSTD[] {
    // const srcMedia: Object[] = JSON.parse((product as { media: string }).media);
    try {
      const src: IProductMedia[] = JSON.parse(json);
      const media: MediaSTD[] = [];

      if (src) {
        // src can be null for products without media
        for (const mediaElement of src) {
          const mediaItem = new MediaSTD(mediaElement);
          media.push(mediaItem);
        }
      }

      return media;
    } catch (error) {
      console.log(`(${typeof json})`, json);
      console.log(btoa(json));
      throw error;
    }
  }

  private getTaxons(json: string): Record<string, IProductPropItem> {
    const src: object[] | null = JSON.parse(json);
    const taxons: Record<string, IProductPropItem> = {};

    if (src) {
      for (const name of Object.keys(src)) {
        taxons[name] = {
          slug: src[name].slug,
          value: src[name].value,
        } as IProductPropItem;
      }
    }

    return taxons;
  }

  private getProperties(json: string): Record<string, IProductPropItem[]> {
    let src: object = {};
    try {
      src = JSON.parse(json) || {};
    } catch (error) {
      console.error(error);
    }

    const properties: Record<string, IProductPropItem[]> = {};

    for (const name of Object.keys(src)) {
      properties[name] = properties[name] || [];
      for (const item of src[name]) {
        properties[name].push({
          slug: item.value_slug,
          value: item.value,
          sorted: item.sorted,
        } as IProductPropItem);
      }
    }

    return properties;
  }
}
