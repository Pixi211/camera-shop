import { useState } from 'react';
import Banner from '../../components/banner/banner';
import { useAppSelector } from '../../store';
import { getPromos } from '../../store/promo-data/promo-data.selectors';
import { AppRoute, MAX_PRODUCTS_ON_PAGE, QueryString } from '../../const';
import { Link, useSearchParams } from 'react-router-dom';
import ModalWrapper from '../../components/modal-wrapper/modal-wrapper';
import MemoizedHeader from '../../components/header/header';
import MemoizedFooter from '../../components/footer/footer';
import MemoizedPagination from '../../components/pagination/pagination';
import MemoizedCatalogCards from '../../components/catalog-cards/catalog-cards';
import MemoizedCatalogFilter from '../../components/catalog-filter/catalog-filter';
import MemoizedCatalogSort from '../../components/catalog-sort/catalog-sort';
import { getMaxPrice, getMinPrice, getSortDirection, getSortType } from '../../store/cameras-data/cameras-data.selectors';
import { filterCameras, getMinMaxPrices, sortCameras, getCamerasByPrice } from '../../utils/utils';
import { CameraType } from '../../types/types';

type CatalogPageProps = {
  allCameras: CameraType[];
};

function CatalogPage({ allCameras }: CatalogPageProps): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();

  const allPromos = useAppSelector(getPromos);

  let sortType = useAppSelector(getSortType);
  let sortDirection = useAppSelector(getSortDirection);

  const [currentPage, setCurrentPage] = useState(Number(searchParams.get(QueryString.Page)) || 1);

  const lastCameraIndex = currentPage * MAX_PRODUCTS_ON_PAGE;
  const firstCameraIndex = lastCameraIndex - MAX_PRODUCTS_ON_PAGE;

  const category = searchParams.get(QueryString.Category);
  const type = searchParams.getAll(QueryString.TypeCamera);
  const level = searchParams.getAll(QueryString.Level);

  const [minPrice, maxPrice] = getMinMaxPrices(allCameras);


  let currentMinPrice = useAppSelector(getMinPrice);
  let currentMaxPrice = useAppSelector(getMaxPrice);

  if (searchParams.get(QueryString.End) !== null
    && !searchParams.get(QueryString.Start) !== null) {
    currentMinPrice = Number(searchParams.get(QueryString.Start));
    currentMaxPrice = Number(searchParams.get(QueryString.End));
  } else if (!searchParams.has(QueryString.End)) {
    currentMinPrice = Number(searchParams.get(QueryString.Start));
    currentMaxPrice = maxPrice;
  } else if (!searchParams.has(QueryString.Start)) {
    currentMaxPrice = Number(searchParams.get(QueryString.End));
    currentMinPrice = minPrice;
  }

  if (searchParams.has(QueryString.Sort)) {
    sortType = searchParams.get(QueryString.Sort);
  }
  if (searchParams.has(QueryString.Direction)) {
    sortDirection = searchParams.get(QueryString.Direction);
  }

  const camerasByPrice = getCamerasByPrice(allCameras, currentMinPrice, currentMaxPrice);


  let filteredCameras = [];

  if (camerasByPrice.length === 0 && !searchParams.has(QueryString.Start)
    && !searchParams.has(QueryString.End)) {
    filteredCameras = filterCameras(allCameras, type, level, category);
  } else {
    filteredCameras = filterCameras(camerasByPrice, type, level, category);
  }

  const sortedCameras = sortCameras(filteredCameras.slice(), sortType, sortDirection);
  const camerasOnPage = sortedCameras.slice(firstCameraIndex, lastCameraIndex);


  const [minPriceSorted, maxPriceSorted] = getMinMaxPrices(sortedCameras);


  const isMoreThanOnePage = (sortedCameras.length >= MAX_PRODUCTS_ON_PAGE);

  const getToPage = (pageNumber = 0, direction = 1) => {

    if (pageNumber > 0) {
      setCurrentPage(pageNumber);
      searchParams.set(QueryString.Page, String(pageNumber));
    } else {
      setCurrentPage((prev) => prev + direction);
      searchParams.set(QueryString.Page, String(currentPage + direction));
    }
    setSearchParams(searchParams);
  };

  const resetPage = () => {
    setCurrentPage(1);
  };


  return (
    <div className="wrapper" data-testid="catalog-page-test">
      <MemoizedHeader onMainClickHandler={resetPage} />
      <main>
        <Banner promos={allPromos} />
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link
                    className="breadcrumbs__link"
                    onClick={resetPage}
                    to={AppRoute.CatalogPage}
                  >
                    Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link
                    className="breadcrumbs__link breadcrumbs__link--active"
                    onClick={resetPage}
                    to={AppRoute.CatalogPage}
                  >
                    Каталог
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <MemoizedCatalogFilter
                    minPriceOfCatalog={minPrice}
                    maxPriceOfCatalog={maxPrice}
                    minPriceSorted={minPriceSorted}
                    maxPriceSorted={maxPriceSorted}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
                <div className="catalog__content">
                  <MemoizedCatalogSort />
                  <MemoizedCatalogCards cameras={camerasOnPage} />
                  {isMoreThanOnePage &&
                    <MemoizedPagination camerasLength={allCameras.length}
                      currentPage={currentPage}
                      onPaginationClick={getToPage}
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
