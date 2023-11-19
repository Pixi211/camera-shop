import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ItemPage from '../../pages/item-page/item-page';
import BasketPage from '../../pages/basket-page/basket-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-route/history-route';
import { useAppSelector } from '../../store';
import { getCameras, getCamerasDataLoading, getDataLoadingErrorStatus } from '../../store/cameras-data/cameras-data.selectors';
import LoadingPage from '../../pages/loading-page/loading-page';


function App(): JSX.Element {
  const dataLoadingStatus = useAppSelector(getCamerasDataLoading);
  const dataLoadingErrorStatus = useAppSelector(getDataLoadingErrorStatus);
  const allCameras = useAppSelector(getCameras);


  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        {dataLoadingStatus ?
          <Route
            index
            path={AppRoute.CatalogPage}
            element={<LoadingPage />}
          />
          :
          <Route
            index
            path={AppRoute.CatalogPage}
            element={allCameras.length && <CatalogPage allCameras={allCameras} />}
          />}
        <Route
          index
          path={AppRoute.CatalogPage}
          element={allCameras.length && <CatalogPage allCameras={allCameras} />}
        />
        <Route
          path={AppRoute.ItemPage}
          element={<ItemPage />}
        />
        <Route
          path={AppRoute.BasketPage}
          element={<BasketPage />}
        />
        {dataLoadingErrorStatus &&
        <Route
          path={AppRoute.NotFoundPage}
          element={<NotFoundPage />}
        />}
      </Routes>
    </HistoryRouter>
  );
}

export default App;
