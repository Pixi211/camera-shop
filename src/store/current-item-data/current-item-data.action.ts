
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CameraType, Review, UserReview } from '../../types/types';
import { AppDispatch, State } from '../../types/types';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { toast } from 'react-toastify';


export const fetchCurrentAction = createAsyncThunk<CameraType, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCurrent',
  async (id, { extra: api }): Promise<CameraType> => {
    try {
      const { data } = await api.get<CameraType>(`${APIRoute.Camera}/${id}`);
      return data;
    } catch (error) {
      toast.error('Не удается загрузить товар');
      throw error;
    }
  }

);

export const fetchSimilarAction = createAsyncThunk<CameraType[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilar',
  async (id, { extra: api }): Promise<CameraType[]> => {
    try {
      const { data } = await api.get<CameraType[]>(`${APIRoute.Camera}/${id}/${APIRoute.Similar}`);
      return data;
    } catch (error) {
      toast.error('Не удается загрузить похожие товары');
      throw error;
    }
  }
);

export const fetchReviewsAction = createAsyncThunk<Review[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (id, { extra: api }): Promise<Review[]> => {
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Camera}/${id}/${APIRoute.Review}`);
      const sortedByDate = data.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
      return sortedByDate;
    } catch (error) {
      toast.error('Не удается загрузить отзывы');
      throw error;
    }
  }
);

export const sendReviewAction = createAsyncThunk<void, UserReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/sendReview',
  async (userInfo, { extra: api }) => {
    try {
      await api.post<Review[]>(APIRoute.Review, userInfo);
    } catch (error) {
      toast.error('Не удается отправить отзыв');
      throw error;
    }
  }
);

