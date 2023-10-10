
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CamerasListType } from '../../types/types';
import { AppDispatch, State } from '../../types/types';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';


export const fetchCamerasAction = createAsyncThunk<CamerasListType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (_arg, { extra: api }) : Promise<CamerasListType> => {
    const {data} = await api.get<CamerasListType>(APIRoute.Camera);
    return data;
  }

);
