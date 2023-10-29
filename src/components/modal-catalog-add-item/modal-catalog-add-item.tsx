import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { useAppSelector } from '../../store';
import { getModalData } from '../../store/modal-data/modal-data.selectors';
import { useEffect, useRef } from 'react';
import ReactFocusLock from 'react-focus-lock';


type ModalAddItemToBasketProps = {
  onAddButtonClick: () => void;
  onCloseButtonClick: () => void;
}

function ModalAddItemToBasket({ onAddButtonClick, onCloseButtonClick }: ModalAddItemToBasketProps): JSX.Element {
  const currentItemData = useAppSelector(getModalData);
  const focusOnButton = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (focusOnButton.current) {
      focusOnButton.current.focus();
    }
  }, []);

  if (!currentItemData) {
    return (<NotFoundPage />);
  }

  const {
    name,
    vendorCode,
    price,
    type,
    level,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x
  } = currentItemData;

  return (
    <div className="modal__wrapper" data-testid="modalAddItemToBasket-test">
      <ReactFocusLock group='group-3' returnFocus ref={focusOnButton} >
        <div className="modal__overlay" onClick={() => onCloseButtonClick()}></div>
        <div className="modal__content" >
          <p className="title title--h4" >Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
                />
                <img
                  src={previewImg}
                  srcSet={`${previewImg2x} 2x`}
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
                    Артикул:{' '}
                  </span>
                  <span className="basket-item__number">
                    {vendorCode}
                  </span>
                </li>
                <li className="basket-item__list-item">
                  {type} фотокамера
                </li>
                <li className="basket-item__list-item">
                  {level} уровень
                </li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">
                  Цена:
                </span>
                {price.toLocaleString('ru-RU')} ₽
              </p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              id="modal__btn--add_to_basket"
              onClick={() => onAddButtonClick()}
            >
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>
              Добавить в корзину
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => onCloseButtonClick()}
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </ReactFocusLock>
    </div>
  );
}

export default ModalAddItemToBasket;
