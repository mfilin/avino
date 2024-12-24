import React from 'react';
import clsx from 'clsx';
import { UserDataContext } from '../../providers/userDataStoreProvider';
import Logo from '../../images/logo-full.svg';
import LogoSmall from '../../images/vino-logo-small.svg';
import Text from '../Typography/Text';
import Title from '../Typography/Title';
import Button from '../Button';
import ShallowLink from '../../elements/ShallowLink';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDeviceInfo } from '../../hooks/device';

import styles from './AdultDisclaimer.module.scss';

const AdultDisclaimer: React.FC = ({}) => {
  const router = useRouter();
  const { isMobile } = useDeviceInfo();
  const { userData, handleConfirmIsAdult } = React.useContext(UserDataContext);
  const isAdultConfirmed = !userData || userData?.adultConfirmed;
  const isPolicyPage = router.pathname === '/privacy';

  if (isAdultConfirmed || isPolicyPage) {
    return null;
  }
  return (
    <div
      className={clsx(styles.AdultDisclaimer, {
        [styles.MobileView]: isMobile,
      })}
    >
      <div className={styles.Content}>
        <div className={styles.Logo}>{isMobile ? <LogoSmall /> : <Logo />}</div>
        <Text
          level={isMobile ? 's13h18w500' : 's18h22w400'}
          colorMode="white"
          className={styles.Welcome}
        >
          ДОБРО ПОЖАЛОВАТЬ НА САЙТ КОМПАНИИ ВИНОГРАД НЕ ВИНОВАТ
        </Text>
        {!isMobile ? (
          <Title colorMode="white" className={styles.Title}>
            ВАМ УЖЕ ИСПОЛНИЛОСЬ 18 ЛЕТ?
          </Title>
        ) : (
          <Text level="s18h15w600" colorMode="white" className={styles.Title}>
            ВАМ УЖЕ ИСПОЛНИЛОСЬ 18 ЛЕТ?
          </Text>
        )}
        <div className={styles.Buttons}>
          <Button color="orange-outline" onClick={handleConfirmIsAdult}>
            Да
          </Button>
          <Link
            href="https://www.youtube.com/results?search_query=%D0%BC%D1%83%D0%BB%D1%8C%D1%82%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D1%8B"
            target="_blank"
          >
            <Button color="orange-outline">Нет</Button>
          </Link>
        </div>
        <div className={styles.TextsBlock}>
          <Text
            level={isMobile ? 's13h18w500' : 's15h20w500'}
            colorMode="white"
          >
            Начиная использовать сайт, я подтверждаю, что достиг возраста 18
            лет, и принимаю{' '}
            <ShallowLink href="/privacy">
              политику конфиденциальности.
            </ShallowLink>
          </Text>
          <Text
            level={isMobile ? 's13h18w500' : 's15h20w500'}
            colorMode="white"
          >
            Мы не продаем товары на сайте, и не доставляем заказы на дом.
            Дистанционная продажа алкогольной продукции (в том числе с доставкой
            на дом) запрещена федеральным законом от 22 ноября 1995 г. № 171-ФЗ
            “ О государственном регулировании производства и оборота этилового
            спирта, алкогольной и спиртосодержащей продукции и об ограничении
            потребления (распития) алкогольной продукции” и Правилами продажи
            товаров дистанционным способом, утвержденным постановлением
            Правительства Российской федерации от 27 сентября 2007 г. №612
          </Text>
          <Text
            level={isMobile ? 's13h18w500' : 's15h20w500'}
            colorMode="white"
          >
            Цены, указанные на сайте, действительны только при заказе с сайта и
            получении заказа у ООО «ВИНОГРАД НЕ ВИНОВАТ» в магазине «ВИНОГРАД НЕ
            ВИНОВАТ»
          </Text>
          <Text
            level={isMobile ? 's13h18w500' : 's15h20w500'}
            colorMode="white"
          >
            Мы используем файлы cookie, чтобы улучшить работу и повысить
            эффективность сайта. Продолжая пользование данным сайтом, Вы
            соглашаетесь с использованием файлов cookie,
          </Text>
        </div>
      </div>
    </div>
  );
};
export default AdultDisclaimer;
