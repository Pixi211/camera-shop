

import MemoizedHeader from './header';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';

describe('Component: Header', () => {
  it('should render component', () => {

    const expectedLinkText = 'Каталог';

    const mockStore = configureMockStore();
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MemoizedHeader onMainClickHandler={() => void 0}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header-test')).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText));
  });
});
