
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CameraType } from '../../types/types';
import { AppDispatch, State } from '../../types/types';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { toast } from 'react-toastify';


export const fetchCamerasAction = createAsyncThunk<CameraType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (_arg, { extra: api }): Promise<CameraType[]> => {
    try {
      const { data } = await api.get<CameraType[]>(APIRoute.Camera);
      return data;
    } catch (error) {
      toast.error('Не удается загрузить каталог');
      throw error;
    }
  }

);

// export const fetchCamerasByPriceAction = createAsyncThunk<CameraType[], [number, number], {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'data/fetchCamerasByPrice',
//   async (_args, { extra: api }): Promise<CameraType[]> => {
//     try {
//       const { data } = await api.get<CameraType[]>(`${APIRoute.Camera}?price_gte=${_args[0]}&price_lte=${_args[1]}`);
//       return data;
//     } catch (error) {
//       toast.error('Не удается загрузить каталог');
//       throw error;
//     }
//   }

// );
