import React from 'react';
import clsx from 'clsx';
import memoize from 'fast-memoize';
import {
  IClientFiltersCatalog,
  TOrderType,
} from '../../../../../../types/portal/client';
import CatalogFilterBlocks from '../CatalogFilterBlocks';
import SortIcon from '../../../../../images/sort-icon.svg';
import FilterIcon from '../../../../../images/filter-icon.svg';
import ArrowUp from '../../../../../images/arrow-up.svg';
import { FiltersContext } from '../../../context/filters';
import SelectCustom from 'src/front/elements/SelectCustom';
import { useDeviceInfo } from '../../../../../hooks/device';
import CatalogControlPanelSwitchers from './components/CatalogControlPanelSwitchers';
import { IFiltersControl, IOrderControl } from '../../../../../types/filters';

import styles from './CatalogControlPanel.module.scss';

const sortTypes = [
  {
    label: 'Названию',
    value: ['name'],
  },
  {
    label: 'Цене',
    value: ['price'],
  },
  {
    label: 'Рейтингу',
    value: ['raiting'],
  },
  {
    label: 'Рейтингу и цене',
    value: ['raiting', 'price'],
  },
  {
    label: 'Популярности',
    value: ['is_hit'],
  },
];

const selectStyles = {
  control: (baseStyles) => ({
    ...baseStyles,
    border: 'none !important',
    backgroundColor: 'transparent',
    borderRadius: '3px',
    height: '24px',
    padding: '0',
    boxShadow: '0',
    cursor: 'pointer',
    justifyContent: 'flex-start',
    width: '165px',
  }),
  valueContainer: (baseStyles) => ({
    ...baseStyles,
    padding: '0px',
    flex: 'inherit',
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    color: '#797979',
    fontSize: '15px',
    lineHeight: '18px',
    paddingLeft: '22px',
    backgroundColor: state.isSelected ? '#EFEFEF' : '#fff',
    cursor: 'pointer',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: () => ({ padding: '0px' }),
};

interface IOwnProps {
  categoryKey: string;
  category: IClientFiltersCatalog;
  openFiltersDrawer: () => void;
}

const CatalogControlPanel: React.FC<IOwnProps> = (props) => {
  const { categoryKey, category, openFiltersDrawer } = props;
  const { isMobile } = useDeviceInfo();

  const filtersControl: IFiltersControl = React.useContext(FiltersContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const [fieldsOrderState, setFieldsOrderState] = React.useState(
    filtersControl.getFieldsOrderState(),
  );

  React.useEffect(() => {
    const handler = () => {
      setFieldsOrderState(filtersControl.getFieldsOrderState());
    };

    filtersControl.on('onOrderStateChange', handler);

    return () => {
      filtersControl.off('onOrderStateChange', handler);
    };
  }, [filtersControl]);

  const expand = React.useCallback(() => {
    if (!isMobile) {
      setIsOpen(!isOpen);
    } else {
      openFiltersDrawer();
    }
  }, [isOpen, setIsOpen]);

  const handleSelectSort = React.useCallback(
    (option) => {
      filtersControl.resetOrderBy(option.value);
    },
    [filtersControl, fieldsOrderState],
  );

  const orderControl: IOrderControl = React.useMemo(() => {
    return {
      has(fields: string[]): boolean {
        const active = fields.find((field) => fieldsOrderState.has(field));
        return Boolean(active);
      },
      getFieldTypes(fields: string[]): undefined | TOrderType | 'ascdesc' {
        let res = undefined;

        fields.forEach((field) => {
          const type = fieldsOrderState.get(field);

          if (type) {
            if (!res) {
              res = type;
            } else if (res !== type) {
              res = 'ascdesc';
            }
          }
        });

        return res;
      },
      handlerSwitch: memoize((fields: string[]) => () => {
        fields.forEach((field) => {
          let nextOrderType = undefined;
          switch (fieldsOrderState.get(field)) {
            case undefined:
              nextOrderType = 'asc';
              break;
            case 'asc':
              nextOrderType = 'desc';
              break;
            case 'desc':
              nextOrderType = undefined;
              break;
          }
          filtersControl.setOrderBy([field], nextOrderType);
        });
      }),
    };
  }, [filtersControl, fieldsOrderState]);

  return (
    <div
      className={clsx(styles.CatalogControlPanel, {
        [styles.MobileView]: isMobile,
      })}
    >
      <div
        className={clsx(styles.TopBar, {
          [styles.Expanded]: isOpen,
        })}
      >
        <div className={styles.LabelPart}>
          <SortIcon />
          {isMobile ? (
            <SelectCustom
              options={sortTypes}
              placeholder={'Сортировать по:'}
              onChange={handleSelectSort}
              styles={selectStyles}
            />
          ) : (
            'Сортировать по:'
          )}
        </div>
        {!isMobile ? (
          <CatalogControlPanelSwitchers
            sortTypes={sortTypes}
            orderControl={orderControl}
          />
        ) : null}
        <div>
          <div
            className={clsx(styles.FilterExpander, 'noselect', {
              [styles.FilterExpander_expanded]: isOpen,
            })}
            onClick={expand}
          >
            <FilterIcon /> Фильтр{' '}
            <ArrowUp
              className={clsx(styles.Indicator, {
                [styles.Indicator_expanded]: isOpen,
              })}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <CatalogFilterBlocks categoryKey={categoryKey} category={category} />
      )}
    </div>
  );
};

export default CatalogControlPanel;
