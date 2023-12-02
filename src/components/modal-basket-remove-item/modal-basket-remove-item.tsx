import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { getModalData } from '../../store/modal-data/modal-data.selectors';
import { changeTypeEnding } from '../../utils/utils';
import { AppRoute } from '../../const';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { useEffect, useRef } from 'react';
import ReactFocusLock from 'react-focus-lock';

type ModalRemoveFromBasketProps = {
  onDeleteButtonClick: () => void;
  onCloseButtonClick: () => void;
}

function ModalRemoveFromBasket({ onCloseButtonClick, onDeleteButtonClick }: ModalRemoveFromBasketProps): JSX.Element {
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
    type,
    category,
    level,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = currentItemData;


  return (
    <div className="modal__wrapper" >
      <ReactFocusLock group='group-3' returnFocus ref={focusOnButton} >
        <div className="modal__overlay" onClick={() => onCloseButtonClick()}> </div>
        <div className="modal__content" >
          <p className="title title--h4" > Удалить этот товар ? </p>
          <div className="basket-item basket-item--short" >
            <div className="basket-item__img" >
              <picture>
                <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
                <img src={previewImg} srcSet={`${previewImg2x} 2x`} width={140} height={120} alt={`Фотоаппарат «${name}»`} />
              </picture>
            </div>
            <div className="basket-item__description" >
              <p className="basket-item__title" > {name} </p>
              <ul className="basket-item__list" >
                <li className="basket-item__list-item" > <span className="basket-item__article" > Артикул:{' '} </span>
                  < span className="basket-item__number" > {vendorCode} </span >
                </li>
                < li className="basket-item__list-item" > {changeTypeEnding(type, category)} {category.toLowerCase()}</li>
                < li className="basket-item__list-item" > {level} уровень </li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons" >
            <button
              className="btn btn--purple modal__btn modal__btn--half-width"
              type="button"
              onClick={onDeleteButtonClick}
            >
              Удалить
            </button>
            <Link className="btn btn--transparent modal__btn modal__btn--half-width" to={AppRoute.BasketPage} onClick={onCloseButtonClick}>
              Продолжить покупки
            </Link>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseButtonClick}>
            <svg width={10} height={10} aria-hidden="true" >
              <use xlinkHref="#icon-close" > </use>
            </svg>
          </button>
        </div>
      </ReactFocusLock>
    </div>
  );
}

export default ModalRemoveFromBasket;
