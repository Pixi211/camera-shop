import { BasketData } from '../../types/types';
import { makeFakeBasketItemsData } from '../../utils/mocks';
import { fetchCouponAction, fetchPromoCodeAction } from './basket-data.action';
import { addToBasket, basketData, changeAmountInBasket, deleteFromBasket, resetBasket, setIsPromoCodeInvalid, setIsPromoCodeValid } from './basket-data.slice';


describe('Basket slice ', () => {
  const initialState: BasketData = {
    basketItems: [],
    itemForBasket: null,
    isPromoCodeValid: false,
    isPromoCodeInvalid: false,
    promoCodeName: null,
  };

  const mockBasketData = makeFakeBasketItemsData();


  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = basketData.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should retun default initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = basketData.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);

  });

  it('should add new array element to "basketItems"', () => {
    const actionPayload = mockBasketData[0];
    const expectedState = { ...initialState, basketItems: [mockBasketData[0]], itemForBasket: mockBasketData[0] };

    const result = basketData.reducer(initialState, addToBasket(actionPayload));

    expect(result).toEqual(expectedState);
  });

  it('should delete array element from "basketItems"', () => {
    const state = { ...initialState, itemForBasket: mockBasketData[0], basketItems: mockBasketData };
    const expectedMock = mockBasketData.filter((item) => item.id !== mockBasketData[0].id);
    const expectedState = { ...state, basketItems: expectedMock };

    const result = basketData.reducer(state, deleteFromBasket(mockBasketData[0]));

    expect(result).toEqual(expectedState);
  });

  it('should change amount in array', () => {
    const actionPayload: [number, number] = [mockBasketData[3].id, 7];
    const state = { ...initialState, basketItems: mockBasketData };
    const itemToChange = state.basketItems.find((elem) => elem.id === actionPayload[0]);

    const newObject = {
      ...itemToChange,
      amount: 7,
    };
    const expectedMock = [...state.basketItems.map((item) => {
      if (item.id === actionPayload[0]) {
        return newObject;
      }
      return item;
    })];


    const expectedState = { ...initialState, basketItems: expectedMock };

    const result = basketData.reducer(state, changeAmountInBasket(actionPayload));

    expect(result).toEqual(expectedState);
  });

  it('should reset basket state ', () => {
    const state = { ...initialState, isPromoCodeValid: true, isPromoCodeInvalid: true };

    const result = basketData.reducer(state, resetBasket());

    expect(result).toEqual(initialState);

  });

  it('should set isPromoCodeValid to false', () => {
    const state = { ...initialState, isPromoCodeValid: true };
    const expectedState = { ...initialState, isPromoCodeValid: false };

    const result = basketData.reducer(state, setIsPromoCodeValid(false));

    expect(result).toEqual(expectedState);
  });

  it('should set isPromoCodeInvalid to false', () => {
    const state = { ...initialState, isPromoCodeInvalid: true };
    const expectedState = { ...initialState, isPromoCodeInvalid: false };

    const result = basketData.reducer(state, setIsPromoCodeInvalid(false));

    expect(result).toEqual(expectedState);
  });


  it('should set promoCodeName and set isPromoCodeValid to true with fetchPromoCodeAction.fullfilled', () => {
    const mockName = 'camera-333';
    const mockValue = 5;
    const expectedState = {
      ...initialState,
      promoCodeName: mockName,
      isPromoCodeValid: true,
    };

    const result = basketData.reducer(initialState, fetchPromoCodeAction.fulfilled({ data: mockValue, value: mockName }, '', mockName));
    expect(result).toEqual(expectedState);
  });

  it('should reset isPromoCodeValid and isPromoCodeInvalid with fetchPromoCodeAction.pending', () => {
    const state = { ...initialState, isPromoCodeInvalid: false, isPromoCodeValid: true };

    const result = basketData.reducer(state, fetchPromoCodeAction.pending);

    expect(result).toEqual(initialState);

  });

  it('should set isPromoCodeValid to true, isPromoCodeInvalid to false', () => {
    const state = { ...initialState, isPromoCodeValid: true, isPromoCodeInvalid: false };
    const expectedState = { ...initialState, isPromoCodeValid: false, isPromoCodeInvalid: true };

    const result = basketData.reducer(state, fetchPromoCodeAction.rejected);

    expect(result).toEqual(expectedState);
  });


});

