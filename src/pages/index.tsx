import IndexPage from '../front/pages/IndexPage';
import { getStaticProps as indexPageStaticProps } from '../front/next/pageActions';

export const getStaticProps = async (params) => {
  const props = await indexPageStaticProps(params);
  return {
    props: {
      ...props,
      shouldFreezeScroll: true,
      isMobile: false, // DESKTOP LAYOUT
    },
    // revalidate: 30,
  };
};

export default IndexPage;
