import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import MemoizedPagination from './pagination';

describe('Component: Pagination', () => {

  it('should render component', () => {
    const preparedComponent = withHistory(
      <MemoizedPagination
        onPaginationClick={() => void 0}
        camerasLength={9}
        currentPage={1}
      />);

    render(preparedComponent);

    expect(screen.getByTestId('pagination-test')).toBeInTheDocument();
  });

});
