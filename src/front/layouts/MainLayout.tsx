import * as React from 'react';
import { Footer } from '../components';
import featureHeader from '../features/header';
import { usePortalStatic } from '../hooks/usePortalStatic';

const { HeaderContainer } = featureHeader.containers;

interface MainLayoutProps {
  children: React.ReactNode;
  haveHeadPanel?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, haveHeadPanel = true }) => {
  const { pageProps } = usePortalStatic();
  
  React.useEffect(() => {
    if (!haveHeadPanel) return;
    
    const handleScroll = () => {
      if (window.scrollY > 0) {
        document.body.classList.add('header-white', 'header-scroll');
      } else {
        document.body.classList.remove('header-white', 'header-scroll');
      }
    };    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [haveHeadPanel]);

  return (
    <>
      <HeaderContainer pageProps={pageProps} />
      <main>{children}</main>
      <Footer pageProps={pageProps} />
    </>
  );
};

export default MainLayout;
