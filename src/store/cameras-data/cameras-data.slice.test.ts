
import { CamerasData } from '../../types/types';
import { makeFakeCamerasData } from '../../utils/mocks';
import { fetchCamerasAction } from './cameras-data.action';
import { camerasData, setMaxPrice, setMinPrice, setSortDirection, setSortType } from './cameras-data.slice';

describe('CamerasData Slice', () => {

  const initialState: CamerasData = {
    cameras: [],
    minPrice: null,
    maxPrice: null,
    hasError: false,
    isDataLoading: false,
    sortDirection: null,
    sortType: null,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...initialState };

    const result = camerasData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...initialState };

    const result = camerasData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);

  });

  it('should set sortType', () => {

    const actionPayload = 'test';
    const state = { ...initialState};

    const expectedState = { ...initialState, sortType: 'test' };

    const result = camerasData.reducer(state, setSortType(actionPayload));

    expect(result).toEqual(expectedState);
  });

  it('should set sortDirection', () => {

    const actionPayload = 'test';
    const state = { ...initialState};

    const expectedState = { ...initialState, sortDirection: 'test' };

    const result = camerasData.reducer(state, setSortDirection(actionPayload));

    expect(result).toEqual(expectedState);
  });

  it('should set minPrice', () => {

    const actionPayload = 5;
    const state = { ...initialState};

    const expectedState = { ...initialState, minPrice: 5 };

    const result = camerasData.reducer(state, setMinPrice(actionPayload));

    expect(result).toEqual(expectedState);
  });

  it('should set maxPrice', () => {

    const actionPayload = 5;
    const state = { ...initialState};

    const expectedState = { ...initialState, maxPrice: 5 };

    const result = camerasData.reducer(state, setMaxPrice(actionPayload));

    expect(result).toEqual(expectedState);
  });


  describe(' fetchCamerasAction Slice', () => {

    it('should set "isDataLoading" to true with fetchCamerasAction.pending', () => {
      const expectedState = { ...initialState, isDataLoading: true };

      const result = camerasData.reducer(undefined, fetchCamerasAction.pending);

      expect(result).toEqual(expectedState);

    });

    it('should set "cameras" to object with cameras data , "isDataLoading" to false with "fetchCamerasAction.fullfilled"', () => {
      const mockCameraData = makeFakeCamerasData();
      const expectedState = {
        ...initialState,
        cameras: mockCameraData,
        isDataLoading: false,
      };

      const result = camerasData.reducer(undefined, fetchCamerasAction.fulfilled(mockCameraData, '', undefined));

      expect(result).toEqual(expectedState);
    });

    it('should set "isDataLoading" to false , "hasError" to true with "fetchCamerasAction.rejected"', () => {
      const expectedState = {
        ...initialState,
        hasError: true,
        isDataLoading: false,
      };

      const result = camerasData.reducer(undefined, fetchCamerasAction.rejected);

      expect(result).toEqual(expectedState);
    });

  });
});
