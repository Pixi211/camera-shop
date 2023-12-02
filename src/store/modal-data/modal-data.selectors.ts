
import { BasketItemType, State } from '../../types/types';
import { NameSpace } from '../../const';


export const getModalAddItemToBasketStatus = (state: State): boolean => state[NameSpace.Modal].addItemToBasketStatus ;
export const getModalSuccessStatus = (state: State): boolean => state[NameSpace.Modal].successStatus ;
export const getModalAddReviewStatus = (state: State): boolean => state[NameSpace.Modal].addReviewStatus;
export const getModalRemoveFromBasketStatus = (state: State): boolean => state[NameSpace.Modal].removeFromBasketStatus;
export const getActiveStatus = (state: State): boolean => state[NameSpace.Modal].isActive;
export const getModalData = (state: State): BasketItemType | null => state[NameSpace.Modal].modalData;
export const getSuccessType = (state: State): 'newReview' | 'addToBasket' | 'purchase' => state[NameSpace.Modal].successType;
