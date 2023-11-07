
import { SortDirection, SortType, State } from '../../types/types';
import { NameSpace } from '../../const';
import { CameraType } from '../../types/types';


export const getCameras = (state: State): CameraType[] => state[NameSpace.Cameras].cameras;
export const getSortType = (state: State): SortType => state[NameSpace.Cameras].sortType;
export const getSortDirection = (state: State): SortDirection => state[NameSpace.Cameras].sortDirection;

