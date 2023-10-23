import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CameraType, ModalData } from '../../types/types';

const initialState: ModalData = {
  addItemToBasketStatus: false,
  successStatus: false,
  successType: 'newReview',
  isActive: false,
  modalData: null,
  addReviewStatus: false,
};

export const modalData = createSlice({
  name: NameSpace.Modal,
  initialState,
  reducers: {
    setModalData: (state, action: PayloadAction<CameraType>) => {
      state.modalData = action.payload;
    },
    setAddItemToBasketStatus: (state, action: PayloadAction<boolean>) => {
      state.successStatus = false;
      state.addReviewStatus = false;
      state.addItemToBasketStatus = action.payload;
    },
    setSuccessStatus: (state, action: PayloadAction<boolean>) => {
      state.addItemToBasketStatus = false;
      state.addReviewStatus = false;
      state.successStatus = action.payload;
    },
    setActiveStatus: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    setAddReviewStatus: (state, action: PayloadAction<boolean>) => {
      state.successStatus = false;
      state.addItemToBasketStatus = false;
      state.addReviewStatus = action.payload;
    },
    setSuccessType: (state, action: PayloadAction<'newReview' | 'addToBasket' | 'purchase'>) => {
      state.successType = action.payload;
    },
  },
});

export const { setModalData, setAddItemToBasketStatus, setSuccessStatus, setActiveStatus, setAddReviewStatus, setSuccessType } = modalData.actions;
