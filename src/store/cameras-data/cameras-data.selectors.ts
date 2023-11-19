
import { SortDirection, SortType, State } from '../../types/types';
import { NameSpace } from '../../const';
import { CameraType } from '../../types/types';


export const getCameras = (state: State): CameraType[] => state[NameSpace.Cameras].cameras;
export const getCamerasDataLoading = (state: State): boolean => state[NameSpace.Cameras].isDataLoading;
export const getDataLoadingErrorStatus = (state: State): boolean => state[NameSpace.Cameras].hasError;
export const getSortType = (state: State): SortType => state[NameSpace.Cameras].sortType;
export const getSortDirection = (state: State): SortDirection => state[NameSpace.Cameras].sortDirection;
export const getMinPrice = (state: State): number | null => state[NameSpace.Cameras].minPrice;
export const getMaxPrice = (state: State): number | null => state[NameSpace.Cameras].maxPrice;


