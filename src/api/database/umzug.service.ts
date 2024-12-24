import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { Umzug } from 'umzug';
import { SequelizeStorage } from 'umzug/lib';
import { format } from 'sql-formatter';
import { FormatOptionsWithLanguage } from 'sql-formatter/lib/src/sqlFormatter';
import fs from 'fs';

@Injectable()
export class UmzugService {
  private readonly logger: Logger = new Logger(UmzugService.name);

  private readonly umzug: Umzug;

  constructor(
    private readonly sequelize: Sequelize,
    private readonly configService: ConfigService,
  ) {
    this.umzug = new Umzug({
      migrations: {
        glob: [
          '*.{js,ts,up.sql}',
          {
            cwd: this.configService.get('migrationsRoot'),
          },
        ],
        resolve: (params) => {
          if (!params.path.endsWith('.sql')) {
            return Umzug.defaultResolver(params);
          }

          const { context: sequelize } = params;

          const formatterOptions: FormatOptionsWithLanguage = {
            denseOperators: true,
            language: 'sql',
            newlineBeforeSemicolon: true,
            keywordCase: 'upper',
          };

          return {
            name: params.name,
            up: async () => {
              const sql = format(
                fs.readFileSync(params.path).toString(),
                formatterOptions,
              );
              const queries = sql.split(';').filter(Boolean);
              queries.forEach((query) => {
                sequelize.query(query);
              });
            },
            down: async () => {
              const destFile = params.path.replace('.up.sql', '.down.sql');
              if (!fs.existsSync(destFile)) {
                const errMessage = `Migration downgrade file ${destFile} not found`;
                this.logger.error(errMessage);
                throw new Error(errMessage);
              }
              const sql = format(
                fs.readFileSync(destFile).toString(),
                formatterOptions,
              );
              const queries = sql.split(';').filter(Boolean);
              queries.forEach((query) => {
                sequelize.query(query);
              });
            },
          };
        },
      },
      context: this.sequelize,
      storage: new SequelizeStorage({ sequelize: this.sequelize }),
      logger: {
        warn: this.logger.warn,
        error: this.logger.error,
        debug: this.logger.debug,
        info: this.logger.verbose,
      },
    });
  }

  async runAsCreate(fileName: string) {
    await this.umzug.create({
      name: fileName,
      prefix: 'TIMESTAMP',
      skipVerify: true,
      folder: this.configService.get('migrationsRoot'),
    });
  }

  async checkPending() {
    const res = await this.umzug.pending();
    return res;
  }

  async asCLI(passedParams: string[]) {
    await this.umzug.runAsCLI(passedParams);
  }

  async up() {
    const newItems = await this.umzug.up();
    if (!newItems.length) {
      this.logger.verbose(`Your database is up to date, nothing to do`);
    } else {
      newItems.forEach((item) => {
        this.logger.verbose(`Migration ${item.name} loaded`);
      });
    }
  }

  async down(count?: number | string) {
    const options = count ? { step: +count } : undefined;
    const removedItems = await this.umzug.down(options);
    if (!removedItems.length) {
      this.logger.verbose(`Nothing to remove, your database is clear`);
    } else {
      removedItems.forEach((item) => {
        this.logger.verbose(`Migration ${item.name} removed`);
      });
    }
  }

  async reset() {
    // this.umzug.debug.enabled = true;
    const removedItems = await this.umzug.down({ to: 0 } as any);
    if (!removedItems.length) {
      this.logger.verbose(`Nothing to remove, your database is clear`);
    } else {
      removedItems.forEach((item) => {
        this.logger.verbose(`Migration ${item.name} removed`);
      });
    }
  }
}
