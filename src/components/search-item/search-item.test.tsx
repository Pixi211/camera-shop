import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import MemoSearchItem from './search-item';
import { makeFakeCurrentCameraData } from '../../utils/mocks';

const mockCameraData = makeFakeCurrentCameraData();


describe('Component: SearchItem', () => {

  it('should render component', () => {
    const preparedComponent = withHistory(
      <MemoSearchItem
        camera={mockCameraData}
        isCurrent={false}
        onItemClick={() => void 0}
      />);

    render(preparedComponent);

    expect(screen.getByTestId('search-item-test')).toBeInTheDocument();
  });

});
