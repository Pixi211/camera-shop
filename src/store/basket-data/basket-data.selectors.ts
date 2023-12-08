
import { BasketItemType, State } from '../../types/types';
import { NameSpace } from '../../const';


export const getBasketItems = (state: State): BasketItemType[] => state[NameSpace.Basket].basketItems;
export const getIsPromoCodeValid = (state: State): boolean => state[NameSpace.Basket].isPromoCodeValid;
export const getIsPromoCodeInvalid = (state: State): boolean => state[NameSpace.Basket].isPromoCodeInvalid;
export const getPromoCodeName = (state: State): string | null => state[NameSpace.Basket].promoCodeName;
