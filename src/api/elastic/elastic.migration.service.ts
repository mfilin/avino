import fs from 'node:fs/promises';
import path from 'node:path';
import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { DICTIONARY_INDEX_NAME, TAXON_DESCR_INDEX_NAME } from '../core/const';

@Injectable()
export class ElasticMigrationService {
  private readonly logger: Logger = new Logger(ElasticMigrationService.name);

  constructor(private readonly elastic: ElasticsearchService) {}

  async readMigrations(dir: string): Promise<string[]> {
    try {
      const files = await fs.readdir(dir);
      return files.map((name) => path.join(dir, name));
    } catch (error) {
      this.logger.error(error);
    }

    return [];
  }

  async migrate() {
    this.logger.verbose('Start elastic migrations');
    const migrations = await this.readMigrations('migrations/elastic');

    for (const filePath of migrations) {
      const [index, code] = path.basename(filePath).split('.');
      await this.processIndex(index, code, filePath);
    }
  }

  async processIndex(indexName: string, code: string, fileName: string) {
    switch (indexName) {
      case 'dictionaries':
        await this.processDictionary(code, fileName);
    }
  }

  async processDictionary(code: string, fileName: string) {
    const fileContent = await fs.readFile(fileName);
    try {
      const data = JSON.parse(String(fileContent));
      // TODO: Extract to another layer
      // { code: "", slug: "", order: null, parent: "", props: {} }
      const rows = [];

      const flatExtractor = (
        obj: any,
        parentSlug: string | null = null,
        path: string[] = [],
      ) => {
        if (obj.props) {
          obj.props.forEach((item) => {
            rows.push({
              code,
              id: `${code}-${path.join('-')}-${item.slug}`,
              // slug: `${path.join('-')}-${item.slug}`,
              slug: item.slug,
              order: null,
              parent: parentSlug,
              props: {
                name: item.name,
                type: item.type,
              },
            });
          });
        } else {
          for (const key of Object.keys(obj)) {
            const row = {
              code,
              id: `${code}-${key}`,
              slug: key,
              parent: parentSlug,
              order: null,
              props: {
                type: 'catalog',
              },
            };
            rows.push(row);
            flatExtractor(obj[key], row.id, path.concat(key));
          }
        }
      };

      flatExtractor(data);

      const index = DICTIONARY_INDEX_NAME;
      const operations = [];
      rows.forEach((row) => {
        const { id, ...restRow } = row;
        operations.push({ index: { _index: index, _id: id } }, restRow);
      });

      await this.elastic.bulk({
        index,
        refresh: true,
        operations,
      });

      this.logger.verbose(`Elastic dictionary "${code}" loaded success`);

      // console.log(data);
    } catch (error) {
      this.logger.error(error);
      console.error(error);
    }
  }
}
