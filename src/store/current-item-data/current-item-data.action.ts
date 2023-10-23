
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CameraType, CamerasListType, Review, UserReview } from '../../types/types';
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

export const fetchSimilarAction = createAsyncThunk<CamerasListType, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilar',
  async (id, { extra: api }) : Promise<CamerasListType> => {
    const {data} = await api.get<CamerasListType>(`${APIRoute.Camera}/${id}/${APIRoute.Similar}`);
    return data;
  }

);

export const fetchReviewsAction = createAsyncThunk<Review[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (id, { extra: api }) : Promise<Review[]> => {
    const {data} = await api.get<Review[]>(`${APIRoute.Camera}/${id}/${APIRoute.Review}`);
    const sortedByDate = data.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
    return sortedByDate;
  }

);

export const sendReviewAction = createAsyncThunk<void, UserReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/sendReview',
  async (userInfo, { extra: api }) => {
    await api.post<Review[]>(APIRoute.Review , userInfo);
  }
);

