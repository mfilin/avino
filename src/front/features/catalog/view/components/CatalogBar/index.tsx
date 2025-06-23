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

const CatalogBar: React.FC<IOwnProps> = (props) => {

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

    <div className="page-bar" data-page-bar>
      <div className="container">
        <div className="page-bar__row">
          <div className="page-bar__group">
            <button className="filter-toggle" data-filter-toggle>
              <i>
                <svg className="ico-svg" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                  <use xlinkHref="img/sprites/sprite.svg#filter" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                </svg>
              </i>
              <span>Фильтры</span>
            </button>
            <div className="page-bar__sorter">
              <div className="sorter" data-select>
                <input type="hidden" data-select-value="Цена" />
                <div className="sorter__header" data-select-toggle>
                  <div className="sorter__active" data-select-active>По популярности</div>
                  <div className="sorter__arrow">
                    <svg className="ico-svg" viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#angle_down" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </div>
                </div>
                <div className="sorter__content">
                  <div className="sorter__item active" data-select-item="Цена">По популярности</div>
                  <div className="sorter__item" data-select-item="По стоимости">По стоимости</div>
                  <div className="sorter__item" data-select-item="По наличию">По наличию</div>
                </div>
              </div>
            </div>
          </div>
          <div className="page-bar__text">250 товаров</div>
          <div className="page-view">
            <div className="page-view__title">Вид каталога</div>
            <button type="button" className="page-view__button">
              <svg className="ico-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <use xlinkHref="img/sprites/sprite.svg#icon-tiles" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
              </svg>
            </button>
            <button type="button" className="page-view__button active">
              <svg className="ico-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <use xlinkHref="img/sprites/sprite.svg#icon-list" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>





/*
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
*/

  );
};

export default CatalogBar;
