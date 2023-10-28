import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import BasketItem from './basket-item';

describe('Component: BasketItem', () => {

  it('should render component', () => {
    const preparedComponent = withHistory(<BasketItem/>);

    render(preparedComponent);

    expect(screen.getByTestId('basketItem-test')).toBeInTheDocument();
  });

});
