import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { CameraType } from '../../types/types';
import { setActiveStatus, setAddItemToBasketStatus, setModalData } from '../../store/modal-data/modal-data.slice';
import { useAppDispatch, useAppSelector } from '../../store';
import { AppRoute, FOCUS_TIMEOUT } from '../../const';
import RatingForm from '../rating-form/rating-form';
import { getBasketItems } from '../../store/basket-data/basket-data.selectors';

type ProductCardProps = {
  camera: CameraType;
  isActive: string;
  style?: CSSProperties;
};

function ProductCard({ isActive, camera, style }: ProductCardProps): JSX.Element {

  const {
    id,
    name,
    price,
    rating,
    reviewCount,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x
  } = camera;

  const dispatch = useAppDispatch();

  const buyButtonClickHandler = () => {
    document.body.style.overflow = 'hidden';
    dispatch(setModalData(camera));
    dispatch(setActiveStatus(true));
    dispatch(setAddItemToBasketStatus(true));

    setTimeout(() => {
      document.getElementById('modal__btn--add_to_basket')?.focus();
    }, FOCUS_TIMEOUT);
  };

  const camerasInBasket = useAppSelector(getBasketItems);
  const inBasketStatus = camerasInBasket.some((item) => item.id === camera.id);

  return (
    <div className={`product-card ${isActive}`} style={style} data-testid="productCard-test">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            width={280}
            height={240}
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingForm rating={rating} />
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>
            {reviewCount}
          </p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>
          {price.toLocaleString('ru-RU')} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {!inBasketStatus ?
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={buyButtonClickHandler}
          >
                      Купить
          </button>
          :
          <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to={AppRoute.BasketPage}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </Link>}
        <Link className="btn btn--transparent" to={`/${id}`} data-testid = "btnMore-test">
          Подробнее
        </Link>
      </div>
    </div>
  );
}

const MemoizedProductCard = React.memo(ProductCard);

export default MemoizedProductCard;
