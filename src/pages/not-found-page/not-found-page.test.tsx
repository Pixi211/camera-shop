import { render , screen} from '@testing-library/react';
import NotFoundPage from './not-found-page';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { Provider } from 'react-redux';
import { withStore } from '../../utils/mock-component';
import { makeFakeCamerasData } from '../../utils/mocks';

describe('Page: NotFoundPage', () => {
  it('should render page', () => {

    const expectedText = '404 NOT FOUND';
    const expectedLinkText = 'Return to Catalog';


    const mockStore = configureMockStore();
    const history = createMemoryHistory();
    const store = mockStore({});
    const mockCameraData = makeFakeCamerasData();
    const { withStoreComponent } = withStore(<NotFoundPage />, {
      CAMERAS: {
        minPrice: null,
        maxPrice: null,
        cameras: mockCameraData,
        hasError: false,
        isDataLoading: false,
        sortType: null,
        sortDirection: null,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          {withStoreComponent}
        </HistoryRouter>
      </Provider>
    );

    const page = screen.getByTestId('not-found-test');
    expect(page).toBeInTheDocument();
    expect(screen.getByText(expectedText));
    expect(screen.getByText(expectedLinkText));
  });
});
