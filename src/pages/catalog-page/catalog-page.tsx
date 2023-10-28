import { useState } from 'react';
import Banner from '../../components/banner/banner';
import { useAppSelector } from '../../store';
import { getCameras } from '../../store/cameras-data/cameras-data.selectors';
import { getPromos } from '../../store/promo-data/promo-data.selectors';
import { AppRoute, MAX_PRODUCTS_ON_PAGE } from '../../const';
import { Link, useLocation } from 'react-router-dom';
import ModalWrapper from '../../components/modal-wrapper/modal-wrapper';
import MemoizedHeader from '../../components/header/header';
import MemoizedFooter from '../../components/footer/footer';
import MemoizedPagination from '../../components/pagination/pagination';
import MemoizedCatalogCards from '../../components/catalog-cards/catalog-cards';
import MemoizedCatalogFilter from '../../components/catalog-filter/catalog-filter';
import MemoizedCatalogSort from '../../components/catalog-sort/catalog-sort';


function CatalogPage(): JSX.Element {

  const allCameras = useAppSelector(getCameras);
  const allPromos = useAppSelector(getPromos);
  const { search } = useLocation();

  const [currentPage, setCurrentPage] = useState(Number(search.split('=')[1]) || 1);

  const lastCameraIndex = currentPage * MAX_PRODUCTS_ON_PAGE;
  const firstCameraIndex = lastCameraIndex - MAX_PRODUCTS_ON_PAGE;
  const camerasOnPage = allCameras.slice(firstCameraIndex, lastCameraIndex);
  const isMoreThanOnePage = (allCameras.length >= MAX_PRODUCTS_ON_PAGE);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const getNextPage = () => setCurrentPage((prev) => prev + 1);
  const getPrevPage = () => setCurrentPage((prev) => prev - 1);

  return (
    <div className="wrapper" data-testid="catalog-page-test">
      <MemoizedHeader />
      <main>
        <Banner promos={allPromos} />
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.CatalogPage}>Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <MemoizedCatalogFilter />
                </div>
                <div className="catalog__content">
                  <MemoizedCatalogSort />
                  <MemoizedCatalogCards cameras={camerasOnPage} />
                  {isMoreThanOnePage &&
                    <MemoizedPagination camerasLength={allCameras.length}
                      currentPage={currentPage}
                      paginate={paginate}
                      onNextButtonClick={getNextPage}
                      onPrevButtonClick={getPrevPage}
                    />}
                </div>
              </div>
            </div>
          </section>
        </div>
        <ModalWrapper />
      </main>
      <MemoizedFooter />
    </div>
  );
}

export default CatalogPage;
