
import { CameraType, State } from '../../types/types';
import { NameSpace } from '../../const';


export const getModalAddItemToBasketStatus = (state: State): boolean => state[NameSpace.Modal].addItemToBasketStatus ;
export const getModalSuccessStatus = (state: State): boolean => state[NameSpace.Modal].successStatus ;
export const getActiveStatus = (state: State) : boolean => state[NameSpace.Modal].isActive;
export const getModalData = (state: State) : CameraType | null => state[NameSpace.Modal].modalData;
