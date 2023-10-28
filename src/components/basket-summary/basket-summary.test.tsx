import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import BasketSummary from './basket-summary';


describe('Component: BsketSummary', () => {

  it('should render component', () => {
    const preparedComponent = withHistory(<BasketSummary />);

    render(preparedComponent);

    expect(screen.getByTestId('basketSummary-test')).toBeInTheDocument();
  });

});
