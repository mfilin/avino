import { QueryClient, dehydrate } from '@tanstack/react-query';
import Api from '../../api';

export class StaticPageCache {
  constructor(private readonly queryClient: QueryClient) {}

  public async prepare() {
    await this.queryClient.prefetchQuery(
      ['portal-static'],
      Api.instance.portal.loadPortalStatic,
    );

    return {
      dehydratedState: dehydrate(this.queryClient),
    };
  }
}
