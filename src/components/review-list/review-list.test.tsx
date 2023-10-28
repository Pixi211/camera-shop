import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import ReviewList from './review-list';
import { makeFakeReviews } from '../../utils/mocks';

const mockReviews = makeFakeReviews();

describe('Component: ReviewList', () => {

  it('should render component', () => {
    const preparedComponent = withHistory(<ReviewList reviews={mockReviews}/>);

    render(preparedComponent);

    expect(screen.getByTestId('reviewList-test')).toBeInTheDocument();
  });

});
