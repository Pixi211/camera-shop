import React, { useEffect, useCallback, useState } from 'react';
import { setSortDirection, setSortType } from '../../store/cameras-data/cameras-data.slice';
import { useAppDispatch, useAppSelector } from '../../store';
import { getSortDirection, getSortType } from '../../store/cameras-data/cameras-data.selectors';
import './catalog-sort.css';
import { useLocation, useSearchParams } from 'react-router-dom';

function CatalogSort(): JSX.Element {

  const dispatch = useAppDispatch();
  const sortType = useAppSelector(getSortType);
  const sortDirection = useAppSelector(getSortDirection);

  // const setSearchParams = useSearchParams()[1];
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useLocation();
  const [sortChecked, setSortChecked] = useState(search.slice(search.indexOf('=') + 1, search.indexOf('&')) || false);
  const [directionChecked, setDirectionChecked] = useState((search.split('sort=')[1]) || false);


  const params = { type: '', sort: '' };

  const sortPriceClickHandler = () => {
    setSortChecked('Price');
    dispatch(setSortType('sortPrice'));
    // setSearchParams({ type: 'Price' });
    params.type = 'Price';
    params.sort = searchParams.get('sort');
    if (sortDirection === 'noSorting') {
      dispatch(setSortDirection('sortUp'));
      // setSearchParams({ sort: 'Up' });
      params.sort = 'Up';
      setDirectionChecked('Up');

    }
    setSearchParams(params);
  };

  const sortPopularClickHandler = () => {
    setSortChecked('Popular');
    dispatch(setSortType('sortPopular'));
    // setSearchParams({ type: 'Popular' });
    params.type = 'Popular';
    params.sort = searchParams.get('sort');

    if (sortDirection === 'noSorting') {
      dispatch(setSortDirection('sortUp'));
      // setSearchParams({ sort: 'Up' });
      params.sort = 'Up';
      setDirectionChecked('Up');

    }
    setSearchParams(params);

  };

  const sortUpClickHandler = useCallback(() => {
    params.type = searchParams.get('type');
    if (sortType === 'noSorting') {
      dispatch(setSortType('sortPrice'));
      // setSearchParams({ type: 'Price' });
      params.type = 'Price';
      setSortChecked('Price');
    }
    dispatch(setSortDirection('sortUp'));
    // setSearchParams({ sort: 'Up' });
    params.sort = 'Up';
    setDirectionChecked('Up');

    setSearchParams(params);
  }, [dispatch, sortType, setSearchParams, params, searchParams]);

  const sortDownClickHandler = useCallback(() => {
    params.type = searchParams.get('type');

    if (sortType === 'noSorting') {
      dispatch(setSortType('sortPrice'));
      // setSearchParams({ type: 'Price' });
      params.type = 'Price';
      setSortChecked('Price');
    }
    dispatch(setSortDirection('sortDown'));
    // setSearchParams({ sort: 'Down' });
    params.sort = 'Down';
    setDirectionChecked('Down');
    setSearchParams(params);
  }, [dispatch, sortType, setSearchParams, params, searchParams]);

  useEffect(() => {

    const onArrowUpClick = (evt: KeyboardEvent) => {
      if (evt.code === 'ArrowUp') {
        evt.preventDefault();
        sortUpClickHandler();
      }
    };

    const onArrowDownClick = (evt: KeyboardEvent) => {
      if (evt.code === 'ArrowDown') {
        evt.preventDefault();
        sortDownClickHandler();
      }
    };

    document.addEventListener('keydown', onArrowUpClick);
    document.addEventListener('keydown', onArrowDownClick);

    return () => {
      document.removeEventListener('keydown', onArrowUpClick);
      document.removeEventListener('keydown', onArrowDownClick);
    };

  }, [dispatch, sortUpClickHandler, sortDownClickHandler]);

  return (
    <div className="catalog-sort" data-testid="catalogSort-test">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                onClick={sortPriceClickHandler}
                checked={sortType === 'sortPrice' || sortChecked === 'Price'}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                onClick={sortPopularClickHandler}
                checked={sortType === 'sortPopular' || sortChecked === 'Popular'}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                onClick={sortUpClickHandler}
                checked={sortDirection === 'sortUp' || directionChecked === 'Up'}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                onClick={sortDownClickHandler}
                checked={sortDirection === 'sortDown' || directionChecked === 'Down'}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const MemoizedCatalogSort = React.memo(CatalogSort);
export default MemoizedCatalogSort;
