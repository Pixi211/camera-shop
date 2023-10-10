
import { State } from '../../types/types';
import { NameSpace } from '../../const';
import { CamerasListType } from '../../types/types';


export const getCameras = (state: State): CamerasListType => state[NameSpace.Cameras].cameras;
export const getLoadingStatus = (state: State): boolean => state[NameSpace.Cameras].isDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Cameras].hasError;
