import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getActiveStatus, getModalAddItemToBasketStatus, getModalAddReviewStatus, getModalData, getModalRemoveFromBasketStatus, getModalSuccessStatus } from '../../store/modal-data/modal-data.selectors';
import ModalAddItemToBasket from '../modal-catalog-add-item/modal-catalog-add-item';
import ModalSuccess from '../modal-success/modal-success';
import { getCurrentItemData } from '../../store/current-item-data/current-item-data.selectors';
import { setActiveStatus, setAddItemToBasketStatus, setAddReviewStatus, setRemoveFromBasketStatus, setSuccessStatus, setSuccessType } from '../../store/modal-data/modal-data.slice';
import ModalAddReviewForm from '../modal-review-form/modal-review-form';
import { fetchReviewsAction } from '../../store/current-item-data/current-item-data.action';
import { KeyCode } from '../../const';
import { addToBasket, deleteFromBasket } from '../../store/basket-data/basket-data.slice';
import { BasketItemType } from '../../types/types';
import ModalRemoveFromBasket from '../modal-basket-remove-item/modal-basket-remove-item.tsx';

function ModalWrapper(): JSX.Element {

  const dispatch = useAppDispatch();

  const [modalElement, setModalElement] = useState<JSX.Element | null>(null);

  const currentItemData = useAppSelector(getCurrentItemData);
  const modalData = useAppSelector(getModalData);

  const isActive = useAppSelector(getActiveStatus);

  const isModalAddItemToBasketOpened = useAppSelector(getModalAddItemToBasketStatus);
  const isModalSuccessOpened = useAppSelector(getModalSuccessStatus);
  const isModalAddReviewOpened = useAppSelector(getModalAddReviewStatus);
  const isModalRemoveFromBasketOpened = useAppSelector(getModalRemoveFromBasketStatus);

  useEffect(() => {
    const addItemToBasketClickHandler = (item: BasketItemType) => {
      document.body.style.overflow = 'hidden';
      dispatch(setAddItemToBasketStatus(false));
      dispatch(setSuccessStatus(true));
      dispatch(setSuccessType('addToBasket'));

      dispatch(addToBasket(item));
    };

    const closeModalForm = (isNewReview = false) => {
      dispatch(setActiveStatus(false));
      dispatch(setAddItemToBasketStatus(false));
      dispatch(setSuccessStatus(false));
      dispatch(setAddReviewStatus(false));
      dispatch(setRemoveFromBasketStatus(false));
      if (isNewReview && currentItemData) {
        dispatch(fetchReviewsAction(currentItemData.id));
      }

      document.body.style.overflow = 'initial';
    };

    const deleteItem = () => {
      if (modalData) {
        // @ts-ignore
        dispatch(deleteFromBasket(modalData));
      }
      closeModalForm();
    };


    switch (true) {
      case isModalAddItemToBasketOpened:
        setModalElement(
          <ModalAddItemToBasket
            onAddButtonClick={addItemToBasketClickHandler}
            onCloseButtonClick={closeModalForm}
          />);
        break;
      case isModalAddReviewOpened:
        setModalElement(
          <ModalAddReviewForm
            camera={currentItemData}
            onCloseButtonClick={closeModalForm}
          />
        );
        break;
      case isModalRemoveFromBasketOpened:
        setModalElement(
          <ModalRemoveFromBasket
            onDeleteButtonClick={deleteItem}
            onCloseButtonClick={closeModalForm}
          />
        );
        break;
      case isModalSuccessOpened:
        setModalElement(
          <ModalSuccess
            onCloseButtonClick={closeModalForm}
            onReturnButtonClick={closeModalForm}
          />
        );
        break;
    }

    const onEscClick = (evt: KeyboardEvent) => {
      if (evt.code === KeyCode.Esc) {
        closeModalForm();
        if (currentItemData) {
          dispatch(fetchReviewsAction(currentItemData.id));
        }
      }
    };
    document.addEventListener('keydown', onEscClick);

    return () => {
      document.removeEventListener('keydown', onEscClick);
    };

  }, [isModalAddItemToBasketOpened, isModalSuccessOpened, modalData, isModalAddReviewOpened, isModalRemoveFromBasketOpened, dispatch, currentItemData]);

  return (
    <div className={`modal ${isActive ? 'is-active' : ''} ${isModalSuccessOpened ? 'modal--narrow' : ''} `} data-testid="modalWrapper-test">
      {modalElement}
    </div>
  );
}

export default ModalWrapper;
