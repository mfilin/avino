import React from 'react';
import Config from '../../config';
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
        {withHome ? (
          <li className="breadcrumb__item">
            <ShallowLink href={Config.basePath || '/'} className="breadcrumb__link">
              Главная
            </ShallowLink>
          </li>
        ) : null}
        
        {items.map((item: IBreadcrumb, index: number) => (
          <li key={`breadcrumb-${index}`} className="breadcrumb__item">
            <ShallowLink href={item.link} className="breadcrumb__link">
              {item.label}
            </ShallowLink>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Breadcrumbs;
