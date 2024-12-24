import {
  Controller,
  Get,
  UseGuards,
  Logger,
  Param,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import util from 'node:util';
import { AuthGuard } from '../../auth/auth.guard';
import { DictionaryService } from './dictionary.service';
import { ChangeDictionaryDto } from '../dto/change.dictionary.dto';

@Controller('admin/dict')
@UseGuards(AuthGuard)
export class DictionaryController {
  private readonly logger: Logger = new Logger(DictionaryController.name);

  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get(':name/:parent?')
  private async loadDict(
    @Param('name') name: string,
    @Param('parent') parent: string,
  ) {
    return await this.dictionaryService.loadDictByCode(name, parent);
  }

  @Post(':name')
  private async updateDictionary(
    @Param('name') name: string,
    @Body(new ValidationPipe()) changeDictionaryDto: ChangeDictionaryDto,
  ) {
    await this.dictionaryService.updateDictionary(name, changeDictionaryDto);
  }

  @Get(':name/suggest/:value')
  private async suggestDict(
    @Param('name') name: string,
    @Param('value') value: string,
  ) {
    const res = await this.dictionaryService.suggestDictionary(name, value);
    return res;
  }
}
