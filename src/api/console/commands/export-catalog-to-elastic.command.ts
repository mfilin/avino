import { Command, CommandRunner } from 'nest-commander';
import { WireService } from '../../wire/wire.service';
import { Logger } from '@nestjs/common';

@Command({
  name: 'export-catalog-to-elastic',
  description: 'Export products from MySQL to Elastic',
})
export class ExportCatalogToElasticCommand extends CommandRunner {
  private readonly logger: Logger = new Logger(
    ExportCatalogToElasticCommand.name,
  );

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
    try {
      await this.wireService.updateElasticCatalog(3000);
      // await this.wireService.catalogExportDebug(3000);
      // await this.wireService.updateElasticCatalog(50);
    } catch (error) {
      this.logger.error(error);
      console.error(error);
    }
  }
}
