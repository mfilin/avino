import React from 'react';
import ValueSlider from '../../../../../../../components/ValueSlider';
import { useCurrentPriceRange } from '../../../../../hooks/useCurrentPriceRange';
import Input from '../../../../../../../elements/Input';
import { formatPriceString } from '../../../../../../../utils/price';

import styles from './CatalogFiltersPriceSlider.module.scss';

interface IOwnProps {
  category: string;
  min: number;
  max: number;
}

const CatalogFiltersPriceSlider: React.FC<IOwnProps> = (props) => {
  const { category, min, max } = props;
  const { from, to } = useCurrentPriceRange(category);
  const [value, setValue] = React.useState<number[]>([from, to]);

  const priceControl = React.useMemo(() => {
    const values = [from, to];

    return {
      setMin(value: string | number) {
        values[0] = +value;
        setValue(Array.from(values));
      },
      setMax(value: string | number) {
        values[1] = +value;
        setValue(Array.from(values));
      },
      setMinMax(nextValues: number[]) {
        values[0] = nextValues[0];
        values[1] = nextValues[1];
        setValue(Array.from(values));
      },
    };
  }, [from, to, setValue]);

  return (
    <div className={styles.CatalogFiltersPriceSlider}>
      <div className={styles.Inputs}>
        <Input
          value={value[0]}
          endContent="₽"
          className={styles.Input}
          variant="underlined"
          onChange={priceControl.setMin}
        />
        <Input
          value={value[1]}
          endContent="₽"
          className={styles.Input}
          variant="underlined"
          onChange={priceControl.setMax}
        />
      </div>
      <div>
        <ValueSlider
          className={styles.Slider}
          min={min}
          max={max}
          value={value}
          onChange={priceControl.setMinMax}
        />
      </div>
    </div>
  );
};

export default CatalogFiltersPriceSlider;
