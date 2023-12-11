
import { useRef, useState } from 'react';
import { BasketItemType, Order } from '../../types/types';
import { Discount, PromoCode } from '../../const';
import { fetchPromoCodeAction, postOrderAction } from '../../store/basket-data/basket-data.action';
import { useAppDispatch, useAppSelector } from '../../store';
import { getIsPromoCodeInvalid, getIsPromoCodeValid, getPromoCodeName } from '../../store/basket-data/basket-data.selectors';
import classNames from 'classnames';
import { setIsPromoCodeInvalid, setIsPromoCodeValid } from '../../store/basket-data/basket-data.slice';

function BasketSummary(): JSX.Element {

  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const camerasInBasket: BasketItemType[] = JSON.parse(localStorage.getItem('items') || '[]') as BasketItemType[];
  const summary = camerasInBasket.reduce((total, camera) => total + (camera.price * camera.amount), 0);
  const [discount, setDiscount] = useState(Number(JSON.parse((localStorage.getItem('discount')) || '0')));

  const promoCodeInvalidStatus = useAppSelector(getIsPromoCodeInvalid);
  const promoCodeValidStatus = useAppSelector(getIsPromoCodeValid);
  const promoCodeName = useAppSelector(getPromoCodeName);
  const [promoCode, setPromoCode] = useState<string | null>(promoCodeName || null);

  const summaryWithDiscount = summary > discount
    ? summary - discount
    : summary;

  const promoCodeInputHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.target.value.replace(/\s/g, '');
    setDiscount(Discount.None);
    setPromoCode(newValue);
    dispatch(setIsPromoCodeInvalid(false));
    dispatch(setIsPromoCodeValid(false));
  };

  const promoCodeButtonClickHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    switch (promoCode) {
      case PromoCode.Camera333:
        setDiscount(Discount.Camera333);
        break;
      case PromoCode.Camera444:
        setDiscount(Discount.Camera444);
        break;
      case PromoCode.Camera555:
        setDiscount(Discount.Camera555);
        break;
      default:
        setDiscount(Discount.None);
        break;
    }

    if (promoCode !== '') {
      dispatch(fetchPromoCodeAction(promoCode));
    }
  };

  const orderSubmitHandler = () => {
    // @ts-ignore
    const coupon = Object.values(PromoCode)?.includes(promoCode) ? promoCode : null;
    const serverData: Order = { camerasIds: camerasInBasket.map((elem) => elem.id), coupon: coupon };
    dispatch(postOrderAction(serverData)).then(() => {
      if (inputRef.current) {
        inputRef.current.value = '';
        setPromoCode(null);
        setDiscount(0);
      }
    });
  };

  return (
    <div className="basket__summary" data-testid="basketSummary-test">
      <div className="basket__promo">
        <p className="title title--h4">
          Если у вас есть промокод на скидку, примените его в этом поле
        </p>
        <div className="basket-form">
          <form action="#" onSubmit={promoCodeButtonClickHandler}>
            <div className={classNames('custom-input',
              {
                'is-invalid': promoCodeInvalidStatus && inputRef.current?.value !== '',
                'is-valid': promoCodeValidStatus && inputRef.current?.value !== ''
              })}
            >
              <label><span className="custom-input__label">Промокод</span>
                <input
                  type="text"
                  name="promo"
                  placeholder="Введите промокод"
                  onChange={promoCodeInputHandler}
                  value={promoCode || ''}
                  ref={inputRef}
                />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button className="btn" type="submit">
              Применить
            </button>
          </form>
        </div>
      </div >

      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">
            Всего:
          </span>
          <span className="basket__summary-value">
            {summary.toLocaleString('ru-RU')} ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">
            Скидка:
          </span>
          <span className={`basket__summary-value ${discount !== 0 ? 'basket__summary-value--bonus' : ''}`}>
            {discount.toLocaleString('ru-RU')} ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">
            К оплате:
          </span>
          <span className="basket__summary-value basket__summary-value--total">
            {summaryWithDiscount.toLocaleString('ru-RU')} ₽
          </span>
        </p>
        <button className="btn btn--purple" type="submit" disabled={camerasInBasket.length === 0} onClick={orderSubmitHandler}>
          Оформить заказ
        </button>
      </div>
    </div >
  );
}

export default BasketSummary;
