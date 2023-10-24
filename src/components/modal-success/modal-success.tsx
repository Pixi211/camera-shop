import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getSuccessType } from '../../store/modal-data/modal-data.selectors';
import { useAppSelector } from '../../store';
import { useEffect, useRef } from 'react';
import ReactFocusLock from 'react-focus-lock';

type ModalSuccessProps = {
  onCloseButtonClick: () => void;
  onReturnButtonClick: (isNewReview?: boolean) => void;
}

function ModalSuccess({ onCloseButtonClick, onReturnButtonClick }: ModalSuccessProps): JSX.Element {
  const type = useAppSelector(getSuccessType);
  const isNewReview = (type === 'newReview');

  const navigate = useNavigate();
  const handleNavigateToBasket = () => {
    onCloseButtonClick();
    navigate(AppRoute.BasketPage);
  };

  const focusOnElement = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (focusOnElement.current) {
      focusOnElement.current.focus();
    }
  }, []);

  if (type === 'addToBasket') {
    return (
      <div className="modal__wrapper">
        <ReactFocusLock group='group-3' returnFocus ref={focusOnElement} >
          <div className="modal__overlay" onClick={() => onCloseButtonClick()}></div>
          <div className="modal__content">
            <p className="title title--h4">Товар успешно добавлен в корзину</p>
            <svg className="modal__icon" width="86" height="80" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <div className="modal__buttons">
              <Link className="btn btn--transparent modal__btn" to={AppRoute.CatalogPage} onClick={() => onCloseButtonClick()} >
                Продолжить покупки
              </Link>
              <button className="btn btn--purple modal__btn modal__btn--fit-width" onClick={handleNavigateToBasket}>
                Перейти в корзину
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => onCloseButtonClick()}>
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </ReactFocusLock >
      </div>
    );
  }

  return (
    <div className="modal__wrapper">
      <div className="modal__overlay" onClick={() => onCloseButtonClick()}></div>
      <div className="modal__content">
        <p className="title title--h4">
          {`${isNewReview ? 'Спасибо за покупку' : 'Спасибо за отзыв'}`}
        </p>
        <svg className="modal__icon" width={80} height={78} aria-hidden="true">
          <use xlinkHref="#icon-review-success"></use>
        </svg>
        <div className="modal__buttons">
          {isNewReview ?
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={() => onReturnButtonClick(true)} autoFocus >Вернуться к покупкам
            </button>
            :
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={() => onReturnButtonClick()} autoFocus >Вернуться к покупкам
            </button>}
        </div>
        <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => onCloseButtonClick()}>
          <svg width={10} height={10} aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}


export default ModalSuccess;


