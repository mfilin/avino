import { Product } from '../api/database/models/Product';

export class ProductGenerator {
  get(id: number): Product {
    const product = new Product();

    product.id = id;
    product.bpl = 4140;
    product.sku = '138667';
    product.name = this.name;
    product.sku2 = 'SW-7986';
    product.sku3 = null;
    product.slug = this.slug;
    product.price = 4057;
    product.stock = 114;
    product.dprice = 40;
    product.is_hit = 0;
    product.is_new = 0;
    product.name_en = this.name;
    product.name_ru = this.name;
    product.discount = 30;
    product.in_stock = 1;
    product.rf_price = null;
    product.food_text =
      '<p>Отличное сопровождение к традиционому открытому пирогу со свиной грудинкой, салату с мягким сыром и пасте со сливочным соусом.</p>';
    product.aroma_text =
      '<p>Вино чарует свежим, изысканным ароматом, сотканным из нот персика, нектарина, яблока, груши, лимона, орехов и белых цветов.&nbsp;</p>';
    product.color_text = '<p>Вино бледно-золотистого цвета</p>';
    product.is_quanted = 0;
    product.media = [
      {
        id: 19019,
        disk: 'public',
        name: '2',
        size: 4026,
        file_name: '2.webp',
        mime_type: 'image/webp',
        collection_name: 'default',
        custom_properties: '{"isPrimary":"true"}',
        generated_conversions: '{"thumbnail":true,"medium":true}',
      },
    ];

    product.taxons = {
      json: {
        root: {
          slug: 'wine-all',
          value: 'Вино',
        },
        category: {
          slug: 'wine',
          value: 'Вино',
        },
        importer: {
          slug: 'simple-wine',
          value: 'Simple-wine',
        },
        country: {
          slug: 'elzas',
          value: 'Эльзас',
        },
        brand: {
          slug: 'mark-kreydenveys',
          value: 'Марк Крейденвейс',
        },
        factory: {
          slug: 'mark-kreydenveys',
          value: 'Domaine Marc Kreydenweiss',
        },
      },
    };
    product.properties = {
      json: {
        color: [
          {
            slug: 'beloe',
            value: 'белое',
            sorted: 10,
          },
        ],
        pack: [
          {
            slug: 'bez-upakovki',
            value: 'без упаковки',
            sorted: 10,
          },
        ],
        perc: [
          {
            slug: '100',
            value: '100%',
            sorted: 10,
          },
        ],
        psort: [
          {
            slug: 'pino-blan',
            value: 'пино блан',
            sorted: 10,
          },
        ],
        pval: [
          {
            slug: '075',
            value: '0.75',
            sorted: 10,
          },
        ],
        pyear: [
          {
            slug: '2020',
            value: '2020',
            sorted: 10,
          },
        ],
        strength: [
          {
            slug: '125',
            value: '12.5%',
            sorted: 10,
          },
        ],
        sugar: [
          {
            slug: 'polusuhoe',
            value: 'полусухое',
            sorted: 10,
          },
        ],
      },
    };
    product.reqcounter = 100;
    product.smack_text =
      '<p>Деликатное, с обволакивающей текстурой, великолепным балансом и необычайно свежим, минеральным послевкусием.</p>';
    product.brand_price = '';
    product.description =
      '<p>Marc Kreydenweiss, &quot;Kritt&quot; Pinot Blanc&nbsp;&mdash; полусухое белое вино, в производстве которого используется виноград сорта Пино Блан. Ягоды произрастают на винограднике Крит &quot;Ле Шарм&quot; на каменистых почвах с большим содержанием железа и кварца. Средний возраст виноградных лоз составляет 25 лет. Сбор урожая проводится вручную, на винодельне плоды подвергаются мягкому прессованию с последующей ферментацией, проходящей в стальных резервуарах со строгим температурным контролем. Выдерживается вино 10 месяцев в дубовых бочках.&nbsp;</p>';
    product.factory_price = '';

    return product;
  }

  private makeRandomString(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  private get name() {
    return this.makeRandomString(30);
  }

  private get slug() {
    return this.makeRandomString(20);
  }
}
