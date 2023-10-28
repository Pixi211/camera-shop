import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import MemoizedCatalogSort from './catalog-sort';


describe('Component: CatalogSort', () => {

  it('should render component', () => {
    const preparedComponent = withHistory(<MemoizedCatalogSort />);

    render(preparedComponent);

    expect(screen.getByTestId('catalogSort-test')).toBeInTheDocument();
  });

});
