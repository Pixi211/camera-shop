import { createAsyncThunk } from '@reduxjs/toolkit';
import { PromoCameraType } from '../../types/types';
import { AppDispatch, State } from '../../types/types';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';


export const fetchPromosAction = createAsyncThunk<PromoCameraType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async (_arg, { extra: api }): Promise<PromoCameraType[]> => {
    const {data} = await api.get<PromoCameraType[]>(APIRoute.Promo);
    return data;
  }

);
