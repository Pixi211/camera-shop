import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CategoryValue, LevelValue, QueryString, TypeCameraValue } from '../../const';
import { useAppDispatch } from '../../store';
import { fetchCamerasByPriceAction } from '../../store/cameras-data/cameras-data.action';
import { debounce } from '../../utils/utils';

type CatalogFilterProps = {
  minPriceOfCatalog: number;
  maxPriceOfCatalog: number;
  minPriceSorted: number;
  maxPriceSorted: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function CatalogFilter({ minPriceOfCatalog, maxPriceOfCatalog, minPriceSorted, maxPriceSorted, setCurrentPage }: CatalogFilterProps): JSX.Element {

  const dispatch = useAppDispatch();

  let isDisabled = false;
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceStart, setPriceStart] = useState(minPriceSorted);
  const [priceEnd, setPriceEnd] = useState(maxPriceSorted);
  const categoryParameter = searchParams.get(QueryString.Category);
  const typeParameter = searchParams.getAll(QueryString.TypeCamera);


  if (searchParams.has(QueryString.Category, CategoryValue.Videocamera)) {
    isDisabled = true;
  } else {
    isDisabled = false;
  }

  const resetPriceStart = () => {
    searchParams.delete(QueryString.Start);
    setPriceStart(minPriceOfCatalog);
  };

  const resetPriceEnd = () => {
    searchParams.delete(QueryString.End);
    setPriceEnd(maxPriceOfCatalog);
  };

  const onResetClickHandler = () => {
    searchParams.delete(QueryString.Category);
    searchParams.delete(QueryString.TypeCamera);
    searchParams.delete(QueryString.Level);

    resetPriceStart();
    resetPriceEnd();
    setSearchParams(searchParams);
  };

  const categoryClickHandler = (value: CategoryValue) => {
    if (value === CategoryValue.Videocamera) {
      searchParams.delete(QueryString.TypeCamera, TypeCameraValue.Film);
      searchParams.delete(QueryString.TypeCamera, TypeCameraValue.Snapshot);
    }
    searchParams.set(QueryString.Category, value);
    searchParams.set(QueryString.Start, String(priceStart));
    searchParams.set(QueryString.End, String(priceEnd));

    setSearchParams(searchParams);
  };

  const typeClickHandler = (value: TypeCameraValue) => {
    if (searchParams.has(QueryString.TypeCamera, value)) {
      searchParams.delete(QueryString.TypeCamera, value);
    } else {
      searchParams.append(QueryString.TypeCamera, value);
    }
    // searchParams.set(QueryString.Start, String(priceStart));
    // searchParams.set(QueryString.End, String(priceEnd));
    setSearchParams(searchParams);
  };

  const levelClickHandler = (value: LevelValue) => {
    if (searchParams.has(QueryString.Level, value)) {
      searchParams.delete(QueryString.Level, value);
    } else {
      searchParams.append(QueryString.Level, value);
    }
    // searchParams.set(QueryString.Start, String(priceStart));
    // searchParams.set(QueryString.End, String(priceEnd));
    setSearchParams(searchParams);
  };

  //PRICE///////////////////////////////////////////////

  const inputStartChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (searchParams.get(QueryString.Start) !== null) {
      evt.target.placeholder = String(searchParams.get(QueryString.Start));
    }
    const valueInput = Number(evt.target.value);
    if (valueInput < 0) {
      evt.target.value = String(minPriceOfCatalog);
    }

    let valueStart = valueInput;
    if (valueStart !== 0 && valueStart < minPriceOfCatalog) {
      valueStart = minPriceOfCatalog;
      evt.target.value = String(minPriceOfCatalog);
    }

    const startPrice = searchParams.get(QueryString.End) !== null ? Number(searchParams.get(QueryString.End)) : maxPriceSorted;
    if (valueInput !== 0 && valueInput >= startPrice) {
      valueStart = startPrice;
      evt.target.value = String(startPrice);
    }

    setPriceStart(valueStart);
    // setMinPrice(valueStart);
    searchParams.set(QueryString.Start, String(valueStart));
    searchParams.set(QueryString.Page, '1');
    setCurrentPage(1);
    setSearchParams(searchParams);
    if (evt.target.value === '') {
      resetPriceStart();
    }
  };

  const inputEndChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {

    const valueInput = Number(evt.target.value);
    if (valueInput < 0) {
      evt.target.value = String(maxPriceOfCatalog);
    }

    let valueEnd = valueInput;
    if (valueEnd !== 0 && valueEnd > maxPriceOfCatalog) {
      // valueEnd = maxPriceSorted;
      // evt.target.value = String(maxPriceSorted);
      valueEnd = maxPriceOfCatalog;
      evt.target.value = String(maxPriceOfCatalog);
    }
    const endPrice = searchParams.get(QueryString.Start) !== null ? Number(searchParams.get(QueryString.Start)) : minPriceSorted;
    if (valueInput !== 0 && valueInput <= endPrice) {
      valueEnd = endPrice;
      evt.target.value = String(endPrice);
    }

    setPriceEnd(valueEnd);
    // setMaxPrice(valueEnd);
    searchParams.set(QueryString.End, String(valueEnd));
    searchParams.set(QueryString.Page, '1');
    setCurrentPage(1);
    setSearchParams(searchParams);

    if (evt.target.value === '') {
      resetPriceEnd();
    }
  };

  // console.log('_start ' + priceStart);
  // console.log('_end ' + priceEnd);

  dispatch(fetchCamerasByPriceAction([Number(priceStart), Number(priceEnd)]));
  const debouncedInputStartChangeHandler = debounce(inputStartChangeHandler, 1000);
  const debouncedInputEndChangeHandler = debounce(inputEndChangeHandler, 1000);


  return (
    <div className="catalog-filter" data-testid="catalogFilter-test">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>

        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="price"
                  placeholder={`${priceStart}`}
                  // placeholder={ searchParams.get(QueryString.Start) !== null ? String(searchParams.get(QueryString.Start)) : `${priceStart}`}
                  onChange={debouncedInputStartChangeHandler}
                  style={{ padding: '8px 10px' }}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  placeholder={`${priceEnd}`}
                  // placeholder={ searchParams.get(QueryString.End) !== null ? String(searchParams.get(QueryString.End)) : `${priceEnd}`}
                  onInput={debouncedInputEndChangeHandler}
                  style={{ padding: '8px 10px' }}
                />
              </label>
            </div>
          </div>
        </fieldset>

        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="photocamera"
                onChange={() => categoryClickHandler(CategoryValue.Photocamera)}
                checked={categoryParameter === CategoryValue.Photocamera}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="videocamera"
                onChange={() => categoryClickHandler(CategoryValue.Videocamera)}
                checked={categoryParameter === CategoryValue.Videocamera}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="digital"
                onChange={() => typeClickHandler(TypeCameraValue.Digital)}
                checked={typeParameter.includes(TypeCameraValue.Digital)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="film"
                onChange={() => typeClickHandler(TypeCameraValue.Film)}
                checked={typeParameter.includes(TypeCameraValue.Film)}
                disabled={isDisabled}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="snapshot"
                onChange={() => typeClickHandler(TypeCameraValue.Snapshot)}
                checked={typeParameter.includes(TypeCameraValue.Snapshot)}
                disabled={isDisabled}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="collection"
                onChange={() => typeClickHandler(TypeCameraValue.Collection)}
                checked={typeParameter.includes(TypeCameraValue.Collection)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="zero"
                onChange={() => levelClickHandler(LevelValue.Zero)}
                checked={searchParams.has(QueryString.Level, LevelValue.Zero)}

              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="non-professional"
                onChange={() => levelClickHandler(LevelValue.NonProfessional)}
                checked={searchParams.has(QueryString.Level, LevelValue.NonProfessional)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="professional"
                onChange={() => levelClickHandler(LevelValue.Professional)}
                checked={searchParams.has(QueryString.Level, LevelValue.Professional)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>

        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={onResetClickHandler}
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

const MemoizedCatalogFilter = React.memo(CatalogFilter);
export default MemoizedCatalogFilter;
