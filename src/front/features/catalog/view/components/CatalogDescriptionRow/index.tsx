import React from 'react';
import { useTaxonDescription } from '../../../../../hooks/useTaxonDescription';
import ParsedHTMLElement from '../../../../../elements/ParsedHTMLElement';

interface IOwnProps {
  catalogKey: string;
}

const CatalogDescriptionRow: React.FC<IOwnProps> = (props) => {
  const { catalogKey } = props;
  const { description, isLoading } = useTaxonDescription(catalogKey);

  return (
    <div style={{ marginBottom: '110px' }}>
      {isLoading ? null : (
        <ParsedHTMLElement htmlText={description?.[catalogKey]?.descr} />
      )}
    </div>
  );
};

export default CatalogDescriptionRow;
