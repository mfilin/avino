import {
  Controller,
  Post,
  Body,
  // Ip,
  NotAcceptableException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { RealIP } from 'nestjs-real-ip';
import { OrderDto } from './dto/order.dto';
import util from 'node:util';
import { CartService } from './cart.service';
import { CartProductRestoredDto } from './dto/cart.product.restored.dto';
import { CartInfoDto } from './dto/cart.info.dto';

@Controller('/cart')
export class CartController {
  private readonly logger: Logger = new Logger(CartController.name);

  constructor(private cartService: CartService) {}

  @Post('full-form')
  async createOrderFullForm(@Body() orderDto: OrderDto, @RealIP() ip: string) {
    // console.log(util.inspect({ orderDto }, { depth: null, colors: true }));
    if (!orderDto.products?.length) {
      throw new NotAcceptableException('Cart empty');
    }

    const cartProducts = await this.cartService.loadCartProducts(orderDto);

    const isValid = await this.cartService.checkCartValid(
      orderDto,
      cartProducts,
    );

    if (!isValid) {
      this.logger.error(
        `User sent not valid cart. ${util.inspect(
          {
            ip,
            cart: orderDto,
          },
          { depth: null },
        )}`,
      );
      throw new BadRequestException('Cart not valid');
    }

    const restoredProducts: CartProductRestoredDto[] =
      this.cartService.restoreCartProducts(orderDto, cartProducts);

    const cartInfo: CartInfoDto = this.cartService.getCartInfo(
      orderDto,
      restoredProducts,
      ip,
    );

    await this.cartService.sendEmailForm(orderDto, restoredProducts, cartInfo);
    await this.cartService.sendAdminEmail(orderDto, restoredProducts, cartInfo);
  }

  @Post('short-form')
  async createOrderShortForm(@Body() orderDto: OrderDto) {
    await this.cartService.sendPhoneForm();
  }
}
