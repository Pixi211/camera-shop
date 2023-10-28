import { render , screen} from '@testing-library/react';
import LoadingPage from './loading-page';
import { withHistory } from '../../utils/mock-component';

describe('Page: Loading Page', () => {
  it('should render page', () => {
    const expectedText = /Loading.../i;
    const preparedComponent = withHistory(<LoadingPage />);

    render(preparedComponent);

    const page = screen.getByText(expectedText);
    expect(page).toBeInTheDocument();

  });
});
