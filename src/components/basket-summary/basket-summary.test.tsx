import { render, screen } from '@testing-library/react';
import BasketSummary from './basket-summary';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { withStore } from '../../utils/mock-component';


describe('Component: BasketSummary', () => {

  it('should render component', () => {
    const mockStore = configureMockStore();
    const history = createMemoryHistory();
    const store = mockStore({});
    const { withStoreComponent } = withStore(<BasketSummary />, {
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

    expect(screen.getByTestId('basketSummary-test')).toBeInTheDocument();
  });

});
