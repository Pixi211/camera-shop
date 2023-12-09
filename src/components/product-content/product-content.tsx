import { useCallback, useState } from 'react';
import { CameraType } from '../../types/types';
import { useSearchParams } from 'react-router-dom';
import RatingForm from '../rating-form/rating-form';
import { useAppDispatch } from '../../store';
import { setActiveStatus, setAddItemToBasketStatus, setModalData } from '../../store/modal-data/modal-data.slice';
import { FOCUS_TIMEOUT } from '../../const';

type ProductContentProps = {
  camera: CameraType;
  typeTag: string;
}

function ProductContent({camera, typeTag}: ProductContentProps): JSX.Element {

  const { name,
    vendorCode,
    type, category,
    description,
    level,
    price,
    rating,
    reviewCount,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x } = camera;


  const [isDescription, setIsDescription] = useState<boolean>(typeTag === 'description');
  const setSearchParams = useSearchParams()[1];

  const descriptionTabClickHandler = useCallback(() => {
    setIsDescription(true);
    setSearchParams({ type: 'description' });
  }, [setSearchParams]);

  const statsTabClickHandler = useCallback(() => {
    setIsDescription(false);
    setSearchParams({ type: 'stats' });
  }, [setSearchParams]);


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
    <div className="page-content__section" data-testid="productContent-test">
      <section className="product">
        <div className="container">
          <div className="product__img">
            <picture>
              <source
                type="image/webp"
                srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
              />
              <img
                src={previewImg}
                srcSet={`${previewImg}, ${previewImg2x} 2x`}
                width="560"
                height="480"
                alt={`"${name}"`}
              />
            </picture>
          </div>
          <div className="product__content">
            <h1 className="title title--h3">{name}</h1>
            <div className="rate product__rate">
              <RatingForm rating={rating}/>
              <p className="visually-hidden">Рейтинг: {rating}</p>
              <p className="rate__count">
                <span className="visually-hidden">
                  Всего оценок:
                </span>
                {reviewCount}
              </p>
            </div>
            <p className="product__price">
              <span className="visually-hidden">
                Цена:
              </span>
              {price.toLocaleString('ru-RU')} ₽
            </p>

            <button className="btn btn--purple" type="button" onClick={buyButtonClickHandler}>
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>

            <div className="tabs product__tabs">
              <div className="tabs__controls product__tabs-controls">
                <button className={`tabs__control ${!isDescription ? 'is-active' : ''}`}
                  type="button" onClick={statsTabClickHandler}
                >
                  Характеристики
                </button>
                <button className={`tabs__control ${isDescription ? 'is-active' : ''}`}
                  type="button" onClick={descriptionTabClickHandler}
                >
                  Описание
                </button>
              </div>
              <div className="tabs__content">
                <div className={`tabs__element ${!isDescription ? 'is-active' : ''}`}>
                  <ul className="product__tabs-list">
                    <li className="item-list"><span className="item-list__title">Артикул:</span>
                      <p className="item-list__text"> {vendorCode}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Категория:</span>
                      <p className="item-list__text">{category}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                      <p className="item-list__text">{type}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Уровень:</span>
                      <p className="item-list__text">{level}</p>
                    </li>
                  </ul>
                </div>
                <div className={`tabs__element ${isDescription ? 'is-active' : ''}`}>
                  <div className="product__tabs-text">
                    <p>{description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductContent;
