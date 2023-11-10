import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../store';
import { getCameras } from '../../store/cameras-data/cameras-data.selectors';
import { useAutocomplete } from '@mui/base/useAutocomplete';

type HeaderProps = {
  onMainClickHandler?: () => void;
}

function Header({onMainClickHandler}: HeaderProps): JSX.Element {

  const cameras = useAppSelector(getCameras);

  const navigate = useNavigate();
  const handleOptionClick = (id: number | undefined) => {
    if (id) {
      navigate(`${AppRoute.CatalogPage}${id?.toString()}`);
    }
  };

  const {
    getRootProps,
    groupedOptions,
    getOptionProps,
    getInputProps,
    getInputLabelProps,
    getListboxProps,
    popupOpen,
    getClearProps,
    inputValue } = useAutocomplete({
    id: 'header-search-bar',
    options: cameras,
    getOptionLabel: (option) => option.name,
    handleHomeEndKeys: true,
    clearOnEscape: true,
    onChange(evt, value) {
      evt.preventDefault();
      handleOptionClick(value?.id);
    },
    filterOptions(options, searchText) {
      if (searchText.inputValue.length > 2) {
        return options.filter((option) =>
          String(option.name).toLowerCase().includes(searchText.inputValue.toLowerCase())
        );
      }
      return options;
    },
  });


  return (
    <header className="header" id="header" data-testid="header-test">
      <div className="container">
        <Link className="header__logo" onClick = {onMainClickHandler} to={AppRoute.CatalogPage} aria-label="Переход на главную">
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
          className={`form-search ${popupOpen && inputValue.length > 2
            ? 'list-opened'
            : ''}`}
          {...getRootProps()}
        >
          <form>
            <label {...getInputLabelProps()}>
              <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-lens"></use>
              </svg>
              <input
                className="form-search__input"
                type="text"
                autoComplete="off"
                placeholder="Поиск по сайту"
                {...getInputProps()}
              />
            </label>
            <ul {...getListboxProps()} className="form-search__select-list">
              {groupedOptions.length > 0 ? (groupedOptions as typeof cameras).map((option, index) => (
                <li
                  {...getOptionProps({ option, index })}
                  key={option.name}
                  className="form-search__select-item"
                  tabIndex={0}
                >
                  {option.name}
                </li>
              ))
                :
                <li
                  className="form-search__select-item"
                  tabIndex={0}
                >
                  По запросу ничего не найдено...
                </li>}
            </ul>
          </form>
          <button className="form-search__reset" type="reset" {...getClearProps()}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg><span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <Link className="header__basket-link" to={AppRoute.BasketPage}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </Link>
      </div>
    </header>
  );
}

const MemoizedHeader = React.memo(Header);

export default MemoizedHeader;
