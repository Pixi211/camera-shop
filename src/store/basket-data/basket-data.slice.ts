import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BasketData, BasketItemType } from '../../types/types';
import { NameSpace } from '../../const';


const initialState: BasketData = {
  basketItems: JSON.parse(localStorage.getItem('items') || '[]') as BasketItemType[],
  itemForBasket: null,
};

export const basketData = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<BasketItemType>) => {
      state.itemForBasket = action.payload;
      const duplicateIndex = state.basketItems.findIndex((item) => item.id === action.payload.id);
      if (duplicateIndex !== -1 && state.basketItems[duplicateIndex].amount !== 99) {
        state.basketItems[duplicateIndex].amount++;
      } else {
        state.basketItems.push(action.payload);
      }
      localStorage.setItem('items', JSON.stringify(state.basketItems));
    },
    changeAmountInBasket: (state, action: PayloadAction<[number, number]>) => {
      const [currentItemId, newAmount] = action.payload;
      const indexToChange = state.basketItems.findIndex((item) => item.id === currentItemId);
      state.basketItems[indexToChange].amount = newAmount;
      localStorage.setItem('items', JSON.stringify(state.basketItems));
    },
    deleteFromBasket: (state, action: PayloadAction<BasketItemType>) => {//передать только id?
      const idToDelete = action.payload.id;

      const indexToDelete = state.basketItems.findIndex((item) => item.id === idToDelete);
      state.basketItems.splice(indexToDelete, 1);
      localStorage.setItem('items', JSON.stringify(state.basketItems));
    },
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(fetchCamerasAction.pending, (state) => {
  //       state.isDataLoading = true;
  //     })
  //     .addCase(fetchCamerasAction.fulfilled, (state, action) => {
  //       state.isDataLoading = false;
  //       state.cameras = action.payload;
  //     })
  //     .addCase(fetchCamerasAction.rejected, (state) => {
  //       state.isDataLoading = false;
  //       state.hasError = true;
  //     });
  // }
});

export const { addToBasket, changeAmountInBasket,
  deleteFromBasket,
} = basketData.actions;
