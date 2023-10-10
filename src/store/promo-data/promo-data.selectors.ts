import { PromoCameraType } from '../../types/types';
import { State } from '../../types/types';
import { NameSpace } from '../../const';


export const getPromos = (state: State): PromoCameraType[] => state[NameSpace.Promo].promos;
export const getPromoErrorStatus = (state: State): boolean => state[NameSpace.Promo].hasError;
