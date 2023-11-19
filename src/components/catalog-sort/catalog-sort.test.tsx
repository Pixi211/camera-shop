import { render, screen } from '@testing-library/react';
import MemoizedCatalogSort from './catalog-sort';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';


describe('Component: CatalogSort', () => {

  it('should render component', () => {
    const mockStore = configureMockStore();
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MemoizedCatalogSort />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('catalogSort-test')).toBeInTheDocument();
  });

});
