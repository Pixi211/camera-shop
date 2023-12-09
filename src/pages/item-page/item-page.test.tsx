import { render , screen} from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeCamerasData, makeFakeReviews } from '../../utils/mocks';
import ItemPage from './item-page';

const mockCameraData = makeFakeCamerasData();

const mockReviews = makeFakeReviews();


describe('Page: Catalog Page ', () => {
  it('should render page', () => {
    const { withStoreComponent } = withStore(<ItemPage />, {
      CAMERAS: {
        cameras: mockCameraData,
        minPrice: null,
        maxPrice: null,
        hasError: false,
        isDataLoading: false,
        sortType: null,
        sortDirection: null,
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
        removeFromBasketStatus: false,
      },
      BASKET: {
        basketItems: [],
        itemForBasket: null,
        isPromoCodeValid: false,
        isPromoCodeInvalid: false,
        promoCodeName: null,
      }
    }
    );
    const pagePrepared = withHistory(withStoreComponent);

    render(pagePrepared);

    const page = screen.getByTestId('item-page-test');
    expect(page).toBeInTheDocument();
  });
});
