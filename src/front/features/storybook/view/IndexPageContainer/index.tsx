import React from 'react';

// import DefaultProductCard from '../front/components/DefaultProductCard';
// import Text from '../front/components/Typography/Text';
// import HorizontalProductCard from '../front/components/HorizontalProductCard';
// import HugeProductCard from '../front/components/HugeProductCard';
// import DefaultMobileProductCard from '../front/components/DefaultMobileProductCard';
// import HorizontalCatalogCard from '../front/components/HorizontalCatalogCard';
// import CartProductCard from '../front/components/CartProductCard';
// import RemovedProductCard from '../front/components/RemovedProductCard';
// import OldNewPriceCard from '../front/components/OldNewPriceCard';
// import ComparisonDefaultCard from '../front/components/ComparisonCards/ComparisonDefaultCard';
// import ComparisonExtendedCard from '../front/components/ComparisonCards/ComparisonExtendedCard';
// import { mockProductItem } from '../front/mockdata';
// import ComparisonCardMobile from '../front/components/ComparisonCards/ComparisonCardMobile';
// import SingleProductCard from '../front/components/SingleProductCard';

const IndexPageContainer: React.FC = () => {
  // const [isInFavorite, setIsInFavorite] = React.useState(false);
  // const [isInComparison, setIsInComparison] = React.useState(false);

  {
    /* <div style={{ maxWidth: '1680px', margin: '0 auto 248px' }}>
        <div
          style={{
            backgroundColor: '#F9F9FA',
            padding: '110px 120px',
            margin: '0 auto 248px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
              backgroundColor: '#fff',
              width: 'fitContent',
              padding: '50px',
            }}
          >
            <ComparisonCardMobile
              id="ertertertert"
              isExtended
              img="https://decanter.ru/image/375356-vino-ornellaia-bolgheri-superiore-2018-6-l-f.jpg"
              price={6454}
              name="Виски Macallan Triple Cask Matured 12 Years Old, Macallan, 0.7 лgne"
              inCartCount={0}
              socialRating={'4.5'}
              vivinoRating="3.7"
              availability="available"
              isInFavorite={isInFavorite}
              productInfo={mockProductItem}
              fieldsForComparison={[
                'country',
                'type',
                'sugar',
                'volume',
                'temperature',
                'strength',
                'kind',
                'delay',
                'compatibility',
              ]}
              onBuyNow={() => console.log('clicked buy now')}
              onAddToCart={(number) =>
                console.log('if in cart we removing:', number)
              }
              onAddToFavorite={(id: string) => {
                console.log(`add to favorite item with id${id}`);
                setIsInFavorite((prev) => !prev);
              }}
            />
            <ComparisonCardMobile
              id="oidfdfgdfgdfgkjvndilmb"
              img="https://decanter.ru/image/375356-vino-ornellaia-bolgheri-superiore-2018-6-l-f.jpg"
              price={6454}
              name="Виски Macallan Triple Cask Matured 12 Years Old, Macallan, 0.7 лgne"
              inCartCount={0}
              socialRating={'4.5'}
              vivinoRating="3.7"
              availability="available"
              isInFavorite={isInFavorite}
              productInfo={mockProductItem}
              fieldsForComparison={[
                'country',
                'type',
                'sugar',
                'volume',
                'temperature',
                'strength',
                'kind',
                'delay',
                'compatibility',
              ]}
              onBuyNow={() => console.log('clicked buy now')}
              onAddToCart={(number) =>
                console.log('if in cart we removing:', number)
              }
              onAddToFavorite={(id: string) => {
                console.log(`add to favorite item with id${id}`);
                setIsInFavorite((prev) => !prev);
              }}
            />
            <ComparisonDefaultCard
              id="slkjvndflkvn"
              img={
                'https://decanter.ru/image/375356-vino-ornellaia-bolgheri-superiore-2018-6-l-f.jpg'
              }
              name="Виски Macallan Triple Cask Matured 12 Years Old, Macallan, 0.7 лgne₽"
              price={2265}
              onAddToFavorite={(id: string) => {
                setIsInFavorite((prev) => !prev);
              }}
              onRemoveFromComparison={(id: string) =>
                console.log(`remove ${id} from comparison`)
              }
            />
            карточка старой новой цены
            <OldNewPriceCard
              id="12312ddd31242345"
              oldPrice={1590}
              newPrice={1890}
              img={
                'https://decanter.ru/image/375356-vino-ornellaia-bolgheri-superiore-2018-6-l-f.jpg'
              }
              name="Коньяк Frapin VSOP Grande Champage 1er Grand Cru du Cognac, Frapin"
              vendorCode="76079"
            />
            карточка удаленного товара
            <RemovedProductCard
              id="sdfsdj,kjl.j324"
              onAddToFavorite={(id: string) => {
                console.log(`add to favorite item with id${id}`);
                setIsInFavorite((prev) => !prev);
              }}
              vendorCode="124635"
              name="Коньяк Frapin VSOP Grande Champage 1er Grand Cru du Cognac, Frapin"
              img={
                'https://decanter.ru/image/375356-vino-ornellaia-bolgheri-superiore-2018-6-l-f.jpg'
              }
              isInFavorite={isInFavorite}
              price={740999}
              onRemove={() =>
                confirm(
                  'Вы действительно хотите удалить товар из удаленных товаров?',
                )
              }
              onRecover={() => console.log('Recover')}
            />
            карточка удаленного товара мобильный вид
            <RemovedProductCard
              id="sdfsdj,kjl.j32цукцук4"
              onAddToFavorite={(id: string) => {
                console.log(`add to favorite item with id${id}`);
                setIsInFavorite((prev) => !prev);
              }}
              vendorCode="124635"
              name="Коньяк Frapin VSOP Grande Champage 1er Grand Cru du Cognac, Frapin"
              img={
                'https://decanter.ru/image/375356-vino-ornellaia-bolgheri-superiore-2018-6-l-f.jpg'
              }
              isInFavorite={isInFavorite}
              price={740999}
              onRemove={() =>
                confirm(
                  'Вы действительно хотите удалить товар из удаленных товаров?',
                )
              }
              viewMode="mobile"
              onRecover={() => console.log('Recover')}
            />
            карточки товара из корзины
            <CartProductCard
              id="35345345vdfg"
              onAddToCart={(number) =>
                console.log('adding to card amount items:', number)
              }
              onAddToFavorite={(id: string) => {
                console.log(`add to favorite item with id${id}`);
                setIsInFavorite((prev) => !prev);
              }}
              name="Коньяк Frapin VSOP Grande Champage 1er Grand Cru du Cognac, Frapin"
              vendorCode="124635"
              availability="available"
              isInFavorite={isInFavorite}
              isInComparison={isInComparison}
              onRemoveFromCart={() =>
                confirm('Вы действительно хотите удалить товар из корзины?')
              }
              onChangeBottomLimitHandle={(id: string) =>
                confirm('Вы действительно хотите удалить товар из корзины?')
              }
            />
            <CartProductCard
              id="sdfgfege234234"
              onAddToCart={(number) =>
                console.log('adding to card amount items:', number)
              }
              onAddToFavorite={(id: string) => {
                console.log(`add to favorite item with id${id}`);
                setIsInFavorite((prev) => !prev);
              }}
              name="Коньяк Frapin VSOP Grande Champage 1er Grand Cru du Cognac, Frapin"
              vendorCode="124635"
              availability="unavailable"
              img={
                'https://decanter.ru/image/375356-vino-ornellaia-bolgheri-superiore-2018-6-l-f.jpg'
              }
              isInFavorite={isInFavorite}
              price={740999}
              isInComparison={isInComparison}
              onRemoveFromCart={() =>
                confirm('Вы действительно хотите удалить товар из корзины?')
              }
              onChangeBottomLimitHandle={(id: string) =>
                confirm('Вы действительно хотите удалить товар из корзины?')
              }
            />
            <CartProductCard
              id="sdfgfege234234"
              onAddToCart={(number) =>
                console.log('adding to card amount items:', number)
              }
              onAddToFavorite={(id: string) => {
                console.log(`add to favorite item with id${id}`);
                setIsInFavorite((prev) => !prev);
              }}
              vendorCode="124635"
              name="Коньяк Frapin VSOP Grande Champage 1er Grand Cru du Cognac, Frapin"
              availability="available"
              img={
                'https://decanter.ru/image/375356-vino-ornellaia-bolgheri-superiore-2018-6-l-f.jpg'
              }
              viewMode="mobile"
              isInFavorite={isInFavorite}
              price={740999}
              isInComparison={isInComparison}
              onRemoveFromCart={() =>
                confirm('Вы действительно хотите удалить товар из корзины?')
              }
              onChangeBottomLimitHandle={(id: string) =>
                confirm('Вы действительно хотите удалить товар из корзины?')
              }
            />
          </div>
          горизонтальная карточка для каталога
          <HorizontalCatalogCard
            id="1234567"
            onAddToCart={(number) =>
              console.log('adding to card amount items:', number)
            }
            vendorCode="124635"
            name="Коньяк Frapin VSOP Grande Champage 1er Grand Cru du Cognac, Frapin"
            onBuyNow={() => console.log('clicked buy now')}
            onAddToComparison={(id) => {
              setIsInComparison((prev) => !prev);
              console.log(`add to comparison ${id}`);
            }}
            onAddToFavorite={(id: string) => {
              console.log(`add to favorite item with id${id}`);
              setIsInFavorite((prev) => !prev);
            }}
            availability="unavailable"
            isInFavorite={isInFavorite}
            isInComparison={isInComparison}
          />
          мобильная карточка для главной и каталога
          <DefaultMobileProductCard
            id="1234567"
            vendorCode="124635"
            name="Коньяк Frapin VSOP Grande Champage 1er Grand Cru du Cognac, Frapin"
            onAddToCart={(number) =>
              console.log('adding to card amount items:', number)
            }
            onBuyNow={() => console.log('clicked buy now')}
            onAddToComparison={(id) => {
              setIsInComparison((prev) => !prev);
              console.log(`add to comparison ${id}`);
            }}
            onAddToFavorite={(id: string) => {
              console.log(`add to favorite item with id${id}`);
              setIsInFavorite((prev) => !prev);
            }}
            img="https://decanter.ru/image/375356-vino-ornellaia-bolgheri-superiore-2018-6-l-f.jpg"
            availability="available"
            isInFavorite={isInFavorite}
            isInComparison={isInComparison}
          />
          <Text level="s32hnw800">Новые поступления</Text>
          <div style={{ display: 'flex' }}>
            <DefaultProductCard
              id="1234567"
              vendorCode="124635"
              name="Коньяк Frapin VSOP Grande Champage 1er Grand Cru du Cognac, Frapin"
              onAddToCart={(number) =>
                console.log('adding to card amount items:', number)
              }
              onBuyNow={() => console.log('clicked buy now')}
              onAddToComparison={(id) => {
                setIsInComparison((prev) => !prev);
                console.log(`add to comparison ${id}`);
              }}
              onAddToFavorite={(id: string) => {
                console.log(`add to favorite item with id${id}`);
                setIsInFavorite((prev) => !prev);
              }}
              availability="unavailable"
              isInFavorite={isInFavorite}
              isInComparison={isInComparison}
            />
            <DefaultProductCard
              id="3564574"
              vendorCode="124635"
              onAddToCart={(number) =>
                console.log('adding to card amount items:', number)
              }
              onBuyNow={() => console.log('clicked buy now')}
              onAddToComparison={(id) => {
                setIsInComparison((prev) => !prev);
                console.log(`add to comparison ${id}`);
              }}
              onAddToFavorite={(id: string) => {
                console.log(`add to favorite item with id${id}`);
                setIsInFavorite((prev) => !prev);
              }}
              socialRating="3.3"
              vivinoRating="5.0"
              inCartCount={10}
              tags={['new']}
              img={
                'https://luding.ru/upload/resize_cache/iblock/65f/800_900_0/b3wf6iw0o1yghkxcpn1u0snrglqm035a.png'
              }
              availability="unavailable"
              name="Коньяк Frapin VSOP Grande Chsmpagne"
              isInFavorite={isInFavorite}
              isInComparison={isInComparison}
            />
            <DefaultProductCard
              id="123423423"
              vendorCode="124635"
              onAddToCart={(number) =>
                console.log('adding to card amount items:', number)
              }
              onBuyNow={() => console.log('clicked buy now')}
              onAddToComparison={(id) => {
                setIsInComparison((prev) => !prev);
                console.log(`add to comparison ${id}`);
              }}
              socialRating="4.9"
              vivinoRating="4.9"
              onAddToFavorite={(id: string) => {
                console.log(`add to favorite item with id${id}`);
                setIsInFavorite((prev) => !prev);
              }}
              tags={['new', 'discount']}
              img={
                'https://dekanto.ru/productData/images/uploaded/whisky_canmore-12.jpg'
              }
              availability="unavailable"
              name={'Виски Jura Superstition, Jura Distillery'}
              isInFavorite={isInFavorite}
              isInComparison={isInComparison}
            />
          </div>
          S
        </div>
        <Text level="s32hnw800">Популярные товары</Text>
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <br />
          <DefaultProductCard
            id="2222222"
            vendorCode="124635"
            onAddToCart={(number) =>
              console.log('adding to card amount items:', number)
            }
            onBuyNow={() => console.log('clicked buy now')}
            onAddToComparison={(id) => {
              setIsInComparison((prev) => !prev);
              console.log(`add to comparison ${id}`);
            }}
            onAddToFavorite={(id: string) => {
              console.log(`add to favorite item with id${id}`);
              setIsInFavorite((prev) => !prev);
            }}
            socialRating="3.3"
            vivinoRating="5.0"
            inCartCount={10}
            price={1}
            tags={['buyersChoice']}
            img={
              'https://luding.ru/upload/resize_cache/iblock/65f/800_900_0/b3wf6iw0o1yghkxcpn1u0snrglqm035a.png'
            }
            availability="available"
            name="Коньяк Frapin VSOP Grande Chsmpagne"
            isInFavorite={isInFavorite}
            isInComparison={isInComparison}
            noButtonsMode
          />
          <DefaultProductCard
            id="3333333"
            vendorCode="124635"
            onAddToCart={(number) =>
              console.log('adding to card amount items:', number)
            }
            onBuyNow={() => console.log('clicked buy now')}
            onAddToComparison={(id) => {
              setIsInComparison((prev) => !prev);
              console.log(`add to comparison ${id}`);
            }}
            socialRating="4.9"
            vivinoRating="4.9"
            onAddToFavorite={(id: string) => {
              console.log(`add to favorite item with id${id}`);
              setIsInFavorite((prev) => !prev);
            }}
            tags={['buyersChoice']}
            img={
              'https://dekanto.ru/productData/images/uploaded/whisky_canmore-12.jpg'
            }
            availability="available"
            name={'Виски Jura Superstition, Jura Distillery'}
            isInFavorite={isInFavorite}
            isInComparison={isInComparison}
            noButtonsMode
          />
          <HorizontalProductCard
            id="44444444"
            vendorCode="124635"
            onAddToCart={(number) =>
              console.log('adding to card amount items:', number)
            }
            onBuyNow={() => console.log('clicked buy now')}
            onAddToComparison={(id) => {
              setIsInComparison((prev) => !prev);
              console.log(`add to comparison ${id}`);
            }}
            socialRating="4.9"
            vivinoRating="4.9"
            onAddToFavorite={(id: string) => {
              console.log(`add to favorite item with id${id}`);
              setIsInFavorite((prev) => !prev);
            }}
            tags={['buyersChoice']}
            img={
              'https://cdn11.bigcommerce.com/s-a04d0/images/stencil/1280x1280/products/17104/18838/1000-stories-bourbon-barrel-aged-gold-rush-red-blend__30462.1661941361.jpg?c=2'
            }
            availability="unavailable"
            name={'Виски Jura Superstition, Jura Distillery'}
            price={2999}
            isInFavorite={isInFavorite}
            isInComparison={isInComparison}
          />
          <HugeProductCard
            id="77777"
            vendorCode="124635"
            onAddToCart={(number) =>
              console.log('adding to card amount items:', number)
            }
            onBuyNow={() => console.log('clicked buy now')}
            onAddToComparison={(id) => {
              setIsInComparison((prev) => !prev);
              console.log(`add to comparison ${id}`);
            }}
            socialRating="4.9"
            vivinoRating="4.9"
            onAddToFavorite={(id: string) => {
              console.log(`add to favorite item with id${id}`);
              setIsInFavorite((prev) => !prev);
            }}
            tags={['new']}
            img={
              'https://decanter.ru/image/375356-vino-ornellaia-bolgheri-superiore-2018-6-l-f.jpg'
            }
            availability="unavailable"
            name={
              'Вино Ornellaia Vendemmia d’Artista, Ornellaia, 2015 г., 3 л.'
            }
            price={999448}
            isInFavorite={isInFavorite}
            isInComparison={isInComparison}
          />
        </div>
      </div>*/
  }

  return null;
};

export default IndexPageContainer;
