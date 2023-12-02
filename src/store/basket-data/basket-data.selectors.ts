
import { BasketItemType, State } from '../../types/types';
import { NameSpace } from '../../const';


export const getBasketItems = (state: State): BasketItemType[] => state[NameSpace.Basket].basketItems;
