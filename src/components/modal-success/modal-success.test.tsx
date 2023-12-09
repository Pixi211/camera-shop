import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import ModalSuccess from './modal-success';

describe('Component: ModalSuccess', () => {
  it('should render component', () => {
    const { withStoreComponent } = withStore(
      <ModalSuccess
        onReturnButtonClick={() => void 0}
        onCloseButtonClick={() => void 0}
      />, {
        MODAL: {
          addItemToBasketStatus: false,
          successStatus: false,
          isActive: false,
          modalData: null,
          addReviewStatus: false,
          successType: 'newReview',
          removeFromBasketStatus: false,
        }
      });
    const pagePrepared = withHistory(withStoreComponent);

    render(pagePrepared);

    expect(screen.getByTestId('modalSuccess-test')).toBeInTheDocument();
  });
});
