import { render , screen} from '@testing-library/react';
import MemoizedFooter from './footer';
import { withHistory } from '../../utils/mock-component';


describe('Component: Footer', () => {

  it('should render component', () => {
    const preparedComponent = withHistory(<MemoizedFooter />);

    render(preparedComponent);

    expect(screen.getByTestId('footer-test')).toBeInTheDocument();
  });

});
