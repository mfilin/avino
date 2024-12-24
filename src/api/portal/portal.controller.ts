import util from 'node:util';
import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { PortalService } from './portal.service';
import { NextService } from '../next/next.service';

@Controller('/portal')
export class PortalController {
  constructor(
    private readonly portalService: PortalService,
    private readonly nextService: NextService,
  ) {}

  @Get('check')
  async check() {
    // await this.portalService.exportBrandsDictionary();
  }

  @Get('decode-slug')
  async decodeSlug(@Query('slugs') slugs: string[]) {
    if (slugs && slugs.length) {
      const res = await this.portalService.decodeSlugToTaxonomy(slugs, true);
      return res;
    }

    throw new BadRequestException('Parameter slugs not found');
  }

  @Get('decode-taxons')
  async decodeTaxons(@Query('taxons') taxons: string[], @Req() req: Request) {
    if (taxons && taxons.length) {
      const res = await this.portalService.loadTaxonsDescription(
        Array.isArray(taxons) ? taxons : [taxons],
      );
      return res;
    }

    return null;
  }

  @Get('portal-static')
  async portalStatic() {
    const result = await this.portalService.pageProps();

    return result;
  }

  @Post('revalidate')
  async revalidate(@Query('key') key: string) {
    await this.nextService.revalidateByKey(key);
  }
}
