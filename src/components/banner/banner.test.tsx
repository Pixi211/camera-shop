import { render, screen } from '@testing-library/react';
import Banner from './banner';
import { withHistory } from '../../utils/mock-component';
import { makeFakePromos } from '../../utils/mocks';

const mockPromoData = makeFakePromos();

describe('Component: Banner', () => {

  it('should render component', () => {
    const preparedComponent = withHistory(<Banner promos={mockPromoData}/>);

    render(preparedComponent);

    expect(screen.getByTestId('banner-test')).toBeInTheDocument();
  });

});
