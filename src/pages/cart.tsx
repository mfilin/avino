import { getStaticProps as getStaticPageProps } from '../front/next/pageActions/static.page.actions';
import ComparisonPage from '../front/pages/ComparisonPage';

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

// TODO: Cart page should be here, comparison page - error
export default ComparisonPage;
