import React from 'react';

export const useScrollDirection = () => {
  let scrollOffset = undefined;
  const [scrollToTop, setScrollToTop] = React.useState(false);

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      const scrollTopPosition =
        window.scrollY || document.documentElement.scrollTop;

      if (scrollTopPosition > scrollOffset || scrollTopPosition === 0) {
        setScrollToTop(false);
      } else if (scrollTopPosition < scrollOffset) {
        setScrollToTop(true);
      }
      scrollOffset = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
    }
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return scrollToTop;
};
