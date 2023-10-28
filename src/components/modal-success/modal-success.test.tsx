import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import ModalSuccess from './modal-success';


const closeForm = () => {
  let isOpen = true;
  isOpen = !isOpen;
  return isOpen;
};

describe('Component: ModalSuccess', () => {
  it('should render component', () => {
    const { withStoreComponent } = withStore(
      <ModalSuccess
        onReturnButtonClick={closeForm}
        onCloseButtonClick={closeForm}
      />, {MODAL: {
        addItemToBasketStatus: false,
        successStatus: true,
        isActive: false,
        modalData: null,
        addReviewStatus: false,
        successType: 'newReview',
      }
      }
    );
    const pagePrepared = withHistory(withStoreComponent);

    render(pagePrepared);

    expect(screen.getByTestId('modalSuccess-test')).toBeInTheDocument();
  });
});
