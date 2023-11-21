import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, SEARCH_SYMBOLS_MINIMUM, KeyCode } from '../../const';
import { useAppSelector } from '../../store';
import { getCameras } from '../../store/cameras-data/cameras-data.selectors';
import classNames from 'classnames';
import ReactFocusLock from 'react-focus-lock';
import MemoSearchItem from '../search-item/search-item';
import { useKeyPress } from '../../hooks/useKeyPress';

type HeaderProps = {
  onMainClickHandler?: () => void;
}

function Header({ onMainClickHandler }: HeaderProps): JSX.Element {

  const cameras = useAppSelector(getCameras);

  const [textValue, setTextValue] = useState('');
  const [currentCameraIndex, setCurrentCameraIndex] = useState(-1);

  const searchedCameras = cameras.filter((camera) => camera.name.toLowerCase().includes(textValue.toLowerCase()));

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef(null);
  const navigate = useNavigate();


  const searchItemClickHandler = useCallback((id: number) => {
    navigate(`${AppRoute.CatalogPage}${id?.toString()}`);
    setTextValue('');
  }, [navigate]);

  const searchTextResetHandler = () => {
    setTextValue('');
    inputRef.current?.focus();
  };

  const searchTextChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(evt.target.value);
  };

  const arrowUp = useKeyPress({ targetKey: KeyCode.ArrowUp });
  const arrowDown = useKeyPress({ targetKey: KeyCode.ArrowDown });
  const escKey = useKeyPress({ targetKey: KeyCode.Esc });
  const isUpArrowPressed = textValue && searchedCameras.length && arrowUp;
  const isDownArrowPressed = textValue && searchedCameras.length && arrowDown;
  const isEscPressed = textValue && searchedCameras.length && escKey;

  useEffect(() => {
    if (searchedCameras.length && isUpArrowPressed) {
      setCurrentCameraIndex((prev) => (prev ? prev - 1 : prev));

      if (!currentCameraIndex) {
        inputRef.current?.focus();
        setCurrentCameraIndex(-1);
      }

    } else if (searchedCameras.length && isDownArrowPressed) {
      setCurrentCameraIndex((prev) => (prev < searchedCameras.length - 1 ? prev + 1 : prev));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpArrowPressed, isDownArrowPressed, searchedCameras.length]);

  useEffect(() => {
    if (searchedCameras.length && isEscPressed) {
      searchTextResetHandler();
    }
  }, [isEscPressed, searchedCameras.length]);


  return (
    <header className="header" id="header" data-testid="header-test">
      <div className="container">
        <Link className="header__logo" onClick={onMainClickHandler} to={AppRoute.CatalogPage} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.CatalogPage}>Каталог</Link>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">Гарантии</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">Доставка</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">О компании</a>
            </li>
          </ul>
        </nav>
        <div
          className={classNames({ 'list-opened': textValue.length >= SEARCH_SYMBOLS_MINIMUM }, 'form-search')}
          ref={formRef}
          tabIndex={-1}
        >
          <ReactFocusLock disabled={textValue === ''}>
            <form data-testid='search-form'>
              <label>
                <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-lens"></use>
                </svg>
                <input
                  className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту"
                  onChange={searchTextChangeHandler}
                  ref={inputRef}
                  value={textValue}
                />
              </label>
              <ul className={classNames({ 'scroller': searchedCameras.length > SEARCH_SYMBOLS_MINIMUM }, 'form-search__select-list')}>
                {searchedCameras.map((camera, i) => {
                  const isCurrent = i === currentCameraIndex;
                  return (
                    <MemoSearchItem
                      camera={camera}
                      isCurrent={isCurrent}
                      key={camera.id}
                      onItemClick={searchItemClickHandler}
                    />
                  );
                })}
              </ul>
            </form>
            <button className="form-search__reset" type="reset" onClick={searchTextResetHandler}>
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg><span className="visually-hidden">Сбросить поиск</span>
            </button>
          </ReactFocusLock>
        </div>

        <Link className="header__basket-link" to={AppRoute.BasketPage}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </Link>
      </div>
    </header >
  );
}

const MemoizedHeader = React.memo(Header);

export default MemoizedHeader;
