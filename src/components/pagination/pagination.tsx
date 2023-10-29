import React from 'react';
import { Link } from 'react-router-dom';
import { MAX_PRODUCTS_ON_PAGE } from '../../const';

type PaginationProps = {
  camerasLength: number;
  currentPage: number;
  onNumberClick: (arg0: number) => void;
  onNextButtonClick: () => void;
  onPrevButtonClick: () => void;
}

function Pagination({ camerasLength, currentPage, onNumberClick, onNextButtonClick, onPrevButtonClick }: PaginationProps): JSX.Element {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil((camerasLength / MAX_PRODUCTS_ON_PAGE)); i++) {
    pageNumbers.push(i);
  }

  let visiblePageNumbers: number[] = [];
  if (currentPage > 1) {
    visiblePageNumbers = pageNumbers.slice(currentPage - 2, currentPage - 2 + 3);
  } else {
    visiblePageNumbers = pageNumbers.slice(0, 3);
  }

  const lastElementOfPageNumbers = pageNumbers[pageNumbers.length - 1];

  const isNextButtonVisible = (visiblePageNumbers[visiblePageNumbers.length - 1] < lastElementOfPageNumbers);
  const isPrevButtonVisible = (visiblePageNumbers[0] !== 1);

  return (
    <div className="pagination" data-testid="pagination-test">
      <ul className="pagination__list">
        {isPrevButtonVisible &&
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text"
              to={`/?page=${currentPage - 1}`}
              onClick={onPrevButtonClick}
            >
              Назад
            </Link>
          </li>}
        {
          visiblePageNumbers.map((number) => (
            <li className="pagination__item" key={number}>
              <Link
                className={number === currentPage ? 'pagination__link pagination__link--active' : 'pagination__link'}
                to={`/?page=${number}`}
                onClick={() => onNumberClick(number)}
              >
                {number}
              </Link>
            </li>
          ))
        }
        {isNextButtonVisible &&
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text"
              to={`/?page=${currentPage + 1}`}
              onClick={onNextButtonClick}
            >
              Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}

const MemoizedPagination = React.memo(Pagination);

export default MemoizedPagination;

