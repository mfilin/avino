import React from 'react';

import ChampagneAndSparklingWines from '../../images/catalog/champagne-and-sparkling-wines.svg';
import CognacAll from '../../images/catalog/cognac-all.svg';
import Glass from '../../images/catalog/glass.svg';
import Mixology from '../../images/catalog/mixology.svg';
import Spirits from '../../images/catalog/spirits.svg';
import VodkaAll from '../../images/catalog/vodka-all.svg';
import Water from '../../images/catalog/water.svg';
import Whisky from '../../images/catalog/whisky.svg';
import WineAll from '../../images/catalog/wine-all.svg';

export type TIcon =
  | 'champagne-and-sparkling-wines'
  | 'cognac-all'
  | 'glass-all'
  | 'mixology'
  | 'spirits'
  | 'vodka-all'
  | 'waters'
  | 'whisky'
  | 'wine-all';

interface IOwnProps {
  icon: TIcon;
}

const CatalogIcon: React.FC<IOwnProps> = (props) => {
  const { icon } = props;

  switch (icon) {
    case 'champagne-and-sparkling-wines':
      return <ChampagneAndSparklingWines />;
    case 'cognac-all':
      return <CognacAll />;
    case 'glass-all':
      return <Glass />;
    case 'mixology':
      return <Mixology />;
    case 'spirits':
      return <Spirits />;
    case 'vodka-all':
      return <VodkaAll />;
    case 'waters':
      return <Water />;
    case 'whisky':
      return <Whisky />;
    case 'wine-all':
      return <WineAll />;
  }

  return null;
};

export default CatalogIcon;
