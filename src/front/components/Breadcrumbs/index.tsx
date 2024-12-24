import React from 'react';
import {
  Breadcrumbs as NextuiBreadcrumbs,
  BreadcrumbItem,
} from '@nextui-org/react';
import Config from '../../config';
import HomeIconSvg from '../../images/home.svg';
import ShallowLink from '../../elements/ShallowLink';

export interface IBreadcrumb {
  label: React.ReactNode;
  link: string;
}

interface IOwnProps {
  withHome?: boolean;
  items: IBreadcrumb[];
}

const Breadcrumbs: React.FC<IOwnProps> = (props) => {
  const { items, withHome } = props;

  return (
    <div>
      <NextuiBreadcrumbs>
        {withHome ? (
          <BreadcrumbItem>
            <ShallowLink href={Config.basePath || '/'}>
              <HomeIconSvg />
            </ShallowLink>
          </BreadcrumbItem>
        ) : null}
        {items.map((item: IBreadcrumb, index: number) => {
          return (
            <BreadcrumbItem key={`breadcrumb-${index}`}>
              <ShallowLink href={item.link}>{item.label}</ShallowLink>
            </BreadcrumbItem>
          );
        })}
      </NextuiBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;
