import { Link } from 'react-router-dom';
import BasketList from '../../components/basket-list/basket-list';
import BasketSummary from '../../components/basket-summary/basket-summary';
import MemoizedFooter from '../../components/footer/footer';
import MemoizedHeader from '../../components/header/header';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../store';
import { getBasketItems } from '../../store/basket-data/basket-data.selectors';
import ModalWrapper from '../../components/modal-wrapper/modal-wrapper';

function BasketPage(): JSX.Element {


  const camerasInBasket = useAppSelector(getBasketItems);
  // console.log(busketEmptyStatus);
  // const savedItemsInBasket = JSON.parse(localStorage.getItem('items'));

  // console.log('cameras: ' + camerasInBasket);
  // console.log(savedItemsInBasket);

  // if (!savedItemsInBasket || (camerasInBasket.length !== 0 && savedItemsInBasket !== camerasInBasket)
  // || busketEmptyStatus) {
  //   localStorage.setItem('items', JSON.stringify(camerasInBasket));
  // }

  // const initialValue = JSON.parse(localStorage.getItem('items'));

  // console.log('local: ' + initialValue);
  return (
    <div className="wrapper" data-testid="basket-page-test">
      <MemoizedHeader />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.CatalogPage}>
                    Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.CatalogPage}>Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>

              <BasketList basketItems={camerasInBasket} />
              <BasketSummary />

            </div>
          </section>
        </div>
        <ModalWrapper />
      </main>
      <MemoizedFooter />
    </div>
  );
}

export default BasketPage;
