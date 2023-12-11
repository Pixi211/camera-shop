import { FOCUS_TIMEOUT } from '../../const';
import { useAppDispatch } from '../../store';
import { changeAmountInBasket } from '../../store/basket-data/basket-data.slice';
import { setActiveStatus, setModalData, setRemoveFromBasketStatus } from '../../store/modal-data/modal-data.slice';
import { BasketItemType } from '../../types/types';
import { changeTypeEnding } from '../../utils/utils';

type BasketItemProps = {
  basketItem: BasketItemType;
}

function BasketItem({ basketItem }: BasketItemProps): JSX.Element {

  const {
    name,
    amount,
    vendorCode,
    type,
    category,
    level,
    price,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x
  } = basketItem;

  const dispatch = useAppDispatch();


  const summary = price * amount;


  const deleteFromListHandler = () => {
    document.body.style.overflow = 'hidden';
    dispatch(setModalData(basketItem));
    dispatch(setActiveStatus(true));
    dispatch(setRemoveFromBasketStatus(true));

    setTimeout(() => {
      document.getElementById('modal__btn--half-width')?.focus();
    }, FOCUS_TIMEOUT);

  };

  const increaseAmountHandler = () => {
    if (basketItem.amount !== 99) {
      dispatch(changeAmountInBasket([basketItem.id, basketItem.amount + 1]));
    }
  };

  const decreaseAmountHandler = () => {
    if (basketItem.amount !== 1) {
      dispatch(changeAmountInBasket([basketItem.id, basketItem.amount - 1]));
    }
  };

  const changeAmountHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = Number(evt.target.value.replace(/[,.]/g, ''));

    if(isNaN(newValue) || newValue < 1) {
      newValue = 1;
    }

    if (newValue >= 99) {
      newValue = 99;
    }

    dispatch(changeAmountInBasket([basketItem.id, newValue]));
  };


  return (
    <li className="basket-item" data-testid="basketItem-test">
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
          />
          <img
            src={previewImg}
            srcSet={previewImg2x}
            width={140}
            height={120}
            alt={`Фотоаппарат «${name}»`}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">
              Артикул:
            </span>
            <span className="basket-item__number">
              {' '}{vendorCode}
            </span>
          </li>
          <li className="basket-item__list-item">{changeTypeEnding(type, category)} {category.toLowerCase()}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">
          Цена
        </span>
        {price.toLocaleString('ru-RU')} ₽
      </p>

      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={decreaseAmountHandler}
          disabled={basketItem.amount <= 1}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>

        <label className="visually-hidden" htmlFor="counter1"></label>
        <input
          type="number"
          id="counter1"
          value={amount}
          min="1"
          max="99"
          aria-label="количество товара"
          onChange={changeAmountHandler}
        />

        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={increaseAmountHandler}
          disabled={basketItem.amount >= 99}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>

      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">
          Общая цена:
        </span>
        {summary.toLocaleString('ru-RU')} ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={deleteFromListHandler}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default BasketItem;
