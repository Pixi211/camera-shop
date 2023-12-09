import MemoizedHeader from './header';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { withStore } from '../../utils/mock-component';
import { makeFakeCamerasData } from '../../utils/mocks';

describe('Component: Header', () => {
  it('should render component', () => {

    const expectedLinkText = 'Каталог';

    const mockStore = configureMockStore();
    const history = createMemoryHistory();
    const store = mockStore({});
    const mockCameraData = makeFakeCamerasData();


    const { withStoreComponent } = withStore(<MemoizedHeader onMainClickHandler={() => void 0} />, {
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
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          {withStoreComponent}
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header-test')).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText));
  });
});
