
import { State } from '../../types/types';
import { NameSpace } from '../../const';
import { CameraType } from '../../types/types';


export const getCurentItemData = (state: State): CameraType | null => state[NameSpace.Current].currentItemData;

