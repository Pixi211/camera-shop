import { render , screen} from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import NotFoundPage from './not-found-page';

describe('Page: NotFoundPage', () => {
  it('should render page', () => {

    const expectedText = '404 NOT FOUND';
    const expectedLinkText = 'Return to Catalog';
    const preparedComponent = withHistory(<NotFoundPage />);

    render(preparedComponent);

    const page = screen.getByTestId('not-found-test');
    expect(page).toBeInTheDocument();
    expect(screen.getByText(expectedText));
    expect(screen.getByText(expectedLinkText));
  });
});
