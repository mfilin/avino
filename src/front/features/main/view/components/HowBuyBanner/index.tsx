import * as React from 'react';

const HowBuyBanner: React.FC = () => {
    return (
        <>
            <div className="how-buy">
                <div className="how-buy__header">
                    <div className="how-buy__media">
                        <img src="img/how_buy_image.jpg" className="img-fluid" alt="" />
                    </div>
                    <div className="how-buy__title">Как купить?</div>
                </div>
                <div className="how-buy__content">
                    <div className="how-buy__item">
                        <div className="how-buy__num">1</div>
                        <div className="how-buy__lead">
                            Резервируйте товар<br />
                            с помощью сайта
                        </div>
                        <div className="how-buy__text">
                            Используйте наш каталог для выбора напитков
                        </div>
                    </div>
                    <div className="how-buy__item">
                        <div className="how-buy__num">2</div>
                        <div className="how-buy__lead">
                            Приезжайте<br />
                            в наш оффлайн магазин
                        </div>
                        <div className="how-buy__text">
                            Используйте наш каталог для выбора напитков
                        </div>
                    </div>
                    <div className="how-buy__item">
                        <div className="how-buy__num">3</div>
                        <div className="how-buy__lead">
                            Оплачивайте заказ<br />
                            на кассе магазина
                        </div>
                        <div className="how-buy__text">
                            И мы принимаем к оплате
                            VISA, МИР, MasterCard
                        </div>
                    </div>
                    <div className="how-buy__item">
                        <div className="how-buy__num">4</div>
                        <div className="how-buy__lead">
                            Забирайте<br />
                            товар
                        </div>
                        <div className="how-buy__text">
                            А мы будем ждать вас вновь<br />
                            за новыми покупками
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HowBuyBanner;
