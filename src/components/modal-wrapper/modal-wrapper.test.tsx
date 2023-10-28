import { render, screen } from '@testing-library/react';
import ModalWrapper from './modal-wrapper';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeCamerasData, makeFakeCurrentCameraData, makeFakeReviews } from '../../utils/mocks';

const mockCameraData = makeFakeCurrentCameraData();
const mockReviews = makeFakeReviews();
const mockSimilars = makeFakeCamerasData();

describe('Component: ModalWrapper', () => {

  it('should render component', () => {
    const { withStoreComponent } = withStore(<ModalWrapper />, {
      CURRENT: {
        currentItemData: mockCameraData,
        similarCameras: mockSimilars,
        reviews: mockReviews,
        isCurrentDataLoading: false,
        isSimilarsLoading: false,
        isReviewsLoading: false,
        hasError: false,
      },
      MODAL: {
        addItemToBasketStatus: false,
        successStatus: false,
        isActive: true,
        modalData: null,
        addReviewStatus: false,
        successType: 'newReview',
      }
    }
    );

    const pagePrepared = withHistory(withStoreComponent);

    render(pagePrepared);


    expect(screen.getByTestId('modalWrapper-test')).toBeInTheDocument();
  });
});
