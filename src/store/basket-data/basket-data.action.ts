import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '..';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { resetBasket } from './basket-data.slice';
import { Order } from '../../types/types';
import { toast } from 'react-toastify';
import { setActiveStatus, setSuccessStatus, setSuccessType } from '../modal-data/modal-data.slice';


export const postOrderAction = createAsyncThunk<void, Order, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>('basket/postOrderAction',
  async (order, { dispatch, extra: api }) => {
    try {
      await api.post<Order>(APIRoute.Order, order);
      dispatch(resetBasket());
      dispatch(setActiveStatus(true));
      dispatch(setSuccessType('purchase'));
      dispatch(setSuccessStatus(true));
      document.body.style.overflow = 'hidden';
    } catch (error) {
      toast.error('Не удается оформить заказ');
      throw error;
    }
  }
);

export const fetchPromoCodeAction = createAsyncThunk<{ data: number; value: string | null }, string | null, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>('basket/fetchPromoCodeAction',
  async (value, { extra: api }) => {
    const { data } = await api.post<number>(APIRoute.Coupon,
      {
        'coupon': value,
      }
    );
    return { data, value };
  });
