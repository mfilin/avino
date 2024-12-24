import {
  Controller,
  Get,
  Post,
  UseGuards,
  Query,
  Body,
  BadRequestException,
  ValidationPipe,
  Logger,
  Param,
  UnprocessableEntityException,
} from '@nestjs/common';
import util from 'node:util';
import { AuthGuard, Policies } from '../auth/auth.guard';
import { ROLES } from '../core/policies';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.decorator';
import { ChangePasswordDto } from './dto/change.password.dto';
import { ChangeRoleDto } from './dto/change.role.dto';
import { AdminService } from './admin.service';
import { SlugTaxonomyDto } from '../portal/dto/slug.taxonomy.dto';
import { PortalService } from '../portal/portal.service';
import { priceParser } from '../../utils/priceParser';
import { ascDescOrderParser } from '../../utils/orderParser';
import { QueryProductAdminDto } from '../core/dto/query.product.admin.dto';
import { UpdateProductDto } from '../core/dto/update.product.dto';

@Controller('admin')
@UseGuards(AuthGuard)
export class AdminController {
  private readonly logger: Logger = new Logger(AdminController.name);

  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly portalService: PortalService,
  ) {}

  @Post('add-user')
  @Policies([ROLES.USER_MANAGEMENT.WRITE])
  async addNewUser(
    @Body(new ValidationPipe()) userDto: UserDto,
    @User() currentUser: UserDto,
  ) {
    // console.log('currentUser: ', currentUser);
    if (userDto.is_admin && !currentUser.is_admin) {
      throw new BadRequestException('Insufficient privileges');
    }

    const userId = await this.userService.createNewUser(userDto);

    return {
      userId,
    };
  }

  @Post('change-password')
  // @Policies([ROLES.USER_MANAGEMENT.WRITE])
  async changeUserPassword(
    @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
    @User() currentUser: UserDto,
  ) {
    const destinationUserId = changePasswordDto.id || currentUser.id;

    if (currentUser.id !== destinationUserId && !currentUser.is_admin) {
      throw new BadRequestException(`Insufficient privileges`);
    }

    const res = await this.userService.updateUserPassword(
      destinationUserId,
      changePasswordDto.password,
    );

    if (res.status === 'error') {
      throw new BadRequestException(`Internal error: ${res.error?.message}`);
    }

    return {
      status: res.status,
    };
  }

  @Post('change-role')
  async changeRole(
    @Body(new ValidationPipe()) changeRoleDto: ChangeRoleDto,
    @User() currentUser: UserDto,
  ) {
    if (!currentUser.is_admin) {
      throw new BadRequestException(`Insufficient privileges`);
    }

    await this.userService.updateUserRole(
      changeRoleDto.id,
      changeRoleDto.domain,
      changeRoleDto.value,
    );
  }

  @Get('product/:id')
  @Policies([ROLES.ADMIN.READ, ROLES.MANAGER.READ])
  async loadProduct(@Param('id') id: string) {
    const productGroup = await this.adminService.loadProductGroupById(id);
    return productGroup;
  }

  @Post('product/:id')
  @Policies([ROLES.ADMIN.READ, ROLES.MANAGER.READ])
  async updateProduct(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateProductDto: UpdateProductDto,
  ) {
    // console.log(util.inspect(updateProductDto, { depth: null, colors: true }));
    if (String(id) !== String(updateProductDto.id)) {
      throw new UnprocessableEntityException(
        `Document ID not equals content ID`,
      );
    }
    await this.adminService.updateProduct(updateProductDto);
  }

  @Get('products')
  @Policies([ROLES.ADMIN.READ, ROLES.MANAGER.READ])
  async loadProducts(
    @Query(new ValidationPipe()) queryProductDto: QueryProductAdminDto,
  ) {
    const decodedFilters: SlugTaxonomyDto =
      await this.portalService.decodeSlugToTaxonomy(queryProductDto.filters);

    // console.log(util.inspect(queryProductDto, { depth: null, colors: true }));

    const {
      ['product.price']: _productPriceFilter,
      ...outDecodedFilters
    }: Record<string, string[] | string> = decodedFilters.slug;

    const { from: priceFrom, to: priceTo } = priceParser(
      (decodedFilters['product.price'] as string[]) || [],
    );

    const sort = ascDescOrderParser(
      queryProductDto.order,
      queryProductDto.orderDesc,
      {
        onFieldNotAllowed: (field, message) => {
          this.logger.error(message);
        },
      },
    );

    // console.log('decodedFilters: ', decodedFilters);
    // console.log({ priceFrom, priceTo });

    const products = await this.adminService.loadProductsAdmin(
      {
        page: queryProductDto.page,
        pageSize: queryProductDto.size,
        sort,
        priceFrom,
        priceTo,
        query: queryProductDto.queryStr,
        dateFrom: queryProductDto.dateFrom,
        dateTo: queryProductDto.dateTo,
      },
      outDecodedFilters,
    );

    // await this.adminService.loadProductsAdmin({});

    return products;
  }
}
