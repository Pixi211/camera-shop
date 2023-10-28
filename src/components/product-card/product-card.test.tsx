import { render, screen } from '@testing-library/react';
import { makeFakeCurrentCameraData } from '../../utils/mocks';
import MemoizedProductCard from './product-card';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';

const mockCameraData = makeFakeCurrentCameraData();

describe('Component: ProductContent', () => {

  it('should render component', () => {
    const mockStore = configureMockStore();
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MemoizedProductCard camera={mockCameraData} isActive={'isActive'} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('productCard-test')).toBeInTheDocument();
  });
});
