import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeCurrentCameraData } from '../../utils/mocks';
import ProductContent from './product-content';


const mockCameraData = makeFakeCurrentCameraData();

describe('Component: ProductContent', () => {

  it('should render component', () => {

    const { withStoreComponent } = withStore(<ProductContent camera={mockCameraData} typeTag={'description'} />);

    const pagePrepared = withHistory(withStoreComponent);

    render(pagePrepared);

    expect(screen.getByTestId('productContent-test')).toBeInTheDocument();
  });
});
