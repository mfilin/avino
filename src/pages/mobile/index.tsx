import IndexPage from '../../front/pages/IndexPage';
import { getStaticProps as indexPageStaticProps } from '../../front/next/pageActions';

export const getStaticProps = async (params) => {
  const props = await indexPageStaticProps(params);
  return {
    props: {
      ...props,
      isMobile: true, // MOBILE LAYOUT
    },
    // revalidate: 30,
  };
};

export default IndexPage;
