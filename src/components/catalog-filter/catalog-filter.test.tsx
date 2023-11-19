import { render, screen } from '@testing-library/react';
import MemoizedCatalogFilter from './catalog-filter';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { configureMockStore } from '@jedmao/redux-mock-store';


describe('Component: CatalogFilter', () => {

  it('should render component', () => {
    const mockStore = configureMockStore();
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MemoizedCatalogFilter
            minPriceOfCatalog={0}
            maxPriceOfCatalog={0}
            minPriceSorted={0}
            maxPriceSorted={0}
            setCurrentPage={() => void 0}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('catalogFilter-test')).toBeInTheDocument();
  });

});

