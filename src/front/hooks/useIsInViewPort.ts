import React from 'react';

export function useIsInViewport(ref) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  let observer: IntersectionObserver;

  React.useEffect(() => {
    if (ref.current) {
      observer = new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting),
      );
    }
  }, [ref]);

  React.useEffect(() => {
    observer?.observe(ref.current);
    return () => {
      observer?.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}
