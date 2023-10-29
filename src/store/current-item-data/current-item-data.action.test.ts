import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { createAPI } from '../../services/api';
import { AppThunkDispatch, extractActionsTypes, makeFakeCamerasData, makeFakeReviews, makeFakeCurrentCameraData } from '../../utils/mocks';
import { State } from '../../types/types';
import { APIRoute } from '../../const';
import { fetchCurrentAction, fetchReviewsAction, fetchSimilarAction, sendReviewAction } from './current-item-data.action';
import { UserReview } from '../../types/types';


describe('Current Data async actions', () => {

  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStore = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({CURRENT: {
      similarCameras: [],
      currentItemData: undefined,
      reviews: []
    }});
  });

  describe('fetchCurrentAction' , () => {
    it('should dispatch "fetchCurrentAction.pending", "fetchCurrentAction.fullfilled" when server response 200', async () => {
      const mockCurrent = makeFakeCurrentCameraData();
      mockAxiosAdapter.onGet(`${APIRoute.Camera}/${mockCurrent.id}`).reply(200, mockCurrent);

      await store.dispatch(fetchCurrentAction(mockCurrent.id));

      const emittedAction = store.getActions();
      const extractedActionsTypes = extractActionsTypes(store.getActions());
      const fetchCurrentActionFullfilled = emittedAction.at(1) as ReturnType<typeof fetchCurrentAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCurrentAction.pending.type,
        fetchCurrentAction.fulfilled.type
      ]);

      expect(fetchCurrentActionFullfilled.payload).toEqual(mockCurrent);
    });

    it('should dispatch "fetchCurrentAction.pending", "fetchCurrentAction.rejected" when server response 400', async () => {
      const mockCurrent = makeFakeCurrentCameraData();
      mockAxiosAdapter.onGet(`${APIRoute.Camera}/${mockCurrent.id}`).reply(400, []);

      await store.dispatch(fetchCurrentAction(mockCurrent.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCurrentAction.pending.type,
        fetchCurrentAction.rejected.type
      ]);
    });
  });

  describe('fetchSimilarAction' , () => {
    it('should dispatch "fetchSimilarAction.pending", "fetchSimilarAction.fullfilled" when server response 200', async () => {
      const mockCurrent = makeFakeCurrentCameraData();
      const mockSimilars = makeFakeCamerasData();
      mockAxiosAdapter.onGet(`${APIRoute.Camera}/${mockCurrent.id}/${APIRoute.Similar}`).reply(200, mockSimilars);

      await store.dispatch(fetchSimilarAction(mockCurrent.id));
      const emittedAction = store.getActions();
      const extractedActionsTypes = extractActionsTypes(store.getActions());
      const fetchSimilarActionFullfilled = emittedAction.at(1) as ReturnType<typeof fetchSimilarAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarAction.pending.type,
        fetchSimilarAction.fulfilled.type
      ]);

      expect(fetchSimilarActionFullfilled.payload).toEqual(mockSimilars);
    });

    it('should dispatch "fetchSimilarAction.pending", "fetchSimilarAction.rejected" when server response 400', async () => {
      const mockCurrent = makeFakeCurrentCameraData();
      mockAxiosAdapter.onGet(`${APIRoute.Camera}/${mockCurrent.id}${APIRoute.Similar}`).reply(400, []);

      await store.dispatch(fetchSimilarAction(mockCurrent.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilarAction.pending.type,
        fetchSimilarAction.rejected.type
      ]);
    });
  });

  describe('fetchReviewsAction' , () => {
    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.fullfilled" when server response 200', async () => {
      const mockCurrent = makeFakeCurrentCameraData();
      const mockReviews = makeFakeReviews();
      mockAxiosAdapter.onGet(`${APIRoute.Camera}/${mockCurrent.id}/${APIRoute.Review}`).reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction(mockCurrent.id));
      const emittedAction = store.getActions();
      const extractedActionsTypes = extractActionsTypes(store.getActions());
      const fetchReviewsActionFullfilled = emittedAction.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type
      ]);

      expect(fetchReviewsActionFullfilled.payload).toEqual(mockReviews);
    });

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected" when server response 400', async () => {
      const mockCurrent = makeFakeCurrentCameraData();
      mockAxiosAdapter.onGet(`${APIRoute.Camera}/${mockCurrent.id}/${APIRoute.Review}`).reply(400, []);

      await store.dispatch(fetchReviewsAction(mockCurrent.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type
      ]);
    });
  });

  describe('sendReviewAction', () => {
    it('should dispatch "sendReviewAction.pending", "sendReviewAction.fulfilled" when server response 200', async() => {
      const fakeReview: UserReview = { cameraId: 1, userName: 'Ivan', advantage: 'abc', disadvantage: 'cba', review: 'text', rating: 4 };
      mockAxiosAdapter.onPost(APIRoute.Review).reply(200, []);

      await store.dispatch(sendReviewAction(fakeReview));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        sendReviewAction.pending.type,
        sendReviewAction.fulfilled.type,
      ]);
    });

    it('should dispatch "sendReviewAction.pending", "sendReviewAction.rejected" when server response 400', async () => {
      const fakeReview: UserReview = { cameraId: 1, userName: 'Ivan', advantage: 'abc', disadvantage: 'cba', review: 'text', rating: 4 };
      mockAxiosAdapter.onPost(APIRoute.Review).reply(400, []);

      await store.dispatch(sendReviewAction(fakeReview));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        sendReviewAction.pending.type,
        sendReviewAction.rejected.type
      ]);
    });
  });
});
