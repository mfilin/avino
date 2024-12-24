import axios from 'axios';
import { StaticPageCache } from '../cache/static.page.cache';
import { QueryClient } from '@tanstack/react-query';

export async function getStaticProps(params: any) {
  try {
    const cache = new StaticPageCache(new QueryClient());
    const props = await cache.prepare();

    return {
      props,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(new Error(`${error.message} for url ${error.config?.url}`));
    } else {
      console.error(error);
    }
  }

  return {
    props: {},
  };
}
