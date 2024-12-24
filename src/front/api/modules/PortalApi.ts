import bind from 'bind-decorator';
import { IApiServices } from '../types';
import { IPageProps } from '../../../types/portal/server';
import { routesMap } from '../routes';
import { extractTreeData } from '../converters/portal';
import { IDecodePortalSlugResult } from '../types/portal';

export default class PortalApi {
  constructor(private service: IApiServices) {}

  @bind
  async loadPortalStatic(): Promise<IPageProps> {
    const result = await this.service.rest.root.axios.get<IPageProps>(
      routesMap.portal.loadStatic(),
    );

    // Warning! Data mutation below!
    result.data.settings.categories.filters = extractTreeData(
      result.data.settings.categories.filters,
    );

    console.log(`loadPortalStatic() calling ${routesMap.portal.loadStatic()}`);

    return result.data;
  }

  @bind
  async decodeSlug(...slugs: string[]): Promise<IDecodePortalSlugResult> {
    const finalSlugs = Array.from(arguments || [])
      .flat()
      .filter(Boolean);
    const result =
      await this.service.rest.root.axios.get<IDecodePortalSlugResult>(
        routesMap.portal.decodeSlug(),
        {
          params: {
            slugs: finalSlugs,
          },
        },
      );
    return result.data;
  }

  @bind
  async decodeTaxons(...args: any): Promise<Record<string, string>> {
    const finalTaxons = Array.from(arguments || [])
      .flat()
      .filter(Boolean);

    if (finalTaxons.length) {
      const result = await this.service.rest.root.axios.get<
        Record<string, string>
      >(routesMap.portal.decodeTaxons(), {
        params: {
          taxons: finalTaxons,
        },
      });

      // console.log(result.request);

      return result.data;
    }

    // Prevent network request for empty taxons list
    return {} as Record<string, string>;
  }
}
