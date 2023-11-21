import React from 'react';
import { DirectionPagination, MAX_PRODUCTS_ON_PAGE } from '../../const';
import './pagination.css';

type PaginationProps = {
  camerasLength: number;
  currentPage: number;
  onPaginationClick: (pageNumber: number|undefined, direction: number|undefined) => void;
}

function Pagination({ camerasLength, currentPage, onPaginationClick }: PaginationProps): JSX.Element {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil((camerasLength / MAX_PRODUCTS_ON_PAGE)); i++) {
    pageNumbers.push(i);
  }

  const numbersOnPage = 3;
  const pageNumbersOnPage = [];
  for (let i = 0; i < Math.ceil(pageNumbers.length / numbersOnPage); i++) {
    pageNumbersOnPage[i] = pageNumbers.slice((i * numbersOnPage), (i * numbersOnPage) + numbersOnPage);
  }

  let visiblePageNumbers = pageNumbers.slice(0, 3);
  const currentTriplet = Math.ceil(currentPage / 3);
  let isPrevButtonVisible = false;

  if (currentTriplet > 1) {
    visiblePageNumbers = pageNumbersOnPage[currentTriplet - 1];
    isPrevButtonVisible = (currentTriplet > 1);
  }

  const lastElementOfPageNumbers = pageNumbers[pageNumbers.length - 1];
  const isNextButtonVisible = (visiblePageNumbers[visiblePageNumbers.length - 1] < lastElementOfPageNumbers);

  return (
    <div className="pagination" data-testid="pagination-test">
      <ul className="pagination__list">
        {isPrevButtonVisible &&
          <li className="pagination__item">
            <button className="pagination__link pagination__link--text"
              onClick={() => onPaginationClick(undefined, DirectionPagination.Prev)}
            >
              Назад
            </button>
          </li>}
        {
          visiblePageNumbers.map((number) => (
            <li className="pagination__item" key={number}>
              <button
                className={number === currentPage ? 'pagination__link pagination__link--active' : 'pagination__link'}
                onClick={() => onPaginationClick(number, undefined)}
              >
                {number}
              </button>
            </li>
          ))
        }
        {isNextButtonVisible &&
          <li className="pagination__item">
            <button className="pagination__link pagination__link--text"
              onClick={() => onPaginationClick(undefined, DirectionPagination.Next)}
            >
              Далее
            </button>
          </li>}
      </ul>
    </div>
  );
}

const MemoizedPagination = React.memo(Pagination);

export default MemoizedPagination;

