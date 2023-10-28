import { PromoData } from '../../types/types';
import { makeFakePromos } from '../../utils/mocks';
import { fetchPromosAction } from './promo-data.action';
import { promoData } from './promo-data.slice';

describe('PromosData slice', () => {

  const initialState: PromoData = {
    promos: [],
    hasError: false,
  };

  const mockPromos = makeFakePromos();


  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      promos: mockPromos,
      hasError: true
    };

    const result = promoData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      promos: [],
      hasError: false,
    };

    const result = promoData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('fetchPromosAction slice', () => {


    it('should set "promos" to object with data with "fetchPromosAction.fullfilled"', () => {
      const expectedState = {
        ...initialState,
        promos: mockPromos
      };

      const result = promoData.reducer(undefined, fetchPromosAction.fulfilled(mockPromos, '', undefined));

      expect(result).toEqual(expectedState);
    });

    it('should set "hasError" to true with "fetchPromosAction.rejected"', () => {
      const expectedState = {
        ...initialState,
        hasError: true,
      };

      const result = promoData.reducer(undefined, fetchPromosAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });


});
