import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { createAPI } from '../../services/api';
import { AppThunkDispatch, extractActionsTypes, makeFakePromos } from '../../utils/mocks';
import { State } from '../../types/types';
import { APIRoute } from '../../const';
import { fetchPromosAction } from './promo-data.action';

describe('Promos async' , () => {

  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStore = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({PROMO: {
      promos: [],
    }});
  });

  describe('fetchPromosActions', () => {
    it('should dispatch "fetchPromosAction.pending" and "fetchPromosAction.fullfilled" when server response 200', async () => {
      const mockPromos = makeFakePromos();
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromos);

      await store.dispatch(fetchPromosAction());

      const emmitedAction = store.getActions();
      const extractedActionsTypes = extractActionsTypes(store.getActions());
      const fetchCamerasActionFullfilled = emmitedAction.at(1) as ReturnType<typeof fetchPromosAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchPromosAction.pending.type,
        fetchPromosAction.fulfilled.type,
      ]);

      expect(fetchCamerasActionFullfilled.payload).toEqual(mockPromos);
    });

    it('should dispatch "fetchPromosAction.pending" and "fetchPromosAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(400, []);

      await store.dispatch(fetchPromosAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromosAction.pending.type,
        fetchPromosAction.rejected.type
      ]);
    });


  });
});
