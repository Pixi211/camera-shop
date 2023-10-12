import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { promoData } from './promo-data/promo-data.slice';
import { camerasData } from './cameras-data/cameras-data.slice';
import { modalData } from './modal-data/modal-data.slice';
import { currentData } from './current-item-data/current-item-data.slice';


export const rootReducer = combineReducers({
  [NameSpace.Promo]: promoData.reducer,
  [NameSpace.Cameras]: camerasData.reducer,
  [NameSpace.Modal]: modalData.reducer,
  [NameSpace.Current]: currentData.reducer,
});
