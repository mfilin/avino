import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import {
  ALL_INDICES,
  DICTIONARY_INDEX_NAME,
  PRODUCT_GROUPS_ELASTIC_INDEX_NAME,
  PRODUCTS_ELASTIC_INDEX_NAME,
  SETTINGS_ELASTIC_INDEX_NAME,
  TAXON_DESCR_INDEX_NAME,
  TAXON_PROPERTY_REVERSE_SLUG_ADDR,
  TAXON_TREE_INDEX_NAME,
  USERS_INDEX_NAME,
} from '../core/const';

@Injectable()
export class ElasticUtilService {
  private readonly logger: Logger = new Logger(ElasticUtilService.name);

  constructor(private readonly elastic: ElasticsearchService) {}

  /**
   * Create (if not exists) product groups Elastic index
   * @return {Promise<void>}
   */
  async createProductGroupsElasticIndex() {
    const index = PRODUCT_GROUPS_ELASTIC_INDEX_NAME;
    const indexExists = await this.elastic.indices.exists({
      index,
    });

    if (!indexExists) {
      this.logger.log(`Index ${index} does not exists, create new`);
      await this.elastic.indices.create({
        index,
        body: {
          settings: {
            analysis: {
              filter: {
                autocomplete_filter: {
                  type: 'edge_ngram',
                  min_gram: 1,
                  max_gram: 10,
                },
              },
              analyzer: {
                autocomplete: {
                  type: 'custom',
                  tokenizer: 'standard',
                  filter: ['lowercase', 'autocomplete_filter'],
                },
              },
            },
          },
          mappings: {},
        },
      });

      this.logger.log(`Index ${index} created`);
    }
  }

  /**
   * Create (if not exists) products Elastic index
   * @return {Promise<void>}
   */
  async createProductElasticIndex() {
    const index = PRODUCTS_ELASTIC_INDEX_NAME;
    const indexExists = await this.elastic.indices.exists({
      index,
    });

    if (!indexExists) {
      this.logger.log(`Index ${index} does not exists, create new`);
      await this.elastic.indices.create({
        index,
        body: {
          settings: {
            analysis: {
              filter: {
                autocomplete_filter: {
                  type: 'edge_ngram',
                  min_gram: 1,
                  max_gram: 10,
                },
              },
              analyzer: {
                autocomplete: {
                  type: 'custom',
                  tokenizer: 'standard',
                  filter: ['lowercase', 'autocomplete_filter'],
                },
              },
            },
          },
          mappings: {
            properties: {
              name: {
                type: 'text',
                fielddata: true,
                analyzer: 'autocomplete',
                search_analyzer: 'standard',
              },
              ['name_ru']: {
                type: 'text',
                analyzer: 'autocomplete',
                search_analyzer: 'standard',
              },
              ['name_en']: {
                type: 'text',
                analyzer: 'autocomplete',
                search_analyzer: 'standard',
              },
              created_at: {
                type: 'date',
                format: 'yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis',
              },
              updated_at: {
                type: 'date',
                format: 'yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis',
              },
              deleted_at: {
                type: 'date',
                format: 'yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis',
              },
            },
          },
        },
      });
      this.logger.log(`Index ${index} created`);
    }
  }

  async createSettingsIndex() {
    const indexExists = await this.elastic.indices.exists({
      index: SETTINGS_ELASTIC_INDEX_NAME,
    });

    if (!indexExists) {
      this.logger.verbose(
        `Index ${SETTINGS_ELASTIC_INDEX_NAME} does not exists, create new`,
      );
      await this.elastic.indices.create({
        index: SETTINGS_ELASTIC_INDEX_NAME,
        body: {
          mappings: {
            properties: {
              value: {
                type: 'object',
                enabled: false,
              },
            },
          },
        },
      });
      this.logger.verbose(`Index ${SETTINGS_ELASTIC_INDEX_NAME} created`);
    }
  }

  async createElasticReverseAddrIndex() {
    const index = TAXON_PROPERTY_REVERSE_SLUG_ADDR;
    const indexExists = await this.elastic.indices.exists({
      index,
    });

    if (!indexExists) {
      this.logger.verbose(`Index ${index} does not exists, create new`);

      await this.elastic.indices.create({
        index,
        body: {
          mappings: {
            properties: {
              // addr: {
              //   type: 'text',
              // },
              // root_addr: {
              //   type: 'text',
              // },
            },
          },
        },
      });

      this.logger.verbose(`Index ${index} created`);
    }
  }

