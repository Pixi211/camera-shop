import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getSuccessType } from '../../store/modal-data/modal-data.selectors';
import { useAppSelector } from '../../store';
import { useEffect, useRef } from 'react';
import ReactFocusLock from 'react-focus-lock';

type ModalSuccessProps = {
  onCloseButtonClick: (isNewReview?: boolean) => void;
  onReturnButtonClick: (isNewReview?: boolean) => void;
}

function ModalSuccess({ onCloseButtonClick, onReturnButtonClick }: ModalSuccessProps): JSX.Element {
  const type = useAppSelector(getSuccessType);
  const isNewReview = (type === 'newReview');

  const navigate = useNavigate();
  const navigateToBasketClickHandler = () => {
    onCloseButtonClick();
    navigate(AppRoute.BasketPage);
  };

  const navigateToCatalogClickHandler = () => {
    onCloseButtonClick();
    navigate(AppRoute.CatalogPage);
  };

  const focusOnElement = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (focusOnElement.current) {
      focusOnElement.current.focus();
    }
  }, []);

  if (type === 'addToBasket') {
    return (
      <div className="modal__wrapper" data-testid="modalSuccess-test">
        <ReactFocusLock group='group-3' returnFocus ref={focusOnElement} >
          <div className="modal__overlay" onClick={() => onCloseButtonClick()}></div>
          <div className="modal__content">
            <p className="title title--h4">Товар успешно добавлен в корзину</p>
            <svg className="modal__icon" width="86" height="80" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <div className="modal__buttons">
              <Link
                className="btn btn--transparent modal__btn"
                to={AppRoute.CatalogPage}
                onClick={() => onCloseButtonClick()}
                data-testid='btnToCatalog-test'
              >
                Продолжить покупки
              </Link>
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                onClick={navigateToBasketClickHandler}
                data-testid="btnToBasket-test"
              >
                Перейти в корзину
              </button>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={() => onCloseButtonClick()}
              data-testid="btnClose-test"
            >
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
    <div className="modal__wrapper" data-testid="modalSuccess-test">
      <ReactFocusLock group='group-3' returnFocus ref={focusOnElement} >
        {isNewReview ?
          <div className="modal__overlay" onClick={() => onCloseButtonClick(true)}></div>
          :
          <div className="modal__overlay" onClick={() => onCloseButtonClick()}></div>}
        <div className="modal__content">
          <p className="title title--h4">
            {`${isNewReview ? 'Спасибо за отзыв' : 'Спасибо за покупку!'}`}
          </p>
          <svg className="modal__icon" width={80} height={78} aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            {isNewReview ?
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={() => onReturnButtonClick(true)}
                autoFocus
              >
                Вернуться к покупкам
              </button>
              :
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                onClick={navigateToCatalogClickHandler}
                autoFocus
              >
                Вернуться к покупкам
              </button>}
          </div>
          {isNewReview ?
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={() => onCloseButtonClick(true)}
            >
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
            :
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={() => onCloseButtonClick()}
            >
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>}
        </div>
      </ReactFocusLock>
    </div>
  );
}


export default ModalSuccess;


