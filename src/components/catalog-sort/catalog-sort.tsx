import React, { useEffect, useCallback } from 'react';
import { setSortDirection, setSortType } from '../../store/cameras-data/cameras-data.slice';
import { useAppDispatch, useAppSelector } from '../../store';
import { getSortDirection, getSortType } from '../../store/cameras-data/cameras-data.selectors';
import './catalog-sort.css';

function CatalogSort(): JSX.Element {

  const dispatch = useAppDispatch();
  const sortType = useAppSelector(getSortType);
  const sortDirection = useAppSelector(getSortDirection);

  const sortPriceClickHandler = () => {
    dispatch(setSortType('sortPrice'));
    if (sortDirection === 'noSorting') {
      dispatch(setSortDirection('sortUp'));
    }
  };

  const sortPopularClickHandler = () => {
    dispatch(setSortType('sortPopular'));
    if (sortDirection === 'noSorting') {
      dispatch(setSortDirection('sortUp'));
    }
  };

  const sortUpClickHandler = useCallback(() => {
    if (sortType === 'noSorting') {
      dispatch(setSortType('sortPrice'));
    }
    dispatch(setSortDirection('sortUp'));
  }, [dispatch, sortType]);

  const sortDownClickHandler = useCallback(() => {
    if (sortType === 'noSorting') {
      dispatch(setSortType('sortPrice'));
    }
    dispatch(setSortDirection('sortDown'));
  }, [dispatch, sortType]);

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
              <input type="radio" id="sortPrice" name="sort" onClick={sortPriceClickHandler} checked={sortType === 'sortPrice'} />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPopular" name="sort" onClick={sortPopularClickHandler} checked={sortType === 'sortPopular'} />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию" onClick={sortUpClickHandler} checked={sortDirection === 'sortUp'} />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" onClick={sortDownClickHandler} checked={sortDirection === 'sortDown'} />
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
