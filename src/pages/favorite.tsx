import { getStaticProps as getStaticPageProps } from '../front/next/pageActions/static.page.actions';
import FavoritePage from '../front/pages/FavoritePage';

export const getStaticProps = async (params: any) => {
  const { props } = await getStaticPageProps(params);
  return {
    props: {
      ...props,
      isMobile: false,
    },
    revalidate: false,
  };
};

export default FavoritePage;
