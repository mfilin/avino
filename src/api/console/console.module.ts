import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import models from '../database/models';
import config from '../config';
import { WireService } from '../wire/wire.service';
import { ProductService } from '../product/product.service';
import { ExportCatalogToElasticCommand } from './commands/export-catalog-to-elastic.command';
import { PortalService } from '../portal/portal.service';
import { MigrationCommand } from './commands/migration.command';
import { UmzugService } from '../database/umzug.service';
import { ExportCatalogToJsonCommand } from './commands/export-catalog-to-json.command';
import { GenerateElasticFakeProducts } from './commands/generate-elastic-fake-products.command';
import { Sequelize, Config } from 'sequelize';
import { format } from 'sql-formatter';
import { ElasticUtilService } from '../elastic/elastic.util.service';
import { AdminCommand } from './commands/admin.command';
import { AuthService } from '../auth/auth.service';
import { AdminPasswordQuestion } from './questions/admin.password.question';
import { AdminLoginQuestion } from './questions/admin.login.question';
import { ProductEntityDaoImpl } from '../core/dao/product.entity.dao.impl';
import { NextService } from '../next/next.service';
import { ElasticMigrationService } from '../elastic/elastic.migration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const logger = new Logger(SequelizeModule.name);
        const shouldLog =
          configService.get<string[]>('app.logFeatures').indexOf('sql') >= 0;

        return {
          dialect: 'mysql',
          host: configService.get<string>('database.host'),
          username: configService.get<string>('database.user'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
          logging: shouldLog
            ? (sql: string, timing?: number) => {
                const outerSql = sql.replace('Executing (default):', '');
                logger.verbose(format(outerSql, { language: 'sql' }));
              }
            : (sql: string, timing?: number) => void 0,
          hooks: {
            afterConnect: (connection: Sequelize, config: Config) => {
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
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    ProductService,
    PortalService,
    WireService,
    AuthService,
    UmzugService,
    GenerateElasticFakeProducts,
    ElasticUtilService,
    ExportCatalogToJsonCommand,
    ExportCatalogToElasticCommand,
    MigrationCommand,
    AdminPasswordQuestion,
    AdminLoginQuestion,
    AdminCommand,
    NextService,
    ProductEntityDaoImpl,
    ElasticMigrationService,
  ],
})
export class ConsoleModule {}
