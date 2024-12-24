import PrivacyPage from '../front/pages/PrivacyPage';
import { getStaticProps as getStaticPageProps } from '../front/next/pageActions/static.page.actions';

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

export default PrivacyPage;
