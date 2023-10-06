import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ItemPage from '../../pages/item-page/item-page';
import BasketPage from '../../pages/basket-page/basket-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';


import browserHistory from '../../browser-history';
import HistoryRouter from '../history-route/history-route';


function App(): JSX.Element {

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          index
          path={AppRoute.CatalogPage}
          element={<CatalogPage />}
        />
        <Route
          path={AppRoute.ItemPage}
          element={<ItemPage />}
        />
        <Route
          path={AppRoute.BasketPage}
          element={<BasketPage />}
        />
        <Route
          path={AppRoute.NotFoundPage}
          element={<NotFoundPage />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
