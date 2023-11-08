import { render , screen} from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import CatalogPage from './catalog-page';
import { makeFakeCamerasData, makeFakePromos, makeFakeReviews } from '../../utils/mocks';

const mockCameraData = makeFakeCamerasData();
const mockPromoData = makeFakePromos();
const mockReviews = makeFakeReviews();


describe('Page: CatalogPage', () => {
  it('should render page', () => {
    const { withStoreComponent } = withStore(<CatalogPage />, {
      CAMERAS: {
        cameras: mockCameraData,
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
        currentItemData: mockCameraData[0],
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
    }
    );
    const pagePrepared = withHistory(withStoreComponent);

    render(pagePrepared);

    const page = screen.getByTestId('catalog-page-test');

    expect(page).toBeInTheDocument();

  });
});
