import { Link } from 'react-router-dom';
import BasketList from '../../components/basket-list/basket-list';
import BasketSummary from '../../components/basket-summary/basket-summary';
import MemoizedFooter from '../../components/footer/footer';
import MemoizedHeader from '../../components/header/header';
import { AppRoute } from '../../const';

function BasketPage(): JSX.Element {

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

              <BasketList />
              <BasketSummary />

            </div>
          </section>
        </div>
      </main>
      <MemoizedFooter />
    </div>
  );
}

export default BasketPage;
