import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getActiveStatus, getModalAddItemToBasketStatus, getModalSuccessStatus } from '../../store/modal-data/modal-data.selectors';
import ModalAddItemToBasket from '../modal-catalog-add-item/modal-catalog-add-item';
import ModalAddItemToBasketSuccess from '../modal-catalog-add-item-success/modal-catalog-add-item-success';
import { getCurentItemData } from '../../store/current-item-data/current-item-data.selectors';
import { setActiveStatus, setAddItemToBasketStatus, setSuccessStatus } from '../../store/modal-data/modal-data.slice';

function ModalWrapper(): JSX.Element {

  const dispatch = useAppDispatch();

  const [modalElement, setModalElement] = useState<JSX.Element | null>(null);

  const isActive = useAppSelector(getActiveStatus);

  const isModalAddItemToBasketOpened = useAppSelector(getModalAddItemToBasketStatus);
  const isModalSuccessOpened = useAppSelector(getModalSuccessStatus);

  const currentItemData = useAppSelector(getCurentItemData);

  useEffect(() => {
    const addItemToBasketHandler = () => {
      dispatch(setAddItemToBasketStatus(false));
      dispatch(setSuccessStatus(true));
    };

    const closeModalForm = () => {
      dispatch(setActiveStatus(false));
      dispatch(setAddItemToBasketStatus(false));
      dispatch(setSuccessStatus(false));
    };

    switch (true) {
      case isModalAddItemToBasketOpened:
        setModalElement(
          <ModalAddItemToBasket
            onAddButtonClick={addItemToBasketHandler}
            onCloseButtonClick={closeModalForm}
          />);
        break;
      case isModalSuccessOpened:
        setModalElement(<ModalAddItemToBasketSuccess onCloseButtonClick={closeModalForm}/>);
        break;
    }
  }, [isModalAddItemToBasketOpened, isModalSuccessOpened, dispatch, currentItemData]);


  return (
    <div className={`modal ${isActive ? 'is-active' : ''} ${isModalSuccessOpened ? 'modal--narrow' : ''} `} >
      {modalElement}
    </div>
  );
}

export default ModalWrapper;


