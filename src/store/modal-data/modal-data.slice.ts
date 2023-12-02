import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { BasketItemType, CameraType, ModalData } from '../../types/types';

const initialState: ModalData = {
  addItemToBasketStatus: false,
  successStatus: false,
  successType: 'newReview',
  isActive: false,
  modalData: null,
  addReviewStatus: false,
  removeFromBasketStatus: false,
};

export const modalData = createSlice({
  name: NameSpace.Modal,
  initialState,
  reducers: {
    setModalData: (state, action: PayloadAction<BasketItemType | CameraType>) => {
      state.modalData = action.payload;
    },
    setAddItemToBasketStatus: (state, action: PayloadAction<boolean>) => {
      state.successStatus = false;
      state.addReviewStatus = false;
      state.removeFromBasketStatus = false;
      state.addItemToBasketStatus = action.payload;
    },
    setSuccessStatus: (state, action: PayloadAction<boolean>) => {
      state.addItemToBasketStatus = false;
      state.addReviewStatus = false;
      state.removeFromBasketStatus = false;
      state.successStatus = action.payload;
    },
    setActiveStatus: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    setAddReviewStatus: (state, action: PayloadAction<boolean>) => {
      state.successStatus = false;
      state.addItemToBasketStatus = false;
      state.removeFromBasketStatus = false;
      state.addReviewStatus = action.payload;
    },
    setRemoveFromBasketStatus: (state, action: PayloadAction<boolean>) => {
      state.successStatus = false;
      state.addReviewStatus = false;
      state.addItemToBasketStatus = false;
      state.removeFromBasketStatus = action.payload;
    },
    setSuccessType: (state, action: PayloadAction<'newReview' | 'addToBasket' | 'purchase'>) => {
      state.successType = action.payload;
    },
  },
});

export const { setModalData, setAddItemToBasketStatus, setSuccessStatus, setActiveStatus, setAddReviewStatus, setRemoveFromBasketStatus, setSuccessType, } = modalData.actions;
