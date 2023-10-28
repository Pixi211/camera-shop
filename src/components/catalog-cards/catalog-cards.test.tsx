import { render, screen } from '@testing-library/react';
import { makeFakeCamerasData} from '../../utils/mocks';
import MemoizedCatalogCards from './catalog-cards';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';

const mockCameraData = makeFakeCamerasData();


describe('Component: CatalogCards', () => {
  const mockStore = configureMockStore();
  it('should render component', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MemoizedCatalogCards cameras={mockCameraData} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('catalogCards-test')).toBeInTheDocument();
  });

});
