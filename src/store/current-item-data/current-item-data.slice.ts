import { createSlice } from '@reduxjs/toolkit';
import { CurrentData } from '../../types/types';
import { NameSpace } from '../../const';
import { fetchCurrentAction, fetchReviewsAction, fetchSimilarAction } from './current-item-data.action';


const initialState: CurrentData = {
  currentItemData: null,
  similarCameras: [],
  reviews: [],
  isCurrentDataLoading: false,
  isSimilarsLoading: false,
  isReviewsLoading: false,
};

export const currentData = createSlice({
  name: NameSpace.Current,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentAction.pending, (state) => {
        state.isCurrentDataLoading = true;
      })
      .addCase(fetchCurrentAction.fulfilled, (state, action) => {
        state.isCurrentDataLoading = false;
        state.currentItemData = action.payload;
      })
      .addCase(fetchSimilarAction.pending, (state) => {
        state.isSimilarsLoading = true;
      })
      .addCase(fetchSimilarAction.fulfilled, (state, action) => {
        state.isSimilarsLoading = false;
        state.similarCameras = action.payload;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.isReviewsLoading = false;
        state.reviews = action.payload;
      });
  }
});
