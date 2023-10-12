
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CameraType } from '../../types/types';
import { AppDispatch, State } from '../../types/types';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';


export const fetchCurrentAction = createAsyncThunk<CameraType, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCurrent',
  async (id, { extra: api }) : Promise<CameraType> => {
    const {data} = await api.get<CameraType>(`${APIRoute.Camera}/${id}`);
    return data;
  }

);
