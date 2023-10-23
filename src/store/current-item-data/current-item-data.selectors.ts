
import { CamerasListType, Review, State } from '../../types/types';
import { NameSpace } from '../../const';
import { CameraType } from '../../types/types';


export const getCurentItemData = (state: State): CameraType | null => state[NameSpace.Current].currentItemData;
export const getSimilarCameras = (state: State): CamerasListType => state[NameSpace.Current].similarCameras;
export const getReviews = (state: State): Review[] => state[NameSpace.Current].reviews;
export const getLoadingCurrentDataStatus = (state: State): boolean => state[NameSpace.Current].isCurrentDataLoading;
export const getLoadingSimilarsStatus = (state: State): boolean => state[NameSpace.Current].isSimilarsLoading;
export const getLoadingReviewsStatus = (state: State): boolean => state[NameSpace.Current].isReviewsLoading;
export const getLoadingErrorStatus = (state: State): boolean => state[NameSpace.Current].hasError;


