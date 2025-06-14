import React from 'react';

const WineLibraryBanner: React.FC = () => {
    return (
        <>
            <div className="wine-library">
                <div className="wine-library__bg">
                    <img src="images/wine_library.jpg" className="img-cover" alt="" />
                </div>
                <div className="wine-library__media">
                    <div className="wine-library__icon">
                        <img src="images/wine_library_icon.svg" className="img-fluid" alt="" />
                    </div>
                </div>
                <div className="wine-library__content">
                    <div className="wine-library__header">Посетите винотеку</div>
                    <div className="wine-library__text">
                        <p>Встречи с друзьями могут быть не просто вкусными, но и винно-познавательными.</p>
                        <p>Шеф-сомелье нашей винотеки подготовил для вас винные дегустации и гастрономические вечера на различные винные тематики.</p>
                    </div>
                </div>
                <a href="#" className="wine-library__button">Подробнее</a>
            </div>
        </>
    );
};

export default WineLibraryBanner;
