import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import BasketPage from './basket-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { makeFakeCamerasData } from '../../utils/mocks';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';

describe('Page: BasketPage', () => {
  it('should render page', () => {

    const expectedText = 'Корзина';
    const expectedLinkText = 'Главная';

    const mockStore = configureMockStore();
    const history = createMemoryHistory();
    const store = mockStore({});
    const mockCameraData = makeFakeCamerasData();
    const { withStoreComponent } = withStore(<BasketPage />, {
      CAMERAS: {
        minPrice: null,
        maxPrice: null,
        cameras: mockCameraData,
        hasError: false,
        isDataLoading: false,
        sortType: null,
        sortDirection: null,
      },
      BASKET: {
        basketItems: [],
        itemForBasket: null,
        isPromoCodeValid: false,
        isPromoCodeInvalid: false,
        promoCodeName: null,
      },
      CURRENT: {
        currentItemData: null,
        similarCameras: mockCameraData,
        reviews: [],
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
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          {withStoreComponent}
        </HistoryRouter>
      </Provider>
    );

    const page = screen.getByTestId('basket-page-test');
    expect(page).toBeInTheDocument();
    expect(screen.getAllByText(expectedText));
    expect(screen.getByText(expectedLinkText));
  });
});
