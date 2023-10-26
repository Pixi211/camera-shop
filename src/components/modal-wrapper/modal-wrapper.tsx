import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getActiveStatus, getModalAddItemToBasketStatus, getModalAddReviewStatus, getModalSuccessStatus } from '../../store/modal-data/modal-data.selectors';
import ModalAddItemToBasket from '../modal-catalog-add-item/modal-catalog-add-item';
import ModalSuccess from '../modal-success/modal-success';
import { getCurentItemData } from '../../store/current-item-data/current-item-data.selectors';
import { setActiveStatus, setAddItemToBasketStatus, setAddReviewStatus, setSuccessStatus, setSuccessType } from '../../store/modal-data/modal-data.slice';
import ModalAddReviewForm from '../modal-review-form/modal-review-form';
import { fetchReviewsAction } from '../../store/current-item-data/current-item-data.action';


function ModalWrapper(): JSX.Element {

  const dispatch = useAppDispatch();

  const [modalElement, setModalElement] = useState<JSX.Element | null>(null);

  const currentItemData = useAppSelector(getCurentItemData);

  const isActive = useAppSelector(getActiveStatus);

  const isModalAddItemToBasketOpened = useAppSelector(getModalAddItemToBasketStatus);
  const isModalSuccessOpened = useAppSelector(getModalSuccessStatus);
  const isModalAddReviewOpened = useAppSelector(getModalAddReviewStatus);

  useEffect(() => {
    const addItemToBasketHandler = () => {
      document.body.style.overflow = 'hidden';
      dispatch(setAddItemToBasketStatus(false));

      //добавить в корзину. нижние строки можно в это действие запихнуть
      // if(currentItemData) {
      //   dispatch(addItemToBasket(currentItemData));
      // }
      dispatch(setSuccessStatus(true));
      dispatch(setSuccessType('addToBasket'));
    };

    const closeModalForm = (isNewReview = false) => {
      dispatch(setActiveStatus(false));
      dispatch(setAddItemToBasketStatus(false));
      dispatch(setSuccessStatus(false));
      dispatch(setAddReviewStatus(false));
      if (isNewReview && currentItemData) {
        dispatch(fetchReviewsAction(currentItemData.id));
      }
      //окно удаления закрыть

      document.body.style.overflow = '';
    };


    switch (true) {
      case isModalAddItemToBasketOpened:
        setModalElement(
          <ModalAddItemToBasket
            onAddButtonClick={addItemToBasketHandler}
            onCloseButtonClick={closeModalForm}

          />);
        break;
      case isModalAddReviewOpened:
        setModalElement(
          <ModalAddReviewForm
            cameraId={currentItemData.id}
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
      if (evt.code === 'Escape') {
        closeModalForm();
      }
    };
    document.addEventListener('keydown', onEscClick);

    return () => {
      document.removeEventListener('keydown', onEscClick);
    };

  }, [isModalAddItemToBasketOpened, isModalSuccessOpened, isModalAddReviewOpened, dispatch, currentItemData]);


  return (
    <div className={`modal ${isActive ? 'is-active' : ''} ${isModalSuccessOpened ? 'modal--narrow' : ''} `}>
      {modalElement}
    </div>
  );
}

export default ModalWrapper;
