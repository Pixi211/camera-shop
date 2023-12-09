import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import BasketItem from './basket-item';
import { makeFakeBasketItemData } from '../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';

describe('Component: BasketItem', () => {
  const mockBasketData = makeFakeBasketItemData();


  it('should render component', () => {

    const mockStore = configureMockStore();
    const history = createMemoryHistory();
    const store = mockStore({});
    const { withStoreComponent } = withStore(<BasketItem basketItem={mockBasketData} />, {
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

    expect(screen.getByTestId('basketItem-test')).toBeInTheDocument();
  });

});
