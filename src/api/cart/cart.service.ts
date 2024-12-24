import util from 'node:util';
import fs from 'fs';
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { SearchHit } from '@elastic/elasticsearch/lib/api/types';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { PRODUCTS_ELASTIC_INDEX_NAME } from '../core/const';
import { CartProductDto } from './dto/cart.product.dto';
import { Product } from '../database/models/Product';
import { CartProductRestoredDto } from './dto/cart.product.restored.dto';
import { CartInfoDto } from './dto/cart.info.dto';

@Injectable()
export class CartService {
  private readonly logger: Logger = new Logger(CartService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly elastic: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {}

  async loadCartProducts(orderDto: OrderDto): Promise<Product[]> {
    const shouldTerms = orderDto.products.map((product: CartProductDto) => {
      return {
        bool: {
          must: [
            {
              bool: {
                must: [
                  { term: { id: { value: product.id } } },
                  { term: { 'sku.keyword': { value: product.sku } } },
                ],
              },
            },
            {
              term: { 'slug.keyword': { value: product.slug } },
            },
          ],
          boost: 1,
        },
      };
    });

    const result = await this.elastic.search({
      index: PRODUCTS_ELASTIC_INDEX_NAME,
      query: {
        bool: {
          should: shouldTerms,
        },
      },
      size: orderDto.products?.length || 0,
    });

    return result.hits.hits.map((res: SearchHit<Product>) => {
      return res._source;
    });
  }

  async checkCartValid(
    orderDto: OrderDto,
    serverProducts: Product[],
  ): Promise<boolean> {
    const productsCount = orderDto.products?.length || 0;

    const orderMap: Record<CartProductDto['id'], CartProductDto> = {};
    for (const cartProduct of orderDto.products) {
      orderMap[cartProduct.id] = cartProduct;
    }

    const isValid = serverProducts.length === productsCount;

    if (!isValid) {
      const validationObject = { ...orderMap };
      serverProducts.forEach((product: Product) => {
        delete validationObject[product.id];
      });
      Object.values(validationObject).forEach((lostProduct) => {
        this.logger.error(
          `Cart product ${
            lostProduct.id
          } not found in Elastic. Full lost product properties: [${util.inspect(
            lostProduct,
            { depth: null, colors: false },
          )}]`,
        );
      });
    }

    return isValid;
  }

  restoreCartProducts(
    orderDto: OrderDto,
    serverProducts: Product[],
  ): CartProductRestoredDto[] {
    const res: CartProductRestoredDto[] = [];

    const orderMap: Record<CartProductDto['id'], Product> = {};
    for (const product of serverProducts) {
      orderMap[product.id] = product;
    }

    for (const cartProduct of orderDto.products) {
      const restoredProduct = new CartProductRestoredDto();
      restoredProduct.id = cartProduct.id;
      restoredProduct.name = orderMap[cartProduct.id].name;
      restoredProduct.sku = cartProduct.sku;
      restoredProduct.slug = cartProduct.slug;
      restoredProduct.count = cartProduct.count;
      restoredProduct.price = orderMap[cartProduct.id].price;
      restoredProduct.priceTotal =
        restoredProduct.price * restoredProduct.count;
      res.push(restoredProduct);
    }

    return res;
  }

  getCartInfo(
    orderDto: OrderDto,
    restoredProducts: CartProductRestoredDto[],
    ip?: string,
  ): CartInfoDto {
    const res = new CartInfoDto();

    res.total = 0;
    res.dateTime = new Intl.DateTimeFormat('ru-RU', {
      dateStyle: 'short',
      timeStyle: 'medium',
    }).format(new Date());
    res.orderNum = `${Math.floor(Date.now() / 1000)}`.substr(3);
    res.ip = ip || 'не определено';

    for (const product of restoredProducts) {
      res.total += product.priceTotal;
    }

    return res;
  }

  async sendAdminEmail(
    orderDto: OrderDto,
    restoredProducts: CartProductRestoredDto[],
    cartInfo: CartInfoDto,
  ) {
    this.logger.verbose(`Sending administration order email`);

    try {
      const adminEmails = this.configService.get<string[]>('mail.adminEmails');
      const res = await this.mailerService.sendMail({
        to: adminEmails.join(','),
        subject: `Новый заказ № ${cartInfo.orderNum} в интернет магазине "Виноград не виноват"`,
        template: './order.admin.confirmation.hbs',
        context: {
          // template parameters filling here
          order: orderDto,
          products: restoredProducts,
          info: cartInfo,
        },
      });
      this.logger.verbose(
        `Sent new order confirmation to ${adminEmails.join(',')}. MessageId: ${
          res.messageId
        } smtp server response: ${res.response}`,
      );
      if (res.rejected?.length) {
        this.logger.error(
          `Email to ${res.rejected.join()} failed due to reject. Full smtp response: ${util.inspect(
            res,
            { depth: null },
          )}`,
        );
      }
    } catch (error) {
      this.logger.error(`Send admin to email failed `);
    }
  }

  async sendEmailForm(
    orderDto: OrderDto,
    restoredProducts: CartProductRestoredDto[],
    cartInfo: CartInfoDto,
  ) {
    this.logger.verbose(`Sending order email to ${orderDto.email}`);

    try {
      const res = await this.mailerService.sendMail({
        to: orderDto.email,
        subject: `Ваш заказ № ${cartInfo.orderNum} в интернет магазине "Виноград не виноват"`,
        template: './order.confirmation.hbs',
        context: {
          // template parameters filling here
          order: orderDto,
          products: restoredProducts,
          info: cartInfo,
        },
      });
      this.logger.verbose(
        `Sent order email to ${orderDto.email}. MessageId: ${res.messageId} smtp server response: ${res.response}`,
      );
      if (res.rejected?.length) {
        this.logger.error(
          `Email to ${res.rejected.join()} failed due to reject. Full smtp response: ${util.inspect(
            res,
            { depth: null },
          )}`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Send email to ${orderDto.email} failed due to error: ${error.message}`,
      );
      throw new BadRequestException(`Email to ${orderDto.email} failed`, {
        cause: error,
        description: `Can't send email to ${orderDto.email}, please check email and repeat request`,
      });
    }
  }

  async sendPhoneForm() {
    // await this.mailerService.sendMail();
  }
}
