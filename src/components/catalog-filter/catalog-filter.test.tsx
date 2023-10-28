import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import MemoizedCatalogFilter from './catalog-filter';


describe('Component: CatalogFilter', () => {

  it('should render component', () => {
    const preparedComponent = withHistory(<MemoizedCatalogFilter />);

    render(preparedComponent);

    expect(screen.getByTestId('catalogFilter-test')).toBeInTheDocument();
  });

});
