import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './banner.css';

import { Link } from 'react-router-dom';
import { PromoCameraType } from '../../types/types';

type BannerProps = {
  promos: PromoCameraType[];
};

function Banner({ promos }: BannerProps): JSX.Element {

  return (
    <Swiper
      data-testid="banner-test"
      modules={[Pagination, Autoplay]}
      pagination={{
        type: 'bullets',
        clickable: true,
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop
    >
      {promos.map((promo) => (
        <SwiperSlide key={promo.id}>
          <div className="banner">
            <picture>
              <source
                type="image/webp"
                srcSet={`${promo.previewImgWebp}, ${promo.previewImgWebp2x} 2x`}
              />
              <img
                src={promo.previewImg}
                srcSet={`${promo.previewImg2x} 2x`}
                width={1280}
                height={280}
                alt="баннер"
              />
            </picture>
            <p className="banner__info"><span className="banner__message">Новинка!</span>
              <span className="title title--h1">{promo.name}</span>
              <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
              <Link className="btn" to={`/${promo.id}`}>Подробнее</Link>
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Banner;


