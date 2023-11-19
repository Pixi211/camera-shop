import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore } from '../../utils/mock-component';
import App from './app';
import { makeFakeCamerasData, makeFakeCurrentCameraData, makeFakePromos, makeFakeReviews } from '../../utils/mocks';

const mockCameraData = makeFakeCamerasData();
const mockPromoData = makeFakePromos();
const mockCurrentData = makeFakeCurrentCameraData();
const mockReviews = makeFakeReviews();

describe('Component: App', () => {

  it('should navigate to ItemPage when click on button "More"', async () => {
    const { withStoreComponent } = withStore(<App />, {
      CAMERAS: {
        cameras: mockCameraData,
        camerasByPrice: [],
        hasError: false,
        isDataLoading: false,
        sortType: null,
        sortDirection: null,
      },
      PROMO: {
        promos: mockPromoData,
        hasError: false,
      },
      CURRENT: {
        currentItemData: mockCurrentData,
        similarCameras: mockCameraData,
        reviews: mockReviews,
        isCurrentDataLoading: false,
        isSimilarsLoading: false,
        isReviewsLoading: false,
        hasError: false,
      },
      MODAL: {
        addItemToBasketStatus: false,
        successStatus: false,
        isActive: false,
        modalData: null,
        addReviewStatus: false,
        successType: 'newReview',
      }
    });

    render(withStoreComponent);
    const buttons = screen.getAllByTestId('btnMore-test');
    await userEvent.click(buttons[0]);

    expect(screen.getByText('Описание')).toBeInTheDocument();
  });
});
