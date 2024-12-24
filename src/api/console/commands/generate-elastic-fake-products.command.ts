import { Command, CommandRunner } from 'nest-commander';
import { WireService } from '../../wire/wire.service';
import { Logger } from '@nestjs/common';

@Command({
  name: 'generate-elastic-fake-products',
  description: 'Generate fake products for to test elastic benchmark',
})
export class GenerateElasticFakeProducts extends CommandRunner {
  private readonly logger: Logger = new Logger(
    GenerateElasticFakeProducts.name,
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
    this.logger.log('Start uploading elastic fake products');
    await this.wireService.generateFakeProducts(10000, 150000);
  }
}
