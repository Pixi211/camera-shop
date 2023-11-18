import { CategoryValue, LevelValue, TypeCameraValue } from '../const';
import { CameraType, SortType, SortDirection } from '../types/types';
import { ChangeEvent } from 'react';

type DebouncedFunction<F extends (evt: ChangeEvent<HTMLInputElement>) => void> = (
  ...args: Parameters<F>
) => void;

export function debounce<F extends (evt: ChangeEvent<HTMLInputElement>) => void>(
  func: F,
  delay: number
): DebouncedFunction<F> {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

export const sortCameras = (cameras: CameraType[], sortType: SortType, sortDirection: SortDirection) => {
  if (sortType === sortDirection) {
    return cameras;
  } else if (sortType === 'Price' && sortDirection === 'Down') {
    return cameras.sort((firstCamera, secondCamera) => secondCamera.price - firstCamera.price);
  } else if (sortType === 'Price' && sortDirection === 'Up') {
    return cameras.sort((firstCamera, secondCamera) => firstCamera.price - secondCamera.price);
  } else if (sortType === 'Popular' && sortDirection === 'Down') {
    return cameras.sort((firstCamera, secondCamera) => secondCamera.rating - firstCamera.rating);
  } else {
    return cameras.sort((firstCamera, secondCamera) => firstCamera.rating - secondCamera.rating);
  }
};
//все строки забить в enum
export const filterCameras = (cameras: CameraType[], type: string[], level: string[], category: string | null) => {
  // const cameras = cameras.slice(); //нужно для filter копировать?
  let filteredCameras = cameras.slice();
  if (category) {
    filteredCameras = cameras.filter((camera) =>
      (category === CategoryValue.Photocamera && camera.category === 'Фотоаппарат') ||
      (category === CategoryValue.Videocamera && camera.category === 'Видеокамера'));
  }

  if (type.length) {
    filteredCameras = filteredCameras.filter((camera) =>
      (type.includes(TypeCameraValue.Collection) && camera.type === 'Коллекционная') ||
      (type.includes(TypeCameraValue.Digital) && camera.type === 'Цифровая') ||
      (type.includes(TypeCameraValue.Film) && camera.type === 'Плёночная') ||
      (type.includes(TypeCameraValue.Snapshot) && camera.type === 'Моментальная'));
  }

  if (level.length) {
    filteredCameras = filteredCameras.filter((camera) =>
      (level.includes(LevelValue.Zero) && camera.level === 'Нулевой') ||
      (level.includes(LevelValue.NonProfessional) && camera.level === 'Любительский') ||
      (level.includes(LevelValue.Professional) && camera.level === 'Профессиональный'));
  }

  return filteredCameras;
};

export const getMinMaxPrices = (cameras: CameraType[]): number[] => {
  const prices: number[] = [];
  cameras.forEach((camera) => prices.push(camera.price));
  const minPrice = Math.min.apply(null, prices);
  const maxPrice = Math.max.apply(null,prices);
  return [minPrice, maxPrice];
};


