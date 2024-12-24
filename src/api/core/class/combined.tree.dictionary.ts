import util from 'node:util';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { TAccType, TreeDictionaryBase } from './tree.dictionary.base';
import { StandardDictionaryDto } from '../dto/standard.dictionary.dto';

export class CombinedTreeDictionary extends TreeDictionaryBase<
  typeof StandardDictionaryDto
> {
  constructor(
    parentDict: string,
    dictionaryCode: string,
    elastic: ElasticsearchService,
  ) {
    super(dictionaryCode, elastic, true);
    this.prepareInternal(parentDict, dictionaryCode).catch(console.error);
    // const parentDictionary = new
  }

  private async prepareInternal(parentDict: string, dictionaryCode: string) {
    const { acc, root, slugs } = await this.prepare(dictionaryCode);
    this.acc = acc;
    this.root = root;
    this.slugs = slugs;

    // console.log(util.inspect({ slugs }, { depth: null, colors: true }));
    // console.log(
    //   util.inspect(Object.keys(slugs), { depth: null, colors: true }),
    // );

    if (Math.random() * 1000 > 0) return;
    console.log('FIX CATALOG');

    const { acc: parentAcc, root: parentRoot } = await this.prepare(parentDict);

    const fixCatalog = (tree: TAccType<StandardDictionaryDto>) => {
      for (const slug of Object.keys(tree)) {
        tree[slug] = {
          ...parentAcc[slug],
          ...tree[slug],
          props: {
            ...parentAcc[slug]?.props,
            ...tree[slug].props,
          },
        };

        if (tree[slug].childs) {
          fixCatalog(tree[slug].childs);
        }
      }
    };

    fixCatalog(this.root);

    // console.log('this.acc: ', this.acc);

    Object.keys(acc).forEach((slug) => {
      this.acc[slug] = {
        ...parentAcc[slug],
        ...this.acc[slug],
        props: {
          ...parentAcc[slug]?.props,
          ...this.acc[slug].props,
        } as typeof StandardDictionaryDto,
      };
    });
  }
}
