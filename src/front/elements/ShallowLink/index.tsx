import React from 'react';
import Router from 'next/router';
import Link, { LinkProps } from 'next/link';

interface IOwnProps extends LinkProps {
  shallow?: boolean;
  openInNewTab?: boolean;
}

const ShallowLink: React.FC<React.PropsWithChildren<IOwnProps>> = (props) => {
  const {
    children,
    href,
    shallow = true,
    scroll,
    onClick,
    ...restProps
  } = props;

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      // e.stopPropagation();
      onClick?.(e);
      Router.push(href, undefined, { scroll, shallow });
    },
    [href, shallow],
  );

  return (
    <Link {...restProps} href={href} onClick={handleClick} prefetch={false}>
      {children}
    </Link>
  );
};

export default ShallowLink;
