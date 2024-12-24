import { ElasticsearchService } from '@nestjs/elasticsearch';
import util from 'node:util';
import { DICTIONARY_INDEX_NAME } from '../const';
import {
  SearchHit,
  SearchPhraseSuggestOption,
} from '@elastic/elasticsearch/lib/api/types';
import { TreeDictionaryItemDto } from '../dto/tree.dictionary.item.dto';
import { ChangeDictionaryDto } from '../../admin/dto/change.dictionary.dto';

// { code: 'countries', order: 0, slug: "russia", parent: null, props: { name: "Russia" } },
// { code: 'countries', order: 0, slug: "moscow", parent: "russia", props: { name: "Moscow" } },
// { code: 'countries', order: 0, slug: "svao", parent: "moscow", props: { name: "SVAO" } },
// { code: 'countries', order: 0, slug: "otradnoe", parent: "svao", props: { name: "Otradnoe" } },
// { code: 'countries', order: 1, slug: "sviblovo", parent: "svao", props: { name: "Sviblovo" } },
//
// { code: 'countries', order: 1, slug: "poland", parent: null, props: { name: "Poland" } },
// { code: 'countries', order: 0, slug: "district1", parent: "poland", props: { name: "District1" } },
// { code: 'countries', order: 0, slug: "varshav", parent: "district1", props: { name: "Varshaw" } }

interface ISuggestOption {
  text: string;
  score: number;
  freq: number;
}

export interface IDictionarySuggestResult<T> {
  hits: Array<TreeDictionaryItemDto<T>>;
  suggest: Array<ISuggestOption>;
}

export type TAccType<T> = Record<
  string,
  TreeDictionaryItemDto<T> & {
    childs?: Record<string, TreeDictionaryItemDto<T>>;
  }
>;

export type TPreparationResult<T> = {
  acc: TAccType<T>;
  root: TAccType<T>;
  slugs: Record<string, Set<TreeDictionaryItemDto<T>>>;
};

export abstract class TreeDictionaryBase<T> {
  // each dictionary has it own properties
  protected acc: TAccType<T> = {};
  protected root: TAccType<T> = {};
  slugs: Record<string, Set<TreeDictionaryItemDto<T>>> = {};

  protected constructor(
    private readonly dictionaryCode: string,
    private readonly elastic: ElasticsearchService,
    skipPreparation: boolean = false,
  ) {
    // Build dictionary from sources
    if (!skipPreparation) {
      this.prepare(this.dictionaryCode)
        .catch(console.error)
        .then(({ acc, root, slugs }: TPreparationResult<T>) => {
          this.acc = acc;
          this.root = root;
          this.slugs = slugs;
        });
    }
  }

  public async load(parent?: string) {
    if (parent) {
      return this.slugs[parent] ? Array.from(this.slugs[parent]) : [];
    }

    return [this.root];
  }

  public async updateOrCreate(changeDictionaryDto: ChangeDictionaryDto) {
    const index = DICTIONARY_INDEX_NAME;
    const { slug, parent, props } = changeDictionaryDto;
    const id = `${this.dictionaryCode}-${slug}`;
    await this.elastic.update({
      index,
      id,
      doc: {
        code: this.dictionaryCode,
        slug,
        parent,
        props,
        order: null,
      },
    });
  }

  public async suggest(value: string): Promise<IDictionarySuggestResult<T>> {
    const index = DICTIONARY_INDEX_NAME;
    const res = await this.elastic.search<TreeDictionaryItemDto<T>>({
      index,
      query: {
        wildcard: {
          ['props.name']: `*${value}*`,
        },
      },
      suggest: {
        'suggest-name': {
          text: value,
          term: {
            field: 'props.name',
          },
        },
      },
    });

    // console.log(util.inspect(res, { depth: null, colors: true }));
    const firstSuggest = res.suggest['suggest-name'][0];
    const suggestOptions = Array.isArray(firstSuggest?.options)
      ? firstSuggest.options
      : [];

    return {
      hits: res.hits.hits.map((item) => item._source),
      suggest: suggestOptions.map((item) => {
        return {
          text: item.text,
          score: item.score,
          freq: item.freq,
        };
      }),
    };
  }

  protected async prepare(
    dictionaryCode: string,
  ): Promise<TPreparationResult<T>> {
    const index = DICTIONARY_INDEX_NAME;
    const res = await this.elastic.search({
      index,
      query: {
        bool: {
          filter: [{ term: { ['code']: dictionaryCode } }],
        },
      },
      size: 10000,
    });

    const acc: TAccType<T> = {};
    const root: TAccType<T> = {};
    const slugs: Record<string, Set<TreeDictionaryItemDto<T>>> = {};

    res.hits.hits.forEach((item: SearchHit<TreeDictionaryItemDto<T>>) => {
      // acc[item._source.slug] = item._source;
      acc[item._id] = item._source;
    });

    // console.log(util.inspect(acc, { depth: null, colors: true }));

    Object.keys(acc).forEach((key: string) => {
      const item = acc[key];
      if (item.parent && acc[item.parent]) {
        const parent = acc[item.parent];
        parent.childs = parent.childs || {};
        parent.childs[key] = item;
      }

      if (!item.parent) {
        root[key] = item;
      }

      slugs[item.slug] = slugs[item.slug] || new Set();
      slugs[item.slug].add(item);
    });

    return { acc, root, slugs };
    // console.log(util.inspect(this.root, { depth: null, colors: true }));
  }
}
