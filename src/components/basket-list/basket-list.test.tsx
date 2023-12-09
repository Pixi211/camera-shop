import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import BasketList from './basket-list';
import { makeFakeBasketItemsData } from '../../utils/mocks';

const mockBasketData = makeFakeBasketItemsData();

describe('Component: BasketList', () => {

  it('should render component', () => {

    const { withStoreComponent } = withStore(<BasketList basketItems={mockBasketData}/>, {
      BASKET: {
        basketItems: [],
        itemForBasket: null,
        isPromoCodeValid: false,
        isPromoCodeInvalid: false,
        promoCodeName: null,
      }
    });

    const pagePrepared = withHistory(withStoreComponent);

    render(pagePrepared);

    expect(screen.getByTestId('basketList-test')).toBeInTheDocument();
  });

});
