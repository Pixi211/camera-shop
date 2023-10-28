import { render, screen } from '@testing-library/react';
import { makeFakeCamerasData } from '../../utils/mocks';
import ProductSimilar from './product-similar';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';

const mockCameras = makeFakeCamerasData();

describe('Component: ProductSimilar', () => {

  it('should render component', () => {
    const expectedText = ('Похожие товары');
    const mockStore = configureMockStore();
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductSimilar cameras={mockCameras} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId('productSimilar-test')).toBeInTheDocument();
  });

});
