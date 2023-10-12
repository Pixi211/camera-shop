import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CameraType, ModalData } from '../../types/types';

const initialState: ModalData = {
  addItemToBasketStatus: false,
  successStatus: false,
  isActive: false,
  modalData: null,
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
      state.addItemToBasketStatus = action.payload;
    },
    setSuccessStatus: (state, action: PayloadAction<boolean>) => {
      state.addItemToBasketStatus = false;
      state.successStatus = action.payload;
    },
    setActiveStatus: (state , action:PayloadAction<boolean>) => {
      state.isActive = action.payload;
    }
  },
});

export const {setModalData, setAddItemToBasketStatus, setSuccessStatus , setActiveStatus} = modalData.actions;
