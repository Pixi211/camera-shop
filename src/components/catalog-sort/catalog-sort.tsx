import React, { useEffect, useCallback } from 'react';
import { useAppDispatch } from '../../store';
import './catalog-sort.css';
import { useSearchParams } from 'react-router-dom';
import { DirectionValue, QueryString, SortValue } from '../../const';
import { setSortDirection, setSortType } from '../../store/cameras-data/cameras-data.slice';

function CatalogSort(): JSX.Element {

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortParameter = searchParams.get(QueryString.Sort);
  const directionParameter = searchParams.get(QueryString.Direction);


  const sortTypeClickHandler = (value: SortValue) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(QueryString.Sort, value);
    newSearchParams.set(QueryString.Direction, directionParameter !== 'null' ? String(directionParameter) : DirectionValue.Up);
    dispatch(setSortDirection(newSearchParams.get(QueryString.Direction)));
    dispatch(setSortType(value));
    setSearchParams(newSearchParams);
  };

  const directionClickHandler = useCallback((value: DirectionValue) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(QueryString.Direction, value);
    newSearchParams.set(QueryString.Sort, sortParameter !== 'null' ? String(sortParameter) : SortValue.Price);
    dispatch(setSortType(newSearchParams.get(QueryString.Sort)));
    dispatch(setSortDirection(value));
    setSearchParams(newSearchParams);
  }, [dispatch, searchParams, sortParameter, setSearchParams]);

  useEffect(() => {
    const onArrowClick = (evt: KeyboardEvent) => {
      evt.preventDefault();
      if (evt.code === 'ArrowUp') {
        directionClickHandler(DirectionValue.Up);
      } else if (evt.code === 'ArrowDown') {
        directionClickHandler(DirectionValue.Down);
      }
    };

    document.addEventListener('keydown', onArrowClick);

    return () => {
      document.removeEventListener('keydown', onArrowClick);
    };
  }, [directionClickHandler]);

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
                onChange={() => sortTypeClickHandler(SortValue.Price)}
                checked={sortParameter === SortValue.Price}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                onChange={() => sortTypeClickHandler(SortValue.Popular)}
                checked={sortParameter === SortValue.Popular}
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
                onChange={() => directionClickHandler(DirectionValue.Up)}
                checked={directionParameter === DirectionValue.Up}
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
                onChange={() => directionClickHandler(DirectionValue.Down)}
                checked={directionParameter === DirectionValue.Down}
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
