import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { State } from '..';
import { AppThunkDispatch, extractActionsTypes } from '../../utils/mocks';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { APIRoute } from '../../const';
import { fetchPromoCodeAction, postOrderAction } from './basket-data.action';
import { Order } from '../../types/types';
import { resetBasket } from './basket-data.slice';
import { setActiveStatus, setSuccessType, setSuccessStatus } from '../modal-data/modal-data.slice';


describe('Cameras Data async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStore = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStore>;


  beforeEach(() => {
    store = mockStore({
      BASKET: {
        basketItems: [],
        itemForBasket: null,
        isPromoCodeValid: false,
        isPromoCodeInvalid: false,
        promoCodeName: null,
      }
    });
  });

  describe('fetchPromoCodeAction', () => {
    it('should dispatch "fetchPromoCodeAction.pending", "fetchPromoCodeAction.fullfilled" when server response 200', async () => {
      const actionPayload = 'cameras-333';
      const mockServerReply = 5;
      const mockReturnedData = { data: mockServerReply, value: actionPayload };
      mockAxiosAdapter.onPost(APIRoute.Coupon).reply(200, mockServerReply);

      await store.dispatch(fetchPromoCodeAction(actionPayload));
      const emmitedAction = store.getActions();
      const extractedActionsTypes = extractActionsTypes(store.getActions());
      const fetchPromoCodeActionFullfilled = emmitedAction.at(1) as ReturnType<typeof fetchPromoCodeAction.fulfilled>;

      expect(fetchPromoCodeActionFullfilled.payload).toEqual(mockReturnedData);
      expect(extractedActionsTypes).toEqual([
        fetchPromoCodeAction.pending.type,
        fetchPromoCodeAction.fulfilled.type
      ]);
    });

    it('should dispatch "fetchCouponAction.pending", "fetchCouponAction.rejected" when server response 400', async () => {
      const actionPayload = 'camera-12';
      mockAxiosAdapter.onPost(APIRoute.Coupon).reply(400, []);

      await store.dispatch(fetchPromoCodeAction(actionPayload));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromoCodeAction.pending.type,
        fetchPromoCodeAction.rejected.type
      ]);
    });

  });

  describe('postOrderAction', () => {
    it('should dispatch "postOrderAction.pending", "postOrderAction.fullfilled" when server response 200', async () => {
      const actionPayload: Order = {
        camerasIds: [1, 2, 3],
        coupon: 'cameras-333'
      };
      mockAxiosAdapter.onPost(APIRoute.Order).reply(200, []);
      await store.dispatch(postOrderAction(actionPayload));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postOrderAction.pending.type,
        resetBasket.type,
        setActiveStatus.type,
        setSuccessType.type,
        setSuccessStatus.type,
        postOrderAction.fulfilled.type
      ]);
    });
    it('should dispatch "postOrderAction.pending", "sendOrderAction.rejected" when server response 400', async () => {
      const actionPayload: Order = {
        camerasIds: [1, 2, 3],
        coupon: 'cameras-333'
      };
      mockAxiosAdapter.onPost(APIRoute.Order).reply(400, []);
      await store.dispatch(postOrderAction(actionPayload));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postOrderAction.pending.type,
        postOrderAction.rejected.type
      ]);
    });
  });

});
