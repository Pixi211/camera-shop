import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import { makeFakeCurrentCameraData } from '../../utils/mocks';
import ProductContent from './product-content';

const mockCameraData = makeFakeCurrentCameraData();

describe('Component: ProductContent', () => {

  it('should render component', () => {
    const preparedComponent = withHistory(<ProductContent camera={mockCameraData} typeTag={'description'}/>);

    render(preparedComponent);

    expect(screen.getByTestId('productContent-test')).toBeInTheDocument();
  });
});
