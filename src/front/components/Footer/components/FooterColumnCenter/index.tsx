import React from 'react';
import ShallowLink from '../../../../elements/ShallowLink';
import FooterColumn from '../FooterColumn';
import { getCategoryURL } from '../../../../utils/category';

import styles from './FooterColumnCenter.module.scss';

export interface IColumn {
  label: string;
  slug: string;
  rows: Array<{ label: string; slug: string; addr: string }>;
}

const InformationColumn: React.FC = () => (
  <FooterColumn
    label={'Информация'}
    rows={[
      {
        key: 'brands',
        content: <ShallowLink href={`/brands`}>Каталог брендов</ShallowLink>,
      },
      {
        key: 'about',
        content: <ShallowLink href={`/about`}>О компании</ShallowLink>,
      },
      {
        key: 'rules',
        content: <ShallowLink href={`/how`}>Правила работы</ShallowLink>,
      },
      {
        key: 'questions-and-answers',
        content: (
          <ShallowLink href={`/questions-and-answers`}>
            Вопросы и ответы
          </ShallowLink>
        ),
      },
      {
        key: 'contacts',
        content: <ShallowLink href={`/contacts`}>Контакты</ShallowLink>,
      },
    ]}
  />
);

const ContactsColumn: React.FC = () => (
  <FooterColumn
    label={'Контакты'}
    rows={[
      {
        key: 'address',
        content: (
          <div>
            <a href="http://maps.yandex.ru/?text=125167,%20%D0%B3.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0,%20%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D1%80-%D1%82,%20%D0%B4.%2048">
              125167, г. Москва, Ленинградский пр-т, д. 48
            </a>
          </div>
        ),
      },
      {
        key: 'phones',
        content: (
          <div>
            Отдел продаж:{' '}
            <p>
              <a href="tel:+79260180707">+7 (926) 0180707</a>
            </p>
          </div>
        ),
      },
      {
        key: 'emails',
        content: (
          <div>
            <a href="mailto:vnvshop@mail.ru">vnvshop@mail.ru</a>
          </div>
        ),
      },
    ]}
  />
);

interface IOwnProps {
  columns: IColumn[];
}

const FooterColumnCenter: React.FC<IOwnProps> = (props) => {
  const { columns } = props;

  const elements: React.ReactElement[] = React.useMemo(() => {
    const extraColumns = [
      <InformationColumn key={`information`} />,
      <ContactsColumn key={'contacts'} />,
    ];

    const columnsCountInRow = 4;
    const res: React.ReactElement[] = [];
    const rowsCount = Math.floor(columns.length / columnsCountInRow);
    for (let i = 0; i < rowsCount; i++) {
      const offset = i * columnsCountInRow;
      const elements = columns.slice(offset, offset + columnsCountInRow);
      res.push(
        <div className={styles.Row} key={`row-${i}`}>
          {elements.map((column: IColumn) => {
            return (
              <FooterColumn
                label={column.label}
                key={column.slug}
                rows={column.rows.map((row) => {
                  return {
                    key: row.slug,
                    content: (
                      <ShallowLink
                        // href={`/catalog/${column.slug}/${row.slug}`}
                        href={getCategoryURL(column.slug, row.addr, row.slug)}
                      >
                        {row.label}
                      </ShallowLink>
                    ),
                  };
                })}
              />
            );
          })}

          {extraColumns[i]}
        </div>,
      );
    }

    return res;
  }, [columns]);

  return <div className={styles.FooterColumnCenter}>{elements}</div>;
};

export default FooterColumnCenter;
