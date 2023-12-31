import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { State } from '../../types/types';
import { AppThunkDispatch , extractActionsTypes, makeFakeCamerasData} from '../../utils/mocks';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { APIRoute } from '../../const';
import { fetchCamerasAction } from './cameras-data.action';


describe('CamerasData async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStore = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({CAMERAS: {cameras: []}});
  });

  describe('fetchCamerasAction', () => {
    it('should dispatch "fetchCamerasAction.pending", "fetchCamerasAction.fullfilled" when server response 200', async () => {
      const mockCameras = makeFakeCamerasData();
      mockAxiosAdapter.onGet(APIRoute.Camera).reply(200, mockCameras);

      await store.dispatch(fetchCamerasAction());
      const emmitedAction = store.getActions();
      const extractedActionsTypes = extractActionsTypes(store.getActions());
      const fetchCamerasActionFullfilled = emmitedAction.at(1) as ReturnType<typeof fetchCamerasAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCamerasAction.pending.type,
        fetchCamerasAction.fulfilled.type,
      ]);

      expect(fetchCamerasActionFullfilled.payload).toEqual(mockCameras);
    });

    it('should dispatch "fetchCamerasAction.pending", "fetchCamerasAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Camera).reply(400, []);

      await store.dispatch(fetchCamerasAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCamerasAction.pending.type,
        fetchCamerasAction.rejected.type
      ]);
    });
  });
});
