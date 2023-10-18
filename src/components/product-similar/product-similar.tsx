import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './similars-buttons.module.css';

import ProductCard from '../product-card/product-card';
import { CamerasListType } from '../../types/types';

type ProductSimilarProps = {
  cameras: CamerasListType;
}
function ProductSimilar({cameras}: ProductSimilarProps): JSX.Element {

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">

              <Swiper
                className='product-similar__slider-list'
                slidesPerView={3}
                slidesPerGroup={3}
                spaceBetween={32}
                modules={[Navigation]}
                navigation={{
                  prevEl: '.slider-controls--prev',
                  nextEl: '.slider-controls--next'
                }}
              >
                {cameras.map((camera) => (
                  <SwiperSlide key={camera.id}>
                    <ProductCard
                      camera={camera}
                      isActive={cameras.includes(camera) ? 'is-active' : ''}
                    />
                  </SwiperSlide>
                ))}
              </Swiper >
              <button
                className={`${styles['button-prev']} slider-controls--prev`}
                type="button"
                aria-label="Предыдущий слайд"
              >
                <svg width={7} height={12} aria-hidden="true">
                  <use xlinkHref="#icon-arrow" />
                </svg>
              </button>
              <button
                className={`${styles['button-next']} slider-controls--next`}
                type="button"
                aria-label="Следующий слайд"
              >
                <svg width={7} height={12} aria-hidden="true">
                  <use xlinkHref="#icon-arrow" />
                </svg>
              </button>
            </div>
          </div>

        </div>

      </section >
    </div >
  );
}

export default ProductSimilar;
