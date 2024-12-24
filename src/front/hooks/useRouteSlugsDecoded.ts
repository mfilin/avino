import React from 'react';
import { useRouter } from 'next/router';
import { routeSlugToArray } from '../utils/slug';

export function useRouteSlugsDecoded(): string[] {
  const router = useRouter();

  const routerQueryHash = ((router.query.slug as string[]) || []).join('/');

  const slugs: string[] = React.useMemo(() => {
    return routeSlugToArray(router.query.slug);
  }, [routerQueryHash]);

  return slugs;
}
