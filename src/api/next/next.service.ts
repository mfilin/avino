import {
  Injectable,
  Logger,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NextService {
  private readonly logger: Logger = new Logger(NextService.name);

  constructor(private readonly configService: ConfigService) {}

  async callRevalidate() {
    this.logger.verbose(`Call NEXT cache revalidation`);
    const key = this.configService.get<string>('app.cacheValidationKey');
    const host = this.configService.get<string>('host');
    const port = this.configService.get<string>('port');
    const url = new URL(`http://${host}:${port}/api/cache/${key}`);
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      this.logger.error(
        `Call revalidation failed due to error ${error.message}`,
      );
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Total static NEXT pages revalidate method call
   * @param key
   */
  async revalidateByKey(key: string) {
    if (key !== this.configService.get<string>('app.cacheValidationKey')) {
      throw new ForbiddenException();
    }

    await this.callRevalidate();
  }
}
