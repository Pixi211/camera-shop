import { useState } from 'react';
import Banner from '../../components/banner/banner';
import CatalogCards from '../../components/catalog-cards/catalog-cards';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Pagination from '../../components/pagination/pagination';
import { useAppSelector } from '../../store';
import { getCameras } from '../../store/cameras-data/cameras-data.selectors';
import { getPromos } from '../../store/promo-data/promo-data.selectors';
import { MAX_PRODUCTS_ON_PAGE } from '../../const';
import { useLocation } from 'react-router-dom';


function CatalogPage(): JSX.Element {

  const allCameras = useAppSelector(getCameras);
  const allPromos = useAppSelector(getPromos);
  const { search } = useLocation();

  const [currentPage, setCurrentPage] = useState(Number(search.split('=')[1]) || 1);

  const lastCameraIndex = currentPage * MAX_PRODUCTS_ON_PAGE;
  const firstCameraIndex = lastCameraIndex - MAX_PRODUCTS_ON_PAGE;
  const camerasOnPage = allCameras.slice(firstCameraIndex, lastCameraIndex);
  const isMoreThanOnePage = (allCameras.length >= MAX_PRODUCTS_ON_PAGE); //name

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const getNextPage = () => setCurrentPage((prev) => prev + 1);
  const getPrevPage = () => setCurrentPage((prev) => prev - 1);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <Banner promos={allPromos} />
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
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
                  <CatalogFilter />
                </div>
                <div className="catalog__content">
                  <CatalogSort />
                  <CatalogCards cameras={camerasOnPage} />
                  {isMoreThanOnePage &&
                    <Pagination cameras={allCameras}
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
      </main>
      <Footer />
    </div>
  );
}

export default CatalogPage;
