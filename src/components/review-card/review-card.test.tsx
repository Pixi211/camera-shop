import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import { makeFakeReview } from '../../utils/mocks';
import ReviewCard from './review-card';

const mockReview = makeFakeReview();

describe('Component: ReviewCard', () => {

  it('should render component', () => {
    const preparedComponent = withHistory(<ReviewCard {...mockReview}/>);

    render(preparedComponent);

    expect(screen.getByTestId('reviewCard-test')).toBeInTheDocument();
  });
});
