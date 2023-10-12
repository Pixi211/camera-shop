import { createSlice } from '@reduxjs/toolkit';
import { CurrentData } from '../../types/types';
import { NameSpace } from '../../const';
import { fetchCurrentAction } from './current-item-data.action';


const initialState: CurrentData = {
  currentItemData: null,
};

export const currentData = createSlice({
  name: NameSpace.Current,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentAction.fulfilled, (state, action) => {
        state.currentItemData = action.payload;
      });
  }
});