  async createElasticTaxonDescriptionIndex() {
    const index = TAXON_DESCR_INDEX_NAME;
    const indexExists = await this.elastic.indices.exists({
      index,
    });

    if (!indexExists) {
      this.logger.verbose(`Index ${index} does not exists, create new`);

      await this.elastic.indices.create({
        index,
        body: {
          mappings: {
            properties: {
              descr: {
                type: 'text',
              },
              site_url: {
                type: 'text',
              },
            },
          },
        },
      });

      this.logger.verbose(`Index ${index} created`);
    }
  }

  async createElasticTaxonTreeIndex() {
    const index = TAXON_TREE_INDEX_NAME;
    const indexExists = await this.elastic.indices.exists({
      index,
    });
    if (!indexExists) {
      this.logger.verbose(`Index ${index} does not exists, create new`);

      await this.elastic.indices.create({
        index,
        body: {
          mappings: {
            properties: {
              slug: { type: 'keyword' },
              parent: { type: 'text' },
              all_childs: { type: 'text' },
            },
          },
        },
      });
    }
  }

  async createUsersIndex() {
    const index = USERS_INDEX_NAME;
    const indexExists = await this.elastic.indices.exists({
      index,
    });
    if (!indexExists) {
      this.logger.verbose(`Index ${index} does not exists, create new`);

      await this.elastic.indices.create({
        index,
        body: {
          mappings: {
            properties: {
              name: { type: 'text' },
              surname: { type: 'text' },
              login: { type: 'keyword' },
              password: { type: 'keyword' },
              is_admin: { type: 'boolean' },
              policies: { type: 'object' },
            },
          },
        },
      });
    }
  }

  async createDictionariesIndex() {
    const index = DICTIONARY_INDEX_NAME;
    const indexExists = await this.elastic.indices.exists({ index });
    if (!indexExists) {
      this.logger.verbose(`Index ${index} does not exists, create new`);

      // 1. Find all childs for single region (Moscow => SVAO => [Otradnoe, Sviblovo])
      // 2. Find top levels => [Russia, Poland]
      //
      // { name: "Russia", slug: "russia", parent: null },
      // { name: "Moscow", slug: "moscow", parent: "russia" },
      // { name: "SVAO", slug: "svao", parent: "moscow" },
      // { name: "Otradnoe", slug: "otradnoe", parent: "svao" },
      // { name: "Sviblovo", slug: "sviblovo", parent: "svao" },
      //
      // { name: "Poland", slug: "poland", parent: null },
      // { name: "District1", slug: "district1", parent: "poland" },
      // { name: "Varshaw", slug: "varshav", parent: "district1" }
      //
      //
      //
      //      Russia                       Poland
      //         \                            \
      //       Moscow                       District1
      //           \                            \
      //          SVAO                        Varshaw
      //         /    \
      //  Otradnoe    Sviblovo
      //
      //
      //
      //  Find SVAO: => [Otradnoe, Sviblovo]

      await this.elastic.indices.create({
        index,
        body: {
          mappings: {
            properties: {
              code: { type: 'keyword' },
              slug: { type: 'keyword' },
              order: { type: 'integer' },
              parent: { type: 'keyword' },
              props: { type: 'object' },
            },
          },
        },
      });
    }
  }

  async mergeProductsIndex() {
    this.logger.log(`Forcemerge elastic index: ${PRODUCTS_ELASTIC_INDEX_NAME}`);
    await this.elastic.indices.forcemerge({
      index: PRODUCTS_ELASTIC_INDEX_NAME,
      flush: true,
      wait_for_completion: true,
    });
  }

  async mergeIndex(index: string) {
    this.logger.log(`Forcemerge elastic index: ${index}`);
    await this.elastic.indices.forcemerge({
      index: index,
      flush: true,
      wait_for_completion: true,
    });
  }

  async refreshIndex(index: string) {
    await this.elastic.indices.refresh({
      index,
    });
  }

  async prepareAllIndices() {
    await this.createProductGroupsElasticIndex();
    await this.createProductElasticIndex();
    await this.createSettingsIndex();
    await this.createElasticReverseAddrIndex();
    await this.createElasticTaxonDescriptionIndex();
    await this.createElasticTaxonTreeIndex();
    await this.createUsersIndex();
    await this.createDictionariesIndex();
  }

  async mergeElasticIndices() {
    await Promise.all(
      ALL_INDICES.map(async (index: string) => {
        this.logger.log(`Forcemerge elastic index: ${index}`);
        await this.elastic.indices.forcemerge({
          index: index,
          flush: true,
          wait_for_completion: true,
        });
      }),
    );
  }
}
