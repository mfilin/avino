import axios from 'axios';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { IndexPageCache } from '../cache/index.page.cache';

export async function getStaticProps(props: any) {
  const queryClient = new QueryClient();

  try {
    const indexPageCache = new IndexPageCache(queryClient);
    await indexPageCache.prepare();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(new Error(`${error.message} for url ${error.config?.url}`));
    } else {
      console.error(error);
    }
  }

  return {
    dehydratedState: dehydrate(queryClient),
  };
}
