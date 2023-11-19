import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CamerasData, SortType, SortDirection } from '../../types/types';
import { NameSpace } from '../../const';
import { fetchCamerasAction } from './cameras-data.action';


const initialState: CamerasData = {
  cameras: [],
  // camerasByPrice: [],
  minPrice: null,
  maxPrice: null,
  hasError: false,
  isDataLoading: false,
  sortType: null,
  sortDirection: null
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
    },
    setMinPrice: (state, action: PayloadAction<number | null>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number | null>) => {
      state.maxPrice = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.cameras = action.payload;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isDataLoading = false;
        state.hasError = true;
      });
    // .addCase(fetchCamerasByPriceAction.fulfilled, (state, action) => {
    //   state.camerasByPrice = action.payload;
    // });
  }
});

export const { setSortType, setSortDirection,
  setMinPrice, setMaxPrice
} = camerasData.actions;
