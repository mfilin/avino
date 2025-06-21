import React from 'react';
import { TClientCatalogItem } from '../../../../../../types/portal/client';
import Breadcrumbs, { IBreadcrumb } from 'src/front/components/Breadcrumbs';

import styles from './CatalogHeader.module.scss';
import { NBSP } from '../../../../../../const';

interface IOwnProps {
  label: React.ReactNode;
  description?: React.ReactNode;
  breadCrumbs?: IBreadcrumb[];
  total?: number;
}

const CatalogHeader: React.FC<IOwnProps> = (props) => {
  const { label, description, breadCrumbs, total } = props;

  return (
    // <div className={styles.CatalogHeader}>
    //   <h1>{label ? label : NBSP}</h1>
    //   <div className={styles.Total}>Найдено {total} записей</div>
    // </div>

    // <div className="heading__content">
    //   <h1 className="heading__title">{label ? label : NBSP}</h1>
    //   <div className="heading__text">
    //     {description ? description : NBSP}
    //   </div>
    // </div>


    <div className="heading">
      <div className="heading__body">
        <div className="container">
            <div className="heading__main">
               {breadCrumbs.length ? (
                  <Breadcrumbs withHome items={breadCrumbs} />
               ) : (
                <div className={styles.BreadcrumbPlaceholder}>{NBSP}</div>
               )}
              <div className="heading__content">
                  <h1 className="heading__title">{label ? label : NBSP}</h1>
                  <div className="heading__text">
                    {description ? description : NBSP}
                  </div>
              </div>
            </div>
        </div>
      </div>
      <div className="heading__media heading__media--sm">
          <img src="images/heading_image_sm.jpg" className="img-cover" alt="" />
      </div>
      <div className="heading__media heading__media--md">
          <img src="imgages/heading_image.jpg" className="img-cover" alt="" />
      </div>
    </div>
  );
};

export default CatalogHeader;
