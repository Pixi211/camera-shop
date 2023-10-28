

import MemoizedHeader from './header';
import { withHistory , } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';

describe('Component: Header', () => {
  it('should render component' , () => {

    const preparedComponent = withHistory(<MemoizedHeader />);
    const expectedLinkText = 'Каталог';

    render(preparedComponent);

    expect(screen.getByTestId('header-test')).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText));
  });
});
