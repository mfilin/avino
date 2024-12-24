import {
  Command,
  CommandRunner,
  InquirerService,
  Question,
  QuestionSet,
} from 'nest-commander';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { UmzugService } from '../../database/umzug.service';
import path from 'path';

@Command({
  name: 'migration',
  description: 'SQL Migration CLI',
})
@QuestionSet({
  name: 'migration-name',
})
export class MigrationCommand extends CommandRunner {
  private readonly logger: Logger = new Logger(MigrationCommand.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly sequelize: Sequelize,
    private readonly inquirerService: InquirerService,
    private readonly umzugService: UmzugService,
  ) {
    super();
  }

  @Question({
    type: 'input',
    name: 'name',
    message: 'Enter migration file name',
    validate: Boolean,
  })
  parseName(name: string): string {
    return name;
  }

  async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    try {
      switch (passedParams[0]) {
        case 'create':
          const data = await this.inquirerService.ask(
            'migration-name',
            options,
          );
          const fileName = `${data.name}.ts`;
          await this.umzugService.runAsCreate(fileName);
          this.logger.verbose(
            `New migration has been created: ${path.resolve(
              this.configService.get('migrationsRoot'),
              fileName,
            )}`,
          );
          break;
        case 'up':
          await this.umzugService.up();
          break;
        case 'down':
          await this.umzugService.down(passedParams[1]);
          break;
        case 'reset':
          await this.umzugService.reset();
          await this.umzugService.up();
          break;
        default:
          await this.runWithNone(passedParams);
      }
    } catch (error) {
      this.logger.error(
        `Run command ${passedParams[0]} failed due to error ${error.message}`,
        error,
      );
    }
  }

  async runWithNone(passedParams: string[]) {
    await this.umzugService.asCLI(passedParams);
  }
}
