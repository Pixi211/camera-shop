import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import RatingForm from './rating-form';

describe('Component: RatingForm', () => {

  it('should render component', () => {
    const preparedComponent = withHistory(<RatingForm rating={4}/>);

    render(preparedComponent);

    expect(screen.getByTestId('ratingFormStar-test')).toBeInTheDocument();
  });

});
