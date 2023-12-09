import { render, screen } from '@testing-library/react';
import { makeFakeCurrentCameraData } from '../../utils/mocks';
import MemoizedProductCard from './product-card';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { withStore } from '../../utils/mock-component';

const mockCameraData = makeFakeCurrentCameraData();

describe('Component: ProductContent', () => {

  it('should render component', () => {
    const mockStore = configureMockStore();
    const history = createMemoryHistory();
    const store = mockStore({});
    const { withStoreComponent } = withStore(<MemoizedProductCard camera={mockCameraData} isActive={'isActive'} />, {
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

    expect(screen.getByTestId('productCard-test')).toBeInTheDocument();
  });
});
