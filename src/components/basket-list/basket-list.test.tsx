import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import BasketList from './basket-list';


describe('Component: BasketList', () => {

  it('should render component', () => {
    const preparedComponent = withHistory(<BasketList />);

    render(preparedComponent);

    expect(screen.getByTestId('basketList-test')).toBeInTheDocument();
  });

});
