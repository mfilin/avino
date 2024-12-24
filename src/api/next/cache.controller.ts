import { Controller, Get } from '@nestjs/common';

@Controller('cache')
export class CacheController {
  @Get('status')
  async loadStatus() {
    return { status: 1 };
  }
}
