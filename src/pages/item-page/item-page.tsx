import { Link, useLocation, useParams } from 'react-router-dom';
import ProductContent from '../../components/product-content/product-content';
import ProductSimilar from '../../components/product-similar/product-similar';
import ReviewBlock from '../../components/review-block/review-block';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  fetchCurrentAction,
  fetchReviewsAction,
  fetchSimilarAction
} from '../../store/current-item-data/current-item-data.action';
import {
  getCurrentItemData,
  getLoadingCurrentDataStatus,
  getLoadingErrorStatus,
  getLoadingReviewsStatus,
  getLoadingSimilarsStatus,
  getReviews,
  getSimilarCameras
} from '../../store/current-item-data/current-item-data.selectors';
import NotFoundPage from '../not-found-page/not-found-page';
import { useEffect, useState } from 'react';
import { AppRoute } from '../../const';
import { Link as LinkScroll } from 'react-scroll';
import ModalWrapper from '../../components/modal-wrapper/modal-wrapper';
import LoadingPage from '../loading-page/loading-page';
import MemoizedHeader from '../../components/header/header';
import MemoizedFooter from '../../components/footer/footer';

function ItemPage(): JSX.Element {

  const dispatch = useAppDispatch();

  const currentId = useParams().id;
  const { search } = useLocation();

  const currentTag = useState((search.split('=')[1]) || 'description')[0];

  useEffect(() => {

    if (currentId) {
      dispatch(fetchCurrentAction(Number(currentId)));
      dispatch(fetchSimilarAction(Number(currentId)));
      dispatch(fetchReviewsAction(Number(currentId)));
    }
  }, [dispatch, currentId]);

  const currentItem = useAppSelector(getCurrentItemData);
  const similars = useAppSelector(getSimilarCameras);
  const reviews = useAppSelector(getReviews);
  const currentDataLoadingStatus = useAppSelector(getLoadingCurrentDataStatus);
  const similarsLoadingStatus = useAppSelector(getLoadingSimilarsStatus);
  const reviewsLoadingStatus = useAppSelector(getLoadingReviewsStatus);
  const loadingErrorStatus = useAppSelector(getLoadingErrorStatus);

  const [currentMax, setCurrentMax] = useState(3);
  const visibleReviews = reviews.slice(0, currentMax);

  const loadNextThreeReviews = () => {
    setCurrentMax(currentMax + 3);
  };
  const isDisabled = currentMax >= reviews.length;


  if (currentDataLoadingStatus || similarsLoadingStatus || reviewsLoadingStatus) {
    if (loadingErrorStatus) {
      return (<NotFoundPage />);
    }
    return (<LoadingPage />);
  }

  if (!currentItem) {
    return (<NotFoundPage />);
  }

  return (
    <div className="wrapper" data-testid="item-page-test">
      <MemoizedHeader />
      <main>
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
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.CatalogPage}>Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    {currentItem.name}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <ProductContent camera={currentItem} typeTag={currentTag} />
          {similars.length > 0 ? <ProductSimilar cameras={similars} /> : null}
          <ReviewBlock reviews={reviews} visibleReviews={visibleReviews} onMoreButtonClick={loadNextThreeReviews} isDisabled={isDisabled} />
        </div>
        <ModalWrapper />
      </main>
      <LinkScroll className="up-btn" to="header" smooth duration={1000}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </LinkScroll>
      <MemoizedFooter />
    </div>
  );
}

export default ItemPage;
