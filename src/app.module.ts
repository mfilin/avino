import path from 'path';
import fs from 'fs';
// Warning! Link to ./front
import { formatPriceString } from './front/utils/price';
import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  RequestMethod,
} from '@nestjs/common';
import { format } from 'sql-formatter';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductService } from './api/product/product.service';
import { WireService } from './api/wire/wire.service';

import { ProductController } from './api/product/product.controller';

import { Sequelize } from 'sequelize-typescript';
import { SequelizeModule } from '@nestjs/sequelize';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskSchedulerModule } from './api/scheduler/task.scheduler.module';

import { CacheController } from './api/next/cache.controller';
import { NextMiddleware } from './api/next/next.middleware';
import { PortalService } from './api/portal/portal.service';
import { PortalController } from './api/portal/portal.controller';

import models from './api/database/models';
import config from './api/config';

import { UmzugService } from './api/database/umzug.service';
import { CartService } from './api/cart/cart.service';
import { CartController } from './api/cart/cart.controller';
import { ElasticUtilService } from './api/elastic/elastic.util.service';
import { AdminController } from './api/admin/admin.controller';
import { AdminService } from './api/admin/admin.service';
import { UserMiddleware } from './api/user/user.middleware';
import { UserService } from './api/user/user.service';
import { AuthController } from './api/auth/auth.controller';
import { AuthService } from './api/auth/auth.service';
import { ProfileController } from './api/profile/profile.controller';
import { ProfileService } from './api/profile/profile.service';
import { ProductEntityDaoImpl } from './api/core/dao/product.entity.dao.impl';
import { NextService } from './api/next/next.service';
import { DictionaryService } from './api/admin/controllers/dictionary.service';
import { DictionaryController } from './api/admin/controllers/dictionary.controller';
import { ElasticMigrationService } from './api/elastic/elastic.migration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TaskSchedulerModule,
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const logger = new Logger(SequelizeModule.name);
        const shouldLog =
          configService.get<string[]>('app.logFeatures').indexOf('sql') >= 0;

        return {
          dialect: 'mysql',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.user'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
          logging: shouldLog
            ? (sql: string, timing?: number) => {
                const outerSql = sql.replace('Executing (default):', '');
                logger.debug(format(outerSql, { language: 'sql' }));
              }
            : (sql: string, timing?: number) => void 0,
          hooks: {
            afterConnect: (connection: Sequelize) => {
              const options = configService.get('mysql.options');
              if (options) {
                Object.keys(options).forEach((name) => {
                  connection.query(`SET SESSION ${name}=?`, options[name]);
                });
              }
            },
          },
          models: models,
        };
      },
      inject: [ConfigService],
    }),
    ElasticsearchModule.registerAsync({
      useFactory: async (configServie: ConfigService) => ({
        node: configServie.get<string>('elastic.url'),
        log: [
          {
            type: 'stdio',
            levels: ['error', 'warning'],
          },
        ],
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('mail.host'),
          port: configService.get<number>('mail.port'),
          // secure: false,
          ignoreTLS: configService.get<boolean>('mail.ignoreTLS'),
          logger: configService.get<boolean>('mail.loggerEnabled'),
          debug: configService.get<boolean>('mail.debugMode'),
          auth: {
            user: configService.get<string>('mail.user'),
            pass: configService.get<string>('mail.password'),
          },
        },
        defaults: {
          from: `"${configService.get<string>(
            'mail.fromLabel',
          )}" <${configService.get<string>('mail.from')}>`,
        },
        preview: configService.get<boolean>('mail.previewMode'),
        template: {
          dir: path.join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter({
            // Reading SVG icons right from hbs template via function {{{svg 'icon'}}}
            svg: function (iconName: string) {
              let iconPath = path.join(__dirname, 'assets', `${iconName}.svg`);
              try {
                const content = fs.readFileSync(iconPath, 'utf8');
                return content;
              } catch (error) {
                console.error(error);
              }
            },
            priceFormat: function (value: number) {
              return formatPriceString(value);
            },
            tableIndex: function (index) {
              return index + 1;
            },
          }),
          options: {
            strict: true,
          },
        },
        options: {
          partials: {
            dir: path.join(__dirname, 'templates/partials'),
            options: {
              strict: true,
            },
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    ProductController,
    CacheController,
    PortalController,
    CartController,
    AuthController,
    AdminController,
    ProfileController,
    DictionaryController,
  ],
  providers: [
    ProductService,
    WireService,
    PortalService,
    UmzugService,
    ElasticUtilService,
    CartService,
    AdminService,
    AuthService,
    UserService,
    ProfileService,
    NextService,
    ProductEntityDaoImpl,
    DictionaryService,
    ElasticMigrationService,
  ],
})
export class AppModule implements NestModule, OnModuleInit {
  private logger: Logger = new Logger(AppModule.name);

  constructor(
    private readonly umzugService: UmzugService,
    private readonly configService: ConfigService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    if (!this.configService.get<boolean>('app.skipNextMiddleware')) {
      // Enable next middleware only when needed

      consumer
        .apply(NextMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.GET });
    }

    // const apiPrefix = this.configService.get<string>('apiPrefix');

    consumer.apply(UserMiddleware).forRoutes({
      path: `*`,
      method: RequestMethod.ALL,
    });
  }

  async onModuleInit(): Promise<any> {
    const res = await this.umzugService.checkPending();
    if (res.length) {
      this.logger.warn(`You have unmet migrations!`);
      this.logger.debug(res.map((migration) => migration.name).join('\n'));
      this.logger.warn(`Run command: yarn run migration up`);
    }
  }
}
