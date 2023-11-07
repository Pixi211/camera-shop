import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CamerasData, SortType, SortDirection } from '../../types/types';
import { NameSpace } from '../../const';
import { fetchCamerasAction } from './cameras-data.action';


const initialState: CamerasData = {
  cameras: [],
  hasError: false,
  isDataLoading: false,
  sortType: 'noSorting',
  sortDirection: 'noSorting'
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
    }
  },
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

export const { setSortType, setSortDirection } = camerasData.actions;
