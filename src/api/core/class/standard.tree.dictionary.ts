import { ElasticsearchService } from '@nestjs/elasticsearch';
import { TreeDictionaryBase } from './tree.dictionary.base';
import { StandardDictionaryDto } from '../dto/standard.dictionary.dto';

export class StandardTreeDictionary extends TreeDictionaryBase<
  typeof StandardDictionaryDto
> {
  constructor(dictionaryCode: string, elastic: ElasticsearchService) {
    super(dictionaryCode, elastic);
  }
}
