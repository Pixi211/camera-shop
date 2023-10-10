import { createSlice } from '@reduxjs/toolkit';
import { PromoData } from '../../types/types';
import { NameSpace } from '../../const';
import { fetchPromosAction } from './promo-data.action';

const initialState : PromoData = {
  promos : [],
  hasError : false,
};


export const promoData = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromosAction.fulfilled, (state, action) => {
        state.promos = action.payload;
      })
      .addCase(fetchPromosAction.rejected, (state) => {
        state.hasError = true;
      });
  }
});
