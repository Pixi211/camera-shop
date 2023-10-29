import { render, screen } from '@testing-library/react';
import ModalAddItemToBasket from './modal-catalog-add-item';
import { makeFakeCurrentCameraData } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';

const closeForm = () => {
  let isOpen = true;
  isOpen = !isOpen;
  return isOpen;
};

const mockCamera = makeFakeCurrentCameraData();
describe('Component: ModalAddItemToBasket', () => {
  it('should render component', () => {
    const { withStoreComponent } = withStore(
      <ModalAddItemToBasket
        onAddButtonClick={closeForm}
        onCloseButtonClick={closeForm}
      />, {
        MODAL: {
          addItemToBasketStatus: true,
          successStatus: false,
          isActive: false,
          modalData: mockCamera,
          addReviewStatus: false,
          successType: 'newReview',
        }
      }
    );

    const pagePrepared = withHistory(withStoreComponent);

    render(pagePrepared);

    expect(screen.getByTestId('modalAddItemToBasket-test')).toBeInTheDocument();
  });

});
