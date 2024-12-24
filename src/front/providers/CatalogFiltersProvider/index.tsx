import React from 'react';
import { FiltersControl } from '../../../class/FiltersControl';
import { usePortalStatic } from '../../hooks/usePortalStatic';
import { IPageProps } from '../../../types/portal/server';

interface IOwnProps {
  pageProps: IPageProps;
}

/**
 * Filters control factory
 * @param {IOwnProps} props
 * @return {null}
 * @constructor
 */
const CatalogFiltersProvider: React.FC<IOwnProps> = (props) => {
  const { queryProps } = props.pageProps;
  const { pageProps } = usePortalStatic();

  // Instance will only be created once
  FiltersControl.createIfNotExists(
    pageProps?.settings?.categories?.filters || {},
    queryProps || ({ order: '', orderDesc: '' } as IPageProps['queryProps']),
  );

  return null;
};

export default CatalogFiltersProvider;
