import { render, screen } from '@testing-library/react';
import { makeFakeCurrentCameraData } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import ModalRemoveFromBasket from './modal-basket-remove-item';


const mockCamera = makeFakeCurrentCameraData();

describe('Component: ModalRemoveFromBasket', () => {
  it('should render component', () => {
    const { withStoreComponent } = withStore(
      <ModalRemoveFromBasket
        onDeleteButtonClick={() => void 0}
        onCloseButtonClick={() => void 0}
      />, {
        MODAL: {
          addItemToBasketStatus: true,
          successStatus: false,
          isActive: false,
          modalData: mockCamera,
          addReviewStatus: false,
          successType: 'newReview',
          removeFromBasketStatus: false,
        }
      }
    );

    const pagePrepared = withHistory(withStoreComponent);

    render(pagePrepared);

    expect(screen.getByTestId('modalRemoveFromBasket-test')).toBeInTheDocument();
  });

});
