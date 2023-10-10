import { CameraType } from '../../types/types';

type ProductCardProps = CameraType;

function ProductCard(props: ProductCardProps): JSX.Element {

  const {
    name,
    price,
    rating,
    reviewCount,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x
  } = props;


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


  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
          />
          <img src={previewImg}
            srcSet={previewImg2x}
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
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <a className="btn btn--transparent" href="#">Подробнее
        </a>
      </div>
    </div>
  );
}

export default ProductCard;