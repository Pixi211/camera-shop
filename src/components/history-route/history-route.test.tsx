import {render, screen, act} from '@testing-library/react';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import HistoryRouter from './history-route';

describe('Component: History-router', () => {
  it('component should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <h1>History component</h1>
      </HistoryRouter>
    );

    const element = screen.getByText('History component');
    expect(element).toBeInTheDocument();
  });

  it('should redirect correctly', () => {
    const history = createMemoryHistory();
    history.push('/current');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={'/current'}
            element={<h1>Current component</h1>}
          />
          <Route
            path={'/next'}
            element={<h1>Next component</h1>}
          />
        </Routes>
      </HistoryRouter>
    );

    act(() => history.push('/next'));

    const headerElement = screen.getByText('Next component');
    expect(headerElement).toBeInTheDocument();
  });
});
