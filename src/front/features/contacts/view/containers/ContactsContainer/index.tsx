import React from 'react';
import clsx from 'clsx';
import Title from 'src/front/components/Typography/Title';
import Text from 'src/front/components/Typography/Text';
import Config from 'src/front/config';
import EmailIcon from '../../../../../images/contactsPage/email-circle.svg';
import LocationIcon from '../../../../../images/contactsPage/location-circle.svg';
import PhoneIcon from '../../../../../images/contactsPage/phone-circle.svg';
import VKLogo from '../../../../../images/mobileHeader/vk.svg';
import FacebookIcon from '../../../../../images/mobileHeader/facebook.svg';
import InstagramIcon from '../../../../../images/mobileHeader/insta.svg';
import TelegramIcon from '../../../../../images/mobileHeader/telegram.svg';
import Link from 'next/link';
import { Layout } from 'src/front/components';
import { useDeviceInfo } from '../../../../../hooks/device';

import styles from './ContactsContainer.module.scss';

const questionsForEmail = [
  'оформления заказов или заявок',
  'изменения даных в личном кабинете',
  'отписки от рассылок',
  'работы сайта и приложения',
  'качества нашей работы или приобретенного товаров',
  'и просто , если у вас есть, что сказать нам',
];

const reasonsForCall = [
  'Есть вопросы по товару, его наличию или заказу',
  'при оформлении заказа что-то пошло не так',
  'есть вопросы по программе лояльности или авторизации',
];

const ContactsContainer: React.FC = ({}) => {
  const { isMobile } = useDeviceInfo();

  return (
    <Layout>
      <div
        className={clsx(styles.ContactsContainer, {
          [styles.MobileView]: isMobile,
        })}
      >
        <div className={styles.TopImage}>
          <img src={`${Config.basePath}/images/contacts-shop-photo.png`} />
        </div>
        <Title withOrangeLine className={styles.Title}>
          Контакты магазина Виноград не виноват
        </Title>
        <Text
          level={isMobile ? 's14h17w400' : 's15h20w500'}
          colorMode="grey"
          className={styles.Description}
        >
          Оформить заказ в интернет-витрине можно в любое время, выбрав сразу
          удобный способ получения или согласования с менеджером позднее.
          Звоните, пишите, приходите в нашу винотеку
        </Text>
        <div className={styles.ContactsBlocks}>
          <div className={clsx(styles.Block, styles.EmailBlock)}>
            <div className={styles.IconAndTitle}>
              <EmailIcon />
              <Link href="mailto:vnv.shop@mail.ru">
                <Text
                  as="h2"
                  level={isMobile ? 's18h15w600' : 's24h32w700'}
                  className={styles.BlockTitle}
                >
                  vnv.shop@mail.ru
                </Text>
              </Link>
            </div>
            <div className={styles.InfoList}>
              <Text level="s15h15w700" colorMode="grey">
                Пишите нам по вопросам:
              </Text>
              <ul className={styles.ListInBlock}>
                {questionsForEmail.map((item, index) => {
                  return (
                    <li>
                      <Text level="s14h20w400" colorMode="grey" key={index}>
                        {item}
                      </Text>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={clsx(styles.Block, styles.PhoneBlock)}>
            <div className={styles.IconAndTitle}>
              <PhoneIcon />
              <Link href="tel:+79260180707">
                <Text
                  as="h2"
                  level={isMobile ? 's18h15w600' : 's24h32w700'}
                  className={styles.BlockTitle}
                >
                  +7 (926) 018-07-07
                </Text>
              </Link>
            </div>
            <div className={styles.Socials}>
              <Link href="https://t.me/vinograd_ne_vinovat" target="_blank">
                <TelegramIcon />
              </Link>
              <Link href="https://vk.com/vnv_bar" target="_blank">
                <VKLogo />
              </Link>
              <Link
                href="https://instagram.com/vnv_bar?igshid=MzRlODBiNWFlZA=="
                target="_blank"
              >
                <InstagramIcon />
              </Link>
              <Link
                href="https://www.facebook.com/vnv.bar.msk?mibextid=LQQJ4d"
                target="_blank"
              >
                <FacebookIcon />
              </Link>
            </div>
            <div className={styles.InfoList}>
              <Text level="s15h15w700" colorMode="grey">
                Звоните или пишите нам в чат, если:
              </Text>

              <ul className={styles.ListInBlock}>
                {reasonsForCall.map((item, index) => {
                  return (
                    <li>
                      <Text level="s14h20w400" colorMode="grey" key={index}>
                        {item}
                      </Text>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={clsx(styles.Block, styles.MapBlock)}>
            <div className={styles.IconAndTitle}>
              <LocationIcon />
              <Link href="http://maps.yandex.ru/?text=125167,%20%D0%B3.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0,%20%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D1%80-%D1%82,%20%D0%B4.%2048">
                <Text
                  as="h2"
                  level={isMobile ? 's18h15w600' : 's24h32w700'}
                  className={styles.BlockTitle}
                >
                  пр-т Ленинградский, д. 48
                </Text>
              </Link>
            </div>
            <Link
              className={styles.MapImage}
              href="http://maps.yandex.ru/?text=125167,%20%D0%B3.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0,%20%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D1%80-%D1%82,%20%D0%B4.%2048"
            >
              <img src={`${Config.basePath}/images/contacts-shop-map.jpg`} />
            </Link>
          </div>
          <div className={clsx(styles.Block, styles.RequisitesBlock)}>
            <Text
              as="h2"
              level={isMobile ? 's18h15w600' : 's24h32w700'}
              className={styles.BlockTitle}
            >
              Реквизиты
            </Text>
            <Text level="s15h15w700">
              Общество с ограниченной ответственностью «ВИНОГРАД НЕ ВИНОВАТ»
            </Text>
            <div className={styles.RequisitesList}>
              <Text level="s14h20w400" colorMode="grey">
                Юр. адрес: 125167, г. Москва, муниципальный округ Аэропорт,
                пр-кт Ленинградский, д.48
              </Text>
              <Text level="s14h20w400" colorMode="grey">
                ОГРН: 1217700377795
              </Text>
              <Text level="s14h20w400" colorMode="grey">
                ИНН: 7714475130
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ContactsContainer;
