import { render , screen} from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import BasketPage from './basket-page';

describe('Page: BasketPage', () => {
  it('should render page', () => {

    const expectedText = 'Корзина';
    const expectedLinkText = 'Главная';
    const preparedComponent = withHistory(<BasketPage />);

    render(preparedComponent);

    const page = screen.getByTestId('basket-page-test');
    expect(page).toBeInTheDocument();
    expect(screen.getAllByText(expectedText));
    expect(screen.getByText(expectedLinkText));
  });
});
