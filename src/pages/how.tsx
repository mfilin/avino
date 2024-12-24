import { getStaticProps as getStaticPageProps } from '../front/next/pageActions/static.page.actions';
import RulesPage from '../front/pages/RulesPage';

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

export default RulesPage;
