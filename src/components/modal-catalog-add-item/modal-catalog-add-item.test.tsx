import { render, screen } from '@testing-library/react';
import ModalAddItemToBasket from './modal-catalog-add-item';
import { makeFakeCurrentCameraData } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';


const mockCamera = makeFakeCurrentCameraData();

describe('Component: ModalAddItemToBasket', () => {
  it('should render component', () => {
    const { withStoreComponent } = withStore(
      <ModalAddItemToBasket
        onAddButtonClick={() => void 0}
        onCloseButtonClick={() => void 0}
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
