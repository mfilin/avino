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
    <div className="heading__breadcrumb">
      <ol className="breadcrumb breadcrumb--white">
        <NextuiBreadcrumbs>
          {withHome ? (
            <BreadcrumbItem>
              <li className="breadcrumb__item">
                <ShallowLink href={Config.basePath || '/'}>
                  Главная
                </ShallowLink>
              </li>
            </BreadcrumbItem>
          ) : null}
          {items.map((item: IBreadcrumb, index: number) => {
            return (
              <BreadcrumbItem key={`breadcrumb-${index}`}>
                <li className="breadcrumb__item">
                  <ShallowLink href={item.link}>{item.label}</ShallowLink>
                </li>
              </BreadcrumbItem>
            );
          })}
        </NextuiBreadcrumbs>
      </ol>
    </div>
  );
};

export default Breadcrumbs;
