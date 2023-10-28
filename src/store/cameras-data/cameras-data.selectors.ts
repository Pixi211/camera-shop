
import { State } from '../../types/types';
import { NameSpace } from '../../const';
import { CameraType } from '../../types/types';


export const getCameras = (state: State): CameraType[] => state[NameSpace.Cameras].cameras;
export const getLoadingStatus = (state: State): boolean => state[NameSpace.Cameras].isDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Cameras].hasError;
