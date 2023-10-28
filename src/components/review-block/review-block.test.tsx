import { render, screen } from '@testing-library/react';
import { makeFakeReviews } from '../../utils/mocks';
import ReviewBlock from './review-block';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';

const mockReviews = makeFakeReviews();
const currentMax = 3;
const visibleMockReviews = mockReviews.slice(0, currentMax);
const isDisabled = currentMax >= mockReviews.length;

describe('Component: ReviewBlock', () => {

  it('should render component', () => {
    const mockStore = configureMockStore();
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewBlock
            reviews={mockReviews}
            visibleReviews={visibleMockReviews}
            isDisabled={isDisabled}
          />
        </HistoryRouter>
      </Provider>
    );


    expect(screen.getByTestId('reviewBlock-test')).toBeInTheDocument();
  });
});
