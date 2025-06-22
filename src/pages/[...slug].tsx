import * as React from 'react';
import { NextPage } from 'next';
import { default as axios } from 'axios';
import { useRouter } from 'next/router';
import { usePortalStatic } from '../front/hooks/usePortalStatic';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Api from '../front/api';
import {
  FadeLayout,
  Footer,
  Layout,
  LoadingIndicator,
} from '../front/components';

import featureHeader from '../front/features/header';
import featureCatalog from '../front/features/catalog';
import { useSlugDecode } from '../front/hooks/useSlugDecode';
import featureSingleProduct from '../front/features/singleProduct';
import MobileBottomMenu from '../front/components/MobileBottomMenu';
import { setUserAgent } from '../front/utils/device';
import { decodeAddrAndSlug, TPageType } from '../front/utils/category';
import { useDeviceInfo } from '../front/hooks/device';
import { PAGE_COUNT_SETTING } from '../const';
import { useRouteSlugsDecoded } from '../front/hooks/useRouteSlugsDecoded';
import { routeSlugToArray } from '../front/utils/slug';
import { IDecodePortalSlugResult } from '../front/api/types/portal';
import MainLayout from '../front/layouts/MainLayout';

const { TopMenuContainer } = featureHeader.containers;
const { HeaderContainer } = featureHeader.containers;
const { CatalogContainer, Catalog2Container, MobileCatalogContainer } = featureCatalog.containers;
const { SingleProductContainer } = featureSingleProduct.containers;

interface ICatalogPageProps {
  description: Record<string, string>;
  catalog: Record<string, string>;
  pageType?: TPageType;
  id?: string;
}

const CatalogPage: NextPage<ICatalogPageProps> = (props) => {
  const router = useRouter();
  const slugs = useRouteSlugsDecoded();

  const { pageProps, isLoading: isPortalStaticLoading } = usePortalStatic();

  const { decodedSlugs, parents, isLoading } = useSlugDecode(slugs);

  //const { isMobile } = useDeviceInfo();

  const [category] = slugs;
  const [pageType, id]: [TPageType, string?] = React.useMemo(() => {
    return decodeAddrAndSlug(category, decodedSlugs, parents);
  }, [category, decodedSlugs]);

  return (
    <>
      {router.isFallback || isPortalStaticLoading ? (
        <LoadingIndicator />
      ) : (
        <div className="root">

          <HeaderContainer pageProps={pageProps} />

          {pageType === 'product' ? (
            <SingleProductContainer
              pageProps={pageProps}
              productId={Number(id)}
            />
          ) : null}

          {pageType === 'catalog' ? (
            <MainLayout haveHeadPanel={true}>
                
                {(slugs as string[]).length === 1 ? (
                  <Catalog2Container
                    pageProps={pageProps}
                    baseCatalog={props.catalog?.slug || ''}
                    filterSlug={decodedSlugs}
                  />
                ) : (
                  <CatalogContainer
                    pageProps={pageProps}
                    baseCatalog={props.catalog?.slug || ''}
                    filterSlug={decodedSlugs}
                  />
                )}

            </MainLayout>
          ) : null}
        </div>
      )}
    </>
  );
};

// Revalidate cache (cache can be recreated directly for each route)
//
// import { revalidatePath } from 'next/cache'
// revalidatePath('/blog/post-1')
//
// https://nextjs.org/docs/app/api-reference/functions/revalidatePath

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
// export const dynamic = 'auto'
// export const dynamicParams = true
// export const revalidate = false
// export const fetchCache = 'auto'
// export const runtime = 'nodejs'
// export const preferredRegion = 'auto'
// export const maxDuration = 5

// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// export async function generateStaticParams() {
//   return [
//     {
//       slug: ['wine-all']
//     }
//   ];
// }

// export async function getStaticPaths() {
//   return {
//     paths: [
//       // { params: { slug: ['wine-all'] } },
//       // { params: { slug: [ 'wine-all', 'properties.sugar' ] } },
//       // { params: { slug: [ 'wine-all', '*' ] } },
//     ],
//     // fallback: 'blocking',
//     fallback: true,
//   };
// }

export async function getServerSideProps(props: any) {
  const isMobile = setUserAgent(props.req?.headers?.['user-agent']);
  const queryClient = new QueryClient();
  const slugs = routeSlugToArray(props.params.slug);

  const [catalog, ...filters] = slugs;
  let description: Record<string, string> = {};

  const descriptionKeys = [catalog, ...filters];

  try {
    const slugDecodeQueryKey = ['slug-decode', slugs].flat();
    await queryClient.prefetchQuery(slugDecodeQueryKey, async () => {
      const result = await Api.instance.portal.decodeSlug.apply(
        Api.instance.portal,
        slugs,
      );
      await queryClient.setQueryData(slugDecodeQueryKey, result);
      return result;
    });

    const { slug, parent } =
      (queryClient.getQueryData(
        slugDecodeQueryKey,
      ) as IDecodePortalSlugResult) || {};

    const [pageType, id] = decodeAddrAndSlug(catalog, slug, parent);

    switch (pageType) {
      case 'product':
        if (id) {
          await queryClient.prefetchQuery(
            ['productGroup', String(id)],
            async () => {
              if (Boolean(id)) {
                const data = await Api.instance.product.loadGroupForProduct(id);
                data?.products.forEach((product) => {
                  queryClient.setQueryData(
                    ['productGroup', String(product.id)],
                    data,
                  );
                });
                return data;
              }
            },
          );
        }
        break;
      case 'catalog':
        const productsQueryKey = [
          'products',
          slugs.length ? slugs : [''],
          props.query.page || '',
          props.query.order || '',
          props.query.orderDesc || '',
          PAGE_COUNT_SETTING[0],
        ];
        const productsQueryHandler = async () => {
          const result = await Api.instance.product.loadProducts(slugs, {
            page: props.query.page as string,
            order: props.query.order as string,
            orderDesc: props.query.orderDesc as string,
            size: PAGE_COUNT_SETTING[0],
          });
          return result;
        };
        if (isMobile) {
          await queryClient.prefetchInfiniteQuery(
            productsQueryKey,
            productsQueryHandler,
          );
        } else {
          await queryClient.prefetchQuery(
            productsQueryKey,
            productsQueryHandler,
          );
        }
        break;
    }

    // if (filterValue && filterValue.length) {
    //   decodedSlug = await Api.instance.portal.decodeSlug(catalog, filterValue);
    // }

    await queryClient.prefetchQuery(
      ['descriptions', descriptionKeys],
      async () => {
        const result = await Api.instance.portal.decodeTaxons(descriptionKeys);
        return result;
      },
    );

    if (Boolean(catalog)) {
      description = await Api.instance.portal.decodeTaxons(catalog);
    }

    await queryClient.prefetchQuery(
      ['portal-static'],
      Api.instance.portal.loadPortalStatic,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(new Error(`${error.message} for url ${error.config?.url}`));
    } else {
      console.error(error);
    }
  }

  // console.log(dehydrate(queryClient).queries[1]);

  return {
    props: {
      // filters: decodedSlug,
      description,
      catalog,
      queryProps: {
        order: props.query.order || '',
        orderDesc: props.query.orderDesc || '',
      },
      dehydratedState: isMobile
        ? JSON.parse(JSON.stringify(dehydrate(queryClient)))
        : dehydrate(queryClient),
    } as ICatalogPageProps,
    // revalidate: false,
  };
}

export default CatalogPage;
