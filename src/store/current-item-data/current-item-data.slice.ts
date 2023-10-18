import { createSlice } from '@reduxjs/toolkit';
import { CurrentData } from '../../types/types';
import { NameSpace } from '../../const';
import { fetchCurrentAction, fetchReviewsAction, fetchSimilarAction } from './current-item-data.action';


const initialState: CurrentData = {
  currentItemData: null,
  similarCameras: [],
  reviews: [],
};

export const currentData = createSlice({
  name: NameSpace.Current,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentAction.fulfilled, (state, action) => {
        state.currentItemData = action.payload;
      })
      .addCase(fetchSimilarAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});
