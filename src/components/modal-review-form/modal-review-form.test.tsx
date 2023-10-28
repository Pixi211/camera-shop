import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import ModalAddReviewForm from './modal-review-form';
import { makeFakeCurrentCameraData } from '../../utils/mocks';

const mockCameraId = makeFakeCurrentCameraData().id;
const closeForm = () => {
  let isOpen = true;
  isOpen = !isOpen;
  return isOpen;
};

describe('Component: ModalAddReviewForm', () => {
  it('should render component', () => {
    const mockStore = configureMockStore();
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalAddReviewForm cameraId={mockCameraId}
            onCloseButtonClick={closeForm}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('modalAddReviewForm-test')).toBeInTheDocument();
  });

});
