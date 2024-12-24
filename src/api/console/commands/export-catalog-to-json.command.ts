import { Command, CommandRunner } from 'nest-commander';
import { WireService } from '../../wire/wire.service';
import { Logger } from '@nestjs/common';

import path from 'path';

@Command({
  name: 'export-catalog-to-json',
  description: 'Export products from MySQL to JSON file',
})
export class ExportCatalogToJsonCommand extends CommandRunner {
  private readonly logger: Logger = new Logger(ExportCatalogToJsonCommand.name);

  constructor(private readonly wireService: WireService) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    await this.runWithNone();
  }

  async runWithNone() {
    this.logger.log('Start updating elastic cache with current products');
    await this.wireService.exportCatalogJson(
      path.join(__dirname, '../../../..', 'products.json'),
      3000,
    );
  }
}
