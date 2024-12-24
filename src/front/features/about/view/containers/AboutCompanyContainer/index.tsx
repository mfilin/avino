import React from 'react';
import clsx from 'clsx';
import Title from 'src/front/components/Typography/Title';
import Text from 'src/front/components/Typography/Text';
import HowToCreateOrder from 'src/front/components/HowToCreateOrder';
import Config from 'src/front/config';
import { Layout } from 'src/front/components';
import { useDeviceInfo } from '../../../../../hooks/device';

import styles from './AboutCompanyContainer.module.scss';

const AboutCompanyContainer: React.FC = ({}) => {
  const { isMobile } = useDeviceInfo();

  return (
    <Layout>
      <div
        className={clsx(styles.AboutCompanyContainer, {
          [styles.MobileView]: isMobile,
        })}
      >
        <div className={styles.FirstBlock}>
          <Title as="h2" withOrangeLine className={styles.Title}>
            О нашей компании
          </Title>
          <Text level={isMobile ? 's14h17w400' : 's15h20w500'} colorMode="grey">
            Виноград не Виноват — это настоящая Вселенная, объединяющая истинных
            любителей качественных напитков из разных частей мира. Лучшие вина
            от известных производителей, эксклюзивные позиции, крепкие
            алкогольные напитки и все самые сочные новинки — все это и многое
            другое вы сможете найти на страницах интернет-витрины «Виноград не
            Виноват».
          </Text>
        </div>
        <div className={styles.SecondBlock}>
          <div className={styles.WhoAreWe}>
            <div className={styles.ImageBlock}>
              <img
                src={`${Config.basePath}/images/shop-photo1.png`}
                alt="photo"
              />
            </div>
            <div className={styles.TextBlock}>
              {!isMobile ? (
                <Title as="h2" withOrangeLine>
                  С чего все начиналось?
                </Title>
              ) : (
                <Text level="s16h17w700">С чего все начиналось?</Text>
              )}
              <Text
                level={isMobile ? 's14h17w400' : 's15h20w500'}
                colorMode="grey"
              >
                Интернет-витрина Виноград не Виноват родилась ровно спустя год
                после открытия одноименной винотеки: в 2022 году свои двери
                открыло эстетичное винное пространство, ставшее центром
                притяжения для каждого, кто однажды побывал в самой винотеке.
                Бесконечные полки с любимыми напитками, атмосфера винного
                изобилия и регулярные дегустации — именно за это нас полюбили
                гости. Спустя год мы решили расширить горизонты и подарить
                ценителям правильных напитков возможность удобного сервиса —
                выбирать желаемые позиции и знакомиться с ассортиментом не
                выходя из дома: стоит лишь открыть интернет-витрину и
                наслаждаться многообразием выбора.
              </Text>
              <Text
                level={isMobile ? 's14h17w400' : 's15h20w500'}
                colorMode="grey"
              >
                Все только начинается: мы уверены в том, что Виноград не Виноват
                способен удовлетворить потребности каждого посетителя нашей
                витрины: мы предлагаем только качественные напитки на любой вкус
                и кошелек.
              </Text>
            </div>
          </div>
          <div className={styles.OurPolicy}>
            <div className={styles.TextBlock}>
              {!isMobile ? (
                <Title as="h2" withOrangeLine>
                  Наша политика
                </Title>
              ) : (
                <Text level="s16h17w700">Наша политика</Text>
              )}
              <Text
                level={isMobile ? 's14h17w400' : 's15h20w500'}
                colorMode="grey"
              >
                Политика винного пространства «Виноград не Виноват» строится из
                нескольких важных на наш взгляд пунктов. Первое, на что мы
                делаем максимальный фокус — широкий ассортимент и качественный
                сертифицированный продукт. Мы сотрудничаем только с проверенными
                поставщиками, что дает нам возможность отвечать за безупречное
                качество.
              </Text>
              <Text
                level={isMobile ? 's14h17w400' : 's15h20w500'}
                colorMode="grey"
              >
                Второй важный момент — удобство наших покупателей. Выбирая ту
                или иную позицию, вам не нужно искать подходящий способ
                получения заказа: мы все продумали за вас. Забрать заказанную
                продукцию вы можете в нашей винотеке по готовности заказа по
                адресу: Винотека «Виноград не Виноват», г.&nbsp;Москва,
                Ленинградский проспект, 48, а среднее время комплектации — 1-4
                дней.
              </Text>
              <Text
                level={isMobile ? 's14h17w400' : 's15h20w500'}
                colorMode="grey"
              >
                Следующим пунктом мы хотели бы обозначить индивидуальный подход
                к каждому клиенту и быструю обратную связь: наши винные
                менеджеры всегда помогут вам с выбором напитков и в кратчайшие
                сроки ответят на ваши вопросы по заказу.
              </Text>
              <Text
                level={isMobile ? 's14h17w400' : 's15h20w500'}
                colorMode="grey"
              >
                Виноград не Виноват — это по любви;)
              </Text>
            </div>
            <div className={styles.ImageBlock}>
              <img
                src={`${Config.basePath}/images/shop-photo2.JPG`}
                alt="photo"
              />
            </div>
          </div>
        </div>

        <HowToCreateOrder />
      </div>
    </Layout>
  );
};
export default AboutCompanyContainer;
