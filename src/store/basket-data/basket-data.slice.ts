import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BasketData, BasketItemType } from '../../types/types';
import { NameSpace } from '../../const';
import { fetchPromoCodeAction } from './basket-data.action';


const initialState: BasketData = {
  basketItems: JSON.parse(localStorage.getItem('items') || '[]') as BasketItemType[],
  itemForBasket: null,
  isPromoCodeValid: false,
  isPromoCodeInvalid: false,
  promoCodeName: null,
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
    deleteFromBasket: (state, action: PayloadAction<BasketItemType>) => {
      const idToDelete = action.payload.id;

      const indexToDelete = state.basketItems.findIndex((item) => item.id === idToDelete);
      state.basketItems.splice(indexToDelete, 1);
      localStorage.setItem('items', JSON.stringify(state.basketItems));
    },
    resetBasket: (state) => {
      state.basketItems = [];
      state.isPromoCodeInvalid = false;
      state.isPromoCodeValid = false;
      localStorage.setItem('items', '[]');
      localStorage.setItem('discount', '0');
    },
    setIsPromoCodeValid: (state, action: PayloadAction<boolean>) => {
      state.isPromoCodeValid = action.payload;
    },
    setIsPromoCodeInvalid: (state, action: PayloadAction<boolean>) => {
      state.isPromoCodeInvalid = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPromoCodeAction.fulfilled, (state, action) => {
        state.promoCodeName = action.payload.value;
        state.isPromoCodeValid = true;
        state.isPromoCodeInvalid = false;
      })
      .addCase(fetchPromoCodeAction.pending, (state) => {
        state.isPromoCodeInvalid = false;
        state.isPromoCodeValid = false;
      })
      .addCase(fetchPromoCodeAction.rejected, (state) => {
        state.isPromoCodeInvalid = true;
        state.isPromoCodeValid = false;
      });
  }
});

export const { addToBasket, changeAmountInBasket,
  deleteFromBasket, resetBasket, setIsPromoCodeValid, setIsPromoCodeInvalid
} = basketData.actions;
