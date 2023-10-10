import { createSlice } from '@reduxjs/toolkit';
import { CamerasData } from '../../types/types';
import { NameSpace } from '../../const';
import { fetchCamerasAction } from './cameras-data.action';


const initialState: CamerasData = {
  cameras: [],
  hasError: false,
  isDataLoading: false,
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending , (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled , (state, action) => {
        state.isDataLoading = false;
        state.cameras = action.payload;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isDataLoading = false;
        state.hasError = true;
      });
  }
});