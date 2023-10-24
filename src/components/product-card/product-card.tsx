import { Link } from 'react-router-dom';
import { CameraType } from '../../types/types';
import { setActiveStatus, setAddItemToBasketStatus, setModalData } from '../../store/modal-data/modal-data.slice';
import { useAppDispatch } from '../../store';
import { FOCUS_TIMEOUT } from '../../const';

type ProductCardProps = {
  camera: CameraType;
  isActive: string;
};

function ProductCard({ camera, isActive }: ProductCardProps): JSX.Element {

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

  //to const
  const stars = [1, 2, 3, 4, 5];
  const ratingForm = (
    <>
      {stars.map((star, index) => (
        <svg width={17} height={16} aria-hidden="true" key={star}>
          <use xlinkHref={`${index < rating ? '#icon-full-star' : '#icon-star'}`}></use>
        </svg>
      ))}
    </>
  );

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

  return (
    <div className={`product-card ${isActive}`}>
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
          {ratingForm}
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
        <button className="btn btn--purple product-card__btn" type="button" onClick={buyButtonClickHandler}>
          Купить
        </button>
        <Link className="btn btn--transparent" to={`/${id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
