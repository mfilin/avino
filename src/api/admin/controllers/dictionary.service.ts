import {
  Injectable,
  Logger,
  BadRequestException,
  NotImplementedException,
} from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { StandardTreeDictionary } from '../../core/class/standard.tree.dictionary';
import { CombinedTreeDictionary } from '../../core/class/combined.tree.dictionary';
import { ChangeDictionaryDto } from '../dto/change.dictionary.dto';

@Injectable()
export class DictionaryService {
  private readonly logger: Logger = new Logger(DictionaryService.name);
  private dictionaries: Record<string, StandardTreeDictionary> = {};

  constructor(private readonly elastic: ElasticsearchService) {
    this.prepare().catch(this.logger.error);
  }

  async loadDictByCode(name: string, parent?: string) {
    // console.log('[loadDictByCode] name: ', name);
    if (!this.dictionaries.hasOwnProperty(name)) {
      throw new NotImplementedException(`Dictionary "${name}" not found`);
    }
    return await this.dictionaries[name]?.load(parent);
  }

  async suggestDictionary(dictName: string, value: string) {
    if (this.dictionaries[dictName]) {
      const res = await this.dictionaries[dictName].suggest(value);
      // console.log('[suggestDictionary] res: ', res);
      return res;
    } else {
      throw new BadRequestException(`Dictionary does not exists`);
    }
  }

  async updateDictionary(
    dictName: string,
    changeDictionaryDto: ChangeDictionaryDto,
  ) {
    // Update or insert
    if (this.dictionaries[dictName]) {
      return await this.dictionaries[dictName]?.updateOrCreate(
        changeDictionaryDto,
      );
    } else {
      throw new BadRequestException(`Dictionary does not exists`);
    }
  }

  private async prepare() {
    this.dictionaries['category'] = new StandardTreeDictionary(
      'category',
      this.elastic,
    );
    this.dictionaries['country'] = new StandardTreeDictionary(
      'country',
      this.elastic,
    );
    this.dictionaries['properties'] = new CombinedTreeDictionary(
      'category',
      'properties',
      this.elastic,
    );
    this.dictionaries['values'] = new StandardTreeDictionary(
      'values',
      this.elastic,
    );
  }
}
