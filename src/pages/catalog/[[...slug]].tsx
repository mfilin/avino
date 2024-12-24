import React from 'react';
import util from 'node:util';
import { NextPage } from 'next';
import { default as axios } from 'axios';
import { useRouter } from 'next/router';
import Api from '../../front/api';
import { usePortalStatic } from '../../front/hooks/usePortalStatic';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Footer, Layout, LoadingIndicator } from '../../front/components';
import featureHeader from '../../front/features/header';
import featureCatalog from '../../front/features/catalog';
import MobileBottomMenu from '../../front/components/MobileBottomMenu';
import { PAGE_COUNT_SETTING } from '../../const';
// import { IPageProps } from '../../types/portal/server';

const { TopMenuContainer } = featureHeader.containers;
const { CatalogContainer } = featureCatalog.containers;

interface ICatalogPageProps {
  filters: Record<string, string>;
  description: Record<string, string>;
  catalog?: Record<string, string>;
}

const CatalogPage: NextPage = (props: ICatalogPageProps) => {
  const router = useRouter();

  const { pageProps } = usePortalStatic();

  return (
    <div>
      {router.isFallback ? (
        <LoadingIndicator />
      ) : (
        <>
          <TopMenuContainer pageProps={pageProps} />
          <Layout>
            <CatalogContainer
              pageProps={pageProps}
              baseCatalog={props.catalog}
              filterSlug={props.filters}
            />
          </Layout>
          <MobileBottomMenu />
          <Footer pageProps={pageProps} />
        </>
      )}
    </div>
  );
};

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

export async function getStaticPaths() {
  return {
    paths: [
      // { params: { slug: ['wine-all'] } },
      // { params: { slug: [ 'wine-all', 'properties.sugar' ] } },
      // { params: { slug: [ 'wine-all', '*' ] } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(props: any) {
  const queryClient = new QueryClient();

  const [catalog, ...filters] = props.params.slug || [];
  const filterValue = filters || [];
  let decodedSlug: Record<string, string> = {};
  let description: Record<string, string> = {};

  const descriptionKeys = [catalog, ...filters];

  try {
    await queryClient.prefetchQuery(
      ['products', props.params.slug || ''],
      async () => {
        const result = await Api.instance.product.loadProducts(
          props.params.slug,
          {
            page: props.params.page as string,
            order: props.params.order as string,
            size: PAGE_COUNT_SETTING[0],
          },
        );

        // console.log('[products]: ', result);

        return result || [];
      },
    );

    if (filterValue && filterValue.length) {
      decodedSlug = await Api.instance.portal.decodeSlug(filterValue);
    }

    await queryClient.prefetchQuery(
      ['descriptions', descriptionKeys.filter(Boolean)],
      async () => {
        const result = await Api.instance.portal.decodeTaxons(descriptionKeys);
        return result || {};
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
      console.error(new Error(`${error.message} for url ${error.config.url}`));
    } else {
      console.error(error);
    }
  }

  const resProps: ICatalogPageProps = {
    filters: decodedSlug,
    description,
    // catalog,
    dehydratedState: dehydrate(queryClient),
  };

  if (catalog) {
    resProps.catalog = catalog;
  }

  // console.log(util.inspect(resProps, { depth: null, colors: true }));
  // console.log(resProps);
  // console.log(resProps.dehydratedState.queries[1].queryKey);

  return {
    props: resProps,
    revalidate: false,
  };
}

export default CatalogPage;
