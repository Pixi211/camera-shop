import { Action } from 'redux';
import { name, datatype, lorem, image, commerce } from 'faker';
import { createAPI } from '../services/api';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { CameraType, Category, Level, State, Type, SuccessType, Review } from '../types/types';
import { PromoCameraType } from '../types/types';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

const TypeValues: Type[] = ['Коллекционная', 'Моментальная', 'Цифровая', 'Плёночная'];
const LevelValues: Level[] = ['Нулевой', 'Любительский', 'Профессиональный'];
const CategoryValues: Category[] = ['Видеокамера', 'Фотоаппарат'];

function getRandomElement<T>(arr: T[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export const makeFakeCurrentCameraData = (): CameraType => ({
  id: datatype.number(),
  name: name.firstName(),
  vendorCode: datatype.uuid(),
  type: getRandomElement(TypeValues),
  category: getRandomElement(CategoryValues),
  description: lorem.sentence(),
  level: getRandomElement(LevelValues),
  price: parseFloat(commerce.price()),
  rating: datatype.number({ min: 1, max: 5 }),
  reviewCount: datatype.number(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
});


export const makeFakeCamerasData = (): CameraType[] => (
  new Array(7).fill(null).map(() => (
    makeFakeCurrentCameraData()
  ))
);

export const makeFakeSuccessType = (): SuccessType => {
  const successTypeValues: SuccessType[] = ['newReview', 'addToBasket', 'purchase'];
  const rand = Math.floor(Math.random() * successTypeValues.length);
  return (successTypeValues[rand]);
};

export const makeFakeReview = (): Review => ({
  id: datatype.uuid(),
  createAt: datatype.datetime.toString(),
  cameraId: datatype.number(),
  userName: name.firstName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.sentences(),
  rating: datatype.number({ min: 1, max: 5 }),
});

export const makeFakeReviews = (): Review[] => (
  new Array(8).fill(null).map(() => (
    makeFakeReview()
  ))
);

export const makeFakePromos = (): PromoCameraType[] => (
  new Array(3).fill(null).map(() => (
    {
      id: datatype.number(),
      name: name.firstName(),
      previewImg: image.imageUrl(),
      previewImg2x: image.imageUrl(),
      previewImgWebp: image.imageUrl(),
      previewImgWebp2x: image.imageUrl(),
    }
  ))
);
