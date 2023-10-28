import { makeFakeCamerasData, makeFakeReviews, makeFakeCurrentCameraData } from '../../utils/mocks';
import { fetchCurrentAction, fetchReviewsAction, fetchSimilarAction } from './current-item-data.action';
import { currentData } from './current-item-data.slice';

describe('Current Camera data slice' , () => {

  const initialState = {
    currentItemData: null,
    similarCameras: [],
    reviews: [],
    isCurrentDataLoading: false,
    isSimilarsLoading: false,
    isReviewsLoading: false,
    hasError: false,
  };

  const mockCurrentCamera = makeFakeCurrentCameraData();
  const mockReviews = makeFakeReviews();
  const mockSimilars = makeFakeCamerasData();

  it('should return initial state with empty action' , () => {
    const emptyAction = { type: '' };

    const result = currentData.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should retun default initial state with empty action and undefined' , () => {
    const emptyAction = { type: '' };

    const result = currentData.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);

  });

  describe('fetchCurrentAction slice' , () => {

    it('should set "isCurrentDataLoading" to true with fetchCurrentAction.pending' , () => {
      const expectedState = {
        ...initialState,
        isCurrentDataLoading: true,
      };

      const result = currentData.reducer(undefined, fetchCurrentAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set currentInfo to object with data , isDataLoading to false with "fetchCurrentAction.fullfilled"', () => {
      const expectedState = {
        ...initialState,
        currentItemData: mockCurrentCamera
      };

      const result = currentData.reducer(undefined, fetchCurrentAction.fulfilled(mockCurrentCamera, '', mockCurrentCamera.id));

      expect(result).toEqual(expectedState);
    });

    it('should set isData loading to false, "hasError" to true with "fetchCurrentAction.rejected"', () => {
      const expectedState = {
        ...initialState,
        hasError: true,
      };

      const result = currentData.reducer(undefined , fetchCurrentAction.rejected);

      expect(result).toEqual(expectedState);

    });
  });

  describe('fetchReviewsAction slice', () => {

    it('should set "isReviewsLoading" to true with fetchReviewsAction.pending' , () => {
      const expectedState = {
        ...initialState,
        isReviewsLoading: true,
      };

      const result = currentData.reducer(undefined, fetchReviewsAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set reviews with data, isReviewsLoading to false with "fetchReviewsAction.fullfilled"' , () => {
      const expectedState = {
        ...initialState,
        reviews: mockReviews,
      };

      const result = currentData.reducer(undefined, fetchReviewsAction.fulfilled(mockReviews, '', mockCurrentCamera.id));

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchSimilarAction slice', () => {

    it('should set "isSimilarsLoading" to true with fetchSimilarAction.pending' , () => {
      const expectedState = {
        ...initialState,
        isSimilarsLoading: true,
      };

      const result = currentData.reducer(undefined, fetchSimilarAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set similarCameras with data, isSimilarsLoading to false with "fetchSimilarAction.fullfilled"', () => {
      const expectedState = {
        ...initialState,
        similarCameras: mockSimilars
      };

      const result = currentData.reducer(undefined, fetchSimilarAction.fulfilled(mockSimilars, '', mockCurrentCamera.id));

      expect(result).toEqual(expectedState);
    });
  });

});
