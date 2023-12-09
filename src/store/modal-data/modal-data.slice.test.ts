import { ModalData } from '../../types/types';
import { makeFakeCamerasData, makeFakeSuccessType } from '../../utils/mocks';
import { modalData, setModalData, setAddItemToBasketStatus, setSuccessStatus, setSuccessType, setActiveStatus, setAddReviewStatus, setRemoveFromBasketStatus } from './modal-data.slice';

describe('ModalData slice', () => {


  const initialState: ModalData = {
    modalData: null,
    addItemToBasketStatus: false,
    successStatus: false,
    successType: 'newReview',
    isActive: false,
    addReviewStatus: false,
    removeFromBasketStatus: false,
  };

  it('should set modalData with data', () => {
    const mockCameraData = makeFakeCamerasData();
    const actionPayload = mockCameraData[0];
    const state = { ...initialState };
    const expectedState = { ...initialState, modalData: mockCameraData[0] };

    const result = modalData.reducer(state, setModalData(actionPayload));

    expect(result).toEqual(expectedState);
  });

  it('should set addItemToBasketStatus', () => {
    const actionPayload = true;
    const state = { ...initialState };
    const expectedState = { ...initialState, addItemToBasketStatus: true };

    const result = modalData.reducer(state, setAddItemToBasketStatus(actionPayload));

    expect(result).toEqual(expectedState);
  });

  it('should set successStatus', () => {
    const actionPayload = true;
    const state = { ...initialState };
    const expectedState = { ...initialState, successStatus: true };

    const result = modalData.reducer(state, setSuccessStatus(actionPayload));

    expect(result).toEqual(expectedState);
  });

  it('should set successType', () => {
    const mock = makeFakeSuccessType();
    const state = { ...initialState };
    const expectedState = { ...initialState, successType: mock };

    const result = modalData.reducer(state, setSuccessType(mock));


    expect(result).toEqual(expectedState);
  });

  it('should set isActive', () => {
    const actionPayload = true;
    const state = { ...initialState };
    const expectedState = { ...initialState, isActive: true };

    const result = modalData.reducer(state, setActiveStatus(actionPayload));

    expect(result).toEqual(expectedState);
  });

  it('should set addReviewStatus', () => {
    const actionPayload = true;
    const state = { ...initialState };
    const expectedState = { ...initialState, addReviewStatus: true };

    const result = modalData.reducer(state, setAddReviewStatus(actionPayload));

    expect(result).toEqual(expectedState);
  });

  it('should set removeFromBasketStatus', () => {
    const actionPayload = true;
    const state = { ...initialState };
    const expectedState = { ...initialState, removeFromBasketStatus: true };

    const result = modalData.reducer(state, setRemoveFromBasketStatus(actionPayload));

    expect(result).toEqual(expectedState);
  });
});

