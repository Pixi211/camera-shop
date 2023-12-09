import { render, screen } from '@testing-library/react';
import { makeFakeCamerasData } from '../../utils/mocks';
import MemoizedCatalogCards from './catalog-cards';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import { withStore } from '../../utils/mock-component';

const mockCameraData = makeFakeCamerasData();


describe('Component: CatalogCards', () => {
  const mockStore = configureMockStore();
  it('should render component', () => {
    const history = createMemoryHistory();
    const store = mockStore({});
    const { withStoreComponent } = withStore(<MemoizedCatalogCards cameras={mockCameraData} />, {
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

    expect(screen.getByTestId('catalogCards-test')).toBeInTheDocument();
  });

});
