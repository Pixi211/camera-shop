import { CameraCharacteristic, CategoryValue, LevelValue, TypeCameraValue } from '../const';
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

export const filterCameras = (cameras: CameraType[], type: string[], level: string[], category: string | null) => {
  let filteredCameras = cameras.slice();
  if (category) {
    filteredCameras = cameras.filter((camera) =>
      (category === CategoryValue.Photocamera && camera.category === CameraCharacteristic.Photocamera) ||
      (category === CategoryValue.Videocamera && camera.category === CameraCharacteristic.Videocamera));
  }

  if (type.length) {
    filteredCameras = filteredCameras.filter((camera) =>
      (type.includes(TypeCameraValue.Collection) && camera.type === CameraCharacteristic.Collection) ||
      (type.includes(TypeCameraValue.Digital) && camera.type === CameraCharacteristic.Digital) ||
      (type.includes(TypeCameraValue.Film) && camera.type === CameraCharacteristic.Film) ||
      (type.includes(TypeCameraValue.Snapshot) && camera.type === CameraCharacteristic.Snapshot));
  }

  if (level.length) {
    filteredCameras = filteredCameras.filter((camera) =>
      (level.includes(LevelValue.Zero) && camera.level === CameraCharacteristic.Zero) ||
      (level.includes(LevelValue.NonProfessional) && camera.level === CameraCharacteristic.NonProfessional) ||
      (level.includes(LevelValue.Professional) && camera.level === CameraCharacteristic.Professional));
  }

  return filteredCameras;
};

export const getMinMaxPrices = (cameras: CameraType[]): number[] => {
  const prices: number[] = [];
  cameras.forEach((camera) => prices.push(camera.price));
  const minPrice = Math.min.apply(null, prices);
  const maxPrice = Math.max.apply(null, prices);
  return [minPrice, maxPrice];
};

export const getCamerasByPrice = (cameras: CameraType[], minPrice: number | null, maxPrice: number | null): CameraType[] => {
  if (minPrice === null || maxPrice === null) {
    return [];
  }
  const camerasByPrice = cameras.filter((camera) => camera.price >= minPrice && camera.price <= maxPrice);
  return camerasByPrice;
};
