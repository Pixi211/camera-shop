import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CategoryValue, LevelValue, QueryString, TypeCameraValue } from '../../const';

function CatalogFilter(): JSX.Element {
  let isDisabled = false;
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParameter = searchParams.get(QueryString.Category);
  const typeParameter = searchParams.getAll(QueryString.TypeCamera);


  if (searchParams.has(QueryString.Category, CategoryValue.Videocamera)) {
    isDisabled = true;
  } else {
    isDisabled = false;
  }

  const onResetClickHandler = () => {
    searchParams.delete(QueryString.Category);
    searchParams.delete(QueryString.TypeCamera);
    searchParams.delete(QueryString.Level);
    setSearchParams(searchParams);
  };

  const categoryClickHandler = (value: CategoryValue) => {
    if (value === CategoryValue.Videocamera) {
      searchParams.delete(QueryString.TypeCamera, TypeCameraValue.Film);
      searchParams.delete(QueryString.TypeCamera, TypeCameraValue.Snapshot);
    }
    // searchParams.set(QueryString.Sort, String(searchParams.get(QueryString.Sort)));
    // searchParams.set(QueryString.Direction, String(searchParams.get(QueryString.Direction)));
    // searchParams.set(QueryString.Page, String(searchParams.get(QueryString.Page))); //?
    searchParams.set(QueryString.Category, value);
    setSearchParams(searchParams);
  };

  const typeClickHandler = (value: TypeCameraValue) => {
    if (searchParams.has(QueryString.TypeCamera, value)) {
      searchParams.delete(QueryString.TypeCamera, value);
    } else {
      searchParams.append(QueryString.TypeCamera, value);
    }
    setSearchParams(searchParams);
  };

  const levelClickHandler = (value: LevelValue) => {
    if (searchParams.has(QueryString.Level, value)) {
      searchParams.delete(QueryString.Level, value);
    } else {
      searchParams.append(QueryString.Level, value);
    }
    setSearchParams(searchParams);
  };

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
                  placeholder="от"
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  placeholder="до"
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
